import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import AccountsPage from '../pages/AccountsPage';
import TransactionsPage from '../pages/TransactionsPage';
import EnvelopesPage from '../pages/EnvelopesPage';
import FamilyPage from '../pages/FamilyPage';
import SettingsPage from '../pages/SettingsPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/envelopes" element={<EnvelopesPage />} />
      <Route path="/family" element={<FamilyPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
