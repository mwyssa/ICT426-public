import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import AccountsPage from "../pages/AccountsPage";
import TransactionsPage from "../pages/TransactionsPage";
import EnvelopesPage from "../pages/EnvelopesPage";
import BudgetStatsPage from "../pages/BudgetStatsPage";
import FamilyPage from "../pages/FamilyPage";
import SettingsPage from "../pages/SettingsPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HomeRedirect from "./HomeRedirect";

import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
    return (
        <Routes>
            {/* Authentification */}
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Application */}
            {/* Pages protégées */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/accounts"
                element={
                    <ProtectedRoute>
                        <AccountsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/transactions"
                element={
                    <ProtectedRoute>
                        <TransactionsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/envelopes"
                element={
                    <ProtectedRoute>
                        <EnvelopesPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/budget-stats"
                element={
                    <ProtectedRoute>
                        <BudgetStatsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/family"
                element={
                    <ProtectedRoute>
                        <FamilyPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFoundPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

