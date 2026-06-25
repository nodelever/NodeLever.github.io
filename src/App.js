// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

import Home from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LangwageLogin from './pages/LoginPage';
// import BlogPage from './pages/BlogPage';
import LangwageRegistration from './pages/RegistrationPage';
import LangwageDashboard from './Dashboard/Dashboard';
import EmailVerified from './components/sections/EmailVerified';

// 1. Import the new Project List and Detail components instead of the single ProjectsPage
import ProjectsList from './pages/ProjectsList';
import ProjectDetail from './pages/ProjectDetail';
import JobsPage from './pages/JobsPage';

// Import the legal pages
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return user?.isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavAndFooterOnRoutes = ['/login', '/reg', '/dash', '/email-verified'];

  const shouldShowNavigation = !hideNavAndFooterOnRoutes.includes(location.pathname);
  const shouldShowFooter = !hideNavAndFooterOnRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {shouldShowNavigation && <Navigation />}
      
      <main className="flex-grow bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
        

          {/* 2. New Dynamic Project Routes */}
          <Route path="/project" element={<ProjectsList />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/jobs" element={<JobsPage />} />

          {/* Legal Routes */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* Public Routes */}
          <Route path="/login" element={<LangwageLogin />} />
          <Route path="/reg" element={<LangwageRegistration />} />
          <Route path="/email-verified" element={<EmailVerified />} />

          {/* Protected Route - Only logged in users */}
          <Route
            path="/dash/*"
            element={
              <PrivateRoute>
                <LangwageDashboard />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4 text-white">404 - Page Not Found</h1>
                  <p className="text-gray-400">The page you're looking for doesn't exist.</p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      {shouldShowFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider> 
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;