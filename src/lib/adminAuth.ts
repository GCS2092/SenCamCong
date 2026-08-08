// Fonctions de signature/vérification du cookie de session admin.
// Utilise Web Crypto (compatible middleware Edge + routes API Node).

const encoder = new TextEncoder();

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  return bufferToHex(signature);
}

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours

export const ADMIN_SESSION_COOKIE = "admin_session";

// Crée la valeur du cookie : expiration + signature de cette expiration.
export async function createSessionCookieValue(secret: string): Promise<string> {
  const expiry = Date.now() + SESSION_DURATION_MS;
  const signature = await sign(secret, String(expiry));
  return `${expiry}.${signature}`;
}

// Vérifie que le cookie n'est ni expiré ni falsifié.
export async function isSessionValid(
  secret: string,
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;

  const [expiryStr, signature] = cookieValue.split(".");
  if (!expiryStr || !signature) return false;

  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expectedSignature = await sign(secret, expiryStr);
  return expectedSignature === signature;
}