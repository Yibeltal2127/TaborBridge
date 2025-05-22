import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import VerificationStatus from '../components/profile/VerificationStatus';

const VerificationStatusPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-16 mt-16">
        <VerificationStatus />
      </div>
      
      <Footer />
    </div>
  );
};

export default VerificationStatusPage;