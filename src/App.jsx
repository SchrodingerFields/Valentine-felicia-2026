import React, { useState, useEffect } from 'react';
import './App.css';

// --- Komponen Halaman Baru (Nanti bisa dipisah ke file Surprise.jsx) ---
const SurprisePage = () => {
  return (
    <div className="card-glass surprise-box">
      <h1>Yeay! Akhirnya sampai! 🎉</h1>
      <p>Ini web rahasia buat kamu.</p>
      <div className="gallery">
        {/* Contoh tempat foto nanti */}
        <div className="photo-placeholder"> Foto lucu</div>
      </div>
      <p className="love-note">
        "Tulisannya belum jadi."
      </p>
    </div>
  );
};

// --- Komponen Loading (Animasi Lucu) ---
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

// --- Komponen Utama ---
function App() {
  const [pageState, setPageState] = useState('home'); // 'home', 'loading', 'surprise'

  const handleStart = () => {
    setPageState('loading');
    
    // Simulasi loading selama 3 detik sebelum pindah halaman
    setTimeout(() => {
      setPageState('surprise');
    }, 3500);
  };

  return (
    <div className="container">
  {/* Background decoration tetap ada */}
  <div className="background-shapes">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="shape"></div>
    ))}
  </div>
  
  {/* TAMBAHKAN KODE DI BAWAH INI */}
  <div className="emoji-rain">
    {[...Array(20)].map((_, i) => (
      <span key={i} className="floating-emoji">
        {['🐱‍🚀', '🎉', '✨', '🌸', '🍭', '🎏'][i % 6]}
      </span>
    ))}
  </div>
  {/* SAMPAI SINI */}

  {/* Sisanya tetap sama (Logic Perpindahan Halaman) */}
      {/* Background decoration tetap ada */}
      <div className="background-shapes">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="shape"></div>
        ))}
      </div>

      {/* Logic Perpindahan Halaman */}
      {pageState === 'home' && (
        <div className="card-glass center-content fade-in">
          <div 
            className="main-icon pulse-animation" 
            onClick={handleStart}
          >
            📩
          </div>
          <h1 className="title">Surat Valentine</h1>
          <p className="hint">Klik surat untuk membuka</p>
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