// Nexus Logistics Arcade - Gamified Micro-Learning Engine
// 5 Interactive Maritime & Supply Chain Games (Simple English Edition)

(function () {
  'use strict';

  // =========================================================================
  // 5-THEME AUDIO SYNTHESIZER ENGINE (Custom BGM + SFX per Game Mode)
  // =========================================================================
  let audioCtx = null;
  let isMuted = localStorage.getItem('nexus_arcade_muted') === 'true';
  let bgmInterval = null;
  let bgmPlaying = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delaySec = 0) {
    if (isMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const startTime = audioCtx.currentTime + delaySec;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.01);
    } catch (e) {}
  }

  function playSweepTone(startFreq, endFreq, type = 'sine', duration = 0.25, gainVal = 0.12, delaySec = 0) {
    if (isMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const startTime = audioCtx.currentTime + delaySec;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), startTime + duration);
      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.01);
    } catch (e) {}
  }

  function playNoiseBurst(duration = 0.2, filterType = 'lowpass', filterFreq = 800, gainVal = 0.15, delaySec = 0) {
    if (isMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const startTime = audioCtx.currentTime + delaySec;
      const bufferSize = Math.floor(audioCtx.sampleRate * duration);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
      }
      const src = audioCtx.createBufferSource();
      src.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.setValueAtTime(filterFreq, startTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      src.start(startTime);
    } catch (e) {}
  }

  // Real Multi-Layer Bomb Detonation for DG HazMat Failure
  function playExplosionSound() {
    if (isMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;

      // 1. Sharp Initial Ignition Crack
      playSweepTone(520, 38, 'sawtooth', 0.16, 0.34, 0);
      playNoiseBurst(0.14, 'highpass', 900, 0.32, 0);

      // 2. Massive Chest-Thumping Sub-Bass Shockwave (1.6s boom)
      playSweepTone(72, 18, 'sine', 1.5, 0.45, 0.02);
      playSweepTone(54, 15, 'triangle', 1.65, 0.35, 0.04);

      // 3. Rolling Fireball Roar & Smoke Rumble (2.2s filtered noise)
      const roarDuration = 2.2;
      const bufferSize = Math.floor(audioCtx.sampleRate * roarDuration);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brownian/pink texture for heavy realistic explosion rumble
        lastOut = (lastOut + 0.06 * white) / 1.06;
        const env = Math.exp(-i / (audioCtx.sampleRate * 0.65));
        output[i] = (lastOut * 3.5 + white * 0.45) * env;
      }

      const roarSrc = audioCtx.createBufferSource();
      roarSrc.buffer = buffer;

      const roarFilter = audioCtx.createBiquadFilter();
      roarFilter.type = 'lowpass';
      roarFilter.Q.value = 1.4;
      roarFilter.frequency.setValueAtTime(2200, now);
      roarFilter.frequency.exponentialRampToValueAtTime(85, now + roarDuration);

      const roarGain = audioCtx.createGain();
      roarGain.gain.setValueAtTime(0.45, now);
      roarGain.gain.exponentialRampToValueAtTime(0.002, now + roarDuration);

      roarSrc.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(audioCtx.destination);
      roarSrc.start(now);

      // 4. Secondary Chemical Container Debris / Shrapnel Pops
      playNoiseBurst(0.12, 'bandpass', 1400, 0.18, 0.28);
      playNoiseBurst(0.15, 'bandpass', 950, 0.16, 0.52);
      playNoiseBurst(0.18, 'lowpass', 700, 0.14, 0.85);
      playSweepTone(160, 45, 'square', 0.22, 0.12, 0.42);
    } catch (e) {}
  }

  // Game-Specific Success SFX (Distinct per Game!)
  function playGameSuccessSound(gameKey) {
    if (gameKey === 'incoterms') {
      // Heavy Metallic Container Clank + Bright Maritime Triad
      playTone(300, 'square', 0.07, 0.08, 0);
      playTone(145, 'triangle', 0.12, 0.11, 0.03);
      playTone(523.25, 'triangle', 0.12, 0.13, 0.08);
      playTone(659.25, 'triangle', 0.12, 0.13, 0.15);
      playTone(783.99, 'triangle', 0.22, 0.15, 0.22);
    } else if (gameKey === 'ladder') {
      // Quiz-Show Golden Ascending Chord (raises slightly with step!)
      const boost = 1 + (gameState.currentIndex * 0.03);
      playTone(440 * boost, 'sine', 0.14, 0.12, 0);
      playTone(554.37 * boost, 'sine', 0.14, 0.12, 0.07);
      playTone(659.25 * boost, 'sine', 0.16, 0.13, 0.14);
      playTone(880 * boost, 'triangle', 0.32, 0.15, 0.21);
    } else if (gameKey === 'inspector') {
      // Heavy Customs Rubber Stamp THUMP + Bright Discovery Chime
      playSweepTone(140, 48, 'sine', 0.11, 0.22, 0);
      playNoiseBurst(0.06, 'lowpass', 500, 0.14, 0);
      playTone(880, 'sine', 0.12, 0.12, 0.1);
      playTone(1318.51, 'sine', 0.25, 0.14, 0.18);
    } else if (gameKey === 'hazmat') {
      // Pressurized Air-Lock Seal + Clean Safety Chime
      playNoiseBurst(0.14, 'bandpass', 2400, 0.1, 0);
      playTone(587.33, 'sine', 0.12, 0.12, 0.08);
      playTone(880, 'sine', 0.24, 0.14, 0.16);
    } else if (gameKey === 'dispatcher') {
      // Satellite Telemetry Lock & Crisp Confirmation Ping
      playTone(1046.5, 'sine', 0.07, 0.09, 0);
      playTone(1318.5, 'sine', 0.08, 0.09, 0.07);
      playTone(783.99, 'triangle', 0.2, 0.12, 0.15);
    }
  }

  // Game-Specific Error SFX (Distinct per Game!)
  function playGameErrorSound(gameKey) {
    if (gameKey === 'incoterms') {
      // Ocean Splash + Cargo Drop Horn
      playNoiseBurst(0.35, 'bandpass', 650, 0.2, 0);
      playSweepTone(210, 95, 'sawtooth', 0.28, 0.14, 0.05);
    } else if (gameKey === 'ladder') {
      // Quiz Show Dramatic Downward Fall Chord
      playTone(311.13, 'sawtooth', 0.18, 0.11, 0);
      playTone(277.18, 'sawtooth', 0.18, 0.11, 0.16);
      playTone(246.94, 'sawtooth', 0.35, 0.13, 0.32);
    } else if (gameKey === 'inspector') {
      // Subtle Paper Tap / Clean Field Reject Blip
      playTone(260, 'triangle', 0.09, 0.1, 0);
      playTone(195, 'triangle', 0.14, 0.1, 0.08);
    } else if (gameKey === 'hazmat') {
      // Industrial Chemical Klaxon Warning Siren + Acid Hiss
      playNoiseBurst(0.25, 'highpass', 1800, 0.14, 0);
      playTone(440, 'sawtooth', 0.14, 0.14, 0);
      playTone(310, 'sawtooth', 0.18, 0.15, 0.14);
      playTone(440, 'sawtooth', 0.18, 0.13, 0.32);
    } else if (gameKey === 'dispatcher') {
      // Low Command Radar Emergency Horn
      playTone(185, 'sawtooth', 0.22, 0.12, 0);
      playTone(138.59, 'sawtooth', 0.3, 0.14, 0.15);
    }
  }

  function playLifelineSound(type) {
    if (type === 'fiftyFifty') {
      playSweepTone(400, 950, 'sine', 0.2, 0.12, 0);
    } else if (type === 'aiClue') {
      playTone(660, 'sine', 0.08, 0.1, 0);
      playTone(880, 'sine', 0.08, 0.1, 0.07);
      playTone(1174.66, 'sine', 0.18, 0.12, 0.14);
    } else {
      // Divert swap mechanical swoosh
      playNoiseBurst(0.14, 'bandpass', 1200, 0.12, 0);
      playSweepTone(300, 620, 'triangle', 0.18, 0.12, 0.05);
    }
  }

  function playGameFanfare(gameKey) {
    if (gameKey === 'dispatcher') {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => playTone(f, 'triangle', 0.24, 0.14, i * 0.09));
    } else if (gameKey === 'ladder') {
      // Grand Tycoon Champion Brass Fanfare!
      const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.51];
      const delays = [0, 0.1, 0.2, 0.32, 0.48, 0.6, 0.78];
      notes.forEach((f, i) => playTone(f, 'triangle', i === notes.length - 1 ? 0.7 : 0.18, 0.16, delays[i]));
      playTone(523.25, 'sine', 0.75, 0.12, 0.78);
      playTone(783.99, 'sine', 0.75, 0.12, 0.78);
    } else {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, 'sine', 0.25, 0.16, i * 0.1));
    }
  }

  // 5 Completely Distinct Theme BGM Engines!
  function startArcadeBGM(gameKey = 'incoterms') {
    stopArcadeBGM();
    if (isMuted) return;
    initAudio();
    if (!audioCtx) return;

    bgmPlaying = true;
    let step = 0;

    if (gameKey === 'incoterms') {
      // 1. INCOTERMS: Fast Upbeat Maritime Arcade Groove (125ms)
      const bass = [110.0, 110.0, 130.81, 146.83, 110.0, 110.0, 98.0, 82.41];
      bgmInterval = setInterval(() => {
        if (isMuted || !bgmPlaying) return;
        playTone(bass[step % bass.length], 'triangle', 0.1, 0.024, 0);
        if (step % 2 === 1) playTone(980 + (step % 4) * 180, 'square', 0.03, 0.006, 0);
        step++;
      }, 125);

    } else if (gameKey === 'ladder') {
      // 2. CAREER LADDER: TV Quiz Show Suspense Heartbeat + Tension Pad (420ms)
      bgmInterval = setInterval(() => {
        if (isMuted || !bgmPlaying) return;
        const m = step % 4;
        if (m === 0) {
          playTone(65.41, 'sine', 0.18, 0.045, 0);      // Lub
          playTone(58.27, 'sine', 0.22, 0.035, 0.14);   // Dub
        }
        const padNotes = [220, 261.63, 293.66, 329.63];
        const tierBoost = 1 + (gameState.currentIndex * 0.025);
        playTone(padNotes[m] * tierBoost, 'sine', 0.35, 0.014, 0);
        step++;
      }, 420);

    } else if (gameKey === 'inspector') {
      // 3. PORT INSPECTOR: Stealth Detective Noir Walking Bass (220ms)
      const noirBass = [110, 0, 130.81, 146.83, 155.56, 0, 146.83, 130.81];
      bgmInterval = setInterval(() => {
        if (isMuted || !bgmPlaying) return;
        const note = noirBass[step % noirBass.length];
        if (note > 0) playTone(note, 'triangle', 0.18, 0.028, 0);
        if (step % 4 === 2) playNoiseBurst(0.03, 'highpass', 3000, 0.008, 0); // Soft brush snare
        if (step % 8 === 0) playTone(440, 'sine', 0.2, 0.01, 0);
        step++;
      }, 220);

    } else if (gameKey === 'hazmat') {
      // 4. DG HAZMAT: Industrial Chemical Lab Caution Pulse & Geiger Clicks (190ms)
      bgmInterval = setInterval(() => {
        if (isMuted || !bgmPlaying) return;
        const m = step % 8;
        if (m === 0 || m === 4) playTone(73.42, 'sawtooth', 0.12, 0.018, 0); // Low industrial drone
        if (m === 6) playTone(1240, 'sine', 0.06, 0.012, 0); // Caution monitor ping
        // Occasional Geiger counter tick
        if (step % 3 === 1) playTone(2600, 'square', 0.012, 0.005, 0);
        step++;
      }, 190);

    } else if (gameKey === 'dispatcher') {
      // 5. ROUTE DISPATCHER: Global Radar Control Room Sonar + Telemetry (250ms)
      bgmInterval = setInterval(() => {
        if (isMuted || !bgmPlaying) return;
        const m = step % 8;
        if (m === 0) {
          // Crisp Submarine/Maritime Radar Sonar Ping
          playTone(1174.66, 'sine', 0.45, 0.025, 0);
        }
        if (m % 2 === 0) {
          playTone(98.0, 'sine', 0.22, 0.02, 0); // Deep ops room hum
        } else {
          playTone(2100 + (m * 110), 'sine', 0.02, 0.005, 0); // Faint telemetry blip
        }
        step++;
      }, 250);
    }
  }

  function stopArcadeBGM() {
    bgmPlaying = false;
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  }

  // =========================================================================
  // GAME 1 DATA: Incoterms 2020 Rapid Battle (28 Simple English Scenarios)
  // =========================================================================
  const INCOTERMS_POOL = [
    {
      id: "fob_1",
      term: "FOB - Free On Board",
      ruleTag: "Ocean Freight • Ship Loading",
      scenario: "At Colombo Port, a container falls from the crane after it is placed on board the ship deck. Who pays for the damaged cargo?",
      answer: "Buyer",
      explanation: "Under FOB, risk moves from Seller to Buyer as soon as the goods are safely on board the ship."
    },
    {
      id: "cif_1",
      term: "CIF - Cost, Insurance & Freight",
      ruleTag: "Ocean Freight • Sea Storm",
      scenario: "A big storm damages cargo in the middle of the ocean on a trip from Colombo to Singapore. Who holds the risk?",
      answer: "Buyer",
      explanation: "Under CIF, risk passes to the Buyer at the loading port once goods are on the ship. Seller buys insurance, but the Buyer claims it."
    },
    {
      id: "exw_1",
      term: "EXW - Ex Works",
      ruleTag: "Factory Yard • Truck Loading",
      scenario: "Goods break when a forklift loads them onto the Buyer's truck inside the Seller's factory in Kandy. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under EXW, the Seller only keeps goods ready at the factory. Loading onto the truck is the Buyer's risk and job."
    },
    {
      id: "ddp_1",
      term: "DDP - Delivered Duty Paid",
      ruleTag: "Destination Customs • Import Problem",
      scenario: "Customs stops and holds cargo at Frankfurt Airport because of an unpaid import duty error before delivery. Who bears the loss?",
      answer: "Seller",
      explanation: "Under DDP, the Seller has full responsibility, including import customs clearance, taxes, and delivery risks."
    },
    {
      id: "dap_1",
      term: "DAP - Delivered at Place",
      ruleTag: "Buyer Warehouse • Unloading",
      scenario: "Goods arrive safely on the truck at the Buyer's warehouse in Dubai, but break while the Buyer's team unloads them. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under DAP, the Seller's delivery finishes when the truck arrives ready for unloading. Unloading is the Buyer's risk."
    },
    {
      id: "dpu_1",
      term: "DPU - Delivered at Place Unloaded",
      ruleTag: "Destination Terminal • Unloading",
      scenario: "A machine box drops and breaks while the Seller's crane team unloads it at the Rotterdam terminal. Who bears the loss?",
      answer: "Seller",
      explanation: "DPU is the ONLY rule where the Seller must unload the cargo at the destination place and takes the unloading risk."
    },
    {
      id: "fca_1",
      term: "FCA - Free Carrier (Seller's Factory)",
      ruleTag: "Seller Factory • Loading Truck",
      scenario: "The Seller's forklift drops a pallet while loading it onto the Buyer's truck at the Seller's factory gate. Who pays for the loss?",
      answer: "Seller",
      explanation: "Under FCA at the Seller's factory, the Seller is responsible for loading the goods onto the Buyer's truck."
    },
    {
      id: "fca_2",
      term: "FCA - Free Carrier (Port Terminal)",
      ruleTag: "Cargo Terminal • Handover",
      scenario: "The Seller's truck arrives at Colombo CFS terminal. While terminal workers unload it, the cargo breaks. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FCA away from the Seller's factory, delivery ends when the truck arrives at the terminal ready to be unloaded."
    },
    {
      id: "cpt_1",
      term: "CPT - Carriage Paid To",
      ruleTag: "Transit • Cargo Theft",
      scenario: "Goods are stolen from a container halfway between Colombo and Hamburg. Who carries the financial risk during transit?",
      answer: "Buyer",
      explanation: "Under CPT, the Seller pays the freight bill, but risk transfers to the Buyer once goods are given to the FIRST carrier."
    },
    {
      id: "cip_1",
      term: "CIP - Carriage & Insurance Paid To",
      ruleTag: "Air Freight • Flight Fire",
      scenario: "A fire damages air cargo during a flight from Colombo to London. Who carried the transit risk during the flight?",
      answer: "Buyer",
      explanation: "Under CIP, risk transfers when handed to the first air carrier. Seller pays for high-level insurance, which protects the Buyer."
    },
    {
      id: "fas_1",
      term: "FAS - Free Alongside Ship",
      ruleTag: "Port Quay • High Tide Wave",
      scenario: "Cargo placed on the port quay next to the ship in Colombo is ruined by a sudden sea wave before loading starts. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FAS, risk moves to the Buyer as soon as cargo is placed right next to the ship on the port quay."
    },
    {
      id: "cfr_1",
      term: "CFR - Cost & Freight",
      ruleTag: "Sea Voyage • Rough Waves",
      scenario: "A container washes off the ship into the Bay of Bengal during rough seas under CFR Singapore. Who carries the loss?",
      answer: "Buyer",
      explanation: "Under CFR, risk moves to the Buyer once the goods are loaded on board the vessel at the departure port."
    },
    {
      id: "fob_2",
      term: "FOB - Free On Board",
      ruleTag: "Port Crane • Broken Cable",
      scenario: "While lifting a container from the pier in Singapore, the crane cable snaps BEFORE it reaches the ship deck. Who bears the loss?",
      answer: "Seller",
      explanation: "Under FOB, the Seller keeps the risk until the container is actually loaded onto the vessel."
    },
    {
      id: "cif_2",
      term: "CIF - Cost, Insurance & Freight",
      ruleTag: "Sea Voyage • Water Damage",
      scenario: "Seawater enters the ship hold during a typhoon between Colombo and Sydney under CIF Sydney. Who bears the cargo loss?",
      answer: "Buyer",
      explanation: "Under CIF, the Buyer takes the risk at Colombo port and must claim from the insurance policy."
    },
    {
      id: "exw_2",
      term: "EXW - Ex Works",
      ruleTag: "Collection Delay • Warehouse Fire",
      scenario: "Goods are packed and waiting for pickup. The Buyer's truck is 5 days late, and a fire destroys the warehouse. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under EXW, once goods are ready and the Buyer delays collection, all loss risk belongs to the Buyer."
    },
    {
      id: "ddp_2",
      term: "DDP - Delivered Duty Paid",
      ruleTag: "Destination Port • Customs Fine",
      scenario: "A DDP New York shipment gets a heavy port fine because the import customs form was filed late. Who pays this penalty?",
      answer: "Seller",
      explanation: "Under DDP, the Seller handles and pays for all destination import customs clearance and delays."
    },
    {
      id: "dap_2",
      term: "DAP - Delivered at Place",
      ruleTag: "Factory Arrival • Fridge Failure",
      scenario: "A refrigerated container arrives at the Buyer's cold store in Paris under DAP. Before unloading starts, the cooler breaks. Who takes the loss?",
      answer: "Seller",
      explanation: "Under DAP, the Seller carries all risks until the goods are safely ready at the final place for unloading."
    },
    {
      id: "dpu_2",
      term: "DPU - Delivered at Place Unloaded",
      ruleTag: "Rail Terminal • Unloading Crash",
      scenario: "While the Seller's worker unloads heavy boxes at Munich terminal under DPU, a box drops and breaks. Who bears the loss?",
      answer: "Seller",
      explanation: "Under DPU, the Seller is responsible for unloading at the destination, so any damage during unloading is the Seller's loss."
    },
    {
      id: "fca_3",
      term: "FCA - Free Carrier (Airport)",
      ruleTag: "Airport Shed • Flood Damage",
      scenario: "Seller delivers cargo to the airline warehouse under FCA Colombo Airport. That night, the warehouse floods before takeoff. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FCA at the carrier's terminal, delivery ends once cargo is handed to the airline. Risk then belongs to the Buyer."
    },
    {
      id: "fca_4",
      term: "FCA - Free Carrier (Factory)",
      ruleTag: "Highway Transit • Truck Crash",
      scenario: "Goods are loaded onto the Buyer's truck at the Seller's factory in Gampaha. Later, the truck crashes on the highway. Who carries the loss?",
      answer: "Buyer",
      explanation: "Under FCA at the Seller's factory, risk passes to the Buyer right after the goods are loaded on the Buyer's truck."
    },
    {
      id: "cpt_2",
      term: "CPT - Carriage Paid To",
      ruleTag: "Air Transit • Wrong Flight",
      scenario: "Fresh flowers shipped under CPT Frankfurt spoil because the first airline sent them to the wrong city. Who carries transit risk?",
      answer: "Buyer",
      explanation: "Under CPT, the Buyer holds transit risk from the moment cargo is handed to the first airline."
    },
    {
      id: "cip_2",
      term: "CIP - Carriage & Insurance Paid To",
      ruleTag: "Insurance Cover • Missing Cargo",
      scenario: "Under CIP 2020 rules, cargo is stolen. The Seller only bought cheap basic insurance instead of full All-Risks (ICC-A) cover. Who is at fault?",
      answer: "Seller",
      explanation: "Incoterms 2020 strictly requires the Seller to buy full ICC (A) All-Risks insurance under CIP rules."
    },
    {
      id: "cfr_2",
      term: "CFR - Cost & Freight",
      ruleTag: "Sea Transit • Ship Crash",
      scenario: "Two cargo ships crash in the Malacca Strait under CFR Busan, destroying one container. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under CFR, the Seller pays the shipping fee, but risk transferred to the Buyer at the loading port."
    },
    {
      id: "fas_2",
      term: "FAS - Free Alongside Ship",
      ruleTag: "Port Quay • Truck Hit",
      scenario: "Cargo is waiting next to the ship on the port quay under FAS Colombo. A port vehicle hits and breaks it. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FAS, once cargo sits alongside the ship at the port, any damage is the Buyer's risk."
    },
    {
      id: "ddp_3",
      term: "DDP - Delivered Duty Paid",
      ruleTag: "Buyer Warehouse • Unloading Drop",
      scenario: "A truck arrives safely at the Buyer's warehouse in Toronto under DDP. The Buyer's staff drop a box while unloading. Who pays for it?",
      answer: "Buyer",
      explanation: "Even under DDP, unloading at the final warehouse is the Buyer's job and risk."
    },
    {
      id: "dap_3",
      term: "DAP - Delivered at Place",
      ruleTag: "Country Border • Missing License",
      scenario: "A truck under DAP Zurich is stopped at the border because the Buyer forgot to get an import license. Cargo spoils. Who carries the loss?",
      answer: "Buyer",
      explanation: "Under DAP, getting the import license is the Buyer's job. Losses from Buyer delays belong to the Buyer."
    },
    {
      id: "exw_3",
      term: "EXW - Ex Works",
      ruleTag: "Export Customs • Paperwork",
      scenario: "The Buyer asks the Seller to handle and clear export customs at Colombo Port under EXW. Whose legal job is export customs?",
      answer: "Buyer",
      explanation: "Under EXW, the Seller does NOT handle export customs. The Buyer must arrange export clearance."
    },
    {
      id: "cif_3",
      term: "CIF - Cost, Insurance & Freight",
      ruleTag: "Ship Fire • General Average",
      scenario: "A ship catches fire at sea under CIF Rotterdam, and the Captain declares General Average costs. Who is responsible for paying the cargo share?",
      answer: "Buyer",
      explanation: "Under CIF, the Buyer holds the cargo risk during the sea trip and pays the share (covered by cargo insurance)."
    }
  ];

  // =========================================================================
  // GAME 2 DATA: Logistics Career Ladder (10 Main + 10 Backup for Divert!)
  // =========================================================================
  const LADDER_QUESTIONS = [
    {
      tier: 1,
      rank: "Junior Trainee",
      question: "Which shipping document acts as a 'Document of Title' that lets you transfer ownership of sea cargo?",
      options: ["Air Waybill (AWB)", "Ocean Bill of Lading (B/L)", "Packing List", "Certificate of Origin"],
      answer: 1,
      aiHint: "Only an original Ocean shipping document can be endorsed to pass legal ownership of goods while on a ship."
    },
    {
      tier: 2,
      rank: "Wharf & Gate Officer",
      question: "In air freight billing, what number do you divide (Length x Width x Height in cm) by to find Volumetric Weight?",
      options: ["5,000", "6,000", "1,000", "3,333"],
      answer: 1,
      aiHint: "IATA standard air cargo rules divide cubic centimeters by 6,000 (whereas couriers like DHL often use 5,000)."
    },
    {
      tier: 3,
      rank: "Freight Operations Coordinator",
      question: "About how much cargo volume (in CBM) can fit inside one standard 20ft dry ocean container?",
      options: ["About 15 CBM", "About 33 CBM", "About 67 CBM", "About 85 CBM"],
      answer: 1,
      aiHint: "A 40ft container holds around 67 CBM, so a 20ft container holds roughly half of that (just over 30 CBM)."
    },
    {
      tier: 4,
      rank: "Documentation Specialist",
      question: "How many digits of an HS Code are the same across every country in the world?",
      options: ["First 4 digits", "First 6 digits", "First 8 digits", "First 10 digits"],
      answer: 1,
      aiHint: "The World Customs Organization keeps the first 6 numbers identical globally; countries only add extra digits after the 6th number."
    },
    {
      tier: 5,
      rank: "Sea & Air Freight Specialist",
      question: "Under Hague-Visby sea rules, what is the standard shipping line payout limit per kilogram of damaged cargo?",
      options: ["2.00 SDRs per kg", "17 SDRs per kg", "50 USD per kg", "Unlimited payout"],
      answer: 0,
      aiHint: "Sea carriers pay very little per kilo compared to air lines (Air is 22 SDRs, while Ocean is only 2.00 SDRs per kg)."
    },
    {
      tier: 6,
      rank: "Customs Broker & Compliance Lead",
      question: "In Dangerous Goods shipping, which IMDG Class covers Oxidizers and Organic Peroxides?",
      options: ["Class 2", "Class 5", "Class 7", "Class 9"],
      answer: 1,
      aiHint: "Class 2 is Gases, Class 7 is Radioactive, Class 9 is Miscellaneous, so look at the middle class starting with 5."
    },
    {
      tier: 7,
      rank: "Cold Chain & Reefer Manager",
      question: "Why do shipping lines use 'Cold Treatment' (keeping fruit near 0°C for 15+ days) in reefer containers?",
      options: ["To stop fish bacteria", "To kill fruit fly eggs without chemical sprays", "To freeze vaccines", "To stop metal rust"],
      answer: 1,
      aiHint: "Importing countries like the US and Australia require long cold storage to naturally kill insect pests inside fresh fruit."
    },
    {
      tier: 8,
      rank: "Chartering & Pricing Manager",
      question: "When a ship waits too long at a port beyond its allowed loading time, what penalty fee does the charterer pay the shipowner?",
      options: ["Despatch", "Deadfreight", "Demurrage", "Primage"],
      answer: 2,
      aiHint: "Despatch is a reward for finishing early, while Demurrage is the penalty fee for delaying the vessel."
    },
    {
      tier: 9,
      rank: "Supply Chain Director",
      question: "In Incoterms 2020, which is the ONLY rule where the Seller must unload the goods at the final place?",
      options: ["DDP", "DAP", "DPU", "FCA"],
      answer: 2,
      aiHint: "Check the letters in the rule name: look for the 'U' that stands for 'Unloaded'."
    },
    {
      tier: 10,
      rank: "Global Logistics Tycoon 👑",
      question: "When Asia-Europe ships skip the Suez Canal and sail around South Africa (Cape of Good Hope), how much time does it usually add?",
      options: ["About 2 days", "About 10 to 14 days", "About 30 days", "No extra time"],
      answer: 1,
      aiHint: "Sailing around Africa adds about 3,500 nautical miles, which delays vessels by roughly 1.5 to 2 weeks."
    }
  ];

  // Backup Questions when player uses "Divert" lifeline (Same tier difficulty!)
  const LADDER_BACKUP_QUESTIONS = [
    {
      tier: 1,
      rank: "Junior Trainee",
      question: "Which shipping document lists the exact weight, box count, and dimensions of every carton in a shipment?",
      options: ["Commercial Invoice", "Packing List", "Bill of Exchange", "Insurance Certificate"],
      answer: 1,
      aiHint: "This document does not show prices; it focuses purely on how the cargo is packed, counted, and weighed."
    },
    {
      tier: 2,
      rank: "Wharf & Gate Officer",
      question: "What does the abbreviation 'TEU' stand for in container shipping?",
      options: ["Total Export Unit", "Twenty-foot Equivalent Unit", "Terminal Entry Usage", "Transport Equipment Unit"],
      answer: 1,
      aiHint: "It is the global standard unit based on the length of a standard 20-foot shipping container."
    },
    {
      tier: 3,
      rank: "Freight Operations Coordinator",
      question: "What is 'LCL' in ocean freight shipping?",
      options: ["Large Cargo Load", "Less than Container Load", "Local Customs Limit", "Loaded Container Line"],
      answer: 1,
      aiHint: "You use this service when your shipment is too small to fill a whole container, so you share space with other shippers."
    },
    {
      tier: 4,
      rank: "Documentation Specialist",
      question: "Which document proves the country where the goods were manufactured or grown so buyers can get duty discounts?",
      options: ["Sea Waybill", "Certificate of Origin", "Delivery Order", "Mate's Receipt"],
      answer: 1,
      aiHint: "The name of this certificate literally refers to the 'origin' country where the product was made."
    },
    {
      tier: 5,
      rank: "Sea & Air Freight Specialist",
      question: "In ocean freight pricing, what does 'BAF' stand for?",
      options: ["Basic Air Freight", "Bunker Adjustment Factor", "Box Allocation Fee", "Border Arrival Fee"],
      answer: 1,
      aiHint: "Ships burn heavy fuel oil called 'bunker', so shipping lines add this extra charge when fuel prices go up."
    },
    {
      tier: 6,
      rank: "Customs Broker & Compliance Lead",
      question: "Which IMDG Dangerous Goods Class covers Flammable Liquids like paint thinner and petrol?",
      options: ["Class 1", "Class 3", "Class 6", "Class 8"],
      answer: 1,
      aiHint: "Class 1 is Explosives, Class 2 is Gases, and the third class covers Flammable Liquids."
    },
    {
      tier: 7,
      rank: "Cold Chain & Reefer Manager",
      question: "What does 'Pre-Trip Inspection (PTI)' mean for a refrigerated (reefer) container?",
      options: ["Checking cargo prices", "Testing the cooling motor and temperature sensors before loading", "Washing the truck tires", "Clearing import customs"],
      answer: 1,
      aiHint: "Shipping lines run this technical check on the empty reefer unit before giving it to the exporter to ensure it stays cold."
    },
    {
      tier: 8,
      rank: "Chartering & Pricing Manager",
      question: "What is 'Deadfreight' in vessel chartering?",
      options: ["Freight paid for spoiled food", "Money paid for ship space booked but left empty", "Port tax for old ships", "Extra crew salary"],
      answer: 1,
      aiHint: "If you book 5,000 tons of space on a ship but only load 4,000 tons, you still pay for the empty unused space."
    },
    {
      tier: 9,
      rank: "Supply Chain Director",
      question: "Which 2020 Incoterm puts the MINIMUM responsibility on the Seller (buyer picks up directly from seller's door)?",
      options: ["EXW", "FOB", "CIF", "DDP"],
      answer: 0,
      aiHint: "It starts with 'EX' because the goods are simply handed over at the seller's own factory or works."
    },
    {
      tier: 10,
      rank: "Global Logistics Tycoon 👑",
      question: "What is a 'Letter of Credit (L/C)' in international trade?",
      options: ["A freight invoice", "A bank guarantee ensuring the Seller gets paid if shipping documents are exact", "A shipping discount coupon", "A customs penalty notice"],
      answer: 1,
      aiHint: "Both the buyer's bank and seller's bank use this secure financial guarantee to protect payment during global trade."
    }
  ];

  // =========================================================================
  // GAME 3 DATA: Port Inspector Detective (10 Complete Cases - Structured)
  // =========================================================================
  const INSPECTOR_CASES = [
    {
      caseNo: 101,
      title: "Case #101: Weight Mismatch Alert",
      carrier: "MSC MEDITERRANEAN SHIPPING",
      docType: "OCEAN BILL OF LADING",
      docNumber: "MSCU-7489201",
      customsDecl: "Invoice #INV-880 and VGM Slip declare exactly 4,500.00 KG Gross Weight.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Lanka Garments (Pvt) Ltd, Colombo 03", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Hamburg Fashions GMBH, Germany", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo, Sri Lanka (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Hamburg, Germany (DEHAM)", isError: false },
      goodsFields: [
        { key: "packages", label: "Total Package Count", value: "150 Corrugated Cartons", isError: false },
        { key: "grossWeight", label: "Gross Weight (VGM)", value: "4,050.00 KG", isError: true, flawReason: "Weight mismatch! B/L shows 4,050 KG, while the Invoice & VGM slip show 4,500 KG (450 KG missing)." },
        { key: "sealNo", label: "Container Seal No", value: "SL-994821", isError: false }
      ]
    },
    {
      caseNo: 102,
      title: "Case #102: Wrong HS Tariff Code",
      carrier: "ONE - OCEAN NETWORK EXPRESS",
      docType: "MULTIMODAL BILL OF LADING",
      docNumber: "ONEY-3382901",
      customsDecl: "Commercial Invoice #NX-440 clearly ships Ceylon Pure Black Tea (HS 0902.30).",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Kandy Tea Exporters Ltd, Sri Lanka", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "London Tea Blenders PLC, UK", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "London Gateway (GBLON)", isError: false },
      goodsFields: [
        { key: "hsCode", label: "Commodity HS Code", value: "HS 0902.10 (Green Tea)", isError: true, flawReason: "Wrong HS Code! B/L declares Green Tea (0902.10) instead of Black Tea (0902.30), which causes customs tax errors." },
        { key: "grossWeight", label: "Total Gross Weight", value: "5,000.00 KG", isError: false },
        { key: "containerNo", label: "Container Number", value: "TGHU-882910-4", isError: false }
      ]
    },
    {
      caseNo: 103,
      title: "Case #103: Wrong Discharge Port",
      carrier: "HAPAG-LLOYD CONTAINER LINE",
      docType: "ORIGINAL BILL OF LADING",
      docNumber: "HLCU-9024881",
      customsDecl: "Buyer's Letter of Credit strictly orders delivery to Rotterdam Port, Netherlands.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Ceylon Auto Spares Ltd, Colombo", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Euro Logistics BV, Rotterdam", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Antwerp, Belgium (BEANR)", isError: true, flawReason: "Wrong Discharge Port! Cargo is routed to Antwerp instead of Rotterdam, breaking the Letter of Credit terms." },
      goodsFields: [
        { key: "freight", label: "Freight Terms", value: "CIF Rotterdam (Prepaid)", isError: false },
        { key: "grossWeight", label: "Total Gross Weight", value: "18,400.00 KG", isError: false }
      ]
    },
    {
      caseNo: 104,
      title: "Case #104: Carton Count Shortage",
      carrier: "CMA CGM THE FRENCH LINE",
      docType: "SEA WAYBILL",
      docNumber: "CMA-5519200",
      customsDecl: "Warehouse Tally Sheet & Packing List counted exactly 450 Cartons loaded.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Lanka Ceramics (Pvt) Ltd, Colombo", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Sydney Tile Wholesale, Australia", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Sydney (AUSYD)", isError: false },
      goodsFields: [
        { key: "packages", label: "Declared Package Count", value: "500 Cartons Ceramic Tiles", isError: true, flawReason: "Shortage error! The B/L declares 500 Cartons, but only 450 Cartons were actually packed (50 cartons missing)." },
        { key: "grossWeight", label: "Gross Weight", value: "12,150.00 KG", isError: false },
        { key: "containerNo", label: "Container Number", value: "CMAU-409112-8", isError: false }
      ]
    },
    {
      caseNo: 105,
      title: "Case #105: Hidden Dangerous Cargo",
      carrier: "MAERSK LINE",
      docType: "OCEAN BILL OF LADING",
      docNumber: "MAEU-8821940",
      customsDecl: "Factory Packing List clearly states UN 1263 Class 3 Flammable Paint Solvents.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Lanka Industrial Paints, Gampaha", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Nordic Coatings AB, Sweden", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Gothenburg (SEGOT)", isError: false },
      goodsFields: [
        { key: "cargoDesc", label: "Commodity & Hazard Status", value: "Non-Hazardous General Dry Goods", isError: true, flawReason: "Hidden Dangerous Goods! Declaring Class 3 Flammable Solvent as Non-Hazardous violates maritime safety law." },
        { key: "packages", label: "Total Packages", value: "80 Steel Drums", isError: false },
        { key: "grossWeight", label: "Gross Weight", value: "16,200.00 KG", isError: false }
      ]
    },
    {
      caseNo: 106,
      title: "Case #106: Wrong Consignee Name",
      carrier: "EVERGREEN MARINE LINE",
      docType: "ORIGINAL BILL OF LADING",
      docNumber: "EGLV-1492081",
      customsDecl: "Export Invoice #EXP-202 states buyer is 'Tokyo Fresh Foods KK, Japan'.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Ceylon Spice Mills, Matale", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Osaka General Trading Ltd, Japan", isError: true, flawReason: "Wrong Consignee! The B/L names Osaka General Trading instead of Tokyo Fresh Foods KK, blocking cargo release." },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Tokyo (JPTYO)", isError: false },
      goodsFields: [
        { key: "cargoDesc", label: "Description of Goods", value: "Ceylon Cinnamon Quills Grade A", isError: false },
        { key: "grossWeight", label: "Gross Weight", value: "3,200.00 KG", isError: false }
      ]
    },
    {
      caseNo: 107,
      title: "Case #107: Wrong Port of Loading",
      carrier: "COSCO SHIPPING LINES",
      docType: "OCEAN BILL OF LADING",
      docNumber: "COSU-6612093",
      customsDecl: "Export Entry confirms goods were loaded onto the ship in Colombo, Sri Lanka.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Serendib Rubber Goods, Colombo", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Midwest Tires Inc, USA", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Port Klang, Malaysia (MYPKG)", isError: true, flawReason: "Wrong Origin Port! B/L lists Port Klang (transshipment hub) as the Port of Loading instead of Colombo." },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Los Angeles (USLAX)", isError: false },
      goodsFields: [
        { key: "packages", label: "Total Packages", value: "40 Pallets Industrial Tires", isError: false },
        { key: "grossWeight", label: "Gross Weight", value: "21,000.00 KG", isError: false }
      ]
    },
    {
      caseNo: 108,
      title: "Case #108: Broken Container Seal Mismatch",
      carrier: "ZIM INTEGRATED SHIPPING",
      docType: "OCEAN BILL OF LADING",
      docNumber: "ZIMU-9012445",
      customsDecl: "Customs Gate Seal Log confirms container was locked with high-security seal #ZIM-77881.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Colombo Apparel Co, Biyagama", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "New York Retail Group, USA", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "New York (USNYC)", isError: false },
      goodsFields: [
        { key: "sealNo", label: "Container Seal No", value: "ZIM-11002 (Tamper Alert)", isError: true, flawReason: "Seal Mismatch! B/L records seal #ZIM-11002 instead of gate seal #ZIM-77881. This triggers cargo theft inspection." },
        { key: "packages", label: "Packages", value: "320 Garment Cartons", isError: false },
        { key: "grossWeight", label: "Gross Weight", value: "6,400.00 KG", isError: false }
      ]
    },
    {
      caseNo: 109,
      title: "Case #109: Freight Payment Conflict",
      carrier: "YANG MING MARINE TRANSPORT",
      docType: "ORIGINAL BILL OF LADING",
      docNumber: "YMLU-4451092",
      customsDecl: "Sales Contract is CIF Singapore, meaning Seller already paid ocean freight in advance.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Island Coconut Oil Ltd, Kurunegala", isError: false },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Singapore Food Distributors Pte", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Singapore (SGSIN)", isError: false },
      goodsFields: [
        { key: "freightTerms", label: "Freight Payment Status", value: "FREIGHT COLLECT (Buyer Pays)", isError: true, flawReason: "Payment Error! Under CIF terms, freight must be marked 'FREIGHT PREPAID', not Freight Collect." },
        { key: "packages", label: "Packages", value: "200 Cartons Virgin Coconut Oil", isError: false },
        { key: "grossWeight", label: "Gross Weight", value: "8,900.00 KG", isError: false }
      ]
    },
    {
      caseNo: 110,
      title: "Case #110: Wrong Shipper / Exporter",
      carrier: "HMM CO., LTD",
      docType: "SEA WAYBILL",
      docNumber: "HDMU-3391008",
      customsDecl: "Official Sri Lanka Export Permit #EX-904 belongs to 'Lanka Tech Cables PLC'.",
      shipper: { key: "shipper", label: "Shipper / Exporter", value: "Oceanic Freight Forwarding Agency", isError: true, flawReason: "Wrong Shipper! The B/L lists the forwarding agent as Shipper instead of the actual exporter 'Lanka Tech Cables PLC'." },
      consignee: { key: "consignee", label: "Consignee / Importer", value: "Seoul Electronics Corp, Korea", isError: false },
      pol: { key: "pol", label: "Port of Loading (POL)", value: "Colombo (LKCMB)", isError: false },
      pod: { key: "pod", label: "Port of Discharge (POD)", value: "Busan (KRPUS)", isError: false },
      goodsFields: [
        { key: "packages", label: "Packages", value: "25 Wooden Spools Copper Cable", isError: false },
        { key: "grossWeight", label: "Gross Weight", value: "14,500.00 KG", isError: false }
      ]
    }
  ];

  // =========================================================================
  // GAME 4 DATA: DG HazMat Hazard (10 IMDG Challenges - Pick 5 Randomly)
  // =========================================================================
  const HAZMAT_CHALLENGES = [
    {
      id: "dg_1",
      title: "Class 3 (Flammable Liquid) + Class 5.1 (Oxidizer)",
      cargoA: { name: "Paint Thinner (Acetone)", class: "Class 3 • Flammable Liquid", icon: "🔥", badge: "#EF4444" },
      cargoB: { name: "Hydrogen Peroxide Drums", class: "Class 5.1 • Oxidizing Agent", icon: "⚠️", badge: "#F59E0B" },
      question: "Can these two chemicals be loaded inside the same sea container?",
      answer: "Prohibited",
      rule: "Prohibited! Oxidizers release oxygen and can cause flammable liquids to catch fire or explode."
    },
    {
      id: "dg_2",
      title: "Class 8 Acid + Class 8 Alkali (Base)",
      cargoA: { name: "Hydrochloric Acid Drums", class: "Class 8 • Strong Acid", icon: "🧪", badge: "#3B82F6" },
      cargoB: { name: "Sodium Hydroxide Solution", class: "Class 8 • Strong Alkali", icon: "🧪", badge: "#3B82F6" },
      question: "Both are Class 8 Corrosives. Can they be packed together in one container?",
      answer: "Prohibited",
      rule: "Prohibited! Acids and alkalis react violently when mixed, generating extreme heat and toxic gas."
    },
    {
      id: "dg_3",
      title: "Class 1 (Explosives) + Class 2.1 (Flammable Gas)",
      cargoA: { name: "Commercial Fireworks", class: "Class 1.4G • Explosives", icon: "💥", badge: "#DC2626" },
      cargoB: { name: "LPG Cooking Gas Cylinders", class: "Class 2.1 • Flammable Gas", icon: "⛽", badge: "#EA580C" },
      question: "Can fireworks and LPG gas cylinders share the same container?",
      answer: "Prohibited",
      rule: "Prohibited! Explosives must stay strictly separated from flammable gases."
    },
    {
      id: "dg_4",
      title: "Class 9 (Lithium Batteries) + Cotton T-Shirts",
      cargoA: { name: "UN3480 Lithium Battery Packs", class: "Class 9 • Misc Hazardous", icon: "🔋", badge: "#10B981" },
      cargoB: { name: "Boxes of Cotton T-Shirts", class: "Non-Hazardous General Cargo", icon: "📦", badge: "#64748B" },
      question: "Can certified Class 9 Lithium Batteries be packed with normal cotton garments?",
      answer: "Permitted",
      rule: "Permitted! Properly packed and UN-certified Class 9 batteries can be co-loaded with normal dry goods."
    },
    {
      id: "dg_5",
      title: "Class 6.1 (Toxic Poison) + Basmati Rice",
      cargoA: { name: "Farm Insect Pesticides", class: "Class 6.1 • Toxic Poison", icon: "☠️", badge: "#7C3AED" },
      cargoB: { name: "Bags of Basmati Rice", class: "Food Cargo", icon: "🌾", badge: "#10B981" },
      question: "Can toxic Class 6.1 pesticides be loaded in the same container with food bags?",
      answer: "Prohibited",
      rule: "Prohibited! Poisons must never be packed with food or animal feed to stop fatal contamination."
    },
    {
      id: "dg_6",
      title: "Class 4.1 (Flammable Solid) + Class 1 (Explosives)",
      cargoA: { name: "Industrial Matches & Sulfur", class: "Class 4.1 • Flammable Solid", icon: "🪵", badge: "#F97316" },
      cargoB: { name: "Mining Blasting Caps", class: "Class 1.1 • High Explosive", icon: "💣", badge: "#DC2626" },
      question: "Can flammable solids and mining explosives be loaded into the same container?",
      answer: "Prohibited",
      rule: "Prohibited! Sparks or heat from Class 4.1 solids can trigger Class 1 explosives."
    },
    {
      id: "dg_7",
      title: "Class 2.2 (Non-Flammable Gas) + Auto Parts",
      cargoA: { name: "Helium Balloon Gas Cylinders", class: "Class 2.2 • Non-Flammable Gas", icon: "🎈", badge: "#0EA5E9" },
      cargoB: { name: "Metal Car Brake Discs", class: "Non-Hazardous Steel Cargo", icon: "⚙️", badge: "#64748B" },
      question: "Can safe non-flammable Class 2.2 gas cylinders be loaded with normal metal car parts?",
      answer: "Permitted",
      rule: "Permitted! Non-flammable Class 2.2 gas cylinders can be safely co-loaded with non-hazardous metal parts if strapped well."
    },
    {
      id: "dg_8",
      title: "Class 4.3 (Dangerous When Wet) + Frozen Seafood",
      cargoA: { name: "Calcium Carbide Drums", class: "Class 4.3 • Dangerous When Wet", icon: "💧", badge: "#2563EB" },
      cargoB: { name: "Wet Ice-Packed Fish Boxes", class: "Moisture / Wet Cargo", icon: "🐟", badge: "#06B6D4" },
      question: "Can Class 4.3 'Dangerous When Wet' drums be stowed near wet ice-packed fish boxes?",
      answer: "Prohibited",
      rule: "Prohibited! Water from melting ice reacts with Calcium Carbide to produce explosive acetylene gas!"
    },
    {
      id: "dg_9",
      title: "Class 7 (Radioactive Material) + X-Ray Film",
      cargoA: { name: "Medical Isotope Container", class: "Class 7 • Radioactive", icon: "☢️", badge: "#EAB308" },
      cargoB: { name: "Unexposed Hospital X-Ray Film", class: "Undeveloped Photo Film", icon: "🎞️", badge: "#64748B" },
      question: "Can Class 7 Radioactive medical supplies be placed in the same container as undeveloped X-ray films?",
      answer: "Prohibited",
      rule: "Prohibited! Radiation ruins undeveloped film completely. IMDG rules require strict distance between them."
    },
    {
      id: "dg_10",
      title: "Class 9 (Dry Ice) + Sealed Frozen Vaccines",
      cargoA: { name: "UN1845 Dry Ice Packs", class: "Class 9 • Cooling Agent", icon: "❄️", badge: "#38BDF8" },
      cargoB: { name: "Insulated Medical Vaccine Boxes", class: "Non-Hazardous Pharma", icon: "💉", badge: "#10B981" },
      question: "Can ventilated Class 9 Dry Ice be packed inside a reefer/insulated container with pharma vaccines?",
      answer: "Permitted",
      rule: "Permitted! Dry Ice (Class 9) is safely used to keep pharma vaccines cold as long as proper CO2 venting labels are posted."
    }
  ];

  // =========================================================================
  // GAME 5 DATA: The Route Dispatcher (10 Global Crises + Custom Artworks!)
  // =========================================================================
  const DISPATCHER_CRISES = [
    {
      id: "crisis_1",
      title: "Crisis 1: Red Sea Conflict Blockade",
      badge: "MARITIME WAR RISK",
      situation: "You have 200 containers of seasonal clothes going from Colombo to Europe. Missile attacks in the Red Sea forced ships to stop using the Suez Canal.",
      options: [
        {
          label: "Option A: Sail around Africa (Cape of Good Hope)",
          tradeoff: "⏱️ +12 Days transit • 💰 Medium extra cost",
          outcome: "Cargo arrives safely with zero war risk. Client adjusts shop display dates and saves money.",
          score: 85,
          rating: "Smart Safe Strategy"
        },
        {
          label: "Option B: Ship to Dubai, then Fly to Europe (Sea-Air)",
          tradeoff: "⏱️ +4 Days transit • 💰 High air freight cost",
          outcome: "Clothes arrive right on time for the store launch! Best option for urgent high-value fashion.",
          score: 95,
          rating: "Fast Delivery Hero"
        },
        {
          label: "Option C: Force ship through the Red Sea danger zone",
          tradeoff: "⏱️ Normal time • ⚠️ Very high attack & insurance risk",
          outcome: "Ship faces drone attack risk and massive war-risk insurance bills.",
          score: 40,
          rating: "Dangerous Gamble"
        }
      ]
    },
    {
      id: "crisis_2",
      title: "Crisis 2: Panama Canal Drought Queue",
      badge: "WATERWAY BOTTLENECK",
      situation: "Low water levels in the Panama Canal created a 3-week ship queue. Your US East Coast factory parts are stuck waiting at sea.",
      options: [
        {
          label: "Option A: Unload in Los Angeles + Fast Train across USA to New York",
          tradeoff: "⏱️ Saves 14 days • 💰 Moderate rail cost",
          outcome: "Containers switch from ship to fast double-stack train and reach New York in 6 days.",
          score: 95,
          rating: "Smart Intermodal Plan"
        },
        {
          label: "Option B: Pay $450,000 for an emergency priority canal ticket",
          tradeoff: "⏱️ Passes in 2 days • 💸 Huge loss of profit",
          outcome: "Ship crosses early, but the massive auction fee wipes out all company profit.",
          score: 65,
          rating: "Too Expensive"
        },
        {
          label: "Option C: Leave ship waiting in queue for 22 days",
          tradeoff: "⏱️ 3+ Weeks late • 📉 Angry customer claims",
          outcome: "US factory shuts down waiting for parts, causing heavy late-delivery penalties.",
          score: 35,
          rating: "Severe Delay Failure"
        }
      ]
    },
    {
      id: "crisis_3",
      title: "Crisis 3: Hamburg Port Workers Strike",
      badge: "LABOR SHUTDOWN",
      situation: "20 refrigerated containers of fresh fruit are about to reach Hamburg Port, Germany, but port crane workers just started a 72-hour strike.",
      options: [
        {
          label: "Option A: Divert ship to Rotterdam Port + Refrigerated Trucks to Germany",
          tradeoff: "⏱️ Only 24h delay • ✅ Zero spoiled fruit",
          outcome: "Containers unload smoothly in Rotterdam and reefer trucks deliver fresh fruit on time.",
          score: 95,
          rating: "Cold Chain Saver"
        },
        {
          label: "Option B: Wait outside Hamburg port until strike ends",
          tradeoff: "⏱️ Unknown wait • 🍓 Fruit starts spoiling",
          outcome: "Port closes longer than expected. Half the fruit spoils in the container.",
          score: 40,
          rating: "Cargo Spoilage Loss"
        }
      ]
    },
    {
      id: "crisis_4",
      title: "Crisis 4: Closed Airspace Over Conflict Zone",
      badge: "AVIATION REROUTE",
      situation: "Airspace bans force Asia-Europe cargo planes to fly a longer path. Extra fuel weight cuts cargo space on each plane by 20%.",
      options: [
        {
          label: "Option A: Split urgent shipment across 2 flights via Anchorage hub",
          tradeoff: "⏱️ Arrives within 48h • ✅ Full order delivered",
          outcome: "Plane refuels midway and carries 100% of urgent parts safely to Europe within 2 days.",
          score: 90,
          rating: "Aviation Planner"
        },
        {
          label: "Option B: Cancel flight and put cargo on a 35-day ship",
          tradeoff: "⏱️ +33 Days late • ❌ Assembly line stops",
          outcome: "Factory runs out of microchips and closes down for a month.",
          score: 30,
          rating: "Critical Failure"
        }
      ]
    },
    {
      id: "crisis_5",
      title: "Crisis 5: Ship Stuck Blocking Suez Canal",
      badge: "CANAL BLOCKAGE",
      situation: "A giant container ship ran aground sideways in the Suez Canal, completely blocking traffic in both directions. Your medical goods are approaching Suez.",
      options: [
        {
          label: "Option A: Unload cargo at Jeddah Port and air-freight urgent boxes",
          tradeoff: "⏱️ Arrives in 3 days • 🏥 Hospitals supplied",
          outcome: "Life-saving medical kits bypass the blocked canal by air and arrive safely.",
          score: 95,
          rating: "Emergency Rescue Master"
        },
        {
          label: "Option B: Park the ship at Suez waiting area for 2 weeks",
          tradeoff: "⏱️ Stuck in traffic • 📉 Expired goods risk",
          outcome: "Hundreds of ships clog the anchorage. Your medicine misses expiry windows.",
          score: 45,
          rating: "Poor Waiting Choice"
        }
      ]
    },
    {
      id: "crisis_6",
      title: "Crisis 6: Major Port Cyberattack",
      badge: "SYSTEM BLACKOUT",
      situation: "Hackers crashed the main port terminal computer system. Automated gates and cranes cannot read container numbers or release cargo.",
      options: [
        {
          label: "Option A: Shift cargo pickups to nearby manual-gate regional terminal",
          tradeoff: "⏱️ Minimal delay • 💻 Paper manifest backup",
          outcome: "Backup terminal uses paper gate passes to release urgent trucks with zero downtime.",
          score: 95,
          rating: "Cyber Resilience Pro"
        },
        {
          label: "Option B: Wait passively until IT team fixes the server",
          tradeoff: "⏱️ 6-Day gridlock • 🚛 Huge truck fees",
          outcome: "Trucks wait outside closed gates for days, racking up huge demurrage charges.",
          score: 40,
          rating: "Gridlock Mistake"
        }
      ]
    },
    {
      id: "crisis_7",
      title: "Crisis 7: Super Typhoon Closes China Ports",
      badge: "EXTREME WEATHER",
      situation: "A Category-5 typhoon hits South China Sea. Shanghai and Ningbo ports shut down for 4 days. Your electronics ship is 200 miles away.",
      options: [
        {
          label: "Option A: Hold vessel in safe shelter bay and pre-book berth slot in Busan",
          tradeoff: "⏱️ 3-Day safe shift • 🛡️ Ship & cargo protected",
          outcome: "Crew and cargo stay safe from giant waves, and fast unloading at Busan keeps goods moving.",
          score: 95,
          rating: "Safe Maritime Captain"
        },
        {
          label: "Option B: Sail straight toward closed port entrance anyway",
          tradeoff: "⚠️ Storm damage risk • 💥 Lost containers",
          outcome: "Typhoon waves knock 12 containers overboard outside the closed port.",
          score: 25,
          rating: "Reckless Hazard"
        }
      ]
    },
    {
      id: "crisis_8",
      title: "Crisis 8: Main Ship Engine Failure Mid-Ocean",
      badge: "VESSEL S.O.S",
      situation: "Your chartered vessel loses main engine power 600 miles from Colombo. Perishable tea and garments are stuck drifting.",
      options: [
        {
          label: "Option A: Dispatch Ocean Rescue Tugboat to tow ship to Colombo for transfer",
          tradeoff: "⏱️ 5-Day rescue • 🚢 Safe cargo transfer",
          outcome: "Tugboat brings ship safely to Colombo Port where boxes are reloaded onto a fast sister ship.",
          score: 90,
          rating: "Quick Rescue Coordinator"
        },
        {
          label: "Option B: Wait 2 weeks for spare engine parts flown from Europe",
          tradeoff: "⏱️ 18-Day drift • ⚠️ General Average claims",
          outcome: "Ship drifts slowly, facing storm risks and huge salvage insurance claims.",
          score: 45,
          rating: "Slow Response Risk"
        }
      ]
    },
    {
      id: "crisis_9",
      title: "Crisis 9: Port Oil Spill Quarantine",
      badge: "ENVIRONMENTAL BAN",
      situation: "An oil spill inside the harbor closes Berth 1 to 4 for environmental cleanup. 50 import containers are stuck inside.",
      options: [
        {
          label: "Option A: Route next ships to clean deepwater outer berth + rail shuttle",
          tradeoff: "⏱️ Clean transfer • ✅ Smooth supply flow",
          outcome: "Using the outer berth avoids the oil spill zone completely and keeps deliveries moving.",
          score: 90,
          rating: "Agile Terminal Planner"
        },
        {
          label: "Option B: Keep booking ships into the closed oily terminal",
          tradeoff: "⏱️ Ships turned away • 💰 Heavy fine",
          outcome: "Port authority rejects entry, forcing emergency ship diversions at double cost.",
          score: 35,
          rating: "Planning Failure"
        }
      ]
    },
    {
      id: "crisis_10",
      title: "Crisis 10: Customs Border Truck Jam",
      badge: "BORDER CONGESTION",
      situation: "New customs rules caused a 40km truck jam at the land border. Urgent electronics are sitting in trucks for 5 days.",
      options: [
        {
          label: "Option A: Clear goods via Green-Lane Authorized Economic Operator (AEO) rail",
          tradeoff: "⏱️ Crosses border in 6 hours • ✅ Priority clearance",
          outcome: "AEO fast-track train clears customs automatically, beating the entire truck traffic jam.",
          score: 95,
          rating: "Customs Fast-Track Expert"
        },
        {
          label: "Option B: Tell truck drivers to stay in the 40km highway line",
          tradeoff: "⏱️ 6-Day standstill • 💸 Driver overtime cost",
          outcome: "Cargo misses flight connections at destination airport.",
          score: 40,
          rating: "Traffic Bottleneck"
        }
      ]
    }
  ];

  // =========================================================================
  // CUSTOM SVG ARTWORK GENERATOR FOR ALL 10 CRISES
  // =========================================================================
  function getCrisisArtworkSVG(crisisId) {
    const scenes = {
      crisis_1: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#0F172A"/>
          <path d="M0,95 Q105,80 210,95 T420,95 L420,130 L0,130 Z" fill="#0369A1" opacity="0.5"/>
          <path d="M40,40 L120,40 L150,80 L300,80" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
          <path d="M40,40 Q180,120 350,55" stroke="#10B981" stroke-width="3" fill="none"/>
          <circle cx="150" cy="60" r="18" fill="#EF4444" opacity="0.25"/>
          <text x="142" y="65" font-size="16">⚠️</text>
          <text x="200" y="96" font-size="18">🚢</text>
          <text x="25" y="25" fill="#94A3B8" font-size="10" font-family="monospace">RADAR: RED SEA ROUTE BYPASS</text>
          <text x="260" y="38" fill="#10B981" font-size="10" font-weight="bold">SAFE ROUTE ➔</text>
        </svg>`,
      crisis_2: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#1E293B"/>
          <rect x="0" y="85" width="420" height="45" fill="#78350F" opacity="0.55"/>
          <rect x="130" y="55" width="22" height="45" fill="#475569"/>
          <rect x="260" y="55" width="22" height="45" fill="#475569"/>
          <rect x="152" y="88" width="108" height="14" fill="#0284C7" opacity="0.6"/>
          <text x="175" y="83" font-size="18">🚢</text>
          <text x="310" y="82" font-size="18">🚂</text>
          <path d="M295,62 L370,62" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="4,3"/>
          <text x="20" y="24" fill="#FBBF24" font-size="10" font-family="monospace">PANAMA LOCKS: LOW WATER DRAFT</text>
        </svg>`,
      crisis_3: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#0F172A"/>
          <rect x="0" y="98" width="420" height="32" fill="#0369A1" opacity="0.55"/>
          <path d="M90,98 L90,32 L160,32" stroke="#F59E0B" stroke-width="4" fill="none"/>
          <path d="M220,98 L220,32 L290,32" stroke="#F59E0B" stroke-width="4" fill="none"/>
          <text x="135" y="75" font-size="22">🛑</text>
          <text x="315" y="94" font-size="20">🚛</text>
          <text x="20" y="22" fill="#F87171" font-size="10" font-family="monospace">PORT CRANES HALTED: LABOR STRIKE</text>
        </svg>`,
      crisis_4: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#09111E"/>
          <circle cx="210" cy="65" r="45" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,4" fill="rgba(239,68,68,0.1)"/>
          <path d="M30,85 Q210,15 390,75" stroke="#38BDF8" stroke-width="2.5" fill="none"/>
          <text x="120" y="42" font-size="20">✈️</text>
          <text x="196" y="71" font-size="18">⛔</text>
          <text x="20" y="22" fill="#38BDF8" font-size="10" font-family="monospace">AIRSPACE CLOSED: REROUTING FLIGHT</text>
        </svg>`,
      crisis_5: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#1E293B"/>
          <rect x="0" y="35" width="420" height="60" fill="#0284C7" opacity="0.45"/>
          <rect x="0" y="0" width="420" height="35" fill="#D97706" opacity="0.25"/>
          <rect x="0" y="95" width="420" height="35" fill="#D97706" opacity="0.25"/>
          <g transform="translate(200,65) rotate(-35)">
            <rect x="-35" y="-10" width="70" height="20" rx="5" fill="#EF4444"/>
          </g>
          <text x="90" y="70" font-size="16">🚢</text>
          <text x="290" y="65" font-size="16">✈️</text>
          <text x="20" y="22" fill="#FDE047" font-size="10" font-family="monospace">SUEZ CANAL BLOCKED BY AGROUND VESSEL</text>
        </svg>`,
      crisis_6: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#0F172A"/>
          <rect x="60" y="35" width="300" height="70" rx="8" fill="#1E293B" stroke="#EF4444" stroke-width="2"/>
          <text x="105" y="76" fill="#EF4444" font-size="15" font-family="monospace" font-weight="bold">⚠ TERMINAL LOCKED ⚠</text>
          <text x="20" y="22" fill="#FCA5A5" font-size="10" font-family="monospace">CYBERALERT: GATE SYSTEMS OFFLINE</text>
        </svg>`,
      crisis_7: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#0B1528"/>
          <circle cx="280" cy="58" r="34" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="10,6"/>
          <circle cx="280" cy="58" r="18" fill="none" stroke="#60A5FA" stroke-width="2"/>
          <text x="270" y="65" font-size="20">🌀</text>
          <text x="70" y="95" font-size="20">🚢</text>
          <path d="M0,108 Q105,94 210,108 T420,108 L420,130 L0,130 Z" fill="#0284C7" opacity="0.6"/>
          <text x="20" y="22" fill="#7DD3FC" font-size="10" font-family="monospace">TYPHOON ALERT: PORT BERTHS CLOSED</text>
        </svg>`,
      crisis_8: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#0F172A"/>
          <path d="M0,92 Q105,82 210,92 T420,92 L420,130 L0,130 Z" fill="#0369A1" opacity="0.6"/>
          <text x="240" y="88" font-size="24">🚢</text>
          <text x="248" y="58" font-size="18">💨</text>
          <text x="115" y="90" font-size="18">🚤</text>
          <line x1="145" y1="85" x2="235" y2="85" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4,2"/>
          <text x="20" y="22" fill="#FDE047" font-size="10" font-family="monospace">S.O.S: ENGINE POWER LOST AT SEA</text>
        </svg>`,
      crisis_9: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#1E293B"/>
          <path d="M0,82 L420,82 L420,130 L0,130 Z" fill="#0369A1" opacity="0.5"/>
          <ellipse cx="160" cy="100" rx="65" ry="14" fill="#18181B" opacity="0.85"/>
          <text x="150" y="102" font-size="14">🛢️</text>
          <text x="310" y="78" font-size="22">🏗️</text>
          <text x="20" y="22" fill="#F59E0B" font-size="10" font-family="monospace">OIL SPILL: INNER BERTH QUARANTINE</text>
        </svg>`,
      crisis_10: `
        <svg viewBox="0 0 420 130" style="width:100%; height:130px; display:block;">
          <rect width="420" height="130" fill="#0F172A"/>
          <rect x="0" y="86" width="420" height="22" fill="#334155"/>
          <text x="40" y="102" font-size="16">🚛</text>
          <text x="75" y="102" font-size="16">🚛</text>
          <text x="110" y="102" font-size="16">🚛</text>
          <text x="155" y="102" font-size="16">🚧</text>
          <path d="M30,52 L390,52" stroke="#10B981" stroke-width="3" stroke-dasharray="6,4"/>
          <text x="210" y="48" font-size="18">🚄</text>
          <text x="20" y="22" fill="#4ADE80" font-size="10" font-family="monospace">BORDER JAM: AEO RAIL FAST-TRACK</text>
        </svg>`
    };
    return scenes[crisisId] || scenes.crisis_1;
  }

  // =========================================================================
  // SHARED STATE & STORAGE
  // =========================================================================
  let currentGame = 'incoterms';

  let gameState = {
    active: false,
    score: 0,
    currentIndex: 0,
    correctCount: 0,
    combo: 0,
    maxCombo: 0,
    lives: 3,
    loadedContainers: [],
    routeProgress: 0,
    hazmatResults: [],
    timeLeft: 20,
    timerInterval: null,
    items: [],
    userAnswers: [],
    lifelines: { fiftyFifty: true, aiClue: true, skip: true },
    activeAiClue: null,
    hiddenOptions: [],
    dispatcherTotalScore: 0
  };

  function getArcadeStats() {
    try {
      return JSON.parse(localStorage.getItem('nexus_arcade_stats')) || {
        totalXp: 0,
        gamesPlayed: 0,
        incotermsHighScore: 0,
        ladderHighScore: 0,
        inspectorHighScore: 0,
        hazmatHighScore: 0,
        dispatcherHighScore: 0,
        bestCombo: 0,
        badges: []
      };
    } catch (e) {
      return { totalXp: 0, gamesPlayed: 0, incotermsHighScore: 0, ladderHighScore: 0, bestCombo: 0, badges: [] };
    }
  }

  function saveArcadeStats(stats) {
    try {
      localStorage.setItem('nexus_arcade_stats', JSON.stringify(stats));
    } catch (e) {}
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // =========================================================================
  // ARCADE LOBBY RENDERER (Simple English, No Em-Dashes)
  // =========================================================================
  window.renderArcadeLobbyHTML = function () {
    const stats = getArcadeStats();
    return `
      <div class="arcade-lobby-wrapper" style="max-width: 1050px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div class="arcade-hero" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); border-radius: 24px; padding: 32px 28px; color: #FFFFFF; margin-bottom: 26px; position: relative; overflow: hidden; box-shadow: 0 15px 35px rgba(15, 23, 42, 0.25);">
          <div style="position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(255,90,31,0.3) 0%, transparent 70%); border-radius: 50%;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; position: relative; z-index: 2;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 90, 31, 0.2); border: 1px solid rgba(255, 90, 31, 0.4); padding: 5px 14px; border-radius: 30px; margin-bottom: 12px;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #FF7A45; letter-spacing: 0.5px; text-transform: uppercase;">🕹️ NEXUS LOGISTICS ARCADE</span>
              </div>
              <h1 style="font-size: 2.1rem; font-family: 'Outfit', sans-serif; margin: 0 0 8px 0; font-weight: 800;">
                Logistics Arcade Playground
              </h1>
              <p style="color: #94A3B8; font-size: 0.95rem; margin: 0; max-width: 600px; line-height: 1.5;">
                Fun shipping and supply chain games! Load ships with 3 lives, check customs papers, stop chemical explosions, and solve port crises.
              </p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.07); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 18px; padding: 16px 22px; display: flex; gap: 20px;">
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #FF7A45; font-family: 'Outfit', sans-serif;">${stats.totalXp}</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Total XP</div>
              </div>
              <div style="width: 1px; background: rgba(255,255,255,0.12);"></div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">${stats.gamesPlayed}</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Games</div>
              </div>
              <div style="width: 1px; background: rgba(255,255,255,0.12);"></div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #4ADE80; font-family: 'Outfit', sans-serif;">${stats.bestCombo}x</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Best Combo</div>
              </div>
            </div>
          </div>
        </div>

        <!-- SCORING & RULES GUIDELINE CARD -->
        <div class="arcade-rules-guide-banner" style="background: var(--bg-white); border: 2px solid #E2E8F0; border-radius: 20px; padding: 20px 24px; margin-bottom: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          <div id="btn-toggle-arcade-guide" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 1.5rem; background: #FFF7ED; border: 1.5px solid #FFEDD5; width: 44px; height: 44px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">📖</span>
              <div>
                <h4 style="font-family: 'Outfit', sans-serif; margin: 0; color: var(--primary-navy); font-size: 1.12rem; font-weight: 800;">
                  How Points, XP & Combos Work
                </h4>
                <p style="margin: 2px 0 0 0; color: var(--text-muted); font-size: 0.85rem;">
                  Quick guide: Base XP, Combo Streaks, 20-Second Speed Bonus, and Cargo Lives.
                </p>
              </div>
            </div>
            <button id="guide-toggle-label" style="border: 1.5px solid var(--border-color); background: #F8FAFC; color: var(--primary-navy); font-weight: 800; border-radius: 20px; padding: 6px 16px; font-size: 0.82rem; cursor: pointer;">
              Hide Rules ▴
            </button>
          </div>

          <div id="arcade-rules-breakdown" style="display: block; margin-top: 18px; border-top: 1px solid var(--border-color); padding-top: 16px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px;">
              <div style="background: #FFF7ED; border: 1.5px solid #FFEDD5; border-radius: 14px; padding: 14px 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #EA580C; text-transform: uppercase; margin-bottom: 5px;">⚡ Base XP (Points)</div>
                <div style="font-size: 0.84rem; color: #9A3412; line-height: 1.45;">
                  Get <strong>+50 to +250 XP</strong> for each right answer or caught mistake.
                </div>
              </div>

              <div style="background: #EFF6FF; border: 1.5px solid #DBEAFE; border-radius: 14px; padding: 14px 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 5px;">🔥 Combo Streaks</div>
                <div style="font-size: 0.84rem; color: #1E40AF; line-height: 1.45;">
                  Answer correctly in a row to boost XP:<br>
                  • 1 right: <strong>1x</strong> (50 XP)<br>
                  • 2 to 3 in a row: <strong>2x</strong> (100 XP)<br>
                  • 4+ in a row: <strong>3x</strong> (150 XP)<br>
                  <span style="color: #DC2626; font-size: 0.78rem; font-weight: 700;">1 mistake resets combo to 0!</span>
                </div>
              </div>

              <div style="background: #FEF3C7; border: 1.5px solid #FDE68A; border-radius: 14px; padding: 14px 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #D97706; text-transform: uppercase; margin-bottom: 5px;">⏱️ Speed Bonus</div>
                <div style="font-size: 0.84rem; color: #92400E; line-height: 1.45;">
                  Answer fast inside 20 seconds to win extra points: <strong>Seconds left × 4 XP</strong> (up to +80 extra XP!).
                </div>
              </div>

              <div style="background: #FEE2E2; border: 1.5px solid #FECACA; border-radius: 14px; padding: 14px 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #DC2626; text-transform: uppercase; margin-bottom: 5px;">❤️ 3 Lives (Hearts)</div>
                <div style="font-size: 0.84rem; color: #991B1B; line-height: 1.45;">
                  You get 3 cargo hearts. Each wrong answer drops a box (-1 heart). Losing all 3 ends the game!
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; margin: 0 0 18px 0; display: flex; align-items: center; justify-content: space-between;">
          <span>🎮 Choose a Game</span>
          <span style="font-size: 0.85rem; font-weight: 700; color: #10B981;">⚡ 5 Games Ready to Play</span>
        </h3>

        <div class="arcade-games-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 310px), 1fr)); gap: 20px; margin-bottom: 40px;">
          
          <!-- GAME 1 -->
          <div class="arcade-card-active" style="background: linear-gradient(145deg, #FFFFFF 0%, #FFF7ED 100%); border: 2px solid var(--accent-orange); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(255, 90, 31, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🚢</div>
                <span style="background: var(--accent-orange); color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">GAME 1 • LIVE</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                Incoterms® Rapid Battle
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Load containers onto the ship! Decide quickly who pays the cargo loss: Seller or Buyer.
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px; flex-wrap: wrap;">
                <span style="background: #FEE2E2; color: #DC2626; padding: 3px 7px; border-radius: 6px;">❤️ 3 Lives</span>
                <span style="background: #FEF3C7; color: #D97706; padding: 3px 7px; border-radius: 6px;">⏱️ 20s Timer</span>
                <span style="background: #E0F2FE; color: #0284C7; padding: 3px 7px; border-radius: 6px;">🚢 Ship Deck</span>
                <span style="background: #ECFDF5; color: #059669; padding: 3px 7px; border-radius: 6px;">🔥 Combo XP</span>
              </div>
            </div>
            <button class="btn btn-primary btn-play-game" data-game="incoterms" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer;">
              🚀 Start Rapid Battle
            </button>
          </div>

          <!-- GAME 2 -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #EFF6FF 100%); border: 2px solid #3B82F6; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🏆</div>
                <span style="background: #3B82F6; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">GAME 2 • LIVE</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                Logistics Career Ladder
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Climb 10 job steps from Junior Trainee to Logistics Tycoon! Use 50:50, Smart AI Hints, and Divert.
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px; flex-wrap: wrap;">
                <span style="background: #EFF6FF; color: #1D4ED8; padding: 3px 7px; border-radius: 6px;">🪜 10 Steps</span>
                <span style="background: #FDF4FF; color: #A21CAF; padding: 3px 7px; border-radius: 6px;">🤖 AI Clue</span>
                <span style="background: #FEF3C7; color: #B45309; padding: 3px 7px; border-radius: 6px;">⏩ Swap Question</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="ladder" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(37,99,235,0.3);">
              🚀 Climb Career Ladder
            </button>
          </div>

          <!-- GAME 3 -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #F5F3FF 100%); border: 2px solid #8B5CF6; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(139, 92, 246, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🕵️‍♂️</div>
                <span style="background: #8B5CF6; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">GAME 3 • LIVE</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                Port Inspector: Customs Detective
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Check real Bills of Lading! Tap directly on the wrong detail on the paper to catch mistakes. (5 random cases out of 10).
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px; flex-wrap: wrap;">
                <span style="background: #F3E8FF; color: #6B21A8; padding: 3px 7px; border-radius: 6px;">📄 10 Cases</span>
                <span style="background: #ECFDF5; color: #065F46; padding: 3px 7px; border-radius: 6px;">🔍 Tap Mistake</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="inspector" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(124,58,237,0.3);">
              🚀 Inspect Documents
            </button>
          </div>

          <!-- GAME 4 -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #FEF2F2 100%); border: 2px solid #EF4444; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(239, 68, 68, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">⚠️</div>
                <span style="background: #EF4444; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">GAME 4 • LIVE</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                DG HazMat Hazard
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Load dangerous chemicals safely! Pass at least 3 of 5 rounds to stay safe, or the container explodes!
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px; flex-wrap: wrap;">
                <span style="background: #FEE2E2; color: #991B1B; padding: 3px 7px; border-radius: 6px;">💥 10 Challenges</span>
                <span style="background: #FEF3C7; color: #92400E; padding: 3px 7px; border-radius: 6px;">🛡️ Safety Bar</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="hazmat" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(220,38,38,0.3);">
              🚀 Load HazMat Safely
            </button>
          </div>

          <!-- GAME 5 -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #ECFDF5 100%); border: 2px solid #10B981; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🧭</div>
                <span style="background: #10B981; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">GAME 5 • LIVE</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                The Route Dispatcher: Crisis Simulator
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Manage 5 random global shipping emergencies out of 10! Beat storms, strikes, and blockages to earn top ratings.
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px; flex-wrap: wrap;">
                <span style="background: #D1FAE5; color: #065F46; padding: 3px 7px; border-radius: 6px;">🌍 10 Crises</span>
                <span style="background: #E0E7FF; color: #3730A3; padding: 3px 7px; border-radius: 6px;">📡 Command Radar</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="dispatcher" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(5,150,105,0.3);">
              🚀 Enter Crisis Command
            </button>
          </div>

        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: var(--bg-white); border: 1px solid var(--border-color); border-radius: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-muted);">
            <span>🎵 <strong>5 Custom Soundscapes:</strong> Each game has its own themed music and sound effects!</span>
          </div>
          <button id="btn-toggle-arcade-sound" style="background: #F8FAFC; border: 1.5px solid var(--border-color); padding: 7px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 800; color: var(--primary-navy); cursor: pointer;">
            ${isMuted ? '🔇 Audio: Muted' : '🔊 Audio: On'}
          </button>
        </div>

      </div>
    `;
  };

  // =========================================================================
  // UNIVERSAL GAME ROUTER & LIFECYCLE
  // =========================================================================
  window.renderArcadeGameHTML = function (gameKey) {
    if (gameKey === 'ladder') return renderLadderGameHTML();
    if (gameKey === 'inspector') return renderInspectorGameHTML();
    if (gameKey === 'hazmat') return renderHazmatGameHTML();
    if (gameKey === 'dispatcher') return renderDispatcherGameHTML();
    return renderIncotermsGameHTML();
  };

  window.renderArcadeSummaryHTML = function (gameKey) {
    return renderUnifiedSummaryHTML(gameKey);
  };

  window.exitArcadeGame = function () {
    clearInterval(gameState.timerInterval);
    gameState.active = false;
    stopArcadeBGM();
  };

  window.launchArcadeGame = function (gameKey, renderCallback) {
    currentGame = gameKey;
    gameState.active = true;
    gameState.score = 0;
    gameState.currentIndex = 0;
    gameState.correctCount = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.lives = 3;
    gameState.loadedContainers = [];
    gameState.routeProgress = 0;
    gameState.hazmatResults = [];
    gameState.userAnswers = [];
    gameState.lifelines = { fiftyFifty: true, aiClue: true, skip: true };
    gameState.activeAiClue = null;
    gameState.hiddenOptions = [];
    gameState.dispatcherTotalScore = 0;
    clearInterval(gameState.timerInterval);

    if (gameKey === 'incoterms') {
      gameState.items = shuffle(INCOTERMS_POOL).slice(0, 10);
    } else if (gameKey === 'ladder') {
      gameState.items = [...LADDER_QUESTIONS];
    } else if (gameKey === 'inspector') {
      gameState.items = shuffle(INSPECTOR_CASES).slice(0, 5);
    } else if (gameKey === 'hazmat') {
      gameState.items = shuffle(HAZMAT_CHALLENGES).slice(0, 5);
    } else if (gameKey === 'dispatcher') {
      gameState.items = shuffle(DISPATCHER_CRISES).slice(0, 5);
    }

    startArcadeBGM(gameKey);
    renderCallback('playing');

    if (gameKey === 'incoterms') {
      startIncotermsTimer(renderCallback);
    }
  };

  // =========================================================================
  // GAME 1: Incoterms Rapid Battle (20s Timer, Ship Stage, 3 Lives)
  // =========================================================================
  function renderIncotermsGameHTML() {
    const q = gameState.items[gameState.currentIndex];
    
    return `
      <div class="incoterms-game-wrapper" style="max-width: 780px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 6px;">
            ← Exit to Arcade
          </button>
          <div style="display: flex; align-items: center; gap: 14px;">
            <div id="combo-pill" style="display: ${gameState.combo > 1 ? 'inline-block' : 'none'}; background: linear-gradient(135deg, #FF5A1F, #E11D48); color: #FFF; font-size: 0.78rem; font-weight: 900; padding: 3px 10px; border-radius: 12px; animation: pulse 1s infinite;">
              🔥 ${gameState.combo}x COMBO
            </div>
            <div style="font-size: 1.15rem; font-weight: 900; color: var(--accent-orange); font-family: 'Outfit', sans-serif;">
              ${gameState.score} XP
            </div>
          </div>
        </div>

        <div class="maritime-mini-stage">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 5px;">
              <span style="font-size: 0.76rem; font-weight: 800; color: #0369A1; text-transform: uppercase;">Cargo Lives:</span>
              <span style="font-size: 1.15rem; letter-spacing: 2px;">
                ${'❤️'.repeat(Math.max(0, gameState.lives))}${'💔'.repeat(Math.max(0, 3 - gameState.lives))}
              </span>
            </div>
            <div style="font-size: 0.75rem; font-weight: 800; color: #0C4A6E; background: rgba(255,255,255,0.75); padding: 3px 10px; border-radius: 12px;">
              ⚓ Colombo ➔ 🚢 ${gameState.routeProgress}% ➔ 🇸🇬 Singapore
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 8px;">
            <div style="font-size: 2.3rem; transform: scaleX(-1);">🏗️</div>
            <div class="mini-vessel-hull" style="background: #1E293B; border-radius: 6px 18px 4px 4px; padding: 6px 14px; color: #FFF; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
              <div style="display: flex; gap: 4px; margin-bottom: 4px; min-height: 16px; align-items: flex-end;">
                ${gameState.loadedContainers.length === 0 ? `<span style="font-size: 0.7rem; color: #94A3B8;">Ready to load...</span>` : gameState.loadedContainers.map(color => `
                  <div class="mini-container-block loaded" style="background: ${color};"></div>
                `).join('')}
              </div>
              <div style="font-size: 0.72rem; font-weight: 900; letter-spacing: 1px; color: #38BDF8;">
                🚢 MV NEXUS ENTERPRISE
              </div>
            </div>
          </div>
        </div>

        <div class="game-flashcard" id="game-flashcard" style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 30px 26px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); text-align: center; position: relative; margin-bottom: 25px; transition: all 0.25s ease;">
          <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
            <span style="background: #FFF7ED; color: #C2410C; border: 1px solid #FFEDD5; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
              ${q.term}
            </span>
            <span style="background: #F1F5F9; color: #475569; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
              ${q.ruleTag}
            </span>
          </div>

          <div style="width: 100%; height: 10px; background: #F1F5F9; border-radius: 10px; overflow: hidden; margin-bottom: 8px;">
            <div id="arcade-timer-bar" style="width: 100%; height: 100%; background: linear-gradient(90deg, #10B981, #F59E0B, #EF4444); transition: width 0.05s linear;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; color: var(--text-muted); margin-bottom: 22px;">
            <span>Card ${gameState.currentIndex + 1} of ${gameState.items.length}</span>
            <span id="arcade-timer-text" style="color: #EF4444; font-family: 'Outfit', sans-serif; font-size: 0.9rem;">⏱️ 20.0s</span>
          </div>

          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; line-height: 1.45; font-weight: 700; margin: 0 0 28px 0;">
            "${q.scenario}"
          </h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <button class="btn-risk-choice" data-choice="Seller" style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFF; border: none; padding: 20px 16px; border-radius: 16px; font-weight: 800; font-size: 1.15rem; cursor: pointer; box-shadow: 0 6px 20px rgba(37,99,235,0.25);">
              🏭 SELLER
              <div style="font-size: 0.72rem; font-weight: 500; opacity: 0.85; margin-top: 4px;">Seller pays loss</div>
            </button>

            <button class="btn-risk-choice" data-choice="Buyer" style="background: linear-gradient(135deg, #FF5A1F 0%, #E11D48 100%); color: #FFF; border: none; padding: 20px 16px; border-radius: 16px; font-weight: 800; font-size: 1.15rem; cursor: pointer; box-shadow: 0 6px 20px rgba(255,90,31,0.25);">
              🏢 BUYER
              <div style="font-size: 0.72rem; font-weight: 500; opacity: 0.85; margin-top: 4px;">Buyer pays loss</div>
            </button>
          </div>

          <div id="rule-feedback-box" style="display: none; margin-top: 24px; padding: 16px; border-radius: 14px; text-align: left; animation: fadeIn 0.2s ease;"></div>
        </div>
      </div>
    `;
  }

  function startIncotermsTimer(renderCallback) {
    gameState.timeLeft = 20.0;
    const totalMs = 20000;
    let remainingMs = totalMs;

    clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
      remainingMs -= 50;
      gameState.timeLeft = Math.max(0, remainingMs / 1000).toFixed(1);

      const bar = document.getElementById('arcade-timer-bar');
      const txt = document.getElementById('arcade-timer-text');
      if (bar) bar.style.width = `${(remainingMs / totalMs) * 100}%`;
      if (txt) txt.textContent = `⏱️ ${gameState.timeLeft}s`;

      if (remainingMs <= 0) {
        clearInterval(gameState.timerInterval);
        window.handleIncotermsChoice(null, renderCallback);
      }
    }, 50);
  }

  window.handleIncotermsChoice = function (userChoice, renderCallback) {
    clearInterval(gameState.timerInterval);
    const q = gameState.items[gameState.currentIndex];
    const isCorrect = userChoice === q.answer;
    const choiceButtons = document.querySelectorAll('.btn-risk-choice');
    choiceButtons.forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.7';
    });

    const flashcard = document.getElementById('game-flashcard');
    const feedbackBox = document.getElementById('rule-feedback-box');

    if (isCorrect) {
      gameState.combo += 1;
      if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
      const multiplier = gameState.combo >= 4 ? 3 : (gameState.combo >= 2 ? 2 : 1);
      const remainingSec = parseFloat(gameState.timeLeft) || 0;
      const speedBonus = Math.round(remainingSec * 4);
      const pointsEarned = (50 * multiplier) + speedBonus;
      gameState.score += pointsEarned;
      gameState.correctCount += 1;

      const colors = ['#FF5A1F', '#38BDF8', '#10B981', '#8B5CF6', '#F59E0B'];
      gameState.loadedContainers.push(colors[gameState.currentIndex % colors.length]);
      gameState.routeProgress = Math.min(100, Math.round(((gameState.currentIndex + 1) / gameState.items.length) * 100));

      playGameSuccessSound('incoterms');

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
            🎉 Loaded Safely! (+${pointsEarned} XP including +${speedBonus} Speed Bonus)
          </div>
          <div style="font-size: 0.85rem; line-height: 1.4;">${q.explanation}</div>
        `;
      }
    } else {
      gameState.combo = 0;
      gameState.lives -= 1;
      playGameErrorSound('incoterms');

      if (flashcard) {
        flashcard.classList.add('arcade-shake');
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
            ${userChoice ? '💥 Cargo Dropped! (-1 Heart)' : '⏰ Time Ran Out! (-1 Heart)'} Right Answer: <strong>${q.answer.toUpperCase()}</strong>
          </div>
          <div style="font-size: 0.85rem; line-height: 1.4;">${q.explanation}</div>
        `;
      }
    }

    gameState.userAnswers.push({
      title: q.term,
      sub: q.scenario,
      isCorrect,
      explanation: q.explanation
    });

    setTimeout(() => {
      if (gameState.lives <= 0) {
        finishUniversalGame('incoterms', renderCallback, true);
        return;
      }

      gameState.currentIndex += 1;
      if (gameState.currentIndex >= gameState.items.length) {
        finishUniversalGame('incoterms', renderCallback, false);
      } else {
        renderCallback('playing');
        startIncotermsTimer(renderCallback);
      }
    }, 1700);
  };

  // =========================================================================
  // GAME 2: Logistics Career Ladder (With Side Progress Ladder & Smart Hints)
  // =========================================================================
  function renderLadderGameHTML() {
    const q = gameState.items[gameState.currentIndex];
    const ladderStepsReversed = [...LADDER_QUESTIONS].reverse(); // Top Tier 10 down to Tier 1

    return `
      <div class="ladder-game-wrapper" style="max-width: 1050px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.1rem; font-weight: 900; color: #2563EB; font-family: 'Outfit', sans-serif;">
            Step ${gameState.currentIndex + 1} of 10 • ${gameState.score} XP
          </div>
        </div>

        <!-- 2-Column Layout: Question Card + Side Career Ladder -->
        <div style="display: grid; grid-template-columns: minmax(0, 1fr) 290px; gap: 22px; align-items: start;" class="ladder-responsive-grid">
          
          <!-- Left: Main Question Area -->
          <div style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 30px 26px; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
              <span style="background: #EFF6FF; color: #1D4ED8; font-size: 0.85rem; font-weight: 800; padding: 6px 14px; border-radius: 20px;">
                Rank: ${q.rank} (+${(gameState.currentIndex + 1) * 100} XP)
              </span>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn-lifeline" data-type="fifty" ${!gameState.lifelines.fiftyFifty ? 'disabled style="opacity:0.4; cursor:not-allowed; padding:4px 10px; border-radius:8px;"' : 'style="background:#FFFBEB; border:1px solid #FCD34D; color:#B45309; font-size:0.78rem; font-weight:800; padding:5px 11px; border-radius:8px; cursor:pointer;"'}>
                  💡 50:50
                </button>
                <button class="btn-lifeline" data-type="ai" ${!gameState.lifelines.aiClue ? 'disabled style="opacity:0.4; cursor:not-allowed; padding:4px 10px; border-radius:8px;"' : 'style="background:#FDF4FF; border:1px solid #F0ABFC; color:#A21CAF; font-size:0.78rem; font-weight:800; padding:5px 11px; border-radius:8px; cursor:pointer;"'}>
                  🤖 Ask Nexus AI
                </button>
                <button class="btn-lifeline" data-type="skip" ${!gameState.lifelines.skip ? 'disabled style="opacity:0.4; cursor:not-allowed; padding:4px 10px; border-radius:8px;"' : 'style="background:#F1F5F9; border:1px solid #CBD5E1; color:#334155; font-size:0.78rem; font-weight:800; padding:5px 11px; border-radius:8px; cursor:pointer;"'}>
                  ⏩ Divert (New Q)
                </button>
              </div>
            </div>

            ${gameState.activeAiClue ? `
              <div style="background: #FDF4FF; border: 1.5px solid #D946EF; border-radius: 12px; padding: 13px 16px; margin-bottom: 18px; animation: fadeIn 0.2s ease;">
                <div style="font-weight: 800; font-size: 0.84rem; color: #A21CAF; margin-bottom: 3px;">🤖 Nexus AI Hint:</div>
                <div style="font-size: 0.88rem; color: #4A044E; line-height: 1.45;">${gameState.activeAiClue}</div>
              </div>
            ` : ''}

            <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.3rem; line-height: 1.5; font-weight: 700; margin: 0 0 24px 0;">
              ${q.question}
            </h2>

            <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
              ${q.options.map((opt, idx) => {
                const isHidden = gameState.hiddenOptions.includes(idx);
                if (isHidden) return `<div style="visibility:hidden; height:48px;"></div>`;
                return `
                  <button class="btn-ladder-choice" data-index="${idx}" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; padding: 16px 20px; border-radius: 14px; text-align: left; font-weight: 700; font-size: 0.98rem; color: var(--primary-navy); cursor: pointer; transition: all 0.15s ease;">
                    <span style="font-weight: 900; color: #2563EB; margin-right: 8px;">${String.fromCharCode(65 + idx)}.</span> ${opt}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right: Side Career Ladder Steps Panel -->
          <div style="background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%); border-radius: 22px; padding: 18px 16px; color: #FFF; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);">
            <div style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 0.95rem; color: #38BDF8; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
              <span>🪜 Career Ladder</span>
              <span style="font-size: 0.72rem; color: #94A3B8;">10 Steps</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${ladderStepsReversed.map(stepObj => {
                const stepIdx = stepObj.tier - 1;
                const isPassed = stepIdx < gameState.currentIndex;
                const isCurrent = stepIdx === gameState.currentIndex;
                const rewardXp = stepObj.tier * 100;

                let bg = 'rgba(255, 255, 255, 0.05)';
                let border = '1px solid rgba(255, 255, 255, 0.08)';
                let textColor = '#94A3B8';
                let icon = '🔒';

                if (isPassed) {
                  bg = 'rgba(16, 185, 129, 0.2)';
                  border = '1px solid #10B981';
                  textColor = '#6EE7B7';
                  icon = '✅';
                } else if (isCurrent) {
                  bg = 'linear-gradient(90deg, #2563EB, #3B82F6)';
                  border = '1.5px solid #93C5FD';
                  textColor = '#FFFFFF';
                  icon = '▶';
                }

                return `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 7px 10px; border-radius: 10px; background: ${bg}; border: ${border}; font-size: 0.76rem; font-weight: ${isCurrent ? '800' : '600'}; color: ${textColor};">
                    <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                      <span>${icon}</span>
                      <span>${stepObj.tier}. ${stepObj.rank.replace(' 👑', '')}</span>
                    </div>
                    <span style="font-weight: 800; font-size: 0.7rem; color: ${isCurrent ? '#FDE047' : (isPassed ? '#34D399' : '#64748B')};">+${rewardXp}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  window.handleLadderAnswer = function (chosenIdx, renderCallback) {
    const q = gameState.items[gameState.currentIndex];
    const isCorrect = chosenIdx === q.answer;

    if (isCorrect) {
      gameState.score += (gameState.currentIndex + 1) * 100;
      gameState.correctCount += 1;
      playGameSuccessSound('ladder');
      gameState.userAnswers.push({
        title: `Step ${q.tier}: ${q.rank}`,
        sub: q.question,
        isCorrect: true,
        explanation: `Right answer: ${q.options[q.answer]}`
      });

      gameState.currentIndex += 1;
      gameState.activeAiClue = null;
      gameState.hiddenOptions = [];

      if (gameState.currentIndex >= gameState.items.length) {
        finishUniversalGame('ladder', renderCallback, false);
      } else {
        renderCallback('playing');
      }
    } else {
      playGameErrorSound('ladder');
      gameState.userAnswers.push({
        title: `Step ${q.tier}: ${q.rank}`,
        sub: q.question,
        isCorrect: false,
        explanation: `Wrong answer. Right answer was: ${q.options[q.answer]}`
      });
      finishUniversalGame('ladder', renderCallback, true);
    }
  };

  window.handleLadderLifeline = function (type, renderCallback) {
    if (!gameState.lifelines[type]) return;
    const q = gameState.items[gameState.currentIndex];

    if (type === 'fiftyFifty') {
      gameState.lifelines.fiftyFifty = false;
      const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.answer);
      gameState.hiddenOptions = shuffle(wrongIndices).slice(0, 2);
      playLifelineSound('fiftyFifty');
      renderCallback('playing');
    } else if (type === 'aiClue') {
      gameState.lifelines.aiClue = false;
      gameState.activeAiClue = q.aiHint;
      playLifelineSound('aiClue');
      renderCallback('playing');
    } else if (type === 'skip') {
      // Divert replaces current question with a brand-new backup question at the same Tier!
      gameState.lifelines.skip = false;
      const backupQ = LADDER_BACKUP_QUESTIONS[gameState.currentIndex];
      if (backupQ) {
        gameState.items[gameState.currentIndex] = backupQ;
      }
      gameState.activeAiClue = null;
      gameState.hiddenOptions = [];
      playLifelineSound('skip');
      renderCallback('playing');
    }
  };

  // =========================================================================
  // GAME 3: Port Inspector Detective (10 Cases, All Fields Guaranteed Clickable!)
  // =========================================================================
  function renderInspectorGameHTML() {
    const c = gameState.items[gameState.currentIndex];
    return `
      <div class="inspector-game-wrapper" style="max-width: 840px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.15rem; font-weight: 900; color: #7C3AED; font-family: 'Outfit', sans-serif;">
            Case ${gameState.currentIndex + 1} of ${gameState.items.length} • ${gameState.score} XP
          </div>
        </div>

        <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border: 2px solid var(--accent-orange); border-radius: 16px; padding: 16px 20px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(255,90,31,0.12);">
          <div style="font-size: 0.78rem; font-weight: 900; color: #C2410C; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
            🕵️ Customs Check Note
          </div>
          <div style="font-size: 0.98rem; font-weight: 800; color: var(--primary-navy); line-height: 1.4;">
            "${c.customsDecl}"
          </div>
          <div style="font-size: 0.82rem; color: #9A3412; font-weight: 700; margin-top: 4px;">
            👉 Find the mismatch on the Bill of Lading paper below and click directly on the wrong detail!
          </div>
        </div>

        <div class="realistic-doc-paper" id="realistic-doc-paper">
          <div class="doc-rubber-stamp">CUSTOMS CHECK</div>

          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #78716C; padding-bottom: 12px; margin-bottom: 16px;">
            <div>
              <div style="font-weight: 900; font-size: 1.15rem; letter-spacing: 1px; color: #1C1917;">${c.carrier}</div>
              <div style="font-size: 0.75rem; color: #78716C; font-weight: 700; margin-top: 2px;">${c.docType} • B/L NO: ${c.docNumber}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-family: monospace; font-size: 1.4rem; letter-spacing: 2px; color: #44403C;">||| | ||||| || ||||</div>
              <div style="font-size: 0.68rem; color: #78716C; text-transform: uppercase;">VERIFIED SHIPPING COPY</div>
            </div>
          </div>

          <div style="border: 1px solid #A8A29E; border-radius: 6px; overflow: hidden; margin-bottom: 14px; background: #FFF;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #CBD5E1;">
              <div style="padding: 10px 14px; border-right: 1px solid #CBD5E1;">
                <div style="font-size: 0.7rem; color: #78716C; text-transform: uppercase; font-weight: 800;">${c.shipper.label}:</div>
                <div class="doc-inspect-hotspot" data-key="${c.shipper.key}" style="font-size: 0.88rem; font-weight: 700;">
                  ${c.shipper.value}
                </div>
              </div>
              <div style="padding: 10px 14px;">
                <div style="font-size: 0.7rem; color: #78716C; text-transform: uppercase; font-weight: 800;">${c.consignee.label}:</div>
                <div class="doc-inspect-hotspot" data-key="${c.consignee.key}" style="font-size: 0.88rem; font-weight: 700;">
                  ${c.consignee.value}
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #CBD5E1; background: #FAFAF9;">
              <div style="padding: 8px 14px; border-right: 1px solid #CBD5E1;">
                <div style="font-size: 0.7rem; color: #78716C; text-transform: uppercase; font-weight: 800;">${c.pol.label}:</div>
                <div class="doc-inspect-hotspot" data-key="${c.pol.key}" style="font-size: 0.88rem; font-weight: 700;">
                  ${c.pol.value}
                </div>
              </div>
              <div style="padding: 8px 14px;">
                <div style="font-size: 0.7rem; color: #78716C; text-transform: uppercase; font-weight: 800;">${c.pod.label}:</div>
                <div class="doc-inspect-hotspot" data-key="${c.pod.key}" style="font-size: 0.88rem; font-weight: 700;">
                  ${c.pod.value}
                </div>
              </div>
            </div>

            <div style="padding: 12px 14px;">
              <div style="font-size: 0.7rem; color: #78716C; text-transform: uppercase; font-weight: 800; margin-bottom: 6px;">Description of Cargo and Goods:</div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${c.goodsFields.map(f => `
                  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #E7E5E4; padding-bottom: 5px;">
                    <span style="font-size: 0.82rem; font-weight: 800; color: #44403C;">${f.label}:</span>
                    <span class="doc-inspect-hotspot" data-key="${f.key}" style="font-size: 0.9rem; font-weight: 800; color: #1C1917;">
                      ${f.value}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div id="inspector-feedback" style="display: none; padding: 12px 16px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 800; animation: fadeIn 0.2s ease;"></div>
        </div>
      </div>
    `;
  }

  window.handleInspectorHotspotClick = function (fieldKey, renderCallback) {
    const c = gameState.items[gameState.currentIndex];
    const allFields = [c.shipper, c.consignee, c.pol, c.pod, ...c.goodsFields];
    const fieldObj = allFields.find(f => f.key === fieldKey);
    const feedback = document.getElementById('inspector-feedback');
    const clickedHotspot = document.querySelector(`.doc-inspect-hotspot[data-key="${fieldKey}"]`);

    if (!fieldObj) return;

    if (fieldObj.isError) {
      if (clickedHotspot) clickedHotspot.classList.add('correct-hit');
      // Disable further clicks while transitioning
      document.querySelectorAll('.doc-inspect-hotspot').forEach(el => {
        el.style.pointerEvents = 'none';
      });

      gameState.score += 250;
      gameState.correctCount += 1;
      playGameSuccessSound('inspector');

      if (feedback) {
        feedback.style.display = 'block';
        feedback.style.background = '#ECFDF5';
        feedback.style.border = '1.5px solid #10B981';
        feedback.style.color = '#065F46';
        feedback.innerHTML = `
          🎯 MISTAKE CAUGHT! (+250 XP)<br>
          <span style="font-weight: 500; font-size: 0.85rem; color: #047857;">${fieldObj.flawReason}</span>
        `;
      }

      gameState.userAnswers.push({
        title: c.title,
        sub: `Wrong Detail Found: ${fieldObj.label} (${fieldObj.value})`,
        isCorrect: true,
        explanation: fieldObj.flawReason
      });

      setTimeout(() => {
        gameState.currentIndex += 1;
        if (gameState.currentIndex >= gameState.items.length) {
          finishUniversalGame('inspector', renderCallback, false);
        } else {
          renderCallback('playing');
        }
      }, 1800);

    } else {
      playGameErrorSound('inspector');
      if (clickedHotspot) {
        clickedHotspot.classList.add('wrong-hit');
        setTimeout(() => clickedHotspot.classList.remove('wrong-hit'), 500);
      }
      if (feedback) {
        feedback.style.display = 'block';
        feedback.style.background = '#FEF2F2';
        feedback.style.border = '1.5px solid #EF4444';
        feedback.style.color = '#991B1B';
        feedback.innerHTML = `
          ❌ That detail is correct! Compare the Customs Check Note with other fields on the form.
        `;
      }
    }
  };

  // =========================================================================
  // GAME 4: DG HazMat Hazard (10-Pool Shuffle 5 + Top Safety Bar + Explosion!)
  // =========================================================================
  function renderHazmatGameHTML() {
    const h = gameState.items[gameState.currentIndex];
    const dangerCount = gameState.hazmatResults.filter(r => r === 'danger').length;

    return `
      <div class="hazmat-game-wrapper" style="max-width: 780px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.1rem; font-weight: 900; color: #DC2626; font-family: 'Outfit', sans-serif;">
            Challenge ${gameState.currentIndex + 1} of 5 • ${gameState.score} XP
          </div>
        </div>

        <!-- TOP CARGO SAFETY / LIFE BAR (5 Segments) -->
        <div style="background: #0F172A; border: 2px solid ${dangerCount >= 2 ? '#EF4444' : '#334155'}; border-radius: 18px; padding: 14px 20px; margin-bottom: 20px; color: #FFF; box-shadow: 0 6px 18px rgba(0,0,0,0.18);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
            <span style="font-size: 0.8rem; font-weight: 800; color: #F8FAFC; text-transform: uppercase;">
              🛡️ Container Safety Bar (Need 3 Safe to Pass)
            </span>
            <span style="font-size: 0.78rem; font-weight: 800; color: ${dangerCount >= 3 ? '#F87171' : (dangerCount === 2 ? '#FBBF24' : '#4ADE80')};">
              ${dangerCount >= 3 ? '💥 CRITICAL HAZARD! EXPLOSION IMMINENT!' : (dangerCount === 2 ? '⚠️ WARNING: 1 More Error = Explosion!' : '✅ Container Stable')}
            </span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;">
            ${[0, 1, 2, 3, 4].map(idx => {
              const res = gameState.hazmatResults[idx];
              let bg = '#334155';
              let border = '#475569';
              let txt = `Check ${idx + 1}`;
              if (res === 'safe') {
                bg = '#10B981';
                border = '#34D399';
                txt = '✅ SAFE';
              } else if (res === 'danger') {
                bg = '#EF4444';
                border = '#FCA5A5';
                txt = '💥 RISK';
              } else if (idx === gameState.currentIndex) {
                bg = '#1D4ED8';
                border = '#60A5FA';
                txt = '▶ NOW';
              }
              return `
                <div style="background: ${bg}; border: 1.5px solid ${border}; border-radius: 10px; padding: 6px 4px; text-align: center; font-size: 0.72rem; font-weight: 800; color: #FFF;">
                  ${txt}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div id="hazmat-card" style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 30px 26px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); text-align: center; margin-bottom: 25px;">
          <span style="background: #FEE2E2; color: #B91C1C; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
            ⚠️ Dangerous Goods Loading Check
          </span>

          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.32rem; margin: 16px 0 24px 0;">
            ${h.question}
          </h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 26px;">
            <div style="background: #F8FAFC; border: 2px solid ${h.cargoA.badge}; border-radius: 16px; padding: 18px;">
              <div style="font-size: 2.6rem; margin-bottom: 8px;">${h.cargoA.icon}</div>
              <div style="font-weight: 800; font-size: 0.98rem; color: var(--primary-navy);">${h.cargoA.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; margin-top: 4px;">${h.cargoA.class}</div>
            </div>
            <div style="background: #F8FAFC; border: 2px solid ${h.cargoB.badge}; border-radius: 16px; padding: 18px;">
              <div style="font-size: 2.6rem; margin-bottom: 8px;">${h.cargoB.icon}</div>
              <div style="font-weight: 800; font-size: 0.98rem; color: var(--primary-navy);">${h.cargoB.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; margin-top: 4px;">${h.cargoB.class}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <button class="btn-hazmat-choice" data-choice="Prohibited" style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: #FFF; border: none; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 15px rgba(220,38,38,0.3);">
              🚫 NO (Keep Separate)
            </button>
            <button class="btn-hazmat-choice" data-choice="Permitted" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFF; border: none; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 15px rgba(5,150,105,0.3);">
              ✅ YES (Load Together)
            </button>
          </div>

          <div id="hazmat-feedback-box" style="display: none; margin-top: 20px; padding: 14px 16px; border-radius: 12px; text-align: left; animation: fadeIn 0.2s ease;"></div>
        </div>
      </div>
    `;
  }

  window.handleHazmatAnswer = function (choice, renderCallback) {
    const h = gameState.items[gameState.currentIndex];
    const isCorrect = choice === h.answer;

    document.querySelectorAll('.btn-hazmat-choice').forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.7';
    });

    const card = document.getElementById('hazmat-card');
    const fb = document.getElementById('hazmat-feedback-box');

    if (isCorrect) {
      gameState.score += 200;
      gameState.correctCount += 1;
      gameState.hazmatResults.push('safe');
      playGameSuccessSound('hazmat');

      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#ECFDF5';
        fb.style.border = '1.5px solid #10B981';
        fb.style.color = '#065F46';
        fb.innerHTML = `<strong>✅ SAFE DECISION! (+200 XP)</strong><br><span style="font-size:0.85rem;">${h.rule}</span>`;
      }
    } else {
      gameState.hazmatResults.push('danger');
      playGameErrorSound('hazmat');
      if (card) card.classList.add('arcade-shake');

      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#FEF2F2';
        fb.style.border = '1.5px solid #EF4444';
        fb.style.color = '#991B1B';
        fb.innerHTML = `<strong>🔥 UNSAFE MIX! Chemical Hazard!</strong><br><span style="font-size:0.85rem;">${h.rule}</span>`;
      }
    }

    gameState.userAnswers.push({
      title: h.title,
      sub: `Your choice: ${choice === 'Prohibited' ? 'Keep Separate' : 'Load Together'}`,
      isCorrect,
      explanation: h.rule
    });

    setTimeout(() => {
      gameState.currentIndex += 1;
      if (gameState.currentIndex >= gameState.items.length) {
        const exploded = gameState.correctCount < 3; // 0, 1, or 2 correct triggers explosion!
        finishUniversalGame('hazmat', renderCallback, exploded);
      } else {
        renderCallback('playing');
      }
    }, 1500);
  };

  // =========================================================================
  // GAME 5: The Route Dispatcher: Crisis Simulator (10 Crises Shuffle 5 + SVGs!)
  // =========================================================================
  function renderDispatcherGameHTML() {
    const d = gameState.items[gameState.currentIndex];
    return `
      <div class="dispatcher-game-wrapper" style="max-width: 840px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.1rem; font-weight: 900; color: #059669; font-family: 'Outfit', sans-serif;">
            Crisis ${gameState.currentIndex + 1} of 5 • ${gameState.score} XP
          </div>
        </div>

        <div id="dispatcher-card" style="background: var(--bg-white); border: 2px solid #0F172A; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 35px rgba(15, 23, 42, 0.14); margin-bottom: 25px;">
          
          <!-- Custom SVG Command Scene Header -->
          <div style="position: relative; background: #0F172A; border-bottom: 3px solid #10B981;">
            ${getCrisisArtworkSVG(d.id)}
            <div style="position: absolute; top: 10px; right: 14px; background: rgba(239, 68, 68, 0.9); color: #FFF; font-size: 0.7rem; font-weight: 900; padding: 3px 10px; border-radius: 12px; letter-spacing: 0.5px;">
              🚨 ${d.badge}
            </div>
          </div>

          <div style="padding: 26px 28px;">
            <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.38rem; margin: 0 0 8px 0; font-weight: 800;">
              ${d.title}
            </h2>
            <p style="color: var(--text-muted); font-size: 0.94rem; line-height: 1.5; margin: 0 0 22px 0;">
              ${d.situation}
            </p>

            <h3 style="font-size: 0.95rem; color: var(--primary-navy); font-weight: 800; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.4px;">
              Choose your emergency plan:
            </h3>

            <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
              ${d.options.map((opt, idx) => `
                <button class="btn-dispatcher-choice" data-index="${idx}" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; padding: 16px 20px; border-radius: 14px; text-align: left; cursor: pointer; transition: all 0.15s ease;">
                  <div style="font-weight: 800; font-size: 0.98rem; color: var(--primary-navy); margin-bottom: 4px;">
                    ${opt.label}
                  </div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: #0284C7;">
                    ${opt.tradeoff}
                  </div>
                </button>
              `).join('')}
            </div>

            <div id="dispatcher-feedback-box" style="display: none; margin-top: 20px; padding: 14px 16px; border-radius: 12px; text-align: left; animation: fadeIn 0.2s ease;"></div>
          </div>
        </div>
      </div>
    `;
  }

  window.handleDispatcherAnswer = function (chosenIdx, renderCallback) {
    const d = gameState.items[gameState.currentIndex];
    const opt = d.options[chosenIdx];
    const isOptimal = opt.score >= 80;

    document.querySelectorAll('.btn-dispatcher-choice').forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.7';
    });

    gameState.score += opt.score * 2;
    gameState.dispatcherTotalScore += opt.score;
    gameState.correctCount += (isOptimal ? 1 : 0);

    if (isOptimal) playGameSuccessSound('dispatcher');
    else playGameErrorSound('dispatcher');

    const fb = document.getElementById('dispatcher-feedback-box');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = isOptimal ? '#ECFDF5' : '#FEF2F2';
      fb.style.border = `1.5px solid ${isOptimal ? '#10B981' : '#EF4444'}`;
      fb.style.color = isOptimal ? '#065F46' : '#991B1B';
      fb.innerHTML = `
        <strong>${isOptimal ? '✅' : '⚠️'} ${opt.rating} (+${opt.score * 2} XP)</strong><br>
        <span style="font-size: 0.85rem;">Result: ${opt.outcome}</span>
      `;
    }

    gameState.userAnswers.push({
      title: d.title,
      sub: `${opt.rating} (${opt.label})`,
      isCorrect: isOptimal,
      explanation: opt.outcome
    });

    setTimeout(() => {
      gameState.currentIndex += 1;
      if (gameState.currentIndex >= gameState.items.length) {
        finishUniversalGame('dispatcher', renderCallback, false);
      } else {
        renderCallback('playing');
      }
    }, 1600);
  };

  // =========================================================================
  // UNIFIED SUMMARY SCREEN (With HazMat Explosion & Crisis Rating!)
  // =========================================================================
  function renderUnifiedSummaryHTML(gameKey) {
    const totalCount = Math.max(1, gameState.items.length);
    const accuracy = Math.round((gameState.correctCount / totalCount) * 100);
    const isIncotermsLoss = gameKey === 'incoterms' && gameState.lives <= 0;
    const isHazmatExplosion = gameKey === 'hazmat' && gameState.correctCount < 3;
    const isLadderVictory = gameKey === 'ladder' && gameState.correctCount >= 10;

    // Special Grand Celebration Screen when winning all 10 Steps of Career Ladder!
    if (isLadderVictory) {
      const confettiColors = ['#FACC15', '#38BDF8', '#4ADE80', '#F472B6', '#FB923C', '#A78BFA'];
      const confettiSpans = Array.from({ length: 18 }).map((_, i) => {
        const left = (i * 5.5 + 2) % 96;
        const delay = ((i * 0.27) % 2.4).toFixed(2);
        const color = confettiColors[i % confettiColors.length];
        return `<span class="confetti-piece" style="left:${left}%; background:${color}; animation-delay:${delay}s;"></span>`;
      }).join('');

      return `
        <div class="arcade-summary-wrapper" style="max-width: 780px; margin: 0 auto; font-family: 'Inter', sans-serif; text-align: center;">
          <div class="tycoon-celebration-card">
            ${confettiSpans}

            <div class="trophy-float" style="font-size: 4.5rem; margin-bottom: 10px; position: relative; z-index: 2;">
              👑🏆
            </div>

            <div style="position: relative; z-index: 2;">
              <div style="display: inline-block; background: linear-gradient(90deg, #FACC15, #F59E0B); color: #0F172A; font-size: 0.8rem; font-weight: 900; padding: 6px 18px; border-radius: 30px; letter-spacing: 0.8px; margin-bottom: 14px; box-shadow: 0 4px 15px rgba(250, 204, 21, 0.4);">
                ✨ ALL 10 CAREER STEPS CONQUERED ✨
              </div>

              <h2 style="font-family: 'Outfit', sans-serif; font-size: 2.35rem; margin: 0 0 10px 0; font-weight: 900; color: #FDE047; text-shadow: 0 4px 18px rgba(250,204,21,0.35);">
                GLOBAL LOGISTICS TYCOON!
              </h2>

              <p style="color: #E2E8F0; font-size: 1rem; margin: 0 auto 24px auto; max-width: 540px; line-height: 1.55;">
                Congratulations! You climbed every single step from Junior Trainee to the top executive crown with 10/10 right answers!
              </p>

              <!-- 10-Step Golden Ladder Strip -->
              <div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px;">
                ${Array.from({ length: 10 }).map((_, idx) => `
                  <div style="background: rgba(250, 204, 21, 0.2); border: 1.5px solid #FACC15; color: #FDE047; padding: 5px 10px; border-radius: 10px; font-size: 0.75rem; font-weight: 900;">
                    ${idx === 9 ? '10 👑' : `${idx + 1} ✅`}
                  </div>
                `).join('')}
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 540px; margin: 0 auto 30px auto;">
                <div style="background: rgba(255,255,255,0.08); padding: 18px 10px; border-radius: 16px; border: 1px solid rgba(250,204,21,0.35);">
                  <div style="font-size: 1.9rem; font-weight: 900; color: #FACC15; font-family: 'Outfit', sans-serif;">+${gameState.score}</div>
                  <div style="font-size: 0.74rem; font-weight: 800; color: #CBD5E1; text-transform: uppercase;">Grand Prize XP</div>
                </div>
                <div style="background: rgba(255,255,255,0.08); padding: 18px 10px; border-radius: 16px; border: 1px solid rgba(74,222,128,0.35);">
                  <div style="font-size: 1.9rem; font-weight: 900; color: #4ADE80; font-family: 'Outfit', sans-serif;">10 / 10</div>
                  <div style="font-size: 0.74rem; font-weight: 800; color: #CBD5E1; text-transform: uppercase;">Steps Climbed</div>
                </div>
                <div style="background: rgba(255,255,255,0.08); padding: 18px 10px; border-radius: 16px; border: 1px solid rgba(56,189,248,0.35);">
                  <div style="font-size: 1.9rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">100%</div>
                  <div style="font-size: 0.74rem; font-weight: 800; color: #CBD5E1; text-transform: uppercase;">Tycoon Mastery</div>
                </div>
              </div>

              <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
                <button id="btn-replay-game" class="btn" style="background: linear-gradient(135deg, #FACC15 0%, #EAB308 100%); color: #0F172A; border: none; padding: 14px 28px; border-radius: 14px; font-weight: 900; font-size: 0.95rem; cursor: pointer; box-shadow: 0 6px 20px rgba(250,204,21,0.35);">
                  🔄 Climb Again
                </button>
                <button id="btn-return-arcade" style="padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; border: 1.5px solid rgba(255,255,255,0.4); background: rgba(255,255,255,0.12); color: #FFFFFF; cursor: pointer;">
                  🕹️ Return to Arcade
                </button>
              </div>
            </div>
          </div>

          ${renderAnswersReviewListHTML()}
        </div>
      `;
    }

    // Special HazMat Explosion Game Over Screen!
    if (isHazmatExplosion) {
      return `
        <div class="arcade-summary-wrapper arcade-shake" style="max-width: 780px; margin: 0 auto; font-family: 'Inter', sans-serif; text-align: center;">
          <div style="background: linear-gradient(135deg, #450A0A 0%, #991B1B 50%, #DC2626 100%); border: 3px solid #FCA5A5; border-radius: 24px; padding: 36px 28px; color: #FFFFFF; box-shadow: 0 20px 50px rgba(220, 38, 38, 0.45); margin-bottom: 25px; position: relative; overflow: hidden;">
            
            <!-- Animated Explosion SVG Scene -->
            <div style="margin: 0 auto 14px auto; width: 150px; height: 120px;">
              <svg viewBox="0 0 180 140" style="width:100%; height:100%;">
                <polygon points="90,5 110,45 155,25 130,65 170,85 125,95 145,130 95,105 60,135 65,95 15,90 55,65 25,25 70,45" fill="#F97316" stroke="#FDE047" stroke-width="4"/>
                <polygon points="90,25 105,55 135,45 115,75 140,95 105,95 90,120 75,95 40,95 65,75 45,45 75,55" fill="#FACC15"/>
                <text x="72" y="84" font-size="34">💥</text>
              </svg>
            </div>

            <div style="display: inline-block; background: #000000; color: #FDE047; font-size: 0.78rem; font-weight: 900; padding: 5px 14px; border-radius: 20px; letter-spacing: 1px; margin-bottom: 10px;">
              🚨 CONTAINER EXPLODED AT PORT 🚨
            </div>

            <h2 style="font-family: 'Outfit', sans-serif; font-size: 2.1rem; margin: 0 0 10px 0; font-weight: 900; color: #FFF;">
              KABOOM! Chemical Explosion!
            </h2>
            <p style="color: #FECACA; font-size: 0.98rem; margin: 0 auto 24px auto; max-width: 540px; line-height: 1.5;">
              You only passed <strong>${gameState.correctCount} out of 5</strong> checks. Loading dangerous chemicals together caused a fire and container blast! (You must get at least 3/5 safe).
            </p>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; max-width: 400px; margin: 0 auto 28px auto;">
              <div style="background: rgba(0,0,0,0.35); padding: 16px 10px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 1.7rem; font-weight: 900; color: #FDE047; font-family: 'Outfit', sans-serif;">${gameState.correctCount}/5</div>
                <div style="font-size: 0.75rem; font-weight: 700; color: #FECACA; text-transform: uppercase;">Safe Checks</div>
              </div>
              <div style="background: rgba(0,0,0,0.35); padding: 16px 10px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 1.7rem; font-weight: 900; color: #FCA5A5; font-family: 'Outfit', sans-serif;">EXPLODED</div>
                <div style="font-size: 0.75rem; font-weight: 700; color: #FECACA; text-transform: uppercase;">Container Status</div>
              </div>
            </div>

            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
              <button id="btn-replay-game" class="btn" style="background: #FACC15; color: #0F172A; border: none; padding: 14px 28px; border-radius: 14px; font-weight: 900; font-size: 0.95rem; cursor: pointer;">
                🔄 Try New Safety Check
              </button>
              <button id="btn-return-arcade" style="padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; border: 1.5px solid rgba(255,255,255,0.4); background: rgba(255,255,255,0.15); color: #FFFFFF; cursor: pointer;">
                🕹️ Return to Arcade
              </button>
            </div>
          </div>

          ${renderAnswersReviewListHTML()}
        </div>
      `;
    }

    // Dispatcher Specific Crisis Management Verdict
    let crisisRatingBanner = '';
    if (gameKey === 'dispatcher') {
      const avgCrisisScore = Math.round(gameState.dispatcherTotalScore / totalCount);
      let ratingTitle = "🚨 POOR CRISIS MANAGEMENT - Supply Chain Breakdown!";
      let ratingDesc = "Too many wrong routes caused severe cargo delays, spoilage, or heavy penalties. Review the better options below.";
      let ratingBg = "#FEF2F2";
      let ratingBorder = "#EF4444";
      let ratingColor = "#991B1B";

      if (avgCrisisScore >= 85 && gameState.correctCount >= 4) {
        ratingTitle = "🌟 EXCELLENT CRISIS MANAGEMENT - Master Dispatcher!";
        ratingDesc = "Amazing work! You handled global disruptions smoothly, protected cargo, and kept shipments moving.";
        ratingBg = "#ECFDF5";
        ratingBorder = "#10B981";
        ratingColor = "#065F46";
      } else if (avgCrisisScore >= 65 && gameState.correctCount >= 3) {
        ratingTitle = "👍 GOOD CRISIS CONTROL - Mostly Safe";
        ratingDesc = "You saved most shipments well, though a couple of choices caused extra cost or delays.";
        ratingBg = "#FFFBEB";
        ratingBorder = "#F59E0B";
        ratingColor = "#92400E";
      }

      crisisRatingBanner = `
        <div style="background: ${ratingBg}; border: 2px solid ${ratingBorder}; border-radius: 16px; padding: 16px 20px; margin: 0 auto 24px auto; max-width: 560px; text-align: left;">
          <div style="font-weight: 900; font-size: 1rem; color: ${ratingColor}; margin-bottom: 4px;">${ratingTitle}</div>
          <div style="font-size: 0.86rem; color: ${ratingColor}; line-height: 1.45;">${ratingDesc}</div>
        </div>
      `;
    }

    let rankBadge = isIncotermsLoss
      ? "S.O.S! Cargo Lost at Sea 💥"
      : (accuracy === 100
          ? "Global Trade Champion 👑"
          : (accuracy >= 60 ? "Senior Logistics Pro 🥇" : "Junior Forwarder 🥈"));
    let badgeColor = isIncotermsLoss ? "#DC2626" : (accuracy >= 60 ? "#10B981" : "#FF5A1F");

    const isLadderStop = gameKey === 'ladder' && gameState.correctCount < 10;

    return `
      <div class="arcade-summary-wrapper" style="max-width: 780px; margin: 0 auto; font-family: 'Inter', sans-serif; text-align: center;">
        <div style="background: var(--bg-white); border: 2px solid ${(isIncotermsLoss || isLadderStop) ? '#EF4444' : 'var(--border-color)'}; border-radius: 24px; padding: 38px 28px; box-shadow: 0 15px 40px rgba(0,0,0,0.06); margin-bottom: 25px;">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">${isIncotermsLoss ? '🌊' : (isLadderStop ? '🪜' : '🎉')}</div>
          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 2rem; margin: 0 0 6px 0; font-weight: 800;">
            ${isIncotermsLoss ? 'Ship Abandoned - Out of Lives!' : (isLadderStop ? `Climb Stopped at Step ${gameState.correctCount + 1} of 10` : (gameKey === 'hazmat' ? 'Container Safe & Approved! ✅' : 'Mission Complete!'))}
          </h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0 0 22px 0;">
            ${isIncotermsLoss ? 'You lost all 3 cargo hearts. Check the rules below and try again!' : (isLadderStop ? 'Good effort! Check the answer below and climb again to win the Tycoon Crown.' : 'Here is your game score and review.')}
          </p>

          <div style="display: inline-block; background: #F8FAFC; border: 2px solid ${badgeColor}; padding: 8px 24px; border-radius: 30px; margin-bottom: 24px;">
            <span style="font-size: 1.05rem; font-weight: 900; color: ${badgeColor}; font-family: 'Outfit', sans-serif;">
              ${rankBadge}
            </span>
          </div>

          ${crisisRatingBanner}

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 520px; margin: 0 auto 28px auto;">
            <div style="background: #FFF7ED; padding: 18px 10px; border-radius: 16px; border: 1px solid #FFEDD5;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #FF5A1F; font-family: 'Outfit', sans-serif;">+${gameState.score}</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #C2410C; text-transform: uppercase;">XP Earned</div>
            </div>
            <div style="background: #F0FDF4; padding: 18px 10px; border-radius: 16px; border: 1px solid #DCFCE7;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #10B981; font-family: 'Outfit', sans-serif;">${accuracy}%</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #15803D; text-transform: uppercase;">Score (${gameState.correctCount}/${totalCount})</div>
            </div>
            <div style="background: #EFF6FF; padding: 18px 10px; border-radius: 16px; border: 1px solid #DBEAFE;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #2563EB; font-family: 'Outfit', sans-serif;">${gameState.maxCombo}x</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #1D4ED8; text-transform: uppercase;">Max Combo</div>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button id="btn-replay-game" class="btn btn-primary" style="padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; cursor: pointer;">
              🔄 Play Again
            </button>
            <button id="btn-return-arcade" style="padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; border: 1.5px solid var(--border-color); background: #F8FAFC; color: var(--primary-navy, #0F172A); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
              🕹️ Return to Arcade
            </button>
          </div>
        </div>

        ${renderAnswersReviewListHTML()}
      </div>
    `;
  }

  function renderAnswersReviewListHTML() {
    return `
      <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.25rem; margin: 0 0 16px 0; text-align: left;">
        📝 Step-by-Step Review
      </h3>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; text-align: left;">
        ${gameState.userAnswers.map((item, idx) => `
          <div style="background: var(--bg-white); border-left: 4px solid ${item.isCorrect ? '#10B981' : '#EF4444'}; border-radius: 12px; padding: 16px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-weight: 800; font-size: 0.88rem; color: var(--primary-navy);">${idx + 1}. ${item.title}</span>
              <span style="font-size: 0.75rem; font-weight: 800; color: ${item.isCorrect ? '#10B981' : '#EF4444'};">
                ${item.isCorrect ? '✓ RIGHT' : '✗ WRONG'}
              </span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0 0 8px 0; line-height: 1.4;">${item.sub}</p>
            <div style="font-size: 0.82rem; background: #F8FAFC; padding: 8px 12px; border-radius: 8px; color: var(--primary-navy);">
              <strong>Reason:</strong> ${item.explanation}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function finishUniversalGame(gameKey, renderCallback, isFailureSound = false) {
    clearInterval(gameState.timerInterval);
    gameState.active = false;
    stopArcadeBGM();

    if (gameKey === 'hazmat' && isFailureSound) {
      playExplosionSound();
    } else if (isFailureSound) {
      playGameErrorSound(gameKey);
    } else {
      playGameFanfare(gameKey);
    }

    const stats = getArcadeStats();
    stats.totalXp += gameState.score;
    stats.gamesPlayed += 1;
    if (gameState.maxCombo > (stats.bestCombo || 0)) {
      stats.bestCombo = gameState.maxCombo;
    }
    saveArcadeStats(stats);

    renderCallback('summary');
  }

  window.toggleArcadeSound = function () {
    isMuted = !isMuted;
    localStorage.setItem('nexus_arcade_muted', isMuted);
    if (isMuted) {
      stopArcadeBGM();
    } else if (gameState.active) {
      startArcadeBGM(currentGame);
    }
    return isMuted;
  };

  window.getCurrentArcadeGame = function () {
    return currentGame;
  };

})();
