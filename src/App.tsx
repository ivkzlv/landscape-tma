import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { SessionProvider, useSession } from "@/lib/session-context";
import { useTelegram } from "@/hooks/useTelegram";
import LoginPage  from "@/pages/LoginPage";
import AdminApp   from "@/pages/admin/AdminApp";
import ClientApp  from "@/pages/client/ClientApp";

// ── Auth guard + Telegram init ────────────────────────────────────────────────

function AppRoutes() {
  const { session } = useSession();
  const navigate    = useNavigate();

  // Initialize Telegram WebApp
  useTelegram();

  // Redirect based on session role
  useEffect(() => {
    if (!session) {
      navigate("/login", { replace: true });
    } else if (session.role === "admin") {
      navigate("/admin",  { replace: true });
    } else {
      navigate("/client", { replace: true });
    }
  }, [session]);

  return (
    <Routes>
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/admin"  element={session?.role === "admin"  ? <AdminApp  /> : <Navigate to="/login" replace />} />
      <Route path="/client" element={session?.role === "user"   ? <ClientApp /> : <Navigate to="/login" replace />} />
      <Route path="*"       element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SessionProvider>
  );
}
