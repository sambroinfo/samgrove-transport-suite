import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "bn", label: "বাংলা", short: "বাং" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

const en = {
  "nav.group.overview": "Overview",
  "nav.group.operations": "Operations",
  "nav.group.people": "People",
  "nav.group.communication": "Communication",
  "nav.group.system": "System",
  "nav.dashboard": "Dashboard",
  "nav.employees": "Employees",
  "nav.drivers": "Drivers",
  "nav.vehicles": "Vehicles",
  "nav.routes": "Routes",
  "nav.trips": "Trips",
  "nav.gps": "GPS Tracking",
  "nav.notifications": "Notifications",
  "nav.chat": "Chat",
  "nav.emergencies": "Emergencies",
  "nav.reports": "Reports",
  "nav.settings": "Settings",

  "auth.signIn": "Sign in",
  "auth.signingIn": "Signing in…",
  "auth.welcome": "Welcome back",
  "auth.signInSubtitle": "Sign in with the account your organization issued to you.",
  "auth.email": "Work email",
  "auth.password": "Password",
  "auth.forgot": "Forgot password?",
  "auth.invalid": "Email or password is incorrect.",
  "auth.noAccount": "Accounts are created by your organization's administrator.",
  "auth.resetTitle": "Reset your password",
  "auth.resetSubtitle": "Enter your work email and we'll send you a secure reset link.",
  "auth.sendLink": "Send reset link",
  "auth.sending": "Sending…",
  "auth.linkSent": "If an account exists for that email, a reset link is on its way.",
  "auth.backToSignIn": "Back to sign in",
  "auth.newPasswordTitle": "Choose a new password",
  "auth.newPasswordSubtitle": "Use at least 8 characters. You'll stay signed in afterwards.",
  "auth.newPassword": "New password",
  "auth.confirmPassword": "Confirm password",
  "auth.updatePassword": "Update password",
  "auth.updating": "Updating…",
  "auth.passwordUpdated": "Password updated.",
  "auth.mismatch": "Passwords don't match.",
  "auth.tooShort": "Password must be at least 8 characters.",
  "auth.linkInvalid": "This reset link is invalid or has expired. Request a new one.",
  "auth.verifying": "Verifying your reset link…",
  "auth.signOut": "Sign out",

  "header.notifications": "Notifications",
  "header.noNotifications": "You're all caught up.",
  "header.markAllRead": "Mark all as read",
  "header.viewAll": "View all",
  "header.language": "Language",
  "header.organization": "Organization",
  "header.profile": "Profile",

  "dash.greeting": "Operations overview",
  "dash.today": "Today",
  "dash.activeVehicles": "Active vehicles",
  "dash.ofTotal": "of {total} registered",
  "dash.tripsToday": "Trips today",
  "dash.inProgress": "{count} in progress",
  "dash.employees": "Transport employees",
  "dash.eligible": "active employee records",
  "dash.drivers": "Active drivers",
  "dash.driversHint": "on the roster",
  "dash.emergencies": "Open emergencies",
  "dash.emergenciesHint": "awaiting resolution",
  "dash.fleetMap": "Fleet map",
  "dash.mapPreview": "Map preview",
  "dash.mapNote": "Interactive live map arrives with the GPS Tracking module.",
  "dash.positions": "Reported positions",
  "dash.noPositions": "No vehicle positions have been reported yet.",
  "dash.todaysTrips": "Today's trips",
  "dash.noTrips": "No trips are scheduled for today.",
  "dash.openIncidents": "Open incidents",
  "dash.noIncidents": "No open incidents.",
  "dash.noOrgTitle": "Your account isn't linked to an organization yet",
  "dash.noOrgBody":
    "Ask your SAMGROVE administrator to add you as an active member of your organization. Your dashboard will populate automatically once access is granted.",
  "dash.loadError": "Some figures couldn't be loaded.",
  "dash.scopeNote": "Figures reflect records your role is permitted to view.",

  "module.planned": "Planned for the next build phase",
  "module.dataSources": "Connected data sources",

  "common.retry": "Try again",
  "common.version": "Version",
} as const;

export type TranslationKey = keyof typeof en;

