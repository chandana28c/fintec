import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/helpers";

function StatCard({ title, amount, icon: Icon, color, accent, delay }) {
  return (
    <div className={`card animate-in stagger-${delay}`} style={{ padding: 24, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: -20, right: -20, width: 100, height: 100,
        borderRadius: "50%", background: accent, opacity: 0.06,
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: "var(--text-secondary)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            {title}
          </p>
          <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 28, color }}>
            {formatCurrency(amount)}
          </p>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: accent + "22",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} color={accent} />
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards({ income, expenses, balance }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
      <StatCard title="Total Balance" amount={balance} icon={Wallet}
        color={balance >= 0 ? "var(--accent-green)" : "var(--accent-red)"}
        accent={balance >= 0 ? "#00ff87" : "#ff4757"} delay={1} />
      <StatCard title="Total Income" amount={income} icon={TrendingUp}
        color="var(--accent-green)" accent="#00ff87" delay={2} />
      <StatCard title="Total Expenses" amount={expenses} icon={TrendingDown}
        color="var(--accent-red)" accent="#ff4757" delay={3} />
    </div>
  );
}
