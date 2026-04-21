import React, { useState, useEffect } from 'react';
import './App.css';
import DestinyCalculator from './components/DestinyCalculator';
import CompatibilityCalculator from './components/CompatibilityCalculator';
import { sanmeiAPI } from './api';

function App() {
  const [activeTab, setActiveTab] = useState('destiny');
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [backendError, setBackendError] = useState(null);

  // Check if backend is ready
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await sanmeiAPI.health();
        setIsBackendReady(true);
        setBackendError(null);
      } catch (error) {
        setIsBackendReady(false);
        setBackendError('Backend server is not running. Please start it first.');
        console.error('Backend check failed:', error);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📊 Sanmei Web - 算命学鑑定</h1>
        <p className="subtitle">四柱推命による宿命鑑定システム</p>

        {backendError && (
          <div className="alert alert-error">
            <strong>⚠️ {backendError}</strong>
          </div>
        )}
        {isBackendReady && (
          <div className="alert alert-success">
            ✅ Backend is ready
          </div>
        )}
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'destiny' ? 'active' : ''}`}
          onClick={() => setActiveTab('destiny')}
        >
          🎴 宿命表 (Destiny Table)
        </button>
        <button
          className={`tab-button ${activeTab === 'compatibility' ? 'active' : ''}`}
          onClick={() => setActiveTab('compatibility')}
        >
          💑 相性表 (Compatibility)
        </button>
      </nav>

      <main className="app-main">
        {!isBackendReady && (
          <div className="backend-notice">
            <h2>Backend서버 시작 필요</h2>
            <p>터미널에서 다음을 실행하세요:</p>
            <pre>
              cd backend
              <br />
              python3 -m venv venv
              <br />
              source venv/bin/activate
              <br />
              pip install -r requirements.txt
              <br />
              python app.py
            </pre>
          </div>
        )}

        {isBackendReady && (
          <>
            {activeTab === 'destiny' && <DestinyCalculator />}
            {activeTab === 'compatibility' && <CompatibilityCalculator />}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Sanmei Web v0.1.0 | Phase 1: Core Features</p>
      </footer>
    </div>
  );
}

export default App;
