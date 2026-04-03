import { useMemo } from "react";
import { TrendingUp, TrendingDown, Award, PiggyBank, Target, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatCurrency, getMonthlyData, getCategoryBreakdown, computeSummary } from "../utils/helpers";
import { MonthlyBarChart } from "../components/Charts";
import { CATEGORY_COLORS } from "../data/mockData";

function InsightCard({ icon: Icon, title, value, sub, accent, delay }) {
  return (
    <div className={`card animate-in stagger-${delay}`} style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accent + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={accent} />
        </div>
        <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</span>
      </div>
      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: "var(--text-primary)", marginBottom: 4 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>{sub}</p>}
    </div>
  );
}

export default function Insights() {
  const { state } = useApp();
  const { transactions } = state;

  const { income, expenses, balance } = useMemo(() => computeSummary(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  const topCategory = categoryData[0];
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
  const avgMonthlyExpense = monthlyData.length
    ? (monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length).toFixed(0)
    : 0;

  const lastTwo = monthlyData.slice(-2);
  const momChange = lastTwo.length === 2
    ? (((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100).toFixed(1)
    : null;

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 4 }}>Insights</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>Understand your financial patterns</p>
      </div>

      {/* Insight Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <InsightCard icon={Award} title="Top Spending Category"
          value={topCategory?.name || "—"}
          sub={topCategory ? `${formatCurrency(topCategory.value)} total` : "No data"}
          accent={CATEGORY_COLORS[topCategory?.name] || "#636e72"} delay={1} />

        <InsightCard icon={PiggyBank} title="Savings Rate"
          value={`${savingsRate}%`}
          sub={balance >= 0 ? `${formatCurrency(balance)} saved overall` : "Spending exceeds income"}
          accent={savingsRate >= 20 ? "#00ff87" : "#ffd32a"} delay={2} />

        <InsightCard icon={Target} title="Avg Monthly Expense"
          value={formatCurrency(Number(avgMonthlyExpense))}
          sub="Based on all recorded months"
          accent="#3d8bff" delay={3} />

        <InsightCard
          icon={momChange !== null && Number(momChange) > 0 ? TrendingUp : TrendingDown}
          title="Month-on-Month Change"
          value={momChange !== null ? `${momChange > 0 ? "+" : ""}${momChange}%` : "—"}
          sub={momChange !== null
            ? `Expenses vs previous month`
            : "Need at least 2 months of data"}
          accent={momChange === null ? "#636e72" : Number(momChange) > 0 ? "#ff4757" : "#00ff87"}
          delay={4} />
      </div>

      {/* Monthly Bar Chart */}
      <MonthlyBarChart data={monthlyData} />

      {/* Category Breakdown Table */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
          Category Breakdown
        </h3>
        {categoryData.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "24px 0", fontSize: 13 }}>No expense data yet</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {categoryData.map(cat => {
              const pct = expenses > 0 ? (cat.value / expenses) * 100 : 0;
              return (
                <div key={cat.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: CATEGORY_COLORS[cat.name] || "#636e72", display: "inline-block" }} />
                      {cat.name}
                    </span>
                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13 }}>
                      {formatCurrency(cat.value)}
                      <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 11, marginLeft: 8 }}>({pct.toFixed(1)}%)</span>
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 3, width: `${pct}%`,
                      background: CATEGORY_COLORS[cat.name] || "#636e72",
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Smart Observation */}
      {savingsRate > 0 && (
        <div className="card animate-in" style={{
          padding: 20, borderColor: "#00ff8733",
          display: "flex", alignItems: "flex-start", gap: 14,
        }}>
          <AlertCircle size={18} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
              💡 Smart Observation
            </p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {savingsRate >= 30
                ? `Excellent! You're saving ${savingsRate}% of your income. That's above the recommended 20% threshold. Keep it up!`
                : savingsRate >= 20
                  ? `Good job saving ${savingsRate}% of your income. You're meeting the recommended savings benchmark.`
                  : savingsRate >= 10
                    ? `You're saving ${savingsRate}% of your income. Try to push towards 20% by reducing spending in ${topCategory?.name || "your top category"}.`
                    : `Your savings rate of ${savingsRate}% is below the healthy 20% threshold. Consider reviewing your ${topCategory?.name || "spending"} habits.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
