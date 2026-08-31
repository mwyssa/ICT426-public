import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import AccountsPage from "../pages/AccountsPage";
import TransactionsPage from "../pages/TransactionsPage";
import EnvelopesPage from "../pages/EnvelopesPage";
import BudgetStatsPage from "../pages/BudgetStatsPage";
import FamilyPage from "../pages/FamilyPage";
import SettingsPage from "../pages/SettingsPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
    return (
        <Routes>
            {/* Authentification */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Application */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/envelopes" element={<EnvelopesPage />} />
            <Route path="/budget-stats" element={<BudgetStatsPage />} />
            <Route path="/family" element={<FamilyPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

