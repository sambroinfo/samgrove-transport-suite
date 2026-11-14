import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { DEFAULT_SIGNED_IN_PATH, hasRecoveryToken, validateNewPassword } from "@/lib/auth-utils";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: `Choose a new password · ${BRAND.fullName}` },
      { name: "description", content: `Set a new password for your ${BRAND.fullName} account.` },
      { property: "og:title", content: `Choose a new password · ${BRAND.fullName}` },
      { property: "og:description", content: "Set a new password for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

type LinkState = "verifying" | "ready" | "invalid";

function ResetPasswordPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [linkState, setLinkState] = useState<LinkState>("verifying");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const { hash, search } = window.location;
    if (hash.includes("error") || !hasRecoveryToken(hash, search)) {
      setLinkState("invalid");
      return;
    }
    let settled = false;
    const markReady = () => {
      settled = true;
      setLinkState("ready");
    };
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (session && event === "SIGNED_IN")) markReady();
    });
    supabase.auth.getSession().then(({ data: s }) => {
      if (s.session) markReady();
    });
    const timer = window.setTimeout(() => {
      if (!settled) setLinkState("invalid");
    }, 8000);
    return () => {
      data.subscription.unsubscribe();
      window.clearTimeout(timer);
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const problem = validateNewPassword(password, confirm);
    if (problem) {
      setError(t(problem === "tooShort" ? "auth.tooShort" : "auth.mismatch"));
      return;
    }
    setError(null);
    setPending(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    toast.success(t("auth.passwordUpdated"));
    navigate({ href: DEFAULT_SIGNED_IN_PATH, replace: true });
  }

  return (
    <AuthShell title={t("auth.newPasswordTitle")} subtitle={t("auth.newPasswordSubtitle")}>
      {linkState === "verifying" && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          {t("auth.verifying")}
        </p>
      )}

      {linkState === "invalid" && (
        <div className="space-y-5">
          <p role="alert" className="flex items-start gap-2 rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {t("auth.linkInvalid")}
          </p>
          <Button asChild variant="signal" size="xl" className="w-full">
            <Link to="/forgot-password">{t("auth.sendLink")}</Link>
          </Button>
        </div>
      )}

      {linkState === "ready" && (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="new-password">{t("auth.newPassword")}</Label>
            <PasswordInput
              id="new-password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t("auth.confirmPassword")}</Label>
            <PasswordInput
              id="confirm-password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-12 text-base"
            />
          </div>
          {error && (
            <p role="alert" className="flex items-start gap-2 rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {error}
            </p>
          )}
          <Button type="submit" variant="signal" size="xl" className="w-full" disabled={pending}>
            {pending ? t("auth.updating") : t("auth.updatePassword")}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
