import { mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { recover, ACCOUNT } from './recover-sambisari.mjs';
const TARGET = 'www.sambisari.com';
export const RESULTS = new Set([
 'READY_TO_ATTACH', 'SKIP_ALREADY_BOUND', 'SKIP_NOT_PRODUCTION_CI',
 'STOP_BRANCH_CONFLICT', 'STOP_ACCOUNT_MISMATCH', 'STOP_NO_EXISTING_AUTH', 'STOP_NO_TRANSPORT',
 'STOP_DOMAIN_SHAPE_UNPROVEN', 'STOP_REQUEST_BOUND_EXCEEDED', 'STOP_SECOND_WRITE_FORBIDDEN',
 'STOP_INVALID_RESPONSE', 'STOP_WRITE_OR_POSTCHECK_HTTP_ERROR', 'STOP_READ_HTTP_ERROR',
 'STOP_INVALID_JSON', 'STOP_API_ENVELOPE_ERROR', 'STOP_WRITE_OR_POSTCHECK_NETWORK_FAILURE',
 'STOP_READ_NETWORK_FAILURE', 'STOP_LIST_SHAPE_UNPROVEN', 'STOP_SINGLE_PAGE_BOUND_EXCEEDED',
 'STOP_DUPLICATE_OR_MISSING_ID', 'STOP_PAGINATION_UNPROVEN', 'STOP_PAGINATION_CHANGED',
 'STOP_PAGINATION_INCOMPLETE', 'STOP_PAGE_BOUND_EXCEEDED', 'STOP_DUPLICATE_HOSTNAME',
 'STOP_APEX_BINDING_UNPROVEN', 'STOP_TARGET_BINDING_CONFLICT', 'STOP_DNS_EXACT_MATCH_UNPROVEN',
 'STOP_TARGET_DNS_EXISTS', 'STOP_WRITE_RESULT_UNEXPECTED', 'STOP_POSTCHECK_DUPLICATE',
 'STOP_ORIGINAL_BINDING_CHANGED', 'STOP_POSTCHECK_TARGET_UNPROVEN', 'STOP_INTERNAL_FAILURE',
 'STOP_INVALID_PROBE_RESULT', 'STOP_PROBE_UNEXPECTED_FAILURE'
]);
// Rebuild diagnostics field-by-field; never spread an API or recovery object into evidence.
export function sanitizePagination(input) {
 if (!input || !['domains','dns'].includes(input.stage)) return undefined;
 const out={stage:input.stage};
 for(const key of ['result_info_present','result_info_object','result_array']) if(typeof input[key]==='boolean') out[key]=input[key];
 if(Number.isInteger(input.requested_page) && input.requested_page>=1 && input.requested_page<=10) out.requested_page=input.requested_page;
 if(Number.isInteger(input.result_length) && input.result_length>=0 && input.result_length<=1_000_000) out.result_length=input.result_length;
 for(const key of ['page','total_pages','total_count','count','per_page']) {
  const field=input[key];
  if(!field || typeof field.present!=='boolean' || typeof field.integer!=='boolean') continue;
  const clean={present:field.present,integer:field.integer};
  if(field.present && field.integer && Number.isInteger(field.value) && field.value>=-1_000_000 && field.value<=1_000_000) clean.value=field.value;
  out[key]=clean;
 }
 return out;
}
// Build-stage wrapper is read-only even if the underlying recovery module later supports attach.
export async function probe({env = {}, fetchImpl, outputDir = 'dist/public', recoverImpl = recover, log = () => {}} = {}) {
 if (env.WORKERS_CI !== '1' || env.WORKERS_CI_BRANCH !== 'main') return {result:'SKIP_NOT_PRODUCTION_CI',written:false};
 // Do not publish unvalidated user-controlled text as build provenance.
 if (!/^[a-f0-9]{40}$/.test(env.WORKERS_CI_COMMIT_SHA || '')) { log(JSON.stringify({hostname:TARGET,result:'STOP_INVALID_COMMIT'})); return {result:'STOP_INVALID_COMMIT',written:false}; }
 let outcome;
 let readHttpFailure;
 const verifiedZones = new Set();
 const readOnlyFetch = typeof fetchImpl === 'function' ? async (input, options) => {
  const deny = () => { throw new Error('PROBE_TRANSPORT_FORBIDDEN'); };
  if (options?.method !== 'GET' || typeof input !== 'string') deny();
  let url;
  try { url = new URL(input); } catch { deny(); }
  if (input !== url.toString() || url.protocol !== 'https:' || url.hostname !== 'api.cloudflare.com' || url.origin !== 'https://api.cloudflare.com' || url.username || url.password || url.port || url.hash) deny();
  const domainsPath = `/client/v4/accounts/${ACCOUNT}/workers/domains`;
  const isDomains = url.pathname === domainsPath;
  const dnsMatch = /^\/client\/v4\/zones\/([a-f0-9]{32})\/dns_records$/.exec(url.pathname);
  if (!isDomains && (!dnsMatch || !verifiedZones.has(dnsMatch[1]))) deny();
  const keys = [...url.searchParams.keys()];
  if (new Set(keys).size !== keys.length) deny();
  const allowed = new Set(isDomains ? ['page','per_page'] : ['page','per_page','name.exact','match']);
  for (const key of keys) if (!allowed.has(key)) deny();
  if (url.searchParams.has('page') && !/^(?:[1-9]|10)$/.test(url.searchParams.get('page'))) deny();
  if (url.searchParams.has('per_page') && url.searchParams.get('per_page') !== '100') deny();
  if (!isDomains && (url.searchParams.get('name.exact') !== TARGET || url.searchParams.get('match') !== 'all')) deny();
  // Never permit redirect following, even if a future caller supplies different options.
  const response = await fetchImpl(url.toString(), {...options,redirect:'error'});
  if (!response.ok && Number.isInteger(response.status) && response.status>=100 && response.status<=599) readHttpFailure={stage:isDomains?'domains':'dns',status:response.status};
  return {ok:response.ok,status:response.status,json:async()=>{
   const body=await response.json();
   // Learn a DNS allowlist only from a valid apex record in an account-domain read.
   // Core preflight still checks the complete account list before it requests DNS.
   if(isDomains && body?.success===true && Array.isArray(body.result)) {
    for(const d of body.result) if(d?.hostname==='sambisari.com' && d.service==='sambisari' && d.environment==='production' && d.enabled===true && d.zone_name==='sambisari.com' && typeof d.id==='string' && d.id && typeof d.previews_enabled==='boolean' && /^[a-f0-9]{32}$/.test(d.zone_id || '')) verifiedZones.add(d.zone_id);
   }
   return body;
  }};
 } : undefined;
 try { outcome = await recoverImpl({env,fetchImpl:readOnlyFetch,probeOnly:true,log}); } catch { outcome={result:'STOP_PROBE_UNEXPECTED_FAILURE'}; }
 if (!RESULTS.has(outcome?.result)) outcome={result:'STOP_INVALID_PROBE_RESULT'};
 const evidence={commit:env.WORKERS_CI_COMMIT_SHA,checkedAt:new Date().toISOString(),target:TARGET,result:outcome.result};
 if (Number.isInteger(outcome.status) && outcome.status>=100 && outcome.status<=599) evidence.status=outcome.status;
 if (outcome.result==='STOP_READ_HTTP_ERROR' && readHttpFailure?.status===outcome.status && ['domains','dns'].includes(readHttpFailure.stage)) evidence.httpStage=readHttpFailure.stage;
 if (Number.isInteger(outcome.code) && outcome.code>=0 && outcome.code<=Number.MAX_SAFE_INTEGER) evidence.code=outcome.code;
 if (['STOP_PAGINATION_UNPROVEN','STOP_PAGINATION_CHANGED','STOP_PAGINATION_INCOMPLETE'].includes(outcome.result)) { const safe = sanitizePagination(outcome.pagination); if (safe) evidence.pagination=safe; }
 try {
  await mkdir(outputDir,{recursive:true});
  const destination=path.join(outputDir,'deployment-evidence.json');
  await writeFile(destination+'.tmp',JSON.stringify(evidence)+'\n',{mode:0o644});
  await rename(destination+'.tmp',destination);
  return {result:outcome.result,written:true};
 } catch { log(JSON.stringify({hostname:TARGET,result:'STOP_EVIDENCE_WRITE_FAILED'}));return {result:'STOP_EVIDENCE_WRITE_FAILED',written:false}; }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
 // A blocked read-only probe is evidence, not an apex build/deployment failure.
 try { await probe({env:process.env,fetchImpl:globalThis.fetch,log:line=>console.log(line)}); } catch { console.log(JSON.stringify({hostname:TARGET,result:'STOP_PROBE_UNEXPECTED_FAILURE'})); }
}
