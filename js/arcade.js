// Nexus Logistics Arcade - Gamified Micro-Learning Engine
// Week 1: Incoterms® 2020 Rapid Battle

(function () {
  'use strict';

  // Sound Engine (Web Audio API - 100% offline, zero lag)
  let audioCtx = null;
  let isMuted = localStorage.getItem('nexus_arcade_muted') === 'true';

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (isMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playSuccessSound() {
    playTone(523.25, 'triangle', 0.1, 0.12); // C5
    setTimeout(() => playTone(659.25, 'triangle', 0.1, 0.12), 80); // E5
    setTimeout(() => playTone(783.99, 'triangle', 0.2, 0.15), 160); // G5
  }

  function playErrorSound() {
    playTone(220, 'sawtooth', 0.2, 0.15); // A3
    setTimeout(() => playTone(180, 'sawtooth', 0.25, 0.18), 120);
  }

  function playFanfare() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.25, 0.2), i * 110);
    });
  }

  // Incoterms 2020 Rapid Battle Question Pool (12 Scenarios)
  const INCOTERMS_POOL = [
    {
      id: "fob_1",
      term: "FOB — Free On Board",
      ruleTag: "Ocean Freight • Origin Loading",
      scenario: "During loading at Colombo Port, a container slips from the crane spreader after crossing the ship's rail and crashes onto the deck. Who bears the cargo loss?",
      answer: "Buyer",
      explanation: "Under FOB, risk transfers from Seller to Buyer once the goods are loaded on board the vessel."
    },
    {
      id: "cif_1",
      term: "CIF — Cost, Insurance & Freight",
      ruleTag: "Ocean Freight • Mid-Voyage Storm",
      scenario: "A storm damages goods in the middle of the Indian Ocean during a voyage from Colombo to Singapore. Who carries the transit risk?",
      answer: "Buyer",
      explanation: "Under CIF, risk transfers to the Buyer at the origin port when loaded on the ship. The Seller buys insurance, but the cargo risk belongs to the Buyer."
    },
    {
      id: "exw_1",
      term: "EXW — Ex Works",
      ruleTag: "Factory Yard • Vehicle Loading",
      scenario: "Goods are damaged by a forklift while being loaded onto the collection truck inside the Seller's factory yard in Kandy. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under EXW, the Seller only makes goods available. Loading onto the truck is at the Buyer's risk and expense."
    },
    {
      id: "ddp_1",
      term: "DDP — Delivered Duty Paid",
      ruleTag: "Destination Customs • Import Sanction",
      scenario: "Cargo is seized and confiscated at Frankfurt Airport Customs due to an import clearance dispute before final delivery. Who bears the loss?",
      answer: "Seller",
      explanation: "Under DDP, the Seller assumes maximum obligation, including import clearance, duties, taxes, and all delivery risks."
    },
    {
      id: "dap_1",
      term: "DAP — Delivered at Place",
      ruleTag: "Destination Facility • Unloading Phase",
      scenario: "Goods arrive safely on the truck at the Buyer's warehouse in Dubai, but are dropped and broken during unloading by the Buyer's forklift. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under DAP, the Seller's delivery is complete when goods are ready for unloading. Unloading is at the Buyer's risk."
    },
    {
      id: "dpu_1",
      term: "DPU — Delivered at Place Unloaded",
      ruleTag: "Destination Terminal • Unloading Mishap",
      scenario: "A machinery crate breaks while the Seller's crane contractor is actively unloading it at the Rotterdam terminal. Who bears the loss?",
      answer: "Seller",
      explanation: "DPU is the ONLY Incoterm where the Seller is legally responsible for unloading the goods at the destination terminal."
    },
    {
      id: "fca_1",
      term: "FCA — Free Carrier (Seller's Factory)",
      ruleTag: "Seller's Premises • Outbound Loading",
      scenario: "The Seller's forklift drops a pallet while loading it onto the Buyer's arriving truck at the Seller's premises. Who bears the loss?",
      answer: "Seller",
      explanation: "Under FCA at the Seller's facility, the Seller is responsible for loading the goods onto the Buyer's carrier."
    },
    {
      id: "fca_2",
      term: "FCA — Free Carrier (Terminal)",
      ruleTag: "Carrier's Hub • Handover Stage",
      scenario: "The Seller's truck brings goods to the Colombo CFS terminal. While the terminal operators offload the cargo, it is damaged. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FCA away from the Seller's facility, delivery occurs when goods are at the disposal of the carrier on the Seller's truck, not yet unloaded."
    },
    {
      id: "cpt_1",
      term: "CPT — Carriage Paid To",
      ruleTag: "Multimodal • Transit Mishap",
      scenario: "Cargo is stolen from a container midway during transit between Colombo and Hamburg. Who carries the financial risk of this theft?",
      answer: "Buyer",
      explanation: "Under CPT, the Seller pays transport, but risk transfers to the Buyer as soon as goods are delivered to the FIRST carrier."
    },
    {
      id: "cip_1",
      term: "CIP — Carriage & Insurance Paid To",
      ruleTag: "Air Freight • In-Flight Incident",
      scenario: "A fire damages cargo during an air freight flight from Colombo to London Heathrow. Whose risk was the cargo during flight?",
      answer: "Buyer",
      explanation: "Under CIP, risk transfers when handed to the first carrier. (Seller provides ICC-A insurance, but the underlying transit risk is the Buyer's)."
    },
    {
      id: "fas_1",
      term: "FAS — Free Alongside Ship",
      ruleTag: "Quayside • Pre-Loading Surge",
      scenario: "Cargo placed on the quay alongside the vessel at Colombo Port is damaged by a freak tidal surge before loading begins. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FAS, risk transfers as soon as the goods are placed alongside the ship on the quay or barge."
    },
    {
      id: "cfr_1",
      term: "CFR — Cost & Freight",
      ruleTag: "Ocean Voyage • Sea Swell Incident",
      scenario: "Cargo washes overboard in rough seas in the Bay of Bengal under CFR Singapore. Who bears the financial loss?",
      answer: "Buyer",
      explanation: "Under CFR, risk transfers to the Buyer once the goods are on board the ship at the origin port."
    }
  ];

  // Game State
  let gameState = {
    active: false,
    questions: [],
    currentIndex: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    correctCount: 0,
    timerInterval: null,
    timeLeft: 5,
    totalTime: 5,
    userAnswers: []
  };

  function getArcadeStats() {
    try {
      return JSON.parse(localStorage.getItem('nexus_arcade_stats')) || {
        totalXp: 0,
        gamesPlayed: 0,
        incotermsHighScore: 0,
        bestCombo: 0,
        badges: []
      };
    } catch (e) {
      return { totalXp: 0, gamesPlayed: 0, incotermsHighScore: 0, bestCombo: 0, badges: [] };
    }
  }

  function saveArcadeStats(stats) {
    try {
      localStorage.setItem('nexus_arcade_stats', JSON.stringify(stats));
    } catch (e) {}
  }

  // Shuffle helper
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Render Arcade Lobby
  window.renderArcadeLobbyHTML = function () {
    const stats = getArcadeStats();
    return `
      <div class="arcade-lobby-wrapper" style="max-width: 1050px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Arcade Hero Banner -->
        <div class="arcade-hero" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); border-radius: 24px; padding: 32px 28px; color: #FFFFFF; margin-bottom: 30px; position: relative; overflow: hidden; box-shadow: 0 15px 35px rgba(15, 23, 42, 0.25);">
          <!-- Decorative Glow Accent -->
          <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,90,31,0.3) 0%, transparent 70%); border-radius: 50%;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; position: relative; z-index: 2;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 90, 31, 0.2); border: 1px solid rgba(255, 90, 31, 0.4); padding: 5px 14px; border-radius: 30px; margin-bottom: 12px;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #FF7A45; letter-spacing: 0.5px; text-transform: uppercase;">🕹️ NEXUS LOGISTICS ARCADE</span>
              </div>
              <h1 style="font-size: 2.1rem; font-family: 'Outfit', sans-serif; margin: 0 0 8px 0; font-weight: 800;">
                Master Freight in Minutes.
              </h1>
              <p style="color: #94A3B8; font-size: 0.95rem; margin: 0; max-width: 580px; line-height: 1.5;">
                Rapid interactive micro-games designed to test your split-second trade decisions, risk analysis, and dangerous goods compliance.
              </p>
            </div>

            <!-- Player Arcade Stats Pill -->
            <div style="background: rgba(255, 255, 255, 0.07); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 18px; padding: 16px 22px; display: flex; gap: 22px;">
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #FF7A45; font-family: 'Outfit', sans-serif;">${stats.totalXp}</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Total XP</div>
              </div>
              <div style="width: 1px; background: rgba(255,255,255,0.12);"></div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">${stats.incotermsHighScore}</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">High Score</div>
              </div>
              <div style="width: 1px; background: rgba(255,255,255,0.12);"></div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #4ADE80; font-family: 'Outfit', sans-serif;">${stats.bestCombo}x</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Best Combo</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Games Showcase -->
        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; margin: 0 0 18px 0; display: flex; align-items: center; justify-content: space-between;">
          <span>🎮 Weekly Game Zones</span>
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Week 1 Active • 4 Upcoming</span>
        </h3>

        <div class="arcade-games-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 20px; margin-bottom: 40px;">
          
          <!-- GAME 1: Incoterms Rapid Battle (ACTIVE) -->
          <div class="arcade-card-active" style="background: linear-gradient(145deg, #FFFFFF 0%, #FFF7ED 100%); border: 2.5px solid var(--accent-orange); border-radius: 20px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(255, 90, 31, 0.16); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 14px; right: 14px;">
              <span style="background: var(--accent-orange); color: #FFFFFF; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">🔥 WEEK 1 • LIVE</span>
            </div>

            <div>
              <div style="font-size: 2.5rem; margin-bottom: 12px;">🚢</div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 8px 0; font-size: 1.3rem; font-weight: 800;">
                Incoterms® Rapid Battle
              </h4>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0 0 18px 0; line-height: 1.5;">
                5-second flashcards. Who carries the loss? Test your split-second trade risk instincts under Incoterms® 2020.
              </p>
              <div style="display: flex; gap: 12px; font-size: 0.78rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 22px;">
                <span style="background: #FFEDD5; padding: 3px 8px; border-radius: 6px; color: #C2410C;">⏱️ 5s Timer</span>
                <span style="background: #EFF6FF; padding: 3px 8px; border-radius: 6px; color: #1D4ED8;">⚡ 10 Scenarios</span>
                <span style="background: #F0FDF4; padding: 3px 8px; border-radius: 6px; color: #15803D;">🔥 Combo XP</span>
              </div>
            </div>

            <button id="btn-launch-incoterms-game" class="btn btn-primary" style="width: 100%; padding: 14px; border-radius: 12px; font-weight: 800; font-size: 1rem; box-shadow: 0 6px 20px rgba(255,90,31,0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>🚀 Launch Rapid Battle</span>
            </button>
          </div>

          <!-- GAME 2: Logistics Career Ladder (WEEK 2 LOCKED) -->
          <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); border-radius: 20px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; opacity: 0.82; position: relative;">
            <div style="position: absolute; top: 14px; right: 14px;">
              <span style="background: #F1F5F9; color: #64748B; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">🔒 WEEK 2</span>
            </div>
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 12px;">🏆</div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 8px 0; font-size: 1.3rem; font-weight: 800;">
                Logistics Career Ladder
              </h4>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0 0 18px 0; line-height: 1.5;">
                Millionaire-style 10-tier ladder from Trainee to Global Tycoon with 'Ask Nexus AI' & '50:50' Lifelines.
              </p>
            </div>
            <button disabled style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; background: #F1F5F9; border: 1px solid #E2E8F0; color: #94A3B8; cursor: not-allowed;">
              🔒 Unlocks Next Week
            </button>
          </div>

          <!-- GAME 3: Port Inspector (WEEK 3 LOCKED) -->
          <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); border-radius: 20px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; opacity: 0.82; position: relative;">
            <div style="position: absolute; top: 14px; right: 14px;">
              <span style="background: #F1F5F9; color: #64748B; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">🔒 WEEK 3</span>
            </div>
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 12px;">🕵️‍♂️</div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 8px 0; font-size: 1.3rem; font-weight: 800;">
                Port Inspector Detective
              </h4>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0 0 18px 0; line-height: 1.5;">
                Inspect shipping docs (B/L, Invoice, Packing List) and catch cargo discrepancies before the timer expires.
              </p>
            </div>
            <button disabled style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; background: #F1F5F9; border: 1px solid #E2E8F0; color: #94A3B8; cursor: not-allowed;">
              🔒 Unlocks Week 3
            </button>
          </div>

        </div>

        <!-- Arcade Sound & Tips Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: var(--bg-white); border: 1px solid var(--border-color); border-radius: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-muted);">
            <span>💡 <strong>Pro Tip:</strong> Quick answers with active combos multiply your XP by up to 3x!</span>
          </div>
          <button id="btn-toggle-arcade-sound" style="background: #F8FAFC; border: 1px solid #CBD5E1; padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; color: var(--primary-navy); cursor: pointer;">
            ${isMuted ? '🔇 Sound: Off' : '🔊 Sound: On'}
          </button>
        </div>

      </div>
    `;
  };

  // Render Game Screen
  window.renderIncotermsGameHTML = function () {
    const q = gameState.questions[gameState.currentIndex];
    const progressPercent = ((gameState.currentIndex) / gameState.questions.length) * 100;
    
    return `
      <div class="incoterms-game-wrapper" style="max-width: 750px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Header Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 6px;">
            ← Exit to Arcade
          </button>
          <div style="display: flex; align-items: center; gap: 14px;">
            <div id="combo-pill" style="display: ${gameState.combo > 1 ? 'inline-block' : 'none'}; background: linear-gradient(135deg, #FF5A1F, #E11D48); color: #FFF; font-size: 0.78rem; font-weight: 900; padding: 3px 10px; border-radius: 12px; animation: pulse 1s infinite;">
              🔥 ${gameState.combo}x COMBO
            </div>
            <div style="font-size: 1.1rem; font-weight: 900; color: var(--accent-orange); font-family: 'Outfit', sans-serif;">
              ${gameState.score} XP
            </div>
          </div>
        </div>

        <!-- Question Progress Bar -->
        <div style="width: 100%; height: 6px; background: #E2E8F0; border-radius: 10px; margin-bottom: 24px; overflow: hidden;">
          <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #FF5A1F, #38BDF8); transition: width 0.3s ease;"></div>
        </div>

        <!-- Main Flashcard Container -->
        <div class="game-flashcard" id="game-flashcard" style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 32px 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); text-align: center; position: relative; margin-bottom: 25px; transition: all 0.25s ease;">
          
          <!-- Top Tags -->
          <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap;">
            <span style="background: #FFF7ED; color: #C2410C; border: 1px solid #FFEDD5; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
              ${q.term}
            </span>
            <span style="background: #F1F5F9; color: #475569; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
              ${q.ruleTag}
            </span>
            <span style="background: #EFF6FF; color: #1D4ED8; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px;">
              Scenario ${gameState.currentIndex + 1} of ${gameState.questions.length}
            </span>
          </div>

          <!-- Scenario Question Text -->
          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; line-height: 1.5; font-weight: 700; margin: 0 0 24px 0; min-height: 80px; display: flex; align-items: center; justify-content: center;">
            "${q.scenario}"
          </h2>

          <!-- Countdown Timer Bar -->
          <div style="max-width: 320px; margin: 0 auto 24px auto;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 800; margin-bottom: 6px;">
              <span style="color: var(--text-muted); text-transform: uppercase;">Time Left</span>
              <span id="timer-text" style="color: #FF5A1F; font-size: 0.9rem;">5.0s</span>
            </div>
            <div style="width: 100%; height: 8px; background: #F1F5F9; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0;">
              <div id="timer-bar" style="width: 100%; height: 100%; background: #10B981; transition: width 0.1s linear, background-color 0.3s ease;"></div>
            </div>
          </div>

          <!-- Action Buttons: [BUYER] vs [SELLER] -->
          <div id="action-buttons-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 10px;">
            <button class="btn-risk-choice" data-choice="Buyer" style="background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%); color: #FFFFFF; border: none; padding: 18px 24px; border-radius: 16px; font-weight: 800; font-size: 1.15rem; cursor: pointer; box-shadow: 0 6px 18px rgba(37, 99, 235, 0.28); transition: transform 0.15s ease, filter 0.2s ease;">
              👤 BUYER
            </button>
            <button class="btn-risk-choice" data-choice="Seller" style="background: linear-gradient(135deg, #EA580C 0%, #F97316 100%); color: #FFFFFF; border: none; padding: 18px 24px; border-radius: 16px; font-weight: 800; font-size: 1.15rem; cursor: pointer; box-shadow: 0 6px 18px rgba(249, 115, 22, 0.28); transition: transform 0.15s ease, filter 0.2s ease;">
              🚢 SELLER
            </button>
          </div>

          <!-- Result Popover / Rule Reveal Container -->
          <div id="rule-feedback-box" style="display: none; margin-top: 20px; padding: 16px; border-radius: 14px; text-align: left; animation: fadeIn 0.2s ease;">
          </div>

        </div>

      </div>
    `;
  };

  // Render Game Over Summary Screen
  window.renderIncotermsSummaryHTML = function () {
    const accuracy = Math.round((gameState.correctCount / gameState.questions.length) * 100);
    
    let rankBadge = "Logistics Apprentice 🥉";
    let badgeColor = "#64748B";
    if (accuracy === 100) {
      rankBadge = "Incoterms® Grandmaster 👑";
      badgeColor = "#FF5A1F";
    } else if (accuracy >= 80) {
      rankBadge = "Risk Assessment Specialist 🥇";
      badgeColor = "#10B981";
    } else if (accuracy >= 60) {
      rankBadge = "Cargo Operations Officer 🥈";
      badgeColor = "#3B82F6";
    }

    return `
      <div class="incoterms-summary-wrapper" style="max-width: 750px; margin: 0 auto; font-family: 'Inter', sans-serif; text-align: center;">
        
        <div style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 40px 30px; box-shadow: 0 15px 40px rgba(0,0,0,0.06); margin-bottom: 25px;">
          
          <div style="font-size: 3.5rem; margin-bottom: 12px;">🎉</div>
          
          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 2rem; margin: 0 0 6px 0; font-weight: 800;">
            Battle Complete!
          </h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0 0 25px 0;">
            Here is your Incoterms® 2020 risk assessment performance.
          </p>

          <!-- Achievement Badge Pill -->
          <div style="display: inline-block; background: #F8FAFC; border: 2px solid ${badgeColor}; padding: 8px 24px; border-radius: 30px; margin-bottom: 30px;">
            <span style="font-size: 1.05rem; font-weight: 900; color: ${badgeColor}; font-family: 'Outfit', sans-serif;">
              ${rankBadge}
            </span>
          </div>

          <!-- 3 Metrics Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 520px; margin: 0 auto 30px auto;">
            <div style="background: #FFF7ED; padding: 18px 10px; border-radius: 16px; border: 1px solid #FFEDD5;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #FF5A1F; font-family: 'Outfit', sans-serif;">+${gameState.score}</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #C2410C; text-transform: uppercase;">XP Earned</div>
            </div>
            <div style="background: #F0FDF4; padding: 18px 10px; border-radius: 16px; border: 1px solid #DCFCE7;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #10B981; font-family: 'Outfit', sans-serif;">${accuracy}%</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #15803D; text-transform: uppercase;">Accuracy (${gameState.correctCount}/${gameState.questions.length})</div>
            </div>
            <div style="background: #EFF6FF; padding: 18px 10px; border-radius: 16px; border: 1px solid #DBEAFE;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #2563EB; font-family: 'Outfit', sans-serif;">${gameState.maxCombo}x</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #1D4ED8; text-transform: uppercase;">Max Combo</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button id="btn-replay-game" class="btn btn-primary" style="padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; cursor: pointer;">
              🔄 Play Again
            </button>
            <button id="btn-return-arcade" class="btn btn-secondary" style="padding: 14px 28px; border-radius: 14px; font-weight: 700; font-size: 0.95rem; border: 1.5px solid var(--border-color); background: #FFF; cursor: pointer;">
              🕹️ Return to Arcade
            </button>
          </div>

        </div>

        <!-- Review Question Answers List -->
        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.25rem; margin: 0 0 16px 0; text-align: left;">
          📝 Scenario Review & Rules
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; text-align: left;">
          ${gameState.userAnswers.map((item, idx) => `
            <div style="background: var(--bg-white); border-left: 4px solid ${item.isCorrect ? '#10B981' : '#EF4444'}; border-radius: 12px; padding: 16px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.85rem; color: var(--primary-navy);">${idx + 1}. ${item.question.term}</span>
                <span style="font-size: 0.75rem; font-weight: 800; color: ${item.isCorrect ? '#10B981' : '#EF4444'};">
                  ${item.isCorrect ? '✓ CORRECT (+XP)' : '✗ INCORRECT / TIMEOUT'}
                </span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0 0 8px 0; line-height: 1.4;">${item.question.scenario}</p>
              <div style="font-size: 0.82rem; background: #F8FAFC; padding: 8px 12px; border-radius: 8px; color: var(--primary-navy);">
                <strong>Rule:</strong> ${item.question.explanation}
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  };

  // Launch Game
  window.startIncotermsBattle = function (renderCallback) {
    gameState.active = true;
    gameState.questions = shuffle(INCOTERMS_POOL).slice(0, 10); // Pick 10 fresh scenarios
    gameState.currentIndex = 0;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.correctCount = 0;
    gameState.userAnswers = [];
    clearInterval(gameState.timerInterval);

    renderCallback();
    startQuestionTimer(renderCallback);
  };

  function startQuestionTimer(renderCallback) {
    clearInterval(gameState.timerInterval);
    gameState.timeLeft = 5.0;
    const timerText = document.getElementById('timer-text');
    const timerBar = document.getElementById('timer-bar');

    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    gameState.timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      gameState.timeLeft = (remaining / 1000).toFixed(1);

      if (timerText) timerText.textContent = `${gameState.timeLeft}s`;
      if (timerBar) {
        const percent = (remaining / duration) * 100;
        timerBar.style.width = `${percent}%`;
        if (remaining <= 1500) {
          timerBar.style.backgroundColor = '#EF4444'; // Red alert
        } else if (remaining <= 3000) {
          timerBar.style.backgroundColor = '#F59E0B'; // Yellow warning
        } else {
          timerBar.style.backgroundColor = '#10B981'; // Green
        }
      }

      if (remaining <= 0) {
        clearInterval(gameState.timerInterval);
        handleAnswer(null, renderCallback); // Timeout
      }
    }, 50);
  }

  // Answer Handler
  window.handleIncotermsChoice = function (userChoice, renderCallback) {
    clearInterval(gameState.timerInterval);
    handleAnswer(userChoice, renderCallback);
  };

  function handleAnswer(userChoice, renderCallback) {
    const q = gameState.questions[gameState.currentIndex];
    const isCorrect = userChoice === q.answer;
    const choiceButtons = document.querySelectorAll('.btn-risk-choice');
    choiceButtons.forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.7';
      b.style.cursor = 'default';
    });

    const flashcard = document.getElementById('game-flashcard');
    const feedbackBox = document.getElementById('rule-feedback-box');

    let pointsEarned = 0;
    if (isCorrect) {
      gameState.combo += 1;
      if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
      const multiplier = gameState.combo >= 4 ? 3 : (gameState.combo >= 2 ? 2 : 1);
      pointsEarned = 50 * multiplier;
      gameState.score += pointsEarned;
      gameState.correctCount += 1;
      playSuccessSound();

      if (flashcard) {
        flashcard.style.borderColor = '#10B981';
        flashcard.style.boxShadow = '0 10px 35px rgba(16, 185, 129, 0.2)';
      }
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = '#ECFDF5';
        feedbackBox.style.border = '1.5px solid #10B981';
        feedbackBox.style.color = '#065F46';
        feedbackBox.innerHTML = `
          <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px;">
            🎉 Correct! (+${pointsEarned} XP ${multiplier > 1 ? `• ${multiplier}x Combo` : ''})
          </div>
          <div style="font-size: 0.85rem; line-height: 1.4;">
            ${q.explanation}
          </div>
        `;
      }
    } else {
      gameState.combo = 0;
      playErrorSound();

      if (flashcard) {
        flashcard.style.borderColor = '#EF4444';
        flashcard.style.boxShadow = '0 10px 35px rgba(239, 68, 68, 0.2)';
      }
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = '#FEF2F2';
        feedbackBox.style.border = '1.5px solid #EF4444';
        feedbackBox.style.color = '#991B1B';
        feedbackBox.innerHTML = `
          <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px;">
            ${userChoice ? '✗ Incorrect!' : '⏰ Time Out!'} Correct Answer: <strong>${q.answer.toUpperCase()}</strong>
          </div>
          <div style="font-size: 0.85rem; line-height: 1.4;">
            ${q.explanation}
          </div>
        `;
      }
    }

    gameState.userAnswers.push({
      question: q,
      userChoice,
      isCorrect,
      pointsEarned
    });

    // Auto-advance after 1.6s
    setTimeout(() => {
      gameState.currentIndex += 1;
      if (gameState.currentIndex >= gameState.questions.length) {
        finishGame(renderCallback);
      } else {
        renderCallback();
        startQuestionTimer(renderCallback);
      }
    }, 1600);
  }

  function finishGame(renderCallback) {
    clearInterval(gameState.timerInterval);
    gameState.active = false;
    playFanfare();

    // Persist Stats
    const stats = getArcadeStats();
    stats.totalXp += gameState.score;
    stats.gamesPlayed += 1;
    if (gameState.score > stats.incotermsHighScore) {
      stats.incotermsHighScore = gameState.score;
    }
    if (gameState.maxCombo > stats.bestCombo) {
      stats.bestCombo = gameState.maxCombo;
    }
    saveArcadeStats(stats);

    renderCallback('summary');
  }

  window.toggleArcadeSound = function () {
    isMuted = !isMuted;
    localStorage.setItem('nexus_arcade_muted', isMuted);
    return isMuted;
  };

})();

