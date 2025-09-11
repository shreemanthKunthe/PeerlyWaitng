// Centralized client-side config
// Vite exposes env vars prefixed with VITE_

// Prefer VITE_GOOGLE_SCRIPT_URL, but also accept legacy VITE_GAS_URL
export const GOOGLE_SCRIPT_URL: string | undefined =
  (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined) ||
  (import.meta.env.VITE_GAS_URL as string | undefined);

export function assertGoogleScriptUrl(): string {
  if (!GOOGLE_SCRIPT_URL) {
    console.error(
      "VITE_GOOGLE_SCRIPT_URL (or VITE_GAS_URL) is not set. Define it in your .env or Vercel Project Environment Variables."
    );
    return ""; // return empty to avoid runtime crash; caller should handle missing URL
  }
  return GOOGLE_SCRIPT_URL;
}
