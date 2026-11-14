import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { safeRedirectPath } from "@/lib/auth-utils";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  head: () => ({
    meta: [
      { title: `Sign in · ${BRAND.fullName}` },
      { name: "description", content: `Sign in to ${BRAND.fullName} to manage your office commute fleet.` },
      { property: "og:title", content: `Sign in · ${BRAND.fullName}` },
      { property: "og:description", content: BRAND.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const target = safeRedirectPath(redirect);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Already signed in: skip the form.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ href: target, replace: true });
    });
  }, [navigate, target]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setPending(false);
    if (signInError) {
      setError(signInError.message === "Invalid login credentials" ? t("auth.invalid") : signInError.message);
      return;
    }
    navigate({ href: target, replace: true });
  }

  return (
    <AuthShell title={t("auth.welcome")} subtitle={t("auth.signInSubtitle")} footer={t("auth.noAccount")}>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base"
            placeholder="name@company.com"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              {t("auth.forgot")}
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 text-base"
          />
        </div>

        {error && (
          <p role="alert" className="flex items-start gap-2 rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {error}
          </p>
        )}

        <Button type="submit" variant="signal" size="xl" className="w-full" disabled={pending || !email || !password}>
          {pending ? t("auth.signingIn") : t("auth.signIn")}
          {!pending && <ArrowRight />}
        </Button>
      </form>
    </AuthShell>
  );
}
