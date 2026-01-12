"use server";

import { COOKIE_DOMAIN } from "@/app/constants/app";
import { UserProfile } from "@/app/types";
import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions: {
    name: string;
    value: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none" | "strict" | "lax";
    path: string;
    domain?: string;
  } = {
    name: "cred-crm-ticket-tok",
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  };

  if (COOKIE_DOMAIN && isProduction) {
    cookieOptions.domain = COOKIE_DOMAIN;
  }

  cookieStore.set(cookieOptions);
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  const deleteCookieOptions: {
    name: string;
    value: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none" | "strict" | "lax";
    path: string;
    domain?: string;
    maxAge: number;
  } = {
    name: "cred-crm-ticket-tok",
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  };

  if (COOKIE_DOMAIN && isProduction) {
    deleteCookieOptions.domain = COOKIE_DOMAIN;
  }

  cookieStore.set(deleteCookieOptions);

  const deleteUserCookieOptions = {
    ...deleteCookieOptions,
    name: "cred-crm-ticket-user",
  };

  cookieStore.set(deleteUserCookieOptions);
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("cred-crm-ticket-tok")?.value || null;
}

export async function setAuthUserCookie(user: UserProfile) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions: {
    name: string;
    value: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none" | "strict" | "lax";
    path: string;
    domain?: string;
  } = {
    name: "fast-support-auth-user",
    value: JSON.stringify(user),
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  };

  if (COOKIE_DOMAIN && isProduction) {
    cookieOptions.domain = COOKIE_DOMAIN;
  }

  cookieStore.set(cookieOptions);
}
