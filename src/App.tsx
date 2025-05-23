import React from 'react';
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
  // Simplified routing for the demo
  const path = window.location.pathname;
  
  const renderPage = () => {
    switch (path) {
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegistrationPage />;
      case '/forgot-password':
        return <ForgotPasswordPage />;
      case '/verification-status':
        return <VerificationStatusPage />;
      case '/profile-completion':
        return <ProfileCompletionPage />;
      case '/dashboard':
        // This would normally use proper auth checks
        return <BuyerDashboard />;
      case '/seller/dashboard':
        return <SellerDashboard />;
      default:
        return <LandingPage />;
    }
  };
  
  return (
    <QueryProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 mt-16">
            {renderPage()}
          </main>
          <MobileBottomNav />
        </div>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;