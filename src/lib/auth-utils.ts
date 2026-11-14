export const DEFAULT_SIGNED_IN_PATH = "/dashboard";
export const MIN_PASSWORD_LENGTH = 8;

/** Only allow same-origin relative paths as post-login destinations. */
export function safeRedirectPath(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_SIGNED_IN_PATH;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return DEFAULT_SIGNED_IN_PATH;
  }
  if (value.startsWith("/auth") || value.startsWith("/reset-password")) return DEFAULT_SIGNED_IN_PATH;
  return value;
}

export type PasswordProblem = "tooShort" | "mismatch" | null;

export function validateNewPassword(password: string, confirm: string): PasswordProblem {
  if (password.length < MIN_PASSWORD_LENGTH) return "tooShort";
  if (password !== confirm) return "mismatch";
  return null;
}

/** Recovery links carry either an implicit-flow hash (type=recovery) or a PKCE ?code. */
export function hasRecoveryToken(hash: string, search: string): boolean {
  return hash.includes("type=recovery") || new URLSearchParams(search).has("code");
}
