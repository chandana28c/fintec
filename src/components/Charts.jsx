import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { CATEGORY_COLORS } from "../data/mockData";
import { formatCurrency } from "../utils/helpers";

const tooltipStyle = {
  background: "var(--bg-card)", border: "1px solid var(--border)",
  borderRadius: 10, fontFamily: "DM Mono, monospace", fontSize: 12,
};

export function BalanceTrendChart({ data }) {
  return (
    <div className="card animate-in stagger-4" style={{ padding: 24 }}>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
        Balance Trend
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "DM Mono" }} />
          <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "DM Mono" }}
            tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip contentStyle={tooltipStyle} formatter={v => formatCurrency(v)} />
          <Line type="monotone" dataKey="income" stroke="#00ff87" strokeWidth={2} dot={{ fill: "#00ff87", r: 4 }} name="Income" />
          <Line type="monotone" dataKey="expenses" stroke="#ff4757" strokeWidth={2} dot={{ fill: "#ff4757", r: 4 }} name="Expenses" />
          <Line type="monotone" dataKey="balance" stroke="#3d8bff" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Balance" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingPieChart({ data }) {
  return (
    <div className="card animate-in stagger-5" style={{ padding: 24 }}>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
        Spending Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
            dataKey="value" nameKey="name" paddingAngle={3}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#636e72"} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={v => formatCurrency(v)} />
          <Legend iconType="circle" iconSize={8}
            formatter={v => <span style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "DM Mono" }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyBarChart({ data }) {
  return (
    <div className="card" style={{ padding: 24 }}>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
        Monthly Comparison
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "DM Mono" }} />
          <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "DM Mono" }}
            tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip contentStyle={tooltipStyle} formatter={v => formatCurrency(v)} />
          <Bar dataKey="income" fill="#00ff87" radius={[4, 4, 0, 0]} name="Income" />
          <Bar dataKey="expenses" fill="#ff4757" radius={[4, 4, 0, 0]} name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
