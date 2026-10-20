import { pathToFileURL } from 'node:url';

// Single-site pilot. No credentials are persisted; no DNS/delete/bulk-sync writes exist.
export const ACCOUNT = '6745ef8ef8f6e14e20dcadb70f474b0c';
const APEX = 'sambisari.com';
const TARGET = 'www.sambisari.com';
const SERVICE = 'sambisari';
const API = 'https://api.cloudflare.com/client/v4';
const MAX_PAGES = 10, PER_PAGE = 100, MAX_REQUESTS = 32;
const fields = ['id', 'hostname', 'service', 'zone_id', 'zone_name', 'environment', 'enabled', 'previews_enabled'];
class Stop extends Error {
  constructor(reason, status, code, pagination) { super(reason); this.reason = reason; this.status = status; this.code = code; this.pagination = pagination; }
}
const stop = (reason, pagination) => { throw new Stop(reason, undefined, undefined, pagination); };
const validString = (v) => typeof v === 'string' && v.length > 0;
function validateDomain(d) {
  if (!d || !['id', 'hostname', 'service', 'zone_id', 'zone_name', 'environment'].every(k => validString(d[k])) || typeof d.enabled !== 'boolean' || typeof d.previews_enabled !== 'boolean' || d.hostname !== d.hostname.toLowerCase().replace(/\.$/, '')) stop('DOMAIN_SHAPE_UNPROVEN');
}
function snapshot(d) { return JSON.stringify(fields.map(k => d[k])); }
function paginationDiagnostic(data, stage, requestedPage) {
  const m = data?.result_info;
  const object = m !== null && typeof m === 'object' && !Array.isArray(m);
  const out = {stage, requested_page: requestedPage, result_info_present: Object.hasOwn(data, 'result_info'), result_info_object: object, result_array: Array.isArray(data.result)};
  if (Array.isArray(data.result) && data.result.length <= 1_000_000) out.result_length = data.result.length;
  for (const key of ['page','total_pages','total_count','count','per_page']) {
    const present = object && Object.hasOwn(m,key);
    const value = present ? m[key] : undefined;
    out[key] = {present, integer: Number.isInteger(value)};
    if (Number.isInteger(value) && value >= -1_000_000 && value <= 1_000_000) out[key].value = value;
  }
  return out;
}


export async function recover({ env = {}, fetchImpl, log = () => {}, probeOnly = true } = {}) {
  const emit = (result, status, code, pagination) => {
    // Only static result identifiers and numeric API status/code. Never error messages/body/headers.
    const row = { hostname: TARGET, result };
    if (Number.isInteger(status)) row.status = status;
    if (Number.isInteger(code)) row.code = code;
    if (pagination) row.pagination = pagination;
    log(JSON.stringify(row));
    return { result, ...(Number.isInteger(status) ? { status } : {}), ...(Number.isInteger(code) ? { code } : {}), ...(pagination ? { pagination } : {}) };
  };
  if (env.WORKERS_CI !== '1' || env.WORKERS_CI_BRANCH !== 'main') return emit('SKIP_NOT_PRODUCTION_CI');
  if (env.BRANCH !== undefined && env.BRANCH !== 'main') return emit('STOP_BRANCH_CONFLICT');
  if ([env.CLOUDFLARE_ACCOUNT_ID, env.CF_ACCOUNT_ID].some(value => value !== undefined && value !== ACCOUNT)) return emit('STOP_ACCOUNT_MISMATCH');
  if (!validString(env.CLOUDFLARE_API_TOKEN)) return emit('STOP_NO_EXISTING_AUTH');
  if (typeof fetchImpl !== 'function') return emit('STOP_NO_TRANSPORT');
  const deadline = Date.now() + 60_000;
  let requestCount = 0, writeAttempted = false;
  async function request(path, method = 'GET', body) {
    if (++requestCount > MAX_REQUESTS || Date.now() >= deadline) stop('REQUEST_BOUND_EXCEEDED');
    if (method === 'PUT') { if (writeAttempted) stop('SECOND_WRITE_FORBIDDEN'); writeAttempted = true; }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.min(8_000, deadline - Date.now()));
    try {
      const response = await fetchImpl(API + path, { method, headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal: controller.signal, redirect: 'error' });
      // Reject redirects, HTTP failures and envelope errors without disclosing provider text.
      if (!response || !Number.isInteger(response.status)) stop('INVALID_RESPONSE');
      if (!response.ok) throw new Stop(writeAttempted ? 'WRITE_OR_POSTCHECK_HTTP_ERROR' : 'READ_HTTP_ERROR', response.status);
      let data;
      try { data = await response.json(); } catch { stop('INVALID_JSON'); }
      if (data?.success !== true || !Object.hasOwn(data, 'result')) {
        const code = data?.errors?.find(e => Number.isInteger(e?.code))?.code;
        throw new Stop('API_ENVELOPE_ERROR', response.status, code);
      }
      return data;
    } catch (error) {
      if (error instanceof Stop) throw error;
      throw new Stop(writeAttempted ? 'WRITE_OR_POSTCHECK_NETWORK_FAILURE' : 'READ_NETWORK_FAILURE');
    } finally { clearTimeout(timer); }
  }
  async function listAll(path, validate, documentedSinglePage = false) {
    const rows = [], ids = new Set(); let expectedTotal, expectedPages;
    for (let page = 1; page <= MAX_PAGES; page++) {
      const sep = path.includes('?') ? '&' : '?';
      const data = await request(documentedSinglePage && page === 1 ? path : `${path}${sep}page=${page}&per_page=${PER_PAGE}`);
      if (!Array.isArray(data.result)) stop('LIST_SHAPE_UNPROVEN');
      const m = data.result_info;
      const diagnostic = () => paginationDiagnostic(data, documentedSinglePage ? 'domains' : 'dns', page);
      // cloudflare@5.2.0 Workers Domains uses DomainsSinglePage extends SinglePage,
      // whose nextPageInfo() returns null. Only this endpoint may omit metadata.
      if (documentedSinglePage && page === 1 && m === undefined) {
        if (data.result.length > MAX_PAGES * PER_PAGE) stop('SINGLE_PAGE_BOUND_EXCEEDED');
        for (const row of data.result) { validate(row); if (!validString(row.id) || ids.has(row.id)) stop('DUPLICATE_OR_MISSING_ID'); ids.add(row.id); }
        return data.result;
      }
      // Missing/inconsistent pagination metadata is not assumed to mean complete.
      if (!m || m.page !== page || !Number.isInteger(m.total_pages) || m.total_pages < 1 || m.total_pages > MAX_PAGES || !Number.isInteger(m.total_count) || m.total_count < 0 || m.count !== data.result.length || !Number.isInteger(m.per_page) || m.per_page < 1 || m.per_page > PER_PAGE || data.result.length > m.per_page) stop('PAGINATION_UNPROVEN', diagnostic());
      if (page === 1) { expectedTotal = m.total_count; expectedPages = m.total_pages; }
      if (m.total_count !== expectedTotal || m.total_pages !== expectedPages || page > expectedPages) stop('PAGINATION_CHANGED', diagnostic());
      if (page < expectedPages && data.result.length === 0) stop('PAGINATION_INCOMPLETE', diagnostic());
      for (const row of data.result) {
        validate(row);
        if (!validString(row.id) || ids.has(row.id)) stop('DUPLICATE_OR_MISSING_ID');
        ids.add(row.id); rows.push(row);
      }
      if (page === expectedPages) { if (rows.length !== expectedTotal) stop('PAGINATION_INCOMPLETE', diagnostic()); return rows; }
    }
    stop('PAGE_BOUND_EXCEEDED');
  }
  const domainPath = `/accounts/${ACCOUNT}/workers/domains`;
  try {
    const before = await listAll(domainPath, validateDomain, true);
    if (new Set(before.map(d => d.hostname.toLowerCase())).size !== before.length) stop('DUPLICATE_HOSTNAME');
    const apex = before.filter(d => d.hostname === APEX);
    if (apex.length !== 1 || apex[0].service !== SERVICE || apex[0].environment !== 'production' || apex[0].enabled !== true || !/^[a-f0-9]{32}$/i.test(apex[0].zone_id)) stop('APEX_BINDING_UNPROVEN');
    const existing = before.filter(d => d.hostname === TARGET);
    if (existing.length) {
      if (existing.length === 1 && existing[0].service === SERVICE && existing[0].environment === 'production' && existing[0].zone_id === apex[0].zone_id && existing[0].enabled === true) return emit('SKIP_ALREADY_BOUND');
      stop('TARGET_BINDING_CONFLICT');
    }
    const dns = await listAll(`/zones/${apex[0].zone_id}/dns_records?name.exact=${encodeURIComponent(TARGET)}&match=all`, d => {
      if (!d || !validString(d.name) || !validString(d.type) || d.name.toLowerCase().replace(/\.$/, '') !== TARGET) stop('DNS_EXACT_MATCH_UNPROVEN');
    });
    if (dns.length) stop('TARGET_DNS_EXISTS');
    if (probeOnly) return emit('READY_TO_ATTACH');
    const body = { hostname: TARGET, service: SERVICE, zone_id: apex[0].zone_id, enabled: true };
    const written = await request(domainPath, 'PUT', body);
    validateDomain(written.result);
    if (written.result.hostname !== TARGET || written.result.service !== SERVICE || written.result.environment !== 'production' || written.result.zone_id !== apex[0].zone_id || written.result.enabled !== true) stop('WRITE_RESULT_UNEXPECTED');
    const after = await listAll(domainPath, validateDomain, true);
    const byId = new Map(after.map(d => [d.id, d]));
    if (byId.size !== after.length || new Set(after.map(d => d.hostname.toLowerCase())).size !== after.length) stop('POSTCHECK_DUPLICATE');
    for (const old of before) if (!byId.has(old.id) || snapshot(byId.get(old.id)) !== snapshot(old)) stop('ORIGINAL_BINDING_CHANGED');
    const target = after.filter(d => d.hostname === TARGET);
    if (target.length !== 1 || snapshot(target[0]) !== snapshot(written.result) || before.some(d => d.id === target[0].id) || after.length !== before.length + 1) stop('POSTCHECK_TARGET_UNPROVEN');
    return emit('ATTACHED_AND_ORIGINALS_PRESERVED');
  } catch (error) {
    return emit(error instanceof Stop ? `STOP_${error.reason}` : 'STOP_INTERNAL_FAILURE', error instanceof Stop ? error.status : undefined, error instanceof Stop ? error.code : undefined, error instanceof Stop ? error.pagination : undefined);
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const outcome = await recover({ env: process.env, fetchImpl: globalThis.fetch, probeOnly: true, log: line => console.log(line) });
  if (outcome.result.startsWith('STOP_')) process.exitCode = 1;
}
