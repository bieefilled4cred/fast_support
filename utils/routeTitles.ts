export const routeTitles: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Home",
  "/referral-analytics": "Referral Analytics",
  "/deposit-analytics": "Deposit Analytics",
  "/transactions": "Transactions",
  "/transactions/[id]": "Transaction Details",
  "/account-search": "Account Search",
  "/profile-search": "Profile Search",
  "/transaction-summary": "Transaction Summary",
  "/lab-check": "Lab Check",
  "/bvn-lookup": "Bvn LookUp",
  "/email-update": "Email Update",
  "/profile-activation": "Profile Activation",
  "/requery-vas": "Requery VAS",
  "/check-transaction": "Check Transaction",
  "/nip-status": "NIP Status",
  "/view-statements": "View Statements",
  "/settings/profile": "Profile",
  "/settings/security": "Security",
};

export const normalizeRoutePath = (pathname: string | null): string => {
  if (!pathname) {
    return "";
  }

  const segments = pathname.split("/");
  const normalizedSegments = segments.map((segment) => {
    if (!segment || segment === "[id]") {
      return segment;
    }

    if (
      /^[a-f0-9-]{20,}$/i.test(segment) ||
      segment.includes("@") ||
      segment.includes("%") ||
      (segment.length > 15 && !routeTitles[`/${segment}`])
    ) {
      return "[id]";
    }

    return segment;
  });

  return normalizedSegments.join("/");
};

export const getRouteTitle = (pathname: string | null): string => {
  if (!pathname) {
    return "Page";
  }

  const normalizedPath = normalizeRoutePath(pathname);

  return routeTitles[normalizedPath] || routeTitles[pathname] || "Page";
};
