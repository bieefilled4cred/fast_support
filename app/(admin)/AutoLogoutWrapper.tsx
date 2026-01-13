"use client";

import { useAutoLogout } from "../hooks/auto-logout";

export default function AutoLogoutWrapper() {
  useAutoLogout();
  return null;
}
