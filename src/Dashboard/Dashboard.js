import React, { useState, useEffect } from 'react';
import { useRouter } from '../utils/useRouter';
import { useAuth } from '../contexts/AuthContext'; 
import { Lock } from 'lucide-react'; // <-- Import Lock icon
import { Background } from '../components/layout/Background';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { ProfilePage } from './DashboardPages/Profile/ProfilePage';
import { ProjectPage } from './DashboardPages/ProjectPage';
import { PerformancePage } from './DashboardPages/PerfomancePage';
import { PaymentPage } from './DashboardPages/PaymentPage/Index';
import { useProfileStore } from './DashboardPages/Profile/store/useProfileStore'; // <-- Import store

// --- Reusable Locked Screen Component ---
const LockedScreen = () => (
  <div className="flex flex-col items-center justify-center h-[70vh] bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 text-center">
    <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
      <Lock className="w-10 h-10 text-purple-400" />
    </div>
    <h2 className="text-3xl font-bold text-white mb-3">Access Restricted</h2>
    <p className="text-gray-400 max-w-md mx-auto">
      Please submit your profile, complete your W-9 Tax Compliance form and choose a payment method to unlock this page.
    </p>
  </div>
);

export default function Dashboard() {
  const { currentPath, navigate } = useRouter();
  const { logout } = useAuth(); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userData, setUserData] = useState(null);

  // <-- Pull status from your global store
  const { userStatus } = useProfileStore(); 
  
  // Define the unlock logic:
  const isProfileComplete = userStatus?.profileComplete;
  const isTaxSubmitted = ['pending', 'verified', 'success'].includes(userStatus?.taxStatus);
  const isLocked = !(isProfileComplete && isTaxSubmitted);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.navigate = navigate;
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://the-king-backend-cutd.onrender.com/api/user/me', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/profile':
        return <ProfilePage />;
      case '/project':
        // Block Access
        return isLocked ? <LockedScreen /> : <ProjectPage />;
      case '/performance':
        // Block Access
        return isLocked ? <LockedScreen /> : <PerformancePage />;
      case '/payment':
        // Pass the lock state down to the Payment Page to handle sub-tabs
        return <PaymentPage isLocked={isLocked} />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Background mousePosition={mousePosition} />
      <div className="relative z-10 flex h-screen">
       <Sidebar 
          currentPath={currentPath} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          userData={userData}        
          onLogout={handleLogout}    
        />
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <Header 
            currentPath={currentPath} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            userData={userData}
            onLogout={handleLogout}
          />
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="transition-all duration-500 ease-in-out">
              {renderCurrentPage()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}