export function jsonResponse(
  body: unknown,
  init?: { status?: number; statusText?: string; contentType?: string },
): Response {
  return new Response(typeof body === 'string' ? body : JSON.stringify(body), {
    status: init?.status ?? 200,
    statusText: init?.statusText ?? 'OK',
    headers: { 'content-type': init?.contentType ?? 'application/json' },
  });
}

export function textResponse(
  body: string,
  init?: { status?: number; statusText?: string; contentType?: string },
): Response {
  return new Response(body, {
    status: init?.status ?? 200,
    statusText: init?.statusText ?? 'OK',
    headers: { 'content-type': init?.contentType ?? 'text/plain' },
  });
}

export function emptyResponse(status = 204): Response {
  return new Response(null, { status });
}

export function errorResponse(
  status: number,
  body: unknown,
  init?: { statusText?: string; contentType?: string },
): Response {
  let contentType = init?.contentType;

  if (contentType === undefined) {
    contentType = typeof body === 'string' ? 'text/plain' : 'application/json';
  }

  const payload = typeof body === 'string' ? body : JSON.stringify(body);

  return new Response(payload, {
    status,
    statusText: init?.statusText ?? 'Error',
    headers: { 'content-type': contentType },
  });
}
