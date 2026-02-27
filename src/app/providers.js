"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import theme from "./theme";
import useAuthStore from "@/store/authStore";

function AuthSync({ children }) {
  const { data: session } = useSession();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (session?.accessToken) {
      setAuth(session.user, session.accessToken);
    } else {
      clearAuth();
    }
  }, [session, setAuth, clearAuth]);

  return children;
}

export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthSync>
            {children}
          </AuthSync>
        </ThemeProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}