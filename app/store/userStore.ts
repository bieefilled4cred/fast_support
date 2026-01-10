import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCookie, removeCookie, setCookie } from "../lib/utils/cookieStorage";

interface UserState {
  email: string | null;
  password: string | null;
  roles: string[];
  isNewUser: boolean;
  message: string;
  passwordResetToken: string | null;
  retrievalCode: string | null;
  otp: string | null;
  setUser: (user: {
    email: string;
    password: string;
    roles: string[];
    isNewUser: boolean;
    message: string;
  }) => void;
  setPasswordResetData: (data: {
    email: string;
    passwordResetToken: string;
    retrievalCode: string;
  }) => void;
  setOtp: (otp: string) => void;
  clearUser: () => void;
}

const COOKIE_NAME = "user-store-data";
const COOKIE_MAX_AGE = 60 * 10;

const cookieStorage = {
  getItem: () => {
    if (typeof window === "undefined") {
      return null;
    }
    const value = getCookie(COOKIE_NAME);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  },
  setItem: (_: string, value: unknown): void => {
    if (typeof window === "undefined") {
      return;
    }
    setCookie(COOKIE_NAME, JSON.stringify(value), { maxAge: COOKIE_MAX_AGE });
  },
  removeItem: (): void => {
    if (typeof window === "undefined") {
      return;
    }
    removeCookie(COOKIE_NAME);
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: null,
      password: null,
      roles: [],
      isNewUser: false,
      message: "",
      passwordResetToken: null,
      retrievalCode: null,
      otp: null,
      setUser: (user) => set({ ...user }),
      setPasswordResetData: (data) =>
        set({
          email: data.email,
          passwordResetToken: data.passwordResetToken,
          retrievalCode: data.retrievalCode,
        }),
      setOtp: (otp) => set({ otp }),
      clearUser: () => {
        set({
          email: null,
          password: null,
          roles: [],
          isNewUser: false,
          message: "",
          passwordResetToken: null,
          retrievalCode: null,
          otp: null,
        });
        cookieStorage.removeItem();
      },
    }),
    {
      name: "user-storage",
      storage: cookieStorage,
    }
  )
);
