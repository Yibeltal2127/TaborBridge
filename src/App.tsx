import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerificationStatusPage from './pages/VerificationStatusPage';
import ProfileCompletionPage from './pages/ProfileCompletionPage';
import BuyerDashboard from './pages/dashboard/BuyerDashboard';
import SellerDashboard from './pages/dashboard/SellerDashboard';
import Header from './components/navigation/Header';
import MobileBottomNav from './components/navigation/MobileBottomNav';

function App() {
  return (
    <Router>
      <QueryProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mt-16">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verification-status" element={<VerificationStatusPage />} />
                <Route path="/profile-completion" element={<ProfileCompletionPage />} />
                <Route path="/dashboard" element={<BuyerDashboard />} />
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <MobileBottomNav />
          </div>
        </AuthProvider>
      </QueryProvider>
    </Router>
  );
}

export default App;