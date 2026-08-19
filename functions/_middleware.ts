/**
 * Password-gates the project pages listed in PROTECTED_PREFIXES.
 *
 * Cloudflare Pages runs this at the edge for every request, before any static
 * file is served, so a gated page's HTML never leaves the origin unless the
 * request carries the right password. That is the whole reason the site moved
 * off GitHub Pages: a gate in front of a separately-addressable origin is
 * obscurity, not protection.
 *
 * The password lives in the CASE_STUDY_PASSWORD environment variable, set as
 * an encrypted secret in the Pages dashboard. It is deliberately not in this
 * repository.
 */

interface Env {
  CASE_STUDY_PASSWORD?: string;
}

/**
 * Path prefixes behind the gate. Each protected project needs its page and,
 * separately, its artwork: Astro flattens src/assets into a shared /_astro/
 * directory that cannot be gated per project, so protected artwork lives in
 * public/protected/<slug>/ instead and is matched here.
 *
 * Keep this in sync with the `protected` flags in src/data/site.ts, which
 * drive the badge on the cards.
 */
const PROTECTED_PREFIXES = ['/wemolo-ds', '/protected/wemolo-ds'];

const UNAUTHORIZED = 'Authentication required';

/**
 * Reduces a request path to the form the prefix list is written in, so a gate
 * cannot be stepped around with an equivalent spelling of the same path. Each
 * step here corresponds to a bypass that served the protected page in testing:
 *
 * - percent-encoding, since `%2F` is a path separator the asset server
 *   resolves but a raw string compare does not;
 * - repeated slashes, since `//wemolo-ds/` reaches the same asset;
 * - `.` and `..` segments;
 * - letter case, since Cloudflare's asset lookup is case-insensitive.
 *
 * Decoding happens before the rest, and repeatedly, so a double-encoded
 * `%252F` cannot survive one pass and be resolved later.
 */
function normalize(pathname: string): string {
  let decoded = pathname;
  for (let i = 0; i < 3; i += 1) {
    let next: string;
    try {
      next = decodeURIComponent(decoded);
    } catch {
      // Malformed encoding cannot be reasoned about, so treat the path as
      // hostile rather than guessing at what it meant.
      return '\u0000malformed';
    }
    if (next === decoded) break;
    decoded = next;
  }

  const segments: string[] = [];
  for (const segment of decoded.split('/')) {
    if (segment === '' || segment === '.') continue;
    if (segment === '..') {
      segments.pop();
      continue;
    }
    segments.push(segment);
  }

  return `/${segments.join('/')}`.toLowerCase();
}

function isProtected(pathname: string): boolean {
  const path = normalize(pathname);
  return PROTECTED_PREFIXES.some((prefix) => {
    const normalizedPrefix = normalize(prefix);
    return path === normalizedPrefix || path.startsWith(`${normalizedPrefix}/`);
  });
}

/**
 * Compares in time proportional to the inputs rather than returning early on
 * the first differing byte, so response timing does not leak how much of a
 * guess was correct.
 */
function secureEquals(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  // Length is compared as part of the result rather than as an early return,
  // but differing lengths still have to be folded in somehow; XOR-ing against
  // the longer buffer keeps the loop count independent of where they diverge.
  const length = Math.max(left.length, right.length);
  let diff = left.length ^ right.length;
  for (let i = 0; i < length; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}

function challenge(): Response {
  return new Response(UNAUTHORIZED, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Case study", charset="UTF-8"',
      // A gated page must never be held by a shared cache.
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next, env } = context;
  const { pathname } = new URL(request.url);

  if (!isProtected(pathname)) return next();

  // Without a configured password the gate fails closed. An unset variable
  // would otherwise make every empty password valid.
  const expected = env.CASE_STUDY_PASSWORD;
  if (!expected) return challenge();

  const header = request.headers.get('Authorization') ?? '';
  const [scheme, encoded] = header.split(' ');
  if (scheme !== 'Basic' || !encoded) return challenge();

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return challenge();
  }

  // Only the password is checked; the username is ignored, so recruiters can
  // put anything in that field.
  const separator = decoded.indexOf(':');
  if (separator === -1) return challenge();
  const supplied = decoded.slice(separator + 1);

  if (!secureEquals(supplied, expected)) return challenge();

  // Authenticated, but the response still must not be stored by any shared
  // cache between the edge and the visitor.
  const response = await next();
  const gated = new Response(response.body, response);
  gated.headers.set('Cache-Control', 'no-store');
  return gated;
};