const bn: Record<TranslationKey, string> = {
  "nav.group.overview": "সারসংক্ষেপ",
  "nav.group.operations": "পরিচালনা",
  "nav.group.people": "জনবল",
  "nav.group.communication": "যোগাযোগ",
  "nav.group.system": "সিস্টেম",
  "nav.dashboard": "ড্যাশবোর্ড",
  "nav.employees": "কর্মীবৃন্দ",
  "nav.drivers": "চালক",
  "nav.vehicles": "যানবাহন",
  "nav.routes": "রুট",
  "nav.trips": "ট্রিপ",
  "nav.gps": "জিপিএস ট্র্যাকিং",
  "nav.notifications": "বিজ্ঞপ্তি",
  "nav.chat": "চ্যাট",
  "nav.emergencies": "জরুরি অবস্থা",
  "nav.reports": "রিপোর্ট",
  "nav.settings": "সেটিংস",

  "auth.signIn": "সাইন ইন",
  "auth.signingIn": "সাইন ইন হচ্ছে…",
  "auth.welcome": "আবার স্বাগতম",
  "auth.signInSubtitle": "আপনার প্রতিষ্ঠান থেকে দেওয়া অ্যাকাউন্ট দিয়ে সাইন ইন করুন।",
  "auth.email": "অফিস ইমেইল",
  "auth.password": "পাসওয়ার্ড",
  "auth.forgot": "পাসওয়ার্ড ভুলে গেছেন?",
  "auth.invalid": "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
  "auth.noAccount": "অ্যাকাউন্ট আপনার প্রতিষ্ঠানের অ্যাডমিনিস্ট্রেটর তৈরি করেন।",
  "auth.resetTitle": "পাসওয়ার্ড রিসেট করুন",
  "auth.resetSubtitle": "আপনার অফিস ইমেইল দিন, আমরা একটি নিরাপদ রিসেট লিংক পাঠাব।",
  "auth.sendLink": "রিসেট লিংক পাঠান",
  "auth.sending": "পাঠানো হচ্ছে…",
  "auth.linkSent": "এই ইমেইলে অ্যাকাউন্ট থাকলে একটি রিসেট লিংক পাঠানো হয়েছে।",
  "auth.backToSignIn": "সাইন ইনে ফিরে যান",
  "auth.newPasswordTitle": "নতুন পাসওয়ার্ড দিন",
  "auth.newPasswordSubtitle": "কমপক্ষে ৮ অক্ষর ব্যবহার করুন। এরপর আপনি সাইন ইন অবস্থায় থাকবেন।",
  "auth.newPassword": "নতুন পাসওয়ার্ড",
  "auth.confirmPassword": "পাসওয়ার্ড নিশ্চিত করুন",
  "auth.updatePassword": "পাসওয়ার্ড হালনাগাদ করুন",
  "auth.updating": "হালনাগাদ হচ্ছে…",
  "auth.passwordUpdated": "পাসওয়ার্ড হালনাগাদ হয়েছে।",
  "auth.mismatch": "পাসওয়ার্ড দুটি মিলছে না।",
  "auth.tooShort": "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  "auth.linkInvalid": "এই রিসেট লিংকটি অবৈধ বা মেয়াদোত্তীর্ণ। নতুন লিংক চান।",
  "auth.verifying": "রিসেট লিংক যাচাই করা হচ্ছে…",
  "auth.signOut": "সাইন আউট",

  "header.notifications": "বিজ্ঞপ্তি",
  "header.noNotifications": "নতুন কোনো বিজ্ঞপ্তি নেই।",
  "header.markAllRead": "সব পঠিত চিহ্নিত করুন",
  "header.viewAll": "সব দেখুন",
  "header.language": "ভাষা",
  "header.organization": "প্রতিষ্ঠান",
  "header.profile": "প্রোফাইল",

  "dash.greeting": "পরিচালনা সারসংক্ষেপ",
  "dash.today": "আজ",
  "dash.activeVehicles": "সক্রিয় যানবাহন",
  "dash.ofTotal": "মোট নিবন্ধিত {total}টির মধ্যে",
  "dash.tripsToday": "আজকের ট্রিপ",
  "dash.inProgress": "{count}টি চলমান",
  "dash.employees": "পরিবহন কর্মী",
  "dash.eligible": "সক্রিয় কর্মী রেকর্ড",
  "dash.drivers": "সক্রিয় চালক",
  "dash.driversHint": "তালিকাভুক্ত",
  "dash.emergencies": "চলমান জরুরি ঘটনা",
  "dash.emergenciesHint": "সমাধানের অপেক্ষায়",
  "dash.fleetMap": "বহর মানচিত্র",
  "dash.mapPreview": "মানচিত্রের প্রিভিউ",
  "dash.mapNote": "লাইভ মানচিত্র জিপিএস ট্র্যাকিং মডিউলের সাথে আসবে।",
  "dash.positions": "প্রাপ্ত অবস্থান",
  "dash.noPositions": "এখনো কোনো যানবাহনের অবস্থান পাওয়া যায়নি।",
  "dash.todaysTrips": "আজকের ট্রিপসমূহ",
  "dash.noTrips": "আজ কোনো ট্রিপ নির্ধারিত নেই।",
  "dash.openIncidents": "চলমান ঘটনা",
  "dash.noIncidents": "কোনো চলমান ঘটনা নেই।",
  "dash.noOrgTitle": "আপনার অ্যাকাউন্ট এখনো কোনো প্রতিষ্ঠানের সাথে যুক্ত নয়",
  "dash.noOrgBody":
    "আপনার SAMGROVE অ্যাডমিনিস্ট্রেটরকে আপনাকে প্রতিষ্ঠানের সক্রিয় সদস্য হিসেবে যোগ করতে বলুন। অনুমতি পেলে ড্যাশবোর্ড স্বয়ংক্রিয়ভাবে তথ্য দেখাবে।",
  "dash.loadError": "কিছু তথ্য লোড করা যায়নি।",
  "dash.scopeNote": "আপনার ভূমিকা অনুযায়ী দেখার অনুমতিপ্রাপ্ত রেকর্ড দেখানো হচ্ছে।",

  "module.planned": "পরবর্তী ধাপে তৈরি হবে",
  "module.dataSources": "সংযুক্ত ডেটা উৎস",

  "common.retry": "আবার চেষ্টা করুন",
  "common.version": "সংস্করণ",
};

const DICTIONARIES: Record<LanguageCode, Record<TranslationKey, string>> = { en, bn };
const STORAGE_KEY = "samgrove.language";

export function translate(
  lang: LanguageCode,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  let text = DICTIONARIES[lang][key] ?? en[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, String(v));
  }
  return text;
}

type I18nValue = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  locale: string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  // Read the saved choice after hydration so server and client render the same first frame.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "bn") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      locale: lang === "bn" ? "bn-BD" : "en-GB",
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
