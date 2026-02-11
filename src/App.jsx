import React, { useState, useEffect } from 'react';
import './App.css';
import SurprisePage from './surprise';

// --- loading screen ---
const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="heart-loader">
        <div className="heart-icon">🎈</div>
      </div>
      <p className="loading-text">Tunggu sebentar ya, lagi loading...</p>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

// --- komponen Utama ---
function App() {
  const [pageState, setPageState] = useState('home'); 

  const handleStart = () => {
    setPageState('loading');
    
    // loading 3 detik sblm pindah halaman
    setTimeout(() => {
      setPageState('surprise');
    }, 3500);
  };

  return (
    <div className="container">
  {/* background decoration tetap ada */}
  <div className="background-shapes">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="shape"></div>
    ))}
  </div> 
  
  {/* kode tambahan kalo masih ada ide */}
  <div className="emoji-rain">
    {[...Array(20)].map((_, i) => (
      <span key={i} className="floating-emoji" style={{ '--i': i, left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`}}>
        {['🎏', '🎉', '🍫', '🌸', '🍭', '💐', '💌'][i % 6]}
      </span>
    ))}
  </div>
  {/* sampe sini aja */}

  {/* sisanya tetap sama (logic Perpindahan Halaman) */}
      {/* background decoration ttp ada */}
      <div className="background-shapes">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="shape"></div>
        ))}
      </div>

      {/* logic Perpindahan Halaman */}
      {pageState === 'home' && (
        <div className="card-glass center-content fade-in">
          <div 
            className="main-icon pulse-animation" 
            onClick={handleStart}
          >
            📩
          </div>
          <h1 className="title">Surat Valentine</h1>
          <p className="hint">Klik surat untuk membuka isinya</p>
        </div>
      )}

      {pageState === 'loading' && (
        <div className="fade-in">
          <LoadingScreen />
        </div>
      )}

      {pageState === 'surprise' && (
        <div className="fade-in">
          <SurprisePage />
        </div>
      )}
    </div>
  );
}

export default App;