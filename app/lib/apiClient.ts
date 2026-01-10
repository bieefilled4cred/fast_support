
import { BASE_URL } from "../constants/api";

export async function api(
  path: string,
  options: RequestInit & { baseUrl?: string; returnBlob?: boolean; allow400?: boolean } = {}
) {
  const baseUrl = options.baseUrl || BASE_URL;

  if (!baseUrl) {
    throw new Error("BASE_URL is not defined. Please set NEXT_PUBLIC_API_URL environment variable.");
  }
  const { returnBlob } = options;
  const { allow400 } = options;

  const fetchOptions: RequestInit = {
    method: options.method,
    headers: options.headers,
    body: options.body,
    cache: options.cache,
    credentials: options.credentials,
    integrity: options.integrity,
    keepalive: options.keepalive,
    mode: options.mode,
    redirect: options.redirect,
    referrer: options.referrer,
    referrerPolicy: options.referrerPolicy,
    signal: options.signal,
    window: options.window,
  };

  const res = await fetch(`${baseUrl}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    },
  });

  if (returnBlob) {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.blob();
  }

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (allow400 && res.status === 400) {
    if (data && data.data && data.data.data && Array.isArray(data.data.data)) {
      return data;
    }
    throw new Error(`HTTP error! status: ${res.status} - No data in response`);
  }

  if (!res.ok || data?.isSuccessful === false) {
    throw Object.assign(new Error(data?.message || "API request failed"), {
      status: res.status,
      response: data,
    });
  }

  return data;
}
