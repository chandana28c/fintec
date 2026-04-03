import { Sun, Moon, LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { state, dispatch } = useApp();

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { id: "insights", label: "Insights", icon: Lightbulb },
  ];

  return (
    <nav style={{
      background: "var(--bg-secondary)",
      borderBottom: "1px solid var(--border)",
      position: "sticky", top: 0, zIndex: 100,
      padding: "0 24px",
      display: "flex", alignItems: "center", gap: 0,
      height: 64,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 40 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "var(--accent-green)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, color: "#000"
        }}>₹</div>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>
          FinTrack
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, flex: 1 }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => dispatch({ type: "SET_TAB", payload: id })}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
              fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
              background: state.activeTab === id ? "var(--accent-green)" : "transparent",
              color: state.activeTab === id ? "#000" : "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}>
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Role Switcher */}
        <select
          value={state.role}
          onChange={e => dispatch({ type: "SET_ROLE", payload: e.target.value })}
          style={{
            background: "var(--bg-card)", color: "var(--text-primary)",
            border: "1px solid var(--border)", borderRadius: 8,
            padding: "6px 12px", fontSize: 13, fontFamily: "DM Mono, monospace",
            cursor: "pointer", outline: "none",
          }}>
          <option value="viewer">👁 Viewer</option>
          <option value="admin">⚙ Admin</option>
        </select>

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch({ type: "SET_THEME", payload: state.theme === "dark" ? "light" : "dark" })}
          style={{
            width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)",
            background: "var(--bg-card)", color: "var(--text-secondary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s ease",
          }}>
          {state.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}
