import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

function AppContent() {
  const { state } = useApp();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <main>
        {state.activeTab === "dashboard" && <Dashboard />}
        {state.activeTab === "transactions" && <Transactions />}
        {state.activeTab === "insights" && <Insights />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
