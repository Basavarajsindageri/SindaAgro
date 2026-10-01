import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import AuthModal from './components/AuthModal';
import AddFarmModal from './components/AddFarmModal';
import SoilReportModal from './components/SoilReportModal';
import CinematicLoader from './components/CinematicLoader';
import AiAssistantWidget from './components/AiAssistant/AiAssistantWidget';

import DashboardPage from './pages/DashboardPage';
import FarmsPage from './pages/FarmsPage';
import SoilCheckPage from './pages/SoilCheckPage';
import BestCropPage from './pages/BestCropPage';
import AiAdvicePage from './pages/AiAdvicePage';
import WeatherPage from './pages/WeatherPage';
import MarketPricePage from './pages/MarketPricePage';
import FarmPlanPage from './pages/FarmPlanPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

import { LanguageProvider } from './context/LanguageContext';
import { api, getAuthToken, removeAuthToken } from './services/api';

import TechRecommendationPage from './pages/TechRecommendationPage';

function AppContent() {
  const [loadingApp, setLoadingApp] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [activeRoute, setActiveRoute] = useState('dashboard');
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false);
  const [isSoilModalOpen, setIsSoilModalOpen] = useState(false);

  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [masterDecision, setMasterDecision] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setCurrentUser({ username: 'farmer_user' });
      fetchFarms();
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.getFarmerProfile();
      if (res.data) setFarmerProfile(res.data);
    } catch (err) {
      console.warn('Profile fetch error:', err);
    }
  };

  const fetchFarms = async () => {
    try {
      const res = await api.getFarms();
      const farmData = res.data || [];
      setFarms(farmData);
      if (farmData.length > 0 && !selectedFarm) {
        setSelectedFarm(farmData[0]);
        loadDecision(farmData[0].id);
      }
    } catch (err) {
      console.warn('Error fetching farms:', err);
    }
  };

  const loadDecision = async (farmId) => {
    try {
      const res = await api.getMasterCropDecision(farmId, 'KHARIF');
      setMasterDecision(res.data);
    } catch (err) {
      setMasterDecision(null);
    }
  };

  const handleSelectFarm = (farm) => {
    setSelectedFarm(farm);
    loadDecision(farm.id);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    fetchFarms();
    fetchProfile();
  };

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
    setFarmerProfile(null);
  };

  const renderActiveRoute = () => {
    switch (activeRoute) {
      case 'dashboard':
        return (
          <DashboardPage
            farms={farms}
            selectedFarm={selectedFarm}
            onSelectFarm={handleSelectFarm}
            onOpenAddFarm={() => setIsAddFarmOpen(true)}
            onOpenSoilModal={(farm) => { setSelectedFarm(farm); setIsSoilModalOpen(true); }}
            masterDecision={masterDecision}
            onNavigate={(r) => setActiveRoute(r)}
          />
        );
      case 'farms':
        return (
          <FarmsPage
            farms={farms}
            selectedFarm={selectedFarm}
            onSelectFarm={handleSelectFarm}
            onOpenAddFarm={() => setIsAddFarmOpen(true)}
            onOpenSoilModal={(farm) => { setSelectedFarm(farm); setIsSoilModalOpen(true); }}
          />
        );
      case 'soil':
        return (
          <SoilCheckPage
            farm={selectedFarm || farms[0]}
            onOpenSoilModal={(farm) => { setSelectedFarm(farm); setIsSoilModalOpen(true); }}
          />
        );
      case 'bestCrop':
        return <BestCropPage masterDecision={masterDecision} />;
      case 'tech':
        return <TechRecommendationPage selectedFarm={selectedFarm} />;
      case 'aiAdvice':
        return <AiAdvicePage masterDecision={masterDecision} />;
      case 'weather':
        return <WeatherPage masterDecision={masterDecision} />;
      case 'market':
        return <MarketPricePage masterDecision={masterDecision} />;
      case 'plan':
        return <FarmPlanPage masterDecision={masterDecision} />;
      case 'profile':
        return <ProfilePage onProfileUpdated={(prof) => setFarmerProfile(prof)} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardPage
            farms={farms}
            selectedFarm={selectedFarm}
            onSelectFarm={handleSelectFarm}
            onOpenAddFarm={() => setIsAddFarmOpen(true)}
            onOpenSoilModal={(farm) => { setSelectedFarm(farm); setIsSoilModalOpen(true); }}
            masterDecision={masterDecision}
            onNavigate={(r) => setActiveRoute(r)}
          />
        );
    }
  };

  if (loadingApp) {
    return <CinematicLoader onComplete={() => setLoadingApp(false)} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--page-bg)' }} className="app-main-layout">
      
      {/* Left Sidebar Navigation */}
      <div className="desktop-sidebar">
        <Sidebar activeRoute={activeRoute} onNavigate={(r) => setActiveRoute(r)} />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Floating Glass Header */}
        <Header 
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          farmerProfile={farmerProfile}
        />

        {/* Content Wrapper */}
        <main className="app-content-wrapper" style={{ flex: 1, padding: '32px 36px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {renderActiveRoute()}
        </main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(46, 191, 113, 0.25)', padding: '24px 36px', textAlign: 'center', fontSize: '0.85rem', color: '#94A3B8', background: '#0D1F17' }}>
          SINDAAGRO – AI-Powered Smart Agriculture &amp; 3D Crop Decision Platform © 2026. Built for Real Farmers.
        </footer>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav 
        activeRoute={activeRoute}
        onNavigate={(r) => setActiveRoute(r)}
        onOpenAddFarm={() => setIsAddFarmOpen(true)}
      />

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <AddFarmModal 
        isOpen={isAddFarmOpen}
        onClose={() => setIsAddFarmOpen(false)}
        onFarmCreated={(newFarm) => {
          fetchFarms();
          setSelectedFarm(newFarm);
          setIsSoilModalOpen(true);
        }}
        onNavigateToProfile={() => setActiveRoute('profile')}
      />

      <SoilReportModal 
        isOpen={isSoilModalOpen}
        onClose={() => setIsSoilModalOpen(false)}
        farm={selectedFarm}
        onReportSubmitted={() => {
          if (selectedFarm) loadDecision(selectedFarm.id);
        }}
      />

      {/* Global AI RAG Voice & Chat Floating Assistant Widget */}
      <AiAssistantWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
