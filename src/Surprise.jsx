import React, { useState } from 'react';
import './App.css'; 
import eminemImg from './assets/eminem.jpg';

// --- database buat quizznya ---
const questions = [
  {
    id: 1,
    question: "Apa makanan paling enak di blok M?",
    options: [
      { text: " Es krim macks🍦", isCorrect: false },
      { text: "Sate taichan depan plaza 🍢", isCorrect: true },
    ],
  },
  { id: 2, question: "Sekolah bosen nih, enaknya bolos kemana?", options: [{ text: "Tetep stay (anak rajin) 🏫", isCorrect: true }, { text: "bolos ke kebon pati 🌳", isCorrect: false }] },
  { id: 3, question: "Tralalelele tralala?", options: [{ text: "Gw dong 😇", isCorrect: true }, { text: "Lu lah 😤", isCorrect: false }] },
  { id: 4, question: "Apa yang lu lakukan kalo konser rumahsakit nanti?", options: [{ text: "Ikut crowd surf lahh 🌊", isCorrect: false }, { text: "Anteng manis di belakang aja 🌸", isCorrect: true }] },
  { id: 5, question: "Kalau liburan, dani lebih suka ke...", options: [{ text: "Pantai 🏖️", isCorrect: true }, { text: "Alas roban 🏔️", isCorrect: false }] },
  { id: 6, question: "Kalo jamkos, enaknya...", options: [{ text: "Bobo 😴", isCorrect: false }, { text: "Lempar kelengkeng 🍊", isCorrect: true }] },
  { id: 7, question: "Bu sally jahat apa baik?", options: [{ text: "Jahat 😈", isCorrect: false }, { text: "Baik 💕", isCorrect: true }] },
  { id: 8, question: "Band favorit kita apa?", options: [{ text: "Mocca 🎤", isCorrect: true }, { text: "dua orang di jalan 🎸", isCorrect: false }] },
  { id: 9, question: "Tanggal berapa kita ke planetarium?", options: [{ text: "28 Maret 📅", isCorrect: false }, { text: "Ga mau ke planetarium 🙅‍♀️", isCorrect: true }] },
  { id: 10, question: "Nbv kbej qbdbs hx hb? (+1 alfabet)", options: [{ text: "Hb 😜", isCorrect: false }, { text: "Zb! 😊", isCorrect: true }] },
];

const SurprisePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongEffect, setWrongEffect] = useState(false);
  
  // state buat nyimpen efek letupan
  const [bubbles, setBubbles] = useState([]);

  // fungsi buat bubble
  const createBubble = (x, y, isCorrect) => {
    const newBubble = {
      id: Date.now(),
      x: x,
      y: y,
      content: isCorrect ? '✅' : '❌', // emoji bener dapet centang, salah dapet silang
    };

    setBubbles((prev) => [...prev, newBubble]);

    // buat hapus bubble abis 1 detik (biar ga numpuk)
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, 1000);
  };

  const handleAnswer = (isCorrect, e) => {
    // buat panggil efek bubble pas di tursor
    // e.clientX dan e.clientY = koordinat 
    createBubble(e.clientX, e.clientY, isCorrect);

    if (isCorrect) {
      if (currentStep < questions.length - 1) {
        // delay buat animasi emoji benar salah
        setTimeout(() => setCurrentStep(currentStep + 1), 300); 
      } else {
        setIsFinished(true);
      }
    } else {
      setWrongEffect(true);
      setTimeout(() => setWrongEffect(false), 500);
    }
  };

  // --- logika progress ring ---
  const radius = 24; // jari jari lingkaran
  const circumference = 2 * Math.PI * radius; // Keliling lingkaran
  const progress = ((currentStep + 1) / questions.length) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // --- tampilan akhir ---
  if (isFinished) {
    return (
      <div className="card-glass surprise-box fade-in">
        <h1>Yeay! Lulus 100%! 🎉</h1>
        <p>Fiks 100% bisa ke Blok M. BTW selamat valentine yaa!!🎉</p>
        <div className="gallery">
          <div className="photo-placeholder">
          <img src={eminemImg} className='gambar-eminem' />
          </div>
        </div>
        <p>--- Web buatan Vaudi ---</p>
        <button className="btn-restart" onClick={() => window.location.reload()}>
          Ulangi Lagi ↺
        </button>
      </div>
    );
  }
  
  // --- tampilan quiz ---
  const currentQ = questions[currentStep];

  return (
    <div className={`card-glass quiz-box ${wrongEffect ? 'shake-animation' : ''}`}>
      
      {/* progress ring baru */}
      <div className="header-quiz">
        <div className="progress-ring-container">
          <svg height="60" width="60" className="progress-ring-svg">
            <circle
              className="progress-ring-bg"
              stroke="#ffe3e3"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="30"
              cy="30"
            />
            <circle
              className="progress-ring-fill"
              stroke="#ff6b81"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="30"
              cy="30"
              style={{ 
                strokeDasharray: `${circumference} ${circumference}`, 
                strokeDashoffset: strokeDashoffset 
              }}
            />
            <text x="30" y="34" className="progress-text" textAnchor="middle">
              {currentStep + 1}/{questions.length}
            </text>
          </svg>
        </div>
      </div>
      <h2 className="question-text fade-in-text">{currentQ.question}</h2>
      <div className="options-grid">
        {currentQ.options.map((option, index) => (
          <button 
            key={index}
            className="option-btn"
            // penting kirim e agar tahu posisi
            onClick={(e) => handleAnswer(option.isCorrect, e)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {wrongEffect && <p className="wrong-msg">salah wlee! 😜 Coba lagi makanya!</p>}

      {/* render bubbles diluar layout utama */}
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="floating-bubble"
          style={{ left: bubble.x, top: bubble.y }}
        >
          {bubble.content}
        </span>
      ))}
    </div>
  );
};

export default SurprisePage;