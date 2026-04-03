import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, Download, ArrowUpDown } from "lucide-react";
import { useApp } from "../context/AppContext";
import TransactionModal from "../components/TransactionModal";
import { formatCurrency, formatDate, exportCSV } from "../utils/helpers";
import { CATEGORIES, CATEGORY_COLORS } from "../data/mockData";

export default function Transactions() {
  const { state, dispatch } = useApp();
  const { transactions, filters, role } = state;
  const isAdmin = role === "admin";

  const [modal, setModal] = useState(null); // null | "add" | transaction object

  const filtered = useMemo(() => {
    let data = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (filters.type !== "all") data = data.filter(t => t.type === filters.type);
    if (filters.category !== "all") data = data.filter(t => t.category === filters.category);

    data.sort((a, b) => {
      if (filters.sortBy === "date") return filters.sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      if (filters.sortBy === "amount") return filters.sortOrder === "desc"
        ? b.amount - a.amount : a.amount - b.amount;
      return 0;
    });
    return data;
  }, [transactions, filters]);

  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      dispatch({ type: "SET_FILTER", payload: { sortOrder: filters.sortOrder === "desc" ? "asc" : "desc" } });
    } else {
      dispatch({ type: "SET_FILTER", payload: { sortBy: field, sortOrder: "desc" } });
    }
  };

  const inputStyle = {
    background: "var(--bg-card)", border: "1px solid var(--border)",
    color: "var(--text-primary)", borderRadius: 10, padding: "9px 14px",
    fontFamily: "DM Mono, monospace", fontSize: 13, outline: "none",
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 4 }}>Transactions</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>{filtered.length} records found</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost" onClick={() => exportCSV(filtered)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Download size={14} /> Export CSV
          </button>
          {isAdmin && (
            <button className="btn-primary" onClick={() => setModal("add")} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Plus size={14} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 16, marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input style={{ ...inputStyle, paddingLeft: 36, width: "100%" }}
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => dispatch({ type: "SET_FILTER", payload: { search: e.target.value } })} />
        </div>

        <select style={inputStyle} value={filters.type}
          onChange={e => dispatch({ type: "SET_FILTER", payload: { type: e.target.value } })}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select style={inputStyle} value={filters.category}
          onChange={e => dispatch({ type: "SET_FILTER", payload: { category: e.target.value } })}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        {/* Table Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isAdmin ? "1.5fr 2.5fr 1.2fr 1fr 1.2fr 100px" : "1.5fr 2.5fr 1.2fr 1fr 1.2fr",
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          gap: 12,
        }}>
          {[
            { label: "Date", field: "date" },
            { label: "Description", field: null },
            { label: "Category", field: null },
            { label: "Type", field: null },
            { label: "Amount", field: "amount" },
          ].map(({ label, field }) => (
            <span key={label} onClick={field ? () => toggleSort(field) : undefined}
              style={{
                fontSize: 11, textTransform: "uppercase", letterSpacing: 1,
                color: "var(--text-muted)", fontFamily: "DM Mono, monospace",
                cursor: field ? "pointer" : "default",
                display: "flex", alignItems: "center", gap: 4,
              }}>
              {label} {field && <ArrowUpDown size={11} />}
            </span>
          ))}
          {isAdmin && <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)" }}>Actions</span>}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
            No transactions match your filters
          </div>
        ) : (
          filtered.map((t, i) => (
            <div key={t.id} style={{
              display: "grid",
              gridTemplateColumns: isAdmin ? "1.5fr 2.5fr 1.2fr 1fr 1.2fr 100px" : "1.5fr 2.5fr 1.2fr 1fr 1.2fr",
              padding: "14px 20px", gap: 12,
              borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
              alignItems: "center",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg-card-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{formatDate(t.date)}</span>
              <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{t.description}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: CATEGORY_COLORS[t.category] || "#636e72", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{t.category}</span>
              </span>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-block",
                background: t.type === "income" ? "#00ff8722" : "#ff475722",
                color: t.type === "income" ? "var(--accent-green)" : "var(--accent-red)",
              }}>
                {t.type}
              </span>
              <span style={{
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
                color: t.type === "income" ? "var(--accent-green)" : "var(--accent-red)",
              }}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </span>
              {isAdmin && (
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setModal(t)} style={{
                    width: 30, height: 30, borderRadius: 7, border: "1px solid var(--border)",
                    background: "transparent", cursor: "pointer", color: "var(--text-secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}><Pencil size={12} /></button>
                  <button onClick={() => dispatch({ type: "DELETE_TRANSACTION", payload: t.id })} style={{
                    width: 30, height: 30, borderRadius: 7, border: "1px solid #ff475733",
                    background: "transparent", cursor: "pointer", color: "var(--accent-red)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}><Trash2 size={12} /></button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {modal && (
        <TransactionModal
          transaction={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
