import { useState } from "react";
import { Eye, EyeOff, Leaf, AlertCircle } from "lucide-react";
import { authenticate, DEMO_CREDENTIALS } from "@/lib/auth";
import { useSession } from "@/lib/session-context";
import { Colors } from "@/lib/theme";

export default function LoginPage() {
  const { setSession } = useSession();
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPwd]    = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    const session = authenticate(username, password);
    if (!session) {
      setError("Invalid username or password. Try a demo account below.");
      return;
    }
    setSession(session);
  };

  return (
    <div className="min-h-screen bg-app-bg flex flex-col overflow-y-auto">
      <div className="flex-1 flex flex-col px-5 pt-16 pb-8 max-w-sm mx-auto w-full">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            style={{ backgroundColor: Colors.primary }}
          >
            <Leaf size={32} color="white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Landscape CRM</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to continue</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4"
        >
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. admin"
              autoCapitalize="none"
              autoCorrect="off"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(null); }}
              className="border-2 border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Password
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-3.5 focus-within:border-primary transition-colors">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="flex-1 py-3 text-sm text-gray-900 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="p-1 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-1.5">
              <AlertCircle size={14} color={Colors.danger} />
              <span className="text-xs" style={{ color: Colors.danger }}>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="h-13 rounded-2xl text-white font-bold text-sm flex items-center justify-center transition-opacity disabled:opacity-60"
            style={{ backgroundColor: Colors.primary, height: 52 }}
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : "Sign In"}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Demo accounts</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {DEMO_CREDENTIALS.map((cred) => (
            <button
              key={cred.username}
              onClick={() => { setUsername(cred.username); setPassword(cred.password); setError(null); }}
              className="flex items-center justify-between bg-white rounded-2xl border-2 border-dashed border-gray-200 px-4 py-3 text-left"
            >
              <div>
                <p className="text-sm font-semibold text-gray-700">{cred.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cred.username} / {cred.password}</p>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: cred.role === "admin" ? "#2D5A3D18" : "#F5A62320",
                  color: cred.role === "admin" ? Colors.primary : Colors.accent,
                }}
              >
                {cred.role}
              </span>
            </button>
          ))}

          <p className="text-xs text-gray-400 text-center">
            Tap a demo account to pre-fill, then press Sign In.
          </p>
        </div>
      </div>
    </div>
  );
}
