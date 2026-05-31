import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "/auth", withCredentials: true });

export default function App() {
  const [user, setUser]       = useState(null);
  const [view, setView]       = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if already logged in via cookie
  useEffect(() => {
    api.get("/me")
      .then(r => setUser(r.data.username))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = view === "login" ? "/login" : "/register";
      const res = await api.post(endpoint, { username, password });
      if (view === "register") {
        setView("login");
        setError("");
        setUsername("");
        setPassword("");
        return;
      }
      setUser(res.data.username);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.post("/logout");
    setUser(null);
    setUsername("");
    setPassword("");
  };

  if (checking) return null;

  if (user) {
    return (
      <div className="dashboard">
        <h1>🎉 Dashboard</h1>
        <p>You are logged in as</p>
        <p className="dashboard__user">@{user}</p>
        <p style={{ color: "#8b92b8", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
          Token stored in httpOnly cookie — safe from XSS.
        </p>
        <button className="btn btn--danger" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h1>{view === "login" ? "🔐 Sign In" : "📝 Register"}</h1>
      <p>{view === "login" ? "Welcome back" : "Create your account"}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="your_username" required autoFocus />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        {error && <p className="error-msg" role="alert">⚠️ {error}</p>}
        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "Please wait…" : view === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>
      <button className="link-btn" onClick={() => { setView(v => v === "login" ? "register" : "login"); setError(""); }}>
        {view === "login" ? "Don't have an account? Register" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
