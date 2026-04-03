# 💰 FinTrack — Finance Dashboard

A clean, interactive personal finance dashboard built for the **Zorvyn Frontend Developer Internship** assignment. Track income and expenses, explore transactions, understand spending patterns, and switch between simulated user roles — all in a polished, responsive UI.

---

## 🚀 Live Demo

> [Add your deployment link here — Vercel / Netlify]

## 📁 Repository

[https://github.com/chandana28c/Finance_Dashboard](https://github.com/chandana28c/Finance_Dashboard)

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 + CSS Variables |
| Charts | Recharts |
| Icons | Lucide React |
| State Management | React Context API + useReducer |
| Data Persistence | localStorage |
| Data | Static mock data (60 transactions, 6 months) |
| Fonts | Syne (headings) + DM Mono (body) |

---

## ✨ Features

### 1. Dashboard Overview
- Summary Cards — Total Balance, Total Income, Total Expenses with animated reveal
- Balance Trend Chart — Line chart comparing Income vs Expenses across months
- Spending Breakdown — Interactive donut chart categorising expenses
- Recent Transactions — 5 latest entries at a glance

### 2. Transactions Section
- Full transaction list: Date, Description, Category, Type, Amount
- Search by description or category
- Filter by type (Income / Expense / All) and category
- Sort by date or amount (toggle asc/desc)
- CSV Export — download filtered transactions instantly

### 3. Role-Based UI (Simulated)
Switch roles via the dropdown in the top navigation bar.

| Role | Permissions |
|---|---|
| Viewer | Read-only — view all data, charts, and insights |
| Admin | Full access — add, edit, and delete transactions |

Role is persisted in localStorage across page refreshes.

### 4. Insights Section
- Top Spending Category with colour-coded indicator
- Savings Rate as a percentage of total income
- Average Monthly Expense across all recorded months
- Month-on-Month Change in expenses (% delta)
- Category Breakdown — visual progress bars per category
- Monthly Bar Chart — side-by-side income vs expense comparison
- Smart Observation — personalised saving tip based on your savings rate

### 5. State Management
All app state lives in a single React Context powered by useReducer:

| State Slice | What it holds |
|---|---|
| transactions | Full list of transaction objects |
| filters | search, type, category, sortBy, sortOrder |
| role | "viewer" or "admin" |
| theme | "dark" or "light" |
| activeTab | current page (dashboard / transactions / insights) |

All mutations are synced to localStorage immediately.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18 or above
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/chandana28c/Finance_Dashboard.git

# 2. Navigate into the project
cd Finance_Dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Top nav — tabs, role switcher, theme toggle
│   ├── SummaryCards.jsx      # Balance / Income / Expense stat cards
│   ├── Charts.jsx            # Line, Pie, and Bar chart components
│   └── TransactionModal.jsx  # Add / Edit transaction modal (Admin only)
├── context/
│   └── AppContext.jsx        # Global state — Context + useReducer + localStorage
├── data/
│   └── mockData.js           # 60 static mock transactions + category colors
├── pages/
│   ├── Dashboard.jsx         # Overview page
│   ├── Transactions.jsx      # Full CRUD table with filters
│   └── Insights.jsx          # Insights, charts, smart observation
├── utils/
│   └── helpers.js            # formatCurrency, chart data helpers, CSV export
├── App.jsx                   # Root component + page routing
├── main.jsx                  # React entry point
└── index.css                 # Design system — CSS variables, animations
```

---

## 🎭 How Role Switching Works

A Role dropdown sits in the top navbar. Selecting a role immediately changes UI behaviour:

- **Viewer** — Add/Edit/Delete controls are hidden. Read-only experience.
- **Admin** — "Add Transaction" button appears. Each row shows Edit and Delete icons.

Role is not secured — this is a frontend-only simulation for demonstration purposes.

---

## 🌟 Optional Enhancements Implemented

- [x] Dark / Light mode toggle
- [x] Data persistence via localStorage (transactions, role, theme)
- [x] CSV export of filtered transactions
- [x] Smooth staggered animations on card load
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Empty state handling when no transactions match filters

---

## 🎨 Design Decisions

- Dark-first design with a sharp green (#00ff87) accent — inspired by terminal / fintech aesthetics
- Syne (geometric sans) for headings — bold and distinctive
- DM Mono (monospace) for data — reinforces the financial/numerical feel
- CSS Variables for seamless dark/light switching with no flicker
- No UI component library — everything is hand-crafted

---

## 🧠 Assumptions

- All data is mock and static — no backend is required
- Currency is displayed in INR (₹)
- The app assumes a single user with one account
- Roles are frontend-only and carry no security implications

---

## 👤 Author

**Chandana L R**
chandanalr7899@gmail.com
Frontend Developer Intern — Zorvyn Assignment
