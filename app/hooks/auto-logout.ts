import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "../query-options/authenticationQueryOption";
import { toast } from "sonner";
import { useUserStore } from "../store/userStore";

const AUTO_LOGOUT_TIME = 5 * 60 * 1000;

export const useAutoLogout = () => {
  const router = useRouter();
  const clearUser = useUserStore(state => state.clearUser);
  const { mutate: logoutMutation } = useLogoutMutation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(() => {
    logoutMutation(undefined, {
      onSuccess: () => {
        clearUser();
        toast.warning("Session expired. Please login again.");
        router.push("/login");
      },
      onError: () => {
        clearUser();
        router.push("/login");
      },
    });
  }, [logoutMutation, clearUser, router]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, AUTO_LOGOUT_TIME);
  }, [handleLogout]);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    resetTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleActivity, resetTimer]);
};
