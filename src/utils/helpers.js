export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const getMonthLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
};

export const computeSummary = (transactions) => {
  const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

export const getMonthlyData = (transactions) => {
  const map = {};
  transactions.forEach(t => {
    const key = getMonthLabel(t.date);
    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  return Object.values(map).map(m => ({ ...m, balance: m.income - m.expenses }));
};

export const getCategoryBreakdown = (transactions) => {
  const map = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const exportCSV = (transactions) => {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map(t => [t.date, t.description, t.category, t.type, t.amount]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
};
