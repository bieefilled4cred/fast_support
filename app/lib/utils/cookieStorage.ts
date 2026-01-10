export interface CookieStorageOptions {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export const setCookie = (name: string, value: string, options: CookieStorageOptions = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  const { maxAge = 60 * 10, path = "/", secure = process.env.NODE_ENV === "production", sameSite = "strict" } = options;

  const expires = maxAge ? new Date(Date.now() + maxAge * 1000).toUTCString() : "";

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; ${secure ? "secure;" : ""} SameSite=${sameSite}`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(c => c.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=")[1]);
};

export const removeCookie = (name: string, path: string = "/") => {
  if (typeof window === "undefined") {
    return;
  }

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
};
