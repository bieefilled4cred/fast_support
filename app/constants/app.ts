export const APP_NAME = "Fast Support";
const isProduction = process.env.NODE_ENV === "production";

export const COOKIE_DOMAIN = isProduction
  ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".digitvant.com"
  : "";
