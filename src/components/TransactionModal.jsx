import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function TransactionModal({ transaction, onClose }) {
  const { dispatch } = useApp();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "Food",
    type: "expense",
    amount: "",
  });

  useEffect(() => {
    if (transaction) setForm(transaction);
  }, [transaction]);

  const handleSubmit = () => {
    if (!form.description || !form.amount) return alert("Please fill all fields");
    const payload = { ...form, amount: Number(form.amount), id: isEdit ? form.id : Date.now() };
    dispatch({ type: isEdit ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload });
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "var(--bg-primary)", border: "1px solid var(--border)",
    color: "var(--text-primary)", fontFamily: "DM Mono, monospace", fontSize: 13,
    outline: "none", transition: "border-color 0.2s",
  };

  const labelStyle = { fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: 0.5 };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000bb", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card" style={{ width: "100%", maxWidth: 480, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20 }}>
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="e.g. Grocery Shopping" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Type</label>
              <select style={inputStyle} value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value, category: e.target.value === "income" ? "Income" : form.category })}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Amount (₹)</label>
              <input type="number" style={inputStyle} value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" style={inputStyle} value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="btn-ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit} style={{ flex: 2 }}>
              {isEdit ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
