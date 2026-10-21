export interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isProductionHost = url.hostname === "sambisari.com" || url.hostname === "www.sambisari.com";
    if (isProductionHost && (url.protocol !== "https:" || url.hostname !== "sambisari.com")) {
      url.protocol = "https:";
      url.hostname = "sambisari.com";
      url.port = "";
      return Response.redirect(url.href, 301);
    }
    const isErrorPath = /^\/404(?:\.html)?\/?$/.test(url.pathname);
    // Fetch an absent path to obtain the configured error document without
    // the asset service's /404.html -> /404 canonical redirect.
    const assetRequest = isErrorPath
      ? new Request(new URL("/__sambisari_error_document__", url), request)
      : request;
    const response = await env.ASSETS.fetch(assetRequest);
    if (!isErrorPath && response.status !== 404) return response;
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, follow");
    return new Response(response.body, { status: 404, statusText: "Not Found", headers });
  }
};
