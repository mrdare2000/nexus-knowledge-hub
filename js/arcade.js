// Nexus Logistics Arcade - Gamified Micro-Learning Engine
// Complete 5-Game Suite with Web Audio BGM & Sound FX

(function () {
  'use strict';

  // =========================================================================
  // AUDIO SYNTHESIZER ENGINE (Web Audio API - 100% Offline, Zero Lag)
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
    setTimeout(() => playTone(659.25, 'triangle', 0.1, 0.12), 70); // E5
    setTimeout(() => playTone(783.99, 'triangle', 0.2, 0.15), 140); // G5
  }

  function playErrorSound() {
    playTone(220, 'sawtooth', 0.2, 0.15); // A3
    setTimeout(() => playTone(174.61, 'sawtooth', 0.25, 0.18), 110); // F3
  }

  function playFanfare() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.25, 0.18), i * 100);
    });
  }

  // Soft, driving arcade background music (subtle rhythmic synth bassline + soft hats)
  function startArcadeBGM() {
    if (isMuted || bgmPlaying) return;
    initAudio();
    if (!audioCtx) return;

    bgmPlaying = true;
    const bassline = [
      110.0, 110.0, 130.81, 146.83, 110.0, 110.0, 98.0, 82.41,
      110.0, 110.0, 164.81, 146.83, 130.81, 123.47, 110.0, 130.81
    ];
    let step = 0;

    bgmInterval = setInterval(() => {
      if (isMuted || !bgmPlaying) return;
      try {
        const freq = bassline[step % bassline.length];
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, audioCtx.currentTime); // Soft muffled warm pulse

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        // Very low volume (0.024) so it creates an ambient energetic vibe without distraction
        gain.gain.setValueAtTime(0.024, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.11);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.11);

        // Soft arcade hi-hat on offbeats
        if (step % 2 === 1) {
          const hatOsc = audioCtx.createOscillator();
          const hatGain = audioCtx.createGain();
          hatOsc.type = 'square';
          hatOsc.frequency.setValueAtTime(900 + (step % 4) * 200, audioCtx.currentTime);
          hatGain.gain.setValueAtTime(0.007, audioCtx.currentTime);
          hatGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.035);
          hatOsc.connect(hatGain);
          hatGain.connect(audioCtx.destination);
          hatOsc.start();
          hatOsc.stop(audioCtx.currentTime + 0.035);
        }

        step++;
      } catch (e) {}
    }, 125);
  }

  function stopArcadeBGM() {
    bgmPlaying = false;
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  }

  // =========================================================================
  // DATA POOLS FOR ALL 5 GAMES
  // =========================================================================

  // GAME 1: Incoterms® 2020 Rapid Battle Pool (28 Scenarios)
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
    },
    {
      id: "fob_2",
      term: "FOB — Free On Board",
      ruleTag: "Quayside Loading • Sling Break",
      scenario: "During loading at Singapore Port, the crane sling snaps while hoisting the container from the pier BEFORE it crosses the vessel's rail. Who carries the loss?",
      answer: "Seller",
      explanation: "Under FOB, the Seller carries all risks until goods are actually on board the ship. Since it fell before crossing on board, the Seller bears the loss."
    },
    {
      id: "cif_2",
      term: "CIF — Cost, Insurance & Freight",
      ruleTag: "Discharge Port • Typhoon Water Damage",
      scenario: "Seawater damages machinery in the ship's hold during an ocean typhoon between Colombo and Sydney under CIF Sydney. Who bears the cargo loss?",
      answer: "Buyer",
      explanation: "Under CIF, risk transfers to Buyer once goods are on board at origin port. Buyer files the insurance claim."
    },
    {
      id: "exw_2",
      term: "EXW — Ex Works",
      ruleTag: "Buyer Collection Delay • Factory Fire",
      scenario: "Goods are set aside for the Buyer. The Buyer's truck is delayed by 5 days, during which an accidental fire destroys the warehouse. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under EXW, once goods are set aside and placed at Buyer's disposal, any delay by Buyer to collect passes the loss risk to Buyer."
    },
    {
      id: "ddp_2",
      term: "DDP — Delivered Duty Paid",
      ruleTag: "Destination Port • Custom Clearance Fine",
      scenario: "A shipment under DDP New York incurs heavy demurrage penalties because the destination customs broker delayed filing entry. Who pays these costs?",
      answer: "Seller",
      explanation: "Under DDP, Seller is legally responsible for all import clearance procedures, customs brokerage, tariffs, and demurrage delays."
    },
    {
      id: "dap_2",
      term: "DAP — Delivered at Place",
      ruleTag: "Arrival at Facility • Reefer Unit Failure",
      scenario: "A reefer container arrives on the truck outside Buyer's cold store under DAP Paris. Before unloading starts, the cooling compressor fails. Who carries the loss?",
      answer: "Seller",
      explanation: "Under DAP, Seller bears all risk until vehicle arrives ready for unloading. Risk remains with Seller until that moment."
    },
    {
      id: "dpu_2",
      term: "DPU — Delivered at Place Unloaded",
      ruleTag: "Destination Yard • Forklift Tilt",
      scenario: "While Seller's contractor unloads crates with a forklift at Munich rail terminal under DPU terms, a crate falls and shatters. Who bears the loss?",
      answer: "Seller",
      explanation: "DPU is the only Incoterm where unloading at the destination place is Seller's contractual responsibility and risk."
    },
    {
      id: "fca_3",
      term: "FCA — Free Carrier (Colombo Airport)",
      ruleTag: "Air Cargo Terminal • Warehouse Flooding",
      scenario: "Seller delivers cargo to the airline terminal under FCA Colombo Airport. That night, an airport warehouse floods before departure. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FCA at carrier's terminal, delivery is complete once goods are handed to carrier. Subsequent risks belong to Buyer."
    },
    {
      id: "fca_4",
      term: "FCA — Free Carrier (Seller's Factory)",
      ruleTag: "Factory Gate • Carrier Departure",
      scenario: "Goods are loaded onto Buyer's truck at Seller's premises in Gampaha. As the truck drives off factory grounds, it overturns on highway. Who carries the loss?",
      answer: "Buyer",
      explanation: "Under FCA at Seller's premises, risk transfers the moment loading onto Buyer's collecting vehicle is completed."
    },
    {
      id: "cpt_2",
      term: "CPT — Carriage Paid To",
      ruleTag: "Air Freight Route • Transit Delay & Spoilage",
      scenario: "Fresh perishables shipped under CPT Frankfurt spoil because the first airline misrouted the consignment via Doha. Who carries transit risk?",
      answer: "Buyer",
      explanation: "Under CPT, risk transfers when goods are delivered to the FIRST carrier. Seller pays air freight, but Buyer bears in-transit risks."
    },
    {
      id: "cip_2",
      term: "CIP — Carriage & Insurance Paid To",
      ruleTag: "Insurance Cover Level • Maritime Piracy",
      scenario: "Under CIP terms in Incoterms 2020, cargo is stolen by pirates. If Seller only purchased basic ICC-C instead of ICC (A) All Risks, who is at fault?",
      answer: "Seller",
      explanation: "Incoterms 2020 strictly requires Seller to provide ICC (A) All Risks insurance for CIP (unlike CIF which only mandates basic ICC-C)."
    },
    {
      id: "cfr_2",
      term: "CFR — Cost & Freight",
      ruleTag: "Ocean Voyage • Vessel Collision",
      scenario: "A container ship collides with another vessel in Malacca Strait under CFR Busan. A container is destroyed. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under CFR, Seller pays freight to Busan, but risk transferred to Buyer when the container crossed on board at origin."
    },
    {
      id: "fas_2",
      term: "FAS — Free Alongside Ship",
      ruleTag: "Quayside Staging • Port Crane Collision",
      scenario: "While cargo sits safely alongside the vessel on the quay under FAS Colombo, a port straddle carrier crashes into it. Who bears the loss?",
      answer: "Buyer",
      explanation: "Under FAS, risk transfers once cargo is placed alongside the ship on the quay. Subsequent damage is at Buyer's risk."
    },
    {
      id: "ddp_3",
      term: "DDP — Delivered Duty Paid",
      ruleTag: "Buyer Warehouse • Unloading Stage",
      scenario: "Goods arrive safely at Buyer's warehouse in Toronto under DDP. Buyer's staff drops a box while unloading from trailer. Who carries the loss?",
      answer: "Buyer",
      explanation: "Even under DDP, Seller is NOT responsible for unloading. Unloading at destination is strictly Buyer's responsibility."
    },
    {
      id: "dap_3",
      term: "DAP — Delivered at Place",
      ruleTag: "Border Crossing • Buyer License Delay",
      scenario: "A truck carrying goods under DAP Zurich is held at Swiss border because Buyer delayed obtaining import license. Goods spoil. Who carries the loss?",
      answer: "Buyer",
      explanation: "Under DAP, import clearance is Buyer's duty. Any risk of delay caused by Buyer's failure falls upon Buyer."
    },
    {
      id: "exw_3",
      term: "EXW — Ex Works",
      ruleTag: "Export Documentation • Customs Refusal",
      scenario: "Buyer demands that Seller complete official export customs declaration at the port under EXW Colombo. Is Seller obligated to do so?",
      answer: "Buyer",
      explanation: "Under EXW, Seller has NO obligation to clear goods for export. Export licenses and clearance are 100% Buyer's responsibility."
    },
    {
      id: "cif_3",
      term: "CIF — Cost, Insurance & Freight",
      ruleTag: "Mid-Ocean Fire • General Average Declaration",
      scenario: "A container vessel catches fire in Red Sea under CIF Rotterdam. Master declares General Average. Who pays the General Average contribution?",
      answer: "Buyer",
      explanation: "Under CIF, Buyer holds ownership risk during transit and pays the GA contribution (reimbursed by cargo insurance)."
    }
  ];

  // GAME 2: Logistics Career Ladder (10 Tiers)
  const LADDER_QUESTIONS = [
    {
      tier: 1,
      rank: "Junior Trainee",
      question: "Which transport document serves as a Document of Title, enabling ownership of cargo to be transferred in transit?",
      options: ["Air Waybill (AWB)", "Ocean Bill of Lading (B/L)", "Packing List", "Certificate of Origin"],
      answer: 1,
      aiHint: "Only negotiable maritime documents allowing endorsees to claim physical delivery carry 'Document of Title' status."
    },
    {
      tier: 2,
      rank: "Wharf & Gate Officer",
      question: "In standard air freight billing, what is the volumetric conversion divisor used to calculate Volumetric Weight in cm?",
      options: ["5,000", "6,000", "1,000", "3,333"],
      answer: 1,
      aiHint: "IATA standard air freight formula divides cubic centimeters (L x W x H) by this 4-digit number starting with 6."
    },
    {
      tier: 3,
      rank: "Freight Operations Coordinator",
      question: "What is the standard internal cargo capacity (volume in CBM) of a 20ft Standard Dry Ocean Container?",
      options: ["approx 15 CBM", "approx 33 CBM", "approx 67 CBM", "approx 85 CBM"],
      answer: 1,
      aiHint: "A standard 20ft container holds about 33 cubic meters, while a 40ft holds around 67 CBM."
    },
    {
      tier: 4,
      rank: "Documentation Specialist",
      question: "How many digits are universally harmonized across all WCO member nations in the Harmonized System (HS) Code?",
      options: ["First 4 digits", "First 6 digits", "First 8 digits", "First 10 digits"],
      answer: 1,
      aiHint: "The World Customs Organization harmonizes the first 6 digits; subsequent digits are set by national tariff schedules."
    },
    {
      tier: 5,
      rank: "Sea & Air Freight Specialist",
      question: "Under Hague-Visby Rules, what is the default statutory liability limit for ocean shipping lines per kilogram of damaged cargo?",
      options: ["2.00 SDRs per kg", "17 SDRs per kg", "50 USD per kg", "Unlimited liability"],
      answer: 0,
      aiHint: "Ocean carriage liability is limited to 666.67 SDR per package or 2 SDRs per kg, whichever is higher."
    },
    {
      tier: 6,
      rank: "Customs Broker & Compliance Lead",
      question: "Which IMDG class covers 'Organic Peroxides and Oxidizing Substances'?",
      options: ["Class 2", "Class 5", "Class 7", "Class 9"],
      answer: 1,
      aiHint: "Class 1 is Explosives, Class 3 is Flammable Liquids, and Class 5 specifically covers Oxidizers (5.1) and Organic Peroxides (5.2)."
    },
    {
      tier: 7,
      rank: "Cold Chain & Reefer Manager",
      question: "What is Cold Treatment (CT) protocol primarily enforced for in international reefer container shipments?",
      options: ["Preventing bacteria in fish", "Eradicating fruit fly larvae without chemical pesticides", "Freezing vaccines", "Preventing rust"],
      answer: 1,
      aiHint: "Phytosanitary CT protocols hold fruit at 0°C to +2°C for 14-22 days to eliminate fruit fly and insect larvae."
    },
    {
      tier: 8,
      rank: "Chartering & Pricing Manager",
      question: "In voyage charter parties, what is the financial compensation paid by the charterer to the shipowner for exceeding allowed laytime?",
      options: ["Despatch", "Deadfreight", "Demurrage", "Primage"],
      answer: 2,
      aiHint: "Despatch is paid for saving time; Demurrage is liquidated damages for holding the vessel beyond laytime."
    },
    {
      tier: 9,
      rank: "Supply Chain Director",
      question: "In Incoterms® 2020, what is the ONLY trade term where the SELLER is contractually responsible for unloading cargo at destination?",
      options: ["DDP", "DAP", "DPU", "FCA"],
      answer: 2,
      aiHint: "Look for the rule containing the letter 'U' for 'Unloaded' in its acronym."
    },
    {
      tier: 10,
      rank: "Global Logistics Tycoon 👑",
      question: "When container ships bypass Suez Canal and transit via Cape of Good Hope, by approximately how many nautical miles and days does the Asia-Europe voyage lengthen?",
      options: ["approx 1,000 NM / 2 days", "approx 3,500 NM / 10-14 days", "approx 7,000 NM / 25 days", "No difference"],
      answer: 1,
      aiHint: "Rounding Africa adds roughly 3,500 nautical miles and 10 to 14 days of sailing time at standard cruising speeds."
    }
  ];

  // GAME 3: Port Inspector Detective (5 Cases)
  const INSPECTOR_CASES = [
    {
      caseNo: 1,
      title: "Case #101: Weight Discrepancy Alert",
      docs: {
        invoice: "Invoice #NX-991 • Description: Garments • Gross Weight: 4,500 kg • Net Weight: 4,100 kg",
        packingList: "Packing List #NX-991 • 150 Cartons • Gross Weight: 4,500 kg • Net: 4,100 kg",
        bol: "Master B/L #MSCU981 • Port: Colombo to Hamburg • Declared Gross Weight: 4,050 kg"
      },
      options: [
        "Weight conflict: Master B/L declares 4,050 kg while Invoice/Packing List declares 4,500 kg (-450 kg shortage).",
        "Carton count mismatch between Invoice and Packing List.",
        "Missing consignee address on Master Bill of Lading."
      ],
      correct: 0,
      explanation: "Discrepancy: The B/L weight differs by 450 kg from the Commercial Invoice and Packing List. This will trigger a Customs VGM weight hold."
    },
    {
      caseNo: 2,
      title: "Case #102: HS Code Classification Mismatch",
      docs: {
        invoice: "Invoice #NX-992 • Commodity: Ceylon Pure Black Tea • Tariff HS Code: 0902.30",
        packingList: "Packing List #NX-992 • 200 Wooden Chests Ceylon Black Tea • Net: 5,000 kg",
        bol: "Master B/L #ONE902 • Cargo Description: Pure Green Tea (Flavored) • HS Code: 0902.10"
      },
      options: [
        "Inconsistent description and HS Code: Invoice states Black Tea (0902.30), but B/L declares Green Tea (0902.10).",
        "Packing List is missing the shipper stamp.",
        "The gross weight is missing from the Bill of Lading."
      ],
      correct: 0,
      explanation: "Tariff Mismatch: Black Tea is classified under HS 0902.30/40, while Green Tea is 0902.10/20. Conflicting declarations lead to customs audits."
    },
    {
      caseNo: 3,
      title: "Case #103: Port of Discharge Conflict",
      docs: {
        invoice: "Invoice #NX-993 • Terms: CIF Rotterdam • Discharge Port: Rotterdam, Netherlands",
        packingList: "Packing List #NX-993 • 2x40HC Containers Automotive Spares",
        bol: "Master B/L #HLCU441 • Port of Loading: Colombo • Port of Discharge: Antwerp, Belgium"
      },
      options: [
        "Port Conflict: Commercial Invoice specifies Rotterdam, but Master B/L is consigned to Antwerp.",
        "Container type mismatch on the packing list.",
        "Invoice currency does not match the bill of lading currency."
      ],
      correct: 0,
      explanation: "Port Mismatch: Cargo routed to Antwerp while commercial sales contracts specify Rotterdam will fail letter of credit (L/C) bank presentation."
    },
    {
      caseNo: 4,
      title: "Case #104: Package Quantity Shortfall",
      docs: {
        invoice: "Invoice #NX-994 • Quantity: 500 Cartons Ceramic Tiles • Total Value: $25,000 USD",
        packingList: "Packing List #NX-994 • Pallets 1 to 20 • Total Count: 450 Cartons",
        bol: "Master B/L #CMA882 • Declared Quantity: 500 Cartons as per Shipper Declaration"
      },
      options: [
        "Quantity Shortage: Packing list confirms only 450 cartons, while Invoice and B/L state 500 cartons.",
        "Currency mismatch between invoice and freight manifest.",
        "Bill of lading has wrong container seal number."
      ],
      correct: 0,
      explanation: "Short Shipment: Physical count is 450 cartons. If 500 cartons are cleared, the importer pays excess duties and faces customs discrepancies."
    },
    {
      caseNo: 5,
      title: "Case #105: Dangerous Goods Undecleared",
      docs: {
        invoice: "Invoice #NX-995 • Commodity: Industrial Paint & Solvent Thinners (Flashpoint 24°C)",
        packingList: "Packing List #NX-995 • 50 Steel Drums • UN 1263 Class 3 Flammable Liquid",
        bol: "Master B/L #MAEU771 • Cargo Description: General Non-Hazardous Cargo (Dry Freight)"
      },
      options: [
        "Severe Safety Violation: Hazardous Class 3 flammable solvent is declared as Non-Hazardous general cargo on B/L.",
        "Steel drum packaging is forbidden for industrial cargo.",
        "Packing list lacks metric volume conversion."
      ],
      correct: 0,
      explanation: "Dangerous Goods Concealment: UN 1263 Class 3 must be manifested as Dangerous Cargo with DGD certificate. Failing to do so violates SOLAS and IMDG."
    }
  ];

  // GAME 4: DG HazMat Hazard (5 Segregation Challenges)
  const HAZMAT_CHALLENGES = [
    {
      id: "dg_1",
      title: "Class 3 (Flammable Liquids) + Class 5.1 (Oxidizers)",
      cargoA: { name: "Paint Thinner (Acetone)", class: "Class 3 • Flammable Liquid", icon: "🔥", badge: "#EF4444" },
      cargoB: { name: "Hydrogen Peroxide drums", class: "Class 5.1 • Oxidizing Agent", icon: "⚠️", badge: "#F59E0B" },
      question: "Can these two substances be stowed inside the same ocean container?",
      answer: "Prohibited",
      rule: "IMDG Segregation Table strictly prohibits co-loading Class 3 with Class 5.1. Oxidizers release oxygen rapidly and will violently ignite flammable liquid vapors!"
    },
    {
      id: "dg_2",
      title: "Class 8 (Acids) + Class 8 (Alkalis / Bases)",
      cargoA: { name: "Hydrochloric Acid drums", class: "Class 8 • Corrosive (Acid)", icon: "🧪", badge: "#3B82F6" },
      cargoB: { name: "Sodium Hydroxide solution", class: "Class 8 • Corrosive (Alkali)", icon: "🧪", badge: "#3B82F6" },
      question: "Both items are Class 8 Corrosives. Can they be packed together in one container?",
      answer: "Prohibited",
      rule: "Even though both are Class 8, IMDG Code requires segregation between acids and alkalis. Mixing causes violent exothermic neutralization, boiling, and toxic fumes!"
    },
    {
      id: "dg_3",
      title: "Class 1 (Explosives) + Class 2.1 (Flammable Gas)",
      cargoA: { name: "Commercial Pyrotechnics", class: "Class 1.4G • Fireworks", icon: "💥", badge: "#DC2626" },
      cargoB: { name: "LPG Gas Cylinders", class: "Class 2.1 • Flammable Gas", icon: "⛽", badge: "#EA580C" },
      question: "Can fireworks and LPG gas cylinders be co-loaded in the same cargo compartment?",
      answer: "Prohibited",
      rule: "Class 1 Explosives must be segregated away from all flammable gases and liquids by complete compartment or bulkhead separation."
    },
    {
      id: "dg_4",
      title: "Class 9 (Misc / Lithium Batteries) + Non-Hazardous Textiles",
      cargoA: { name: "UN3480 Lithium-Ion Battery Packs", class: "Class 9 • Misc Hazardous", icon: "🔋", badge: "#10B981" },
      cargoB: { name: "Pallets of Cotton T-Shirts", class: "Non-Hazardous General Cargo", icon: "📦", badge: "#64748B" },
      question: "Can properly packaged Class 9 Lithium Batteries be co-loaded with general dry garments?",
      answer: "Permitted",
      rule: "Permitted. Class 9 Lithium batteries with proper UN certification (UN38.3) and packaging labels can be co-loaded with general non-hazardous dry cargo."
    },
    {
      id: "dg_5",
      title: "Class 6.1 (Toxic Poisons) + Foodstuffs / Edible Cargo",
      cargoA: { name: "Agricultural Pesticides", class: "Class 6.1 • Toxic Substance", icon: "☠️", badge: "#7C3AED" },
      cargoB: { name: "Bags of Basmati Rice & Sugar", class: "Edible Foodstuff Cargo", icon: "🌾", badge: "#10B981" },
      question: "Can Class 6.1 Toxic chemicals be loaded in the same container with edible food grains?",
      answer: "Prohibited",
      rule: "IMDG and Food Safety regulations strictly forbid co-loading Class 6.1 Toxic substances with food or animal feed to prevent catastrophic contamination."
    }
  ];

  // GAME 5: The Route Dispatcher: Crisis Simulator (4 Crises)
  const DISPATCHER_CRISES = [
    {
      id: "crisis_1",
      title: "Crisis 1: Red Sea Bab-el-Mandeb Conflict",
      situation: "Your client needs 200 TEUs of garments delivered from Colombo to Rotterdam for a summer retail launch. Missile threats in the Red Sea have led carriers to reroute or add heavy surcharges.",
      options: [
        {
          label: "Option A: Reroute via Cape of Good Hope (+12 Days, +$1,800/FEU)",
          outcome: "Safe transit without war-risk exposure. Delivery takes 32 days. Client accepts delay with adjusted lead time.",
          score: 85,
          rating: "Prudent Maritime Strategy 🛡️"
        },
        {
          label: "Option B: Sea-Air Multimodal via Dubai (+4 Days, +$4,200/FEU)",
          outcome: "Vessel sails to Jebel Ali, then flown to Amsterdam. Cargo arrives on time for summer launch, but freight costs are significantly higher.",
          score: 95,
          rating: "High-Priority SLA Master ✈️"
        },
        {
          label: "Option C: Force Suez Transit with War Risk Surcharge (+$3,000 WRS)",
          outcome: "Vessel faces high insurance premiums and potential drone attacks. High operational risk.",
          score: 55,
          rating: "High-Risk Gamble ⚠️"
        }
      ]
    },
    {
      id: "crisis_2",
      title: "Crisis 2: Panama Canal Severe Drought Draft Restriction",
      situation: "A neo-Panamax containership carrying your US East Coast cargo faces 3-week queue delays due to low Gatun Lake water levels and auction slot restrictions.",
      options: [
        {
          label: "Option A: US West Coast Rail Landbridge (Discharge Los Angeles + Intermodal Rail to NY)",
          outcome: "Container clears LA port in 3 days, connects via BNSF double-stack rail to Chicago and New York in 6 days. Fast and reliable.",
          score: 95,
          rating: "Intermodal Mastermind 🚂"
        },
        {
          label: "Option B: Pay $450,000 Daily Canal Auction Slot",
          outcome: "Immediate canal transit, but excessive cost overruns erode forwarder margin.",
          score: 70,
          rating: "Expensive Emergency Fix 💸"
        },
        {
          label: "Option C: Wait in Anchor Queue for 22 Days",
          outcome: "Cargo severely delayed. Consignee issues breach of SLA letter and claim for production line stoppage.",
          score: 45,
          rating: "Severe Operational Bottleneck ⏳"
        }
      ]
    },
    {
      id: "crisis_3",
      title: "Crisis 3: Port of Hamburg Terminal Workers Strike",
      situation: "20 Reefer containers of fresh strawberries approaching Elbe estuary are locked out due to indefinite 48-hour port labor strikes in Hamburg.",
      options: [
        {
          label: "Option A: Divert Vessel to Rotterdam + Reefer Trucking to Germany",
          outcome: "Vessel unloads in Rotterdam. Dedicated reefer trailers deliver fruit to German supermarkets within 24 hours. Zero spoilage.",
          score: 95,
          rating: "Cold Chain Hero 🍓"
        },
        {
          label: "Option B: Drop Anchor in Heligoland Roadstead and Wait",
          outcome: "Vessel engine gensets run on auxiliary fuel; risk of cold storage breakdown and shelf-life degradation increases daily.",
          score: 50,
          rating: "Spoilage Risk ⚠️"
        }
      ]
    },
    {
      id: "crisis_4",
      title: "Crisis 4: Airspace Conflict Closure (Trans-Siberian / Middle East)",
      situation: "Airspace closure forces air freighter flights between Asia and Europe to reroute, reducing payload capacity by 20% due to extra aviation bunker fuel requirements.",
      options: [
        {
          label: "Option A: Split Heavy Shipment into Staggered Flights via Anchorage Hub",
          outcome: "Trans-Pacific route via Anchorage allows maximum payload with technical refueling stop. All cargo delivers within 48 hours.",
          score: 90,
          rating: "Global Aviation Strategist 🌐"
        },
        {
          label: "Option B: Cancel Air Freight and Shift to Ocean Freight (30 days)",
          outcome: "Urgent factory components miss assembly deadline; factory shuts down for 3 weeks.",
          score: 35,
          rating: "Critical Supply Failure ❌"
        }
      ]
    }
  ];

  // =========================================================================
  // SHARED STATE & STORAGE
  // =========================================================================
  let currentGame = 'incoterms'; // 'incoterms' | 'ladder' | 'inspector' | 'hazmat' | 'dispatcher'
  let gameView = 'lobby'; // 'lobby' | 'playing' | 'summary'

  // Generic game state
  let gameState = {
    active: false,
    score: 0,
    currentIndex: 0,
    correctCount: 0,
    combo: 0,
    maxCombo: 0,
    timeLeft: 20,
    timerInterval: null,
    items: [],
    userAnswers: [],
    lifelines: { fiftyFifty: true, aiClue: true, skip: true },
    activeAiClue: null,
    hiddenOptions: []
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
  // ARCADE LOBBY RENDERER (ALL 5 GAMES UNLOCKED)
  // =========================================================================
  window.renderArcadeLobbyHTML = function () {
    const stats = getArcadeStats();
    return `
      <div class="arcade-lobby-wrapper" style="max-width: 1050px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Arcade Hero Banner -->
        <div class="arcade-hero" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); border-radius: 24px; padding: 32px 28px; color: #FFFFFF; margin-bottom: 30px; position: relative; overflow: hidden; box-shadow: 0 15px 35px rgba(15, 23, 42, 0.25);">
          <div style="position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(255,90,31,0.3) 0%, transparent 70%); border-radius: 50%;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; position: relative; z-index: 2;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 90, 31, 0.2); border: 1px solid rgba(255, 90, 31, 0.4); padding: 5px 14px; border-radius: 30px; margin-bottom: 12px;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #FF7A45; letter-spacing: 0.5px; text-transform: uppercase;">🕹️ NEXUS LOGISTICS ARCADE</span>
              </div>
              <h1 style="font-size: 2.1rem; font-family: 'Outfit', sans-serif; margin: 0 0 8px 0; font-weight: 800;">
                All 5 Game Zones Unlocked.
              </h1>
              <p style="color: #94A3B8; font-size: 0.95rem; margin: 0; max-width: 600px; line-height: 1.5;">
                Test trade risk instincts, climb from Trainee to Tycoon, detect customs document flaws, handle dangerous goods, and solve global maritime crises!
              </p>
            </div>

            <!-- Player Arcade Stats Pill -->
            <div style="background: rgba(255, 255, 255, 0.07); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 18px; padding: 16px 22px; display: flex; gap: 20px;">
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #FF7A45; font-family: 'Outfit', sans-serif;">${stats.totalXp}</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Total XP</div>
              </div>
              <div style="width: 1px; background: rgba(255,255,255,0.12);"></div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">${stats.gamesPlayed}</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Battles</div>
              </div>
              <div style="width: 1px; background: rgba(255,255,255,0.12);"></div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #4ADE80; font-family: 'Outfit', sans-serif;">${stats.bestCombo}x</div>
                <div style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700;">Max Combo</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Games Showcase (ALL 5 UNLOCKED) -->
        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; margin: 0 0 18px 0; display: flex; align-items: center; justify-content: space-between;">
          <span>🎮 Select Game Zone</span>
          <span style="font-size: 0.85rem; font-weight: 700; color: #10B981;">⚡ 5 of 5 Playable Now</span>
        </h3>

        <div class="arcade-games-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 310px), 1fr)); gap: 20px; margin-bottom: 40px;">
          
          <!-- GAME 1: Incoterms Rapid Battle -->
          <div class="arcade-card-active" style="background: linear-gradient(145deg, #FFFFFF 0%, #FFF7ED 100%); border: 2px solid var(--accent-orange); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(255, 90, 31, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🚢</div>
                <span style="background: var(--accent-orange); color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">WEEK 1 • LIVE</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                Incoterms® Rapid Battle
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                20-second flashcards. Who carries the loss? Test your risk assessment instincts under Incoterms® 2020.
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px;">
                <span style="background: #FFEDD5; color: #C2410C; padding: 3px 7px; border-radius: 6px;">⏱️ 20s</span>
                <span style="background: #EFF6FF; color: #1D4ED8; padding: 3px 7px; border-radius: 6px;">⚡ 28 Scenarios</span>
                <span style="background: #F0FDF4; color: #15803D; padding: 3px 7px; border-radius: 6px;">🔥 Combos</span>
              </div>
            </div>
            <button class="btn btn-primary btn-play-game" data-game="incoterms" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer;">
              🚀 Launch Rapid Battle
            </button>
          </div>

          <!-- GAME 2: Logistics Career Ladder -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #EFF6FF 100%); border: 2px solid #3B82F6; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🏆</div>
                <span style="background: #3B82F6; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">WEEK 2 • UNLOCKED</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                Logistics Career Ladder
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Millionaire-style 10 tiers from Trainee to Tycoon with 'Ask Nexus AI' and '50:50' lifelines!
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px;">
                <span style="background: #EFF6FF; color: #1D4ED8; padding: 3px 7px; border-radius: 6px;">🪜 10 Ranks</span>
                <span style="background: #FDF4FF; color: #A21CAF; padding: 3px 7px; border-radius: 6px;">🤖 Nexus AI</span>
                <span style="background: #FEF3C7; color: #B45309; padding: 3px 7px; border-radius: 6px;">💡 50:50</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="ladder" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(37,99,235,0.3);">
              🚀 Climb the Ladder
            </button>
          </div>

          <!-- GAME 3: Port Inspector Detective -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #F5F3FF 100%); border: 2px solid #8B5CF6; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(139, 92, 246, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🕵️‍♂️</div>
                <span style="background: #8B5CF6; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">WEEK 3 • UNLOCKED</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                Port Inspector: Customs Detective
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Review B/L, Commercial Invoice & Packing List case files to catch cargo weight, HS code and tariff flaws!
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px;">
                <span style="background: #F3E8FF; color: #6B21A8; padding: 3px 7px; border-radius: 6px;">📂 5 Cases</span>
                <span style="background: #ECFDF5; color: #065F46; padding: 3px 7px; border-radius: 6px;">📄 Cross-Doc</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="inspector" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(124,58,237,0.3);">
              🚀 Start Inspection Desk
            </button>
          </div>

          <!-- GAME 4: DG HazMat Hazard -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #FEF2F2 100%); border: 2px solid #EF4444; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(239, 68, 68, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">⚠️</div>
                <span style="background: #EF4444; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">WEEK 4 • UNLOCKED</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                DG HazMat Hazard
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                IMDG Code container loading puzzle! Co-load or segregate dangerous chemicals without causing explosions!
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px;">
                <span style="background: #FEE2E2; color: #991B1B; padding: 3px 7px; border-radius: 6px;">💥 Segregation</span>
                <span style="background: #FEF3C7; color: #92400E; padding: 3px 7px; border-radius: 6px;">🏷️ IMDG Classes</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="hazmat" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(220,38,38,0.3);">
              🚀 Load HazMat Safely
            </button>
          </div>

          <!-- GAME 5: The Route Dispatcher -->
          <div style="background: linear-gradient(145deg, #FFFFFF 0%, #ECFDF5 100%); border: 2px solid #10B981; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.14);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 2.2rem;">🧭</div>
                <span style="background: #10B981; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 9px; border-radius: 12px;">WEEK 5 • UNLOCKED</span>
              </div>
              <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 6px 0; font-size: 1.2rem; font-weight: 800;">
                The Route Dispatcher: Crisis Simulator
              </h4>
              <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px 0; line-height: 1.45;">
                Navigate real-world global disruptions: Red Sea drone bypass, Panama Canal drought & port strikes!
              </p>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 18px;">
                <span style="background: #D1FAE5; color: #065F46; padding: 3px 7px; border-radius: 6px;">🌍 Geopolitics</span>
                <span style="background: #E0E7FF; color: #3730A3; padding: 3px 7px; border-radius: 6px;">⚖️ Tradeoffs</span>
              </div>
            </div>
            <button class="btn btn-play-game" data-game="dispatcher" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFF; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(5,150,105,0.3);">
              🚀 Enter Crisis Command
            </button>
          </div>

        </div>

        <!-- Arcade Audio Control & Tip Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: var(--bg-white); border: 1px solid var(--border-color); border-radius: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-muted);">
            <span>🎵 <strong>Arcade BGM:</strong> Soft ambient retro synth beat loops during gameplay for active focus!</span>
          </div>
          <button id="btn-toggle-arcade-sound" style="background: #F8FAFC; border: 1.5px solid var(--border-color); padding: 7px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 800; color: var(--primary-navy); cursor: pointer;">
            ${isMuted ? '🔇 Audio: Muted' : '🔊 Audio: Active (BGM + SFX)'}
          </button>
        </div>

      </div>
    `;
  };

  // =========================================================================
  // UNIVERSAL GAME ROUTER & RENDERER
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

  // Launch any game
  window.launchArcadeGame = function (gameKey, renderCallback) {
    currentGame = gameKey;
    gameState.active = true;
    gameState.score = 0;
    gameState.currentIndex = 0;
    gameState.correctCount = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.userAnswers = [];
    gameState.lifelines = { fiftyFifty: true, aiClue: true, skip: true };
    gameState.activeAiClue = null;
    gameState.hiddenOptions = [];
    clearInterval(gameState.timerInterval);

    if (gameKey === 'incoterms') {
      gameState.items = shuffle(INCOTERMS_POOL).slice(0, 10);
    } else if (gameKey === 'ladder') {
      gameState.items = [...LADDER_QUESTIONS];
    } else if (gameKey === 'inspector') {
      gameState.items = [...INSPECTOR_CASES];
    } else if (gameKey === 'hazmat') {
      gameState.items = [...HAZMAT_CHALLENGES];
    } else if (gameKey === 'dispatcher') {
      gameState.items = [...DISPATCHER_CRISES];
    }

    startArcadeBGM();
    renderCallback('playing');

    if (gameKey === 'incoterms') {
      startIncotermsTimer(renderCallback);
    }
  };

  // -------------------------------------------------------------------------
  // GAME 1: Incoterms Game Screen (20s Timer)
  // -------------------------------------------------------------------------
  function renderIncotermsGameHTML() {
    const q = gameState.items[gameState.currentIndex];
    const progressPercent = ((gameState.currentIndex) / gameState.items.length) * 100;
    
    return `
      <div class="incoterms-game-wrapper" style="max-width: 750px; margin: 0 auto; font-family: 'Inter', sans-serif;">
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

        <div style="width: 100%; height: 6px; background: #E2E8F0; border-radius: 10px; margin-bottom: 24px; overflow: hidden;">
          <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #FF5A1F, #38BDF8); transition: width 0.3s ease;"></div>
        </div>

        <div class="game-flashcard" id="game-flashcard" style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 32px 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); text-align: center; position: relative; margin-bottom: 25px; transition: all 0.25s ease;">
          <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap;">
            <span style="background: #FFF7ED; color: #C2410C; border: 1px solid #FFEDD5; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
              ${q.term}
            </span>
            <span style="background: #F1F5F9; color: #475569; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
              ${q.ruleTag}
            </span>
            <span style="background: #EFF6FF; color: #1D4ED8; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px;">
              Scenario ${gameState.currentIndex + 1} of ${gameState.items.length}
            </span>
          </div>

          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; line-height: 1.5; font-weight: 700; margin: 0 0 24px 0; min-height: 80px; display: flex; align-items: center; justify-content: center;">
            "${q.scenario}"
          </h2>

          <div style="max-width: 320px; margin: 0 auto 24px auto;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 800; margin-bottom: 6px;">
              <span style="color: var(--text-muted); text-transform: uppercase;">Time Left</span>
              <span id="timer-text" style="color: #FF5A1F; font-size: 0.9rem;">20.0s</span>
            </div>
            <div style="width: 100%; height: 8px; background: #F1F5F9; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0;">
              <div id="timer-bar" style="width: 100%; height: 100%; background: #10B981; transition: width 0.1s linear, background-color 0.3s ease;"></div>
            </div>
          </div>

          <div id="action-buttons-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 10px;">
            <button class="btn-risk-choice" data-choice="Buyer" style="background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%); color: #FFFFFF; border: none; padding: 18px 24px; border-radius: 16px; font-weight: 800; font-size: 1.15rem; cursor: pointer; box-shadow: 0 6px 18px rgba(37, 99, 235, 0.28); transition: transform 0.15s ease, filter 0.2s ease;">
              👤 BUYER
            </button>
            <button class="btn-risk-choice" data-choice="Seller" style="background: linear-gradient(135deg, #EA580C 0%, #F97316 100%); color: #FFFFFF; border: none; padding: 18px 24px; border-radius: 16px; font-weight: 800; font-size: 1.15rem; cursor: pointer; box-shadow: 0 6px 18px rgba(249, 115, 22, 0.28); transition: transform 0.15s ease, filter 0.2s ease;">
              🚢 SELLER
            </button>
          </div>

          <div id="rule-feedback-box" style="display: none; margin-top: 20px; padding: 16px; border-radius: 14px; text-align: left; animation: fadeIn 0.2s ease;"></div>
        </div>
      </div>
    `;
  }

  function startIncotermsTimer(renderCallback) {
    clearInterval(gameState.timerInterval);
    gameState.timeLeft = 20.0;
    const timerText = document.getElementById('timer-text');
    const timerBar = document.getElementById('timer-bar');
    const startTime = Date.now();
    const duration = 20000;

    gameState.timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      gameState.timeLeft = (remaining / 1000).toFixed(1);

      if (timerText) timerText.textContent = `${gameState.timeLeft}s`;
      if (timerBar) {
        const percent = (remaining / duration) * 100;
        timerBar.style.width = `${percent}%`;
        if (remaining <= 5000) timerBar.style.backgroundColor = '#EF4444';
        else if (remaining <= 10000) timerBar.style.backgroundColor = '#F59E0B';
        else timerBar.style.backgroundColor = '#10B981';
      }

      if (remaining <= 0) {
        clearInterval(gameState.timerInterval);
        handleIncotermsChoice(null, renderCallback);
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
          <div style="font-size: 0.85rem; line-height: 1.4;">${q.explanation}</div>
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
      gameState.currentIndex += 1;
      if (gameState.currentIndex >= gameState.items.length) {
        finishUniversalGame('incoterms', renderCallback);
      } else {
        renderCallback('playing');
        startIncotermsTimer(renderCallback);
      }
    }, 1600);
  };

  // -------------------------------------------------------------------------
  // GAME 2: Logistics Career Ladder (Tycoon Quiz Screen)
  // -------------------------------------------------------------------------
  function renderLadderGameHTML() {
    const q = gameState.items[gameState.currentIndex];
    return `
      <div class="ladder-game-wrapper" style="max-width: 800px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.1rem; font-weight: 900; color: #2563EB; font-family: 'Outfit', sans-serif;">
            Tier ${gameState.currentIndex + 1}/10 • ${gameState.score} XP
          </div>
        </div>

        <div style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 32px 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); margin-bottom: 25px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
            <span style="background: #EFF6FF; color: #1D4ED8; font-size: 0.85rem; font-weight: 800; padding: 6px 14px; border-radius: 20px;">
              Rank: ${q.rank}
            </span>
            <!-- Lifelines Group -->
            <div style="display: flex; gap: 8px;">
              <button class="btn-lifeline" data-type="fifty" ${!gameState.lifelines.fiftyFifty ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : 'style="background:#FFFBEB; border:1px solid #FCD34D; color:#B45309; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:8px; cursor:pointer;"'}>
                💡 50:50
              </button>
              <button class="btn-lifeline" data-type="ai" ${!gameState.lifelines.aiClue ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : 'style="background:#FDF4FF; border:1px solid #F0ABFC; color:#A21CAF; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:8px; cursor:pointer;"'}>
                🤖 Ask Nexus AI
              </button>
              <button class="btn-lifeline" data-type="skip" ${!gameState.lifelines.skip ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : 'style="background:#F1F5F9; border:1px solid #CBD5E1; color:#475569; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:8px; cursor:pointer;"'}>
                ⏩ Divert
              </button>
            </div>
          </div>

          ${gameState.activeAiClue ? `
            <div style="background: #FDF4FF; border: 1.5px solid #F0ABFC; border-radius: 12px; padding: 12px 16px; margin-bottom: 18px; animation: fadeIn 0.2s ease;">
              <div style="font-weight: 800; font-size: 0.82rem; color: #A21CAF; margin-bottom: 3px;">🤖 Nexus AI Clue:</div>
              <div style="font-size: 0.85rem; color: #4A044E;">${gameState.activeAiClue}</div>
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
      </div>
    `;
  }

  window.handleLadderAnswer = function (chosenIdx, renderCallback) {
    const q = gameState.items[gameState.currentIndex];
    const isCorrect = chosenIdx === q.answer;

    if (isCorrect) {
      gameState.score += (gameState.currentIndex + 1) * 100;
      gameState.correctCount += 1;
      playSuccessSound();
      gameState.userAnswers.push({
        title: `Tier ${q.tier}: ${q.rank}`,
        sub: q.question,
        isCorrect: true,
        explanation: `Correct! ${q.options[q.answer]}`
      });

      gameState.currentIndex += 1;
      gameState.activeAiClue = null;
      gameState.hiddenOptions = [];

      if (gameState.currentIndex >= gameState.items.length) {
        finishUniversalGame('ladder', renderCallback);
      } else {
        renderCallback('playing');
      }
    } else {
      playErrorSound();
      gameState.userAnswers.push({
        title: `Tier ${q.tier}: ${q.rank}`,
        sub: q.question,
        isCorrect: false,
        explanation: `Incorrect. Correct answer was: ${q.options[q.answer]}`
      });
      finishUniversalGame('ladder', renderCallback);
    }
  };

  // -------------------------------------------------------------------------
  // GAME 3: Port Inspector Detective Screen
  // -------------------------------------------------------------------------
  function renderInspectorGameHTML() {
    const c = gameState.items[gameState.currentIndex];
    return `
      <div class="inspector-game-wrapper" style="max-width: 820px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.1rem; font-weight: 900; color: #7C3AED; font-family: 'Outfit', sans-serif;">
            Case ${gameState.currentIndex + 1} of 5 • ${gameState.score} XP
          </div>
        </div>

        <div style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); margin-bottom: 25px;">
          <div style="font-size: 0.85rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; margin-bottom: 8px;">
            🕵️ Customs Documentation Desk
          </div>
          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.3rem; margin: 0 0 20px 0;">
            ${c.title}
          </h2>

          <!-- 3 Document Dossiers -->
          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;">
            <div style="background: #F8FAFC; border-left: 4px solid #3B82F6; padding: 14px 16px; border-radius: 10px; font-size: 0.88rem;">
              <strong style="color:#1D4ED8;">1. Commercial Invoice:</strong><br>${c.docs.invoice}
            </div>
            <div style="background: #F8FAFC; border-left: 4px solid #10B981; padding: 14px 16px; border-radius: 10px; font-size: 0.88rem;">
              <strong style="color:#047857;">2. Packing List:</strong><br>${c.docs.packingList}
            </div>
            <div style="background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 14px 16px; border-radius: 10px; font-size: 0.88rem;">
              <strong style="color:#B45309;">3. Master Bill of Lading (MBL):</strong><br>${c.docs.bol}
            </div>
          </div>

          <h3 style="font-size: 1rem; color: var(--primary-navy); font-weight: 800; margin: 0 0 14px 0;">
            Which operational discrepancy did you uncover?
          </h3>

          <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
            ${c.options.map((opt, idx) => `
              <button class="btn-inspector-choice" data-index="${idx}" style="background: #FFFFFF; border: 1.5px solid #CBD5E1; padding: 15px 18px; border-radius: 12px; text-align: left; font-size: 0.92rem; font-weight: 700; color: var(--primary-navy); cursor: pointer; transition: all 0.15s ease;">
                🔍 ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  window.handleInspectorAnswer = function (chosenIdx, renderCallback) {
    const c = gameState.items[gameState.currentIndex];
    const isCorrect = chosenIdx === c.correct;

    if (isCorrect) {
      gameState.score += 200;
      gameState.correctCount += 1;
      playSuccessSound();
    } else {
      playErrorSound();
    }

    gameState.userAnswers.push({
      title: c.title,
      sub: c.options[c.correct],
      isCorrect,
      explanation: c.explanation
    });

    gameState.currentIndex += 1;
    if (gameState.currentIndex >= gameState.items.length) {
      finishUniversalGame('inspector', renderCallback);
    } else {
      renderCallback('playing');
    }
  };

  // -------------------------------------------------------------------------
  // GAME 4: DG HazMat Hazard Screen
  // -------------------------------------------------------------------------
  function renderHazmatGameHTML() {
    const h = gameState.items[gameState.currentIndex];
    return `
      <div class="hazmat-game-wrapper" style="max-width: 780px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.1rem; font-weight: 900; color: #DC2626; font-family: 'Outfit', sans-serif;">
            Hazard Challenge ${gameState.currentIndex + 1}/5 • ${gameState.score} XP
          </div>
        </div>

        <div style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 32px 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); text-align: center; margin-bottom: 25px;">
          <span style="background: #FEE2E2; color: #B91C1C; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
            ⚠️ IMDG Segregation Assessment
          </span>

          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; margin: 16px 0 24px 0;">
            ${h.question}
          </h2>

          <!-- Visual 2 Pallet Staging Area -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px;">
            <div style="background: #F8FAFC; border: 2px solid ${h.cargoA.badge}; border-radius: 16px; padding: 20px;">
              <div style="font-size: 2.8rem; margin-bottom: 8px;">${h.cargoA.icon}</div>
              <div style="font-weight: 800; font-size: 1rem; color: var(--primary-navy);">${h.cargoA.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; margin-top: 4px;">${h.cargoA.class}</div>
            </div>
            <div style="background: #F8FAFC; border: 2px solid ${h.cargoB.badge}; border-radius: 16px; padding: 20px;">
              <div style="font-size: 2.8rem; margin-bottom: 8px;">${h.cargoB.icon}</div>
              <div style="font-weight: 800; font-size: 1rem; color: var(--primary-navy);">${h.cargoB.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; margin-top: 4px;">${h.cargoB.class}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <button class="btn-hazmat-choice" data-choice="Prohibited" style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: #FFF; border: none; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 15px rgba(220,38,38,0.3);">
              🚫 PROHIBITED (Segregate)
            </button>
            <button class="btn-hazmat-choice" data-choice="Permitted" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFF; border: none; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 15px rgba(5,150,105,0.3);">
              ✅ PERMITTED (Co-load)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  window.handleHazmatAnswer = function (choice, renderCallback) {
    const h = gameState.items[gameState.currentIndex];
    const isCorrect = choice === h.answer;

    if (isCorrect) {
      gameState.score += 200;
      gameState.correctCount += 1;
      playSuccessSound();
    } else {
      playErrorSound();
    }

    gameState.userAnswers.push({
      title: h.title,
      sub: `Your choice: ${choice}`,
      isCorrect,
      explanation: h.rule
    });

    gameState.currentIndex += 1;
    if (gameState.currentIndex >= gameState.items.length) {
      finishUniversalGame('hazmat', renderCallback);
    } else {
      renderCallback('playing');
    }
  };

  // -------------------------------------------------------------------------
  // GAME 5: The Route Dispatcher Screen
  // -------------------------------------------------------------------------
  function renderDispatcherGameHTML() {
    const d = gameState.items[gameState.currentIndex];
    return `
      <div class="dispatcher-game-wrapper" style="max-width: 820px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button id="btn-exit-game" style="background: none; border: none; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            ← Exit to Arcade
          </button>
          <div style="font-size: 1.1rem; font-weight: 900; color: #059669; font-family: 'Outfit', sans-serif;">
            Strategic Crisis ${gameState.currentIndex + 1}/4 • ${gameState.score} XP
          </div>
        </div>

        <div style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 32px 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); margin-bottom: 25px;">
          <span style="background: #ECFDF5; color: #047857; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
            🌍 Maritime Crisis Simulator
          </span>

          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.35rem; margin: 14px 0 10px 0;">
            ${d.title}
          </h2>
          <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.5; margin: 0 0 24px 0;">
            ${d.situation}
          </p>

          <h3 style="font-size: 1rem; color: var(--primary-navy); font-weight: 800; margin: 0 0 14px 0;">
            Choose your executive dispatch directive:
          </h3>

          <div style="display: grid; grid-template-columns: 1fr; gap: 14px;">
            ${d.options.map((opt, idx) => `
              <button class="btn-dispatcher-choice" data-index="${idx}" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; padding: 18px 20px; border-radius: 14px; text-align: left; cursor: pointer; transition: all 0.15s ease;">
                <div style="font-weight: 800; font-size: 0.98rem; color: var(--primary-navy); margin-bottom: 4px;">
                  ${opt.label}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
                  Outcome: ${opt.outcome}
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  window.handleDispatcherAnswer = function (chosenIdx, renderCallback) {
    const d = gameState.items[gameState.currentIndex];
    const opt = d.options[chosenIdx];

    gameState.score += opt.score * 2;
    gameState.correctCount += (opt.score >= 80 ? 1 : 0);
    playSuccessSound();

    gameState.userAnswers.push({
      title: d.title,
      sub: opt.rating,
      isCorrect: opt.score >= 80,
      explanation: `${opt.label} — ${opt.outcome}`
    });

    gameState.currentIndex += 1;
    if (gameState.currentIndex >= gameState.items.length) {
      finishUniversalGame('dispatcher', renderCallback);
    } else {
      renderCallback('playing');
    }
  };

  // -------------------------------------------------------------------------
  // UNIFIED SUMMARY SCREEN (All Games)
  // -------------------------------------------------------------------------
  function renderUnifiedSummaryHTML(gameKey) {
    const accuracy = Math.round((gameState.correctCount / gameState.items.length) * 100);
    let rankBadge = "Logistics Apprentice 🥉";
    if (accuracy === 100) rankBadge = "Global Trade Master 👑";
    else if (accuracy >= 80) rankBadge = "Senior Logistics Specialist 🥇";
    else if (accuracy >= 60) rankBadge = "Operations Practitioner 🥈";

    return `
      <div class="arcade-summary-wrapper" style="max-width: 750px; margin: 0 auto; font-family: 'Inter', sans-serif; text-align: center;">
        <div style="background: var(--bg-white); border: 2px solid var(--border-color); border-radius: 24px; padding: 40px 30px; box-shadow: 0 15px 40px rgba(0,0,0,0.06); margin-bottom: 25px;">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">🎉</div>
          <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 2rem; margin: 0 0 6px 0; font-weight: 800;">
            Mission Complete!
          </h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0 0 25px 0;">
            Here is your arcade performance assessment.
          </p>

          <div style="display: inline-block; background: #F8FAFC; border: 2px solid var(--accent-orange); padding: 8px 24px; border-radius: 30px; margin-bottom: 30px;">
            <span style="font-size: 1.05rem; font-weight: 900; color: var(--accent-orange); font-family: 'Outfit', sans-serif;">
              ${rankBadge}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; max-width: 400px; margin: 0 auto 30px auto;">
            <div style="background: #FFF7ED; padding: 18px 10px; border-radius: 16px; border: 1px solid #FFEDD5;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #FF5A1F; font-family: 'Outfit', sans-serif;">+${gameState.score}</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #C2410C; text-transform: uppercase;">XP Earned</div>
            </div>
            <div style="background: #F0FDF4; padding: 18px 10px; border-radius: 16px; border: 1px solid #DCFCE7;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #10B981; font-family: 'Outfit', sans-serif;">${accuracy}%</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #15803D; text-transform: uppercase;">Accuracy (${gameState.correctCount}/${gameState.items.length})</div>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button id="btn-replay-game" class="btn btn-primary" style="padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; cursor: pointer;">
              🔄 Play Again
            </button>
            <button id="btn-return-arcade" style="padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; border: 1.5px solid var(--border-color); background: #F8FAFC; color: var(--primary-navy, #0F172A); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); transition: transform 0.15s ease;">
              🕹️ Return to Arcade
            </button>
          </div>
        </div>

        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.25rem; margin: 0 0 16px 0; text-align: left;">
          📝 Scenario Review & Rules
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; text-align: left;">
          ${gameState.userAnswers.map((item, idx) => `
            <div style="background: var(--bg-white); border-left: 4px solid ${item.isCorrect ? '#10B981' : '#EF4444'}; border-radius: 12px; padding: 16px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.88rem; color: var(--primary-navy);">${idx + 1}. ${item.title}</span>
                <span style="font-size: 0.75rem; font-weight: 800; color: ${item.isCorrect ? '#10B981' : '#EF4444'};">
                  ${item.isCorrect ? '✓ CORRECT (+XP)' : '✗ FLAW / CAUTION'}
                </span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0 0 8px 0; line-height: 1.4;">${item.sub}</p>
              <div style="font-size: 0.82rem; background: #F8FAFC; padding: 8px 12px; border-radius: 8px; color: var(--primary-navy);">
                <strong>Rule:</strong> ${item.explanation}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function finishUniversalGame(gameKey, renderCallback) {
    clearInterval(gameState.timerInterval);
    gameState.active = false;
    stopArcadeBGM();
    playFanfare();

    const stats = getArcadeStats();
    stats.totalXp += gameState.score;
    stats.gamesPlayed += 1;
    saveArcadeStats(stats);

    renderCallback('summary');
  }

  window.toggleArcadeSound = function () {
    isMuted = !isMuted;
    localStorage.setItem('nexus_arcade_muted', isMuted);
    if (isMuted) {
      stopArcadeBGM();
    } else if (gameState.active) {
      startArcadeBGM();
    }
    return isMuted;
  };

  window.handleLadderLifeline = function (type, renderCallback) {
    if (!gameState.lifelines[type]) return;
    const q = gameState.items[gameState.currentIndex];

    if (type === 'fiftyFifty') {
      gameState.lifelines.fiftyFifty = false;
      const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.answer);
      gameState.hiddenOptions = shuffle(wrongIndices).slice(0, 2);
      playSuccessSound();
      renderCallback('playing');
    } else if (type === 'aiClue') {
      gameState.lifelines.aiClue = false;
      gameState.activeAiClue = q.aiHint;
      playSuccessSound();
      renderCallback('playing');
    } else if (type === 'skip') {
      gameState.lifelines.skip = false;
      gameState.currentIndex += 1;
      gameState.activeAiClue = null;
      gameState.hiddenOptions = [];
      playSuccessSound();
      if (gameState.currentIndex >= gameState.items.length) {
        finishUniversalGame('ladder', renderCallback);
      } else {
        renderCallback('playing');
      }
    }
  };

  window.getCurrentArcadeGame = function () {
    return currentGame;
  };

})();
