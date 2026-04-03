import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import SummaryCards from "../components/SummaryCards";
import { BalanceTrendChart, SpendingPieChart } from "../components/Charts";
import { computeSummary, getMonthlyData, getCategoryBreakdown, formatCurrency, formatDate } from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";

export default function Dashboard() {
  const { state } = useApp();
  const { transactions } = state;

  const { income, expenses, balance } = useMemo(() => computeSummary(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const recent = useMemo(() => [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5), [transactions]);

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 4 }}>
          Overview
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
          Your financial summary at a glance
        </p>
      </div>

      <SummaryCards income={income} expenses={expenses} balance={balance} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <BalanceTrendChart data={monthlyData} />
        <SpendingPieChart data={categoryData} />
      </div>

      {/* Recent Transactions */}
      <div className="card animate-in" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
          Recent Transactions
        </h3>
        {recent.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "32px 0", fontSize: 13 }}>
            No transactions yet
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recent.map(t => (
              <div key={t.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 0", borderBottom: "1px solid var(--border)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: CATEGORY_COLORS[t.category] || "#636e72",
                    flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{t.description}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                      {t.category} · {formatDate(t.date)}
                    </p>
                  </div>
                </div>
                <span style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
                  color: t.type === "income" ? "var(--accent-green)" : "var(--accent-red)",
                }}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
