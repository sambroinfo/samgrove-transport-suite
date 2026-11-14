import { describe, expect, it } from "vitest";
import { hasRecoveryToken, safeRedirectPath, validateNewPassword } from "@/lib/auth-utils";

describe("safeRedirectPath", () => {
  it("keeps same-origin app paths", () => {
    expect(safeRedirectPath("/trips?day=today")).toBe("/trips?day=today");
  });
  it("rejects external and protocol-relative targets", () => {
    expect(safeRedirectPath("https://evil.example")).toBe("/dashboard");
    expect(safeRedirectPath("//evil.example")).toBe("/dashboard");
    expect(safeRedirectPath("/\\evil.example")).toBe("/dashboard");
  });
  it("never bounces back to the sign-in page", () => {
    expect(safeRedirectPath("/auth")).toBe("/dashboard");
  });
});

describe("validateNewPassword", () => {
  it("requires at least 8 characters", () => {
    expect(validateNewPassword("short7!", "short7!")).toBe("tooShort");
    expect(validateNewPassword("longenough", "longenough")).toBeNull();
  });
  it("requires both entries to match", () => {
    expect(validateNewPassword("longenough", "longenougH")).toBe("mismatch");
  });
});

describe("hasRecoveryToken", () => {
  it("accepts implicit and PKCE recovery links", () => {
    expect(hasRecoveryToken("#access_token=x&type=recovery", "")).toBe(true);
    expect(hasRecoveryToken("", "?code=abc")).toBe(true);
    expect(hasRecoveryToken("", "")).toBe(false);
  });
});
