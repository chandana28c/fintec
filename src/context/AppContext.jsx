import { createContext, useContext, useReducer, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

const AppContext = createContext();

const initialState = {
  transactions: [],
  filters: { search: "", type: "all", category: "all", sortBy: "date", sortOrder: "desc" },
  role: "viewer",
  theme: "dark",
  activeTab: "dashboard",
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.payload };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "ADD_TRANSACTION": {
      const updated = [action.payload, ...state.transactions];
      localStorage.setItem("fd_transactions", JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case "EDIT_TRANSACTION": {
      const updated = state.transactions.map(t => t.id === action.payload.id ? action.payload : t);
      localStorage.setItem("fd_transactions", JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case "DELETE_TRANSACTION": {
      const updated = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem("fd_transactions", JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_ROLE":
      localStorage.setItem("fd_role", action.payload);
      return { ...state, role: action.payload };
    case "SET_THEME":
      localStorage.setItem("fd_theme", action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
      return { ...state, theme: action.payload };
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("fd_transactions");
    const savedRole = localStorage.getItem("fd_role");
    const savedTheme = localStorage.getItem("fd_theme") || "dark";

    document.documentElement.setAttribute("data-theme", savedTheme);

    dispatch({
      type: "INIT",
      payload: {
        transactions: savedTransactions ? JSON.parse(savedTransactions) : mockTransactions,
        role: savedRole || "viewer",
        theme: savedTheme,
      },
    });
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
