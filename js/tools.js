/**
 * Nexus Knowledge Hub - Interactive Logistics Tools & Calculators (js/tools.js)
 */
/* ==========================================
   5. INTERACTIVE INCOTERMS MATRIX
   ========================================== */
const INCOTERMS_DATA = {
  EXW: {
    code: "EXW",
    name: "Ex Works",
    mode: "Any Mode of Transport",
    desc: "Seller prepares goods at their premises. Buyer assumes all costs, risks, transportation, and customs liabilities.",
    responsibilities: {
      packaging: "seller",
      loading: "buyer",
      originTruck: "buyer",
      expCustoms: "buyer",
      terminalHandling: "buyer",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  FCA: {
    code: "FCA",
    name: "Free Carrier",
    mode: "Any Mode of Transport",
    desc: "Seller delivers goods cleared for export to the buyer's carrier at a named place. Risk transfers at cargo handover.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "buyer",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  FAS: {
    code: "FAS",
    name: "Free Alongside Ship",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller delivers goods alongside the buyer's vessel at the named port of shipment. Risk transfers alongside ship.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "buyer",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  FOB: {
    code: "FOB",
    name: "Free On Board",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller delivers goods on board the vessel. Risk transfers when goods are safely loaded on deck.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CFR: {
    code: "CFR",
    name: "Cost and Freight",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller pays main sea transit to destination port. Risk transfers to buyer as soon as goods are loaded on deck at origin.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CIF: {
    code: "CIF",
    name: "Cost, Insurance and Freight",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller pays sea carriage and basic cargo insurance to destination port. Risk transfers to buyer at origin loading.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CPT: {
    code: "CPT",
    name: "Carriage Paid To",
    mode: "Any Mode of Transport",
    desc: "Seller pays main carriage to named destination. Risk transfers to buyer upon handing over to first carrier at origin.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CIP: {
    code: "CIP",
    name: "Carriage and Insurance Paid To",
    mode: "Any Mode of Transport",
    desc: "Seller pays transport and high-level insurance to named destination. Risk transfers upon origin carrier handover.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  DAP: {
    code: "DAP",
    name: "Delivered At Place",
    mode: "Any Mode of Transport",
    desc: "Seller delivers cargo to buyer's destination premises, ready for unloading. Seller bears all risks to final place.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "seller",
      unloading: "buyer"
    }
  },
  DPU: {
    code: "DPU",
    name: "Delivered at Place Unloaded",
    mode: "Any Mode of Transport",
    desc: "Seller delivers and unloads cargo at named destination place. Seller bears all costs/risks including unloading.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "seller",
      unloading: "seller"
    }
  },
  DDP: {
    code: "DDP",
    name: "Delivered Duty Paid",
    mode: "Any Mode of Transport",
    desc: "Seller bears absolute logistics liabilities: origin, shipping, destination clearances, duties, taxes, and final delivery.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "seller",
      destTruck: "seller",
      unloading: "buyer"
    }
  }
};

function initIncotermsMatrix() {
  const incotermBtnContainer = document.getElementById("incoterms-btn-list");
  if (!incotermBtnContainer) return;
  
  incotermBtnContainer.innerHTML = "";
  
  Object.keys(INCOTERMS_DATA).forEach((key, index) => {
    const btn = document.createElement("button");
    btn.className = `incoterm-selector-btn ${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="incoterm-code">${INCOTERMS_DATA[key].code}</span>
      <span class="incoterm-name">${INCOTERMS_DATA[key].name}</span>
    `;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".incoterm-selector-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateIncotermDisplay(key);
    });
    incotermBtnContainer.appendChild(btn);
  });
  
  updateIncotermDisplay("EXW");
}

function updateIncotermDisplay(code) {
  const term = INCOTERMS_DATA[code];
  if (!term) return;
  
  document.getElementById("term-title").textContent = `${term.code} - ${term.name}`;
  document.getElementById("term-mode").textContent = term.mode;
  document.getElementById("term-desc").textContent = term.desc;
  
  const steps = ["packaging", "loading", "originTruck", "expCustoms", "terminalHandling", "mainCarriage", "insurance", "impCustoms", "destTruck", "unloading"];
  
  steps.forEach(step => {
    const bar = document.getElementById(`resp-${step}`);
    if (!bar) return;
    
    const owner = term.responsibilities[step];
    bar.className = `step-bar ${owner}`;
    
    if (owner === "seller") {
      bar.style.width = "100%";
      bar.textContent = "Seller Responsible";
    } else if (owner === "buyer") {
      bar.style.width = "100%";
      bar.textContent = "Buyer Responsible";
    }
  });
}

/* ==========================================
   6. CONTAINER SPEC & CBM CALCULATOR
   ========================================== */
const CONTAINER_SPECS = {
  dry20: {
    name: "20ft Standard Dry Container",
    len: "5,898 mm",
    wid: "2,352 mm",
    hei: "2,393 mm",
    doorW: "2,340 mm",
    doorH: "2,280 mm",
    maxW: "30,480 kg",
    tare: "2,200 kg",
    payload: "28,280 kg",
    volume: "33.2 CBM",
    color: "#0A2540",
    label: "20FT DRY"
  },
  dry40: {
    name: "40ft Standard Dry Container",
    len: "12,032 mm",
    wid: "2,352 mm",
    hei: "2,393 mm",
    doorW: "2,340 mm",
    doorH: "2,280 mm",
    maxW: "30,480 kg",
    tare: "3,700 kg",
    payload: "26,780 kg",
    volume: "67.7 CBM",
    color: "#1e3a8a",
    label: "40FT DRY"
  },
  hc40: {
    name: "40ft High Cube Container",
    len: "12,032 mm",
    wid: "2,352 mm",
    hei: "2,698 mm",
    doorW: "2,340 mm",
    doorH: "2,585 mm",
    maxW: "30,480 kg",
    tare: "3,900 kg",
    payload: "26,580 kg",
    volume: "76.4 CBM",
    color: "#FF5A1F",
    label: "40FT HIGH CUBE"
  },
  reefer20: {
    name: "20ft Reefer (Refrigerated)",
    len: "5,444 mm",
    wid: "2,294 mm",
    hei: "2,276 mm",
    doorW: "2,290 mm",
    doorH: "2,220 mm",
    maxW: "30,480 kg",
    tare: "3,200 kg",
    payload: "27,280 kg",
    volume: "28.3 CBM",
    color: "#0ea5e9",
    label: "20FT REEFER"
  },
  reefer40: {
    name: "40ft Reefer High Cube",
    len: "11,556 mm",
    wid: "2,294 mm",
    hei: "2,500 mm",
    doorW: "2,290 mm",
    doorH: "2,440 mm",
    maxW: "34,000 kg",
    tare: "4,600 kg",
    payload: "29,400 kg",
    volume: "66.2 CBM",
    color: "#38bdf8",
    label: "40FT REEFER HC"
  },
  flat20: {
    name: "20ft Flat Rack Container",
    len: "5,940 mm",
    wid: "2,350 mm",
    hei: "2,350 mm (posts)",
    doorW: "N/A (Open)",
    doorH: "N/A (Open)",
    maxW: "30,480 kg",
    tare: "2,750 kg",
    payload: "27,730 kg",
    volume: "Collapsible Sides",
    color: "#78716c",
    label: "20FT FLAT RACK"
  }
};

function initContainerCalc() {
  const btns = document.querySelectorAll(".container-btn");
  if (btns.length === 0) return;
  
  updateContainerSpecsDisplay("dry20");
  
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const type = btn.getAttribute("data-type");
      updateContainerSpecsDisplay(type);
    });
  });
  
  const calcBtn = document.getElementById("calc-cbm-btn");
  const clearBtn = document.getElementById("calc-clear-btn");
  
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      calculateCargoCBM();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document.getElementById("cargo-len").value = "";
      document.getElementById("cargo-wid").value = "";
      document.getElementById("cargo-hei").value = "";
      document.getElementById("cargo-qty").value = "";
      document.getElementById("cargo-weight").value = "";
      
      document.getElementById("res-cbm").textContent = "0.000";
      document.getElementById("res-vol-wt").textContent = "0.00 kg";
      document.getElementById("res-charge-wt").textContent = "0.00 kg";
      document.getElementById("res-rec").textContent = "Input cargo specs above.";
    });
  }
}

function updateContainerSpecsDisplay(type) {
  const specs = CONTAINER_SPECS[type];
  if (!specs) return;
  
  document.getElementById("spec-name").textContent = specs.name;
  document.getElementById("spec-len").textContent = specs.len;
  document.getElementById("spec-wid").textContent = specs.wid;
  document.getElementById("spec-hei").textContent = specs.hei;
  document.getElementById("spec-maxw").textContent = specs.maxW;
  document.getElementById("spec-tare").textContent = specs.tare;
  document.getElementById("spec-payload").textContent = specs.payload;
  document.getElementById("spec-vol").textContent = specs.volume;
  
  const graphic = document.getElementById("container-graphic-box");
  if (graphic) {
    graphic.style.backgroundColor = specs.color;
    graphic.querySelector(".container-label-overlay").textContent = specs.label;
  }
}

function calculateCargoCBM() {
  const length = parseFloat(document.getElementById("cargo-len").value) || 0;
  const width = parseFloat(document.getElementById("cargo-wid").value) || 0;
  const height = parseFloat(document.getElementById("cargo-hei").value) || 0;
  const quantity = parseInt(document.getElementById("cargo-qty").value) || 0;
  const grossWeight = parseFloat(document.getElementById("cargo-weight").value) || 0;
  
  if (length <= 0 || width <= 0 || height <= 0 || quantity <= 0) {
    alert("Please enter positive values for dimensions and quantity.");
    return;
  }
  
  const volCBM = ((length / 100) * (width / 100) * (height / 100)) * quantity;
  const volWeight = volCBM * 166.67;
  const chargeableWeight = Math.max(grossWeight, volWeight);
  
  document.getElementById("res-cbm").textContent = volCBM.toFixed(3);
  document.getElementById("res-vol-wt").textContent = volWeight.toFixed(2) + " kg";
  document.getElementById("res-charge-wt").textContent = chargeableWeight.toFixed(2) + " kg";
  
  let recommendation = "";
  if (volCBM < 1) {
    recommendation = `Air freight consolidated (Chargeable wt: ${chargeableWeight.toFixed(1)}kg) or Ocean LCL (Vol: ${volCBM.toFixed(2)} CBM).`;
  } else if (volCBM <= 15) {
    recommendation = `Ocean LCL is recommended (${volCBM.toFixed(1)} CBM). Breaking point is close to FCL if it reaches 15 CBM.`;
  } else if (volCBM <= 28) {
    recommendation = `1x 20ft Standard Dry Container (Fits up to 28 CBM cargo safely).`;
  } else if (volCBM <= 58) {
    recommendation = `1x 40ft Standard Dry Container (Fits up to 58 CBM cargo safely).`;
  } else if (volCBM <= 68) {
    recommendation = `1x 40ft High Cube Container (Fits up to 68 CBM cargo safely).`;
  } else {
    const num40hc = Math.ceil(volCBM / 68);
    recommendation = `Multiple containers required: Suggest ${num40hc}x 40ft High Cube Containers.`;
  }
  
  document.getElementById("res-rec").textContent = recommendation;
}

/* ==========================================
   7. AIRCRAFT FREIGHTER HOTSPOT VIEWER
   ========================================== */
const AIRCRAFT_HOTSPOTS = {
  1: {
    title: "Flight Deck (Cockpit)",
    desc: "Located at the front upper nose section. Houses the pilots, advanced navigation computers, cargo door operation switches, and pilot crew rest facilities. In full freighters, passenger seating is removed to optimize cargo space."
  },
  2: {
    title: "Main Deck Cargo Door",
    desc: "An extremely large, hydraulically operated side-loading door (approx 3.4m wide x 3.1m high). This allows high-loader platforms to slide oversized, heavy pallets directly into the upper deck main cargo area."
  },
  3: {
    title: "Main Deck Cargo Hold",
    desc: "The primary high-volume cargo deck. Can accommodate cargo pallets stacked up to 3 meters (10 feet) high. Features structural tracks to lock PMC and PAG pallets securely during flight."
  },
  4: {
    title: "Cargo Roller System",
    desc: "Built directly into the cargo deck flooring. Features heavy-duty ball-mats and motor-driven rollers (PDU). Allows a small ground crew of 2-3 to glide massive 5-tonne pallets along the cabin effortlessly."
  },
  5: {
    title: "Lower Forward Cargo Hold",
    desc: "Heated and pressurized compartment located beneath the forward cockpit. Best suited for smaller Unit Load Devices (ULDs) such as LD3 and LD6 containers. Accommodates passengers' luggage in commercial flights."
  },
  6: {
    title: "PMC/PAG Cargo Loading",
    desc: "A mobile ground scissor platform (High Loader) raises cargo containers up to 5 meters high to level with the main deck door, enabling swift loading and unloading."
  },
  7: {
    title: "Lower Aft Cargo Hold",
    desc: "Located behind the wings in the lower belly. Pressurized and temperature-controlled. Houses ULD luggage boxes and is ideal for transport of animals, fresh seafood, and perishables."
  },
  8: {
    title: "Ground Crew & Cargo Dollies",
    desc: "Ground handling agent crew operate motorized tugs pulling rows of wheeled cargo dollies. These transport pre-built ULD cargo containers between the airport warehouse and the aircraft side."
  }
};

function initAircraftHotspots() {
  const hotspots = document.querySelectorAll(".hotspot");
  if (hotspots.length === 0) return;
  
  hotspots.forEach(spot => {
    spot.addEventListener("click", () => {
      const idx = spot.getAttribute("data-id");
      const data = AIRCRAFT_HOTSPOTS[idx];
      if (!data) return;
      
      document.getElementById("aircraft-info-title").textContent = `${idx}. ${data.title}`;
      document.getElementById("aircraft-info-desc").textContent = data.desc;
    });
    
    spot.addEventListener("mouseover", () => {
      const idx = spot.getAttribute("data-id");
      const data = AIRCRAFT_HOTSPOTS[idx];
      if (!data) return;
      
      document.getElementById("aircraft-info-title").textContent = `${idx}. ${data.title}`;
      document.getElementById("aircraft-info-desc").textContent = data.desc;
    });
  });
}

/* ==========================================
   8. 10 KEY LOGISTICS MODELS INTERACTIVE EXPLORER & SIMULATOR
   ========================================== */
const LOGISTICS_MODELS_DATA = {
  inbound: {
    id: "inbound",
    num: "01",
    title: "Inbound Logistics",
    tagline: "Raw Materials Intake & Factory Supply",
    icon: "📥",
    badge: "Supply Operations",
    desc: "Movement, receiving, and storage of incoming parts, raw materials, and components from suppliers to manufacturing plants.",
    activities: [
      "Supplier procurement & purchase order tracking",
      "Bulk raw material sea/truck freight transport",
      "Factory gate receiving, inspection & quality control",
      "Warehouse staging & Just-In-Time (JIT) storage"
    ],
    activeNodes: ["node-supplier", "node-factory"],
    speed: { text: "Scheduled / Batch", percent: 65 },
    cost: { text: "35% of Product Cost", percent: 70 },
    tech: { text: "ERP & WMS Tracking", percent: 80 },
    eco: { text: "Optimized Container Load", percent: 55 },
    scenario: "Transporting 20 FCL containers of raw cotton fabric from India/China to Colombo Port and trucking to Katunayake Free Trade Zone factory.",
    simSteps: [
      "Customs inspection & documentation release at Colombo Port.",
      "Heavy container truck haulage via Colombo Katunayake Expressway.",
      "Gate entry, unsealing & raw fabric roll inventory logging.",
      "Staging at factory cutting floor for garment production."
    ],
    comparison: {
      focus: "Supply side (Upstream)",
      primaryActor: "Raw Material Vendors & Factory",
      cargoType: "Raw materials, components, bulk parts",
      keyGoal: "Uninterrupted production flow without stockouts",
      techNeeded: "ERP, Purchase Order Tracking, WMS"
    }
  },
  outbound: {
    id: "outbound",
    num: "02",
    title: "Outbound Logistics",
    tagline: "Finished Goods Storage & Global Dispatch",
    icon: "📤",
    badge: "Fulfillment",
    desc: "Storage, order fulfillment, packaging, and shipping of finished commercial products from manufacturing hubs to final buyers.",
    activities: [
      "Finished goods warehousing & order pick-pack",
      "Export documentation (Bill of Lading, Certificate of Origin)",
      "Ocean FCL/LCL & Air Freight international shipping",
      "Distribution center transport & Last-Mile delivery"
    ],
    activeNodes: ["node-factory", "node-hub", "node-consumer"],
    speed: { text: "High Priority / Express", percent: 85 },
    cost: { text: "45% of Total Budget", percent: 85 },
    tech: { text: "Automated Picking & Freight Track", percent: 90 },
    eco: { text: "Route & Load Optimization", percent: 60 },
    scenario: "Exporting 500 pallets of finished rubber tires from Biyagama, Sri Lanka to Hamburg Seaport via ocean container line.",
    simSteps: [
      "Palletization & container stuffing at Biyagama factory.",
      "Export customs clearance & loading onto vessel at SAGT terminal.",
      "Transshipment voyage across Indian Ocean & Suez Canal.",
      "Discharge at Hamburg port & transport to European automotive dealers."
    ],
    comparison: {
      focus: "Demand side (Downstream)",
      primaryActor: "Manufacturers, Ocean Carriers, Retailers",
      cargoType: "Finished goods, packaged retail items",
      keyGoal: "On-time delivery & customer satisfaction",
      techNeeded: "TMS (Transport Management System), GPS Tracking"
    }
  },
  reverse: {
    id: "reverse",
    num: "03",
    title: "Reverse Logistics",
    tagline: "Returns, Recycling & Circular Trade",
    icon: "🔄",
    badge: "Circular Economy",
    desc: "Managing the backwards flow of returned, damaged, defective, or end-of-life products for repair, refurbishing, recycling, or disposal.",
    activities: [
      "Customer returns processing & RMA authorization",
      "Reverse transport from buyer back to hub",
      "Testing, sorting, refurbishment & repackaging",
      "E-waste recycling & hazardous waste disposal"
    ],
    activeNodes: ["node-consumer", "node-hub", "node-recycle"],
    speed: { text: "Moderate (Standard Return)", percent: 50 },
    cost: { text: "15-20% of Sale Value", percent: 60 },
    tech: { text: "Barcode Scanning & Returns Portal", percent: 75 },
    eco: { text: "High (Prevents Landfills)", percent: 95 },
    scenario: "Returning defective consumer electronics from retail customers across Sri Lanka back to Colombo service center for warranty repair.",
    simSteps: [
      "Customer drops off item at courier parcel shop.",
      "Consolidated return truck transport to Central Colombo Repair Hub.",
      "Technical inspection: 70% repaired, 30% salvaged for spare parts.",
      "E-waste materials dispatched to certified recycling facility."
    ],
    comparison: {
      focus: "Backward flow (End-of-life / Return)",
      primaryActor: "Customers, Return Hubs, Recyclers",
      cargoType: "Returned goods, defective items, empty pallets",
      keyGoal: "Value recovery & eco-friendly waste management",
      techNeeded: "Reverse Logistics Portal, RMA Tracking"
    }
  },
  thirdparty: {
    id: "thirdparty",
    num: "04",
    title: "Third-Party Logistics (3PL)",
    tagline: "Outsourced Warehousing & Freight Services",
    icon: "🏢",
    badge: "Outsourced Operations",
    desc: "Outsourcing operational logistics activities—such as warehousing, customs clearance, freight forwarding, and fleet trucking—to a specialized partner like Nexus Cargo.",
    activities: [
      "Multi-client bonded warehousing & inventory control",
      "Sea freight & air freight consolidation (LCL)",
      "Customs house brokerage (CHB) & regulatory clearance",
      "Container drayage & last-mile fleet dispatch"
    ],
    activeNodes: ["node-supplier", "node-hub", "node-consumer"],
    speed: { text: "High Efficiency & SLA Driven", percent: 80 },
    cost: { text: "Variable Pay-Per-Use", percent: 65 },
    tech: { text: "Cloud WMS, EDI & Live Tracking", percent: 85 },
    eco: { text: "Shared Fleet Capacity", percent: 75 },
    scenario: "Nexus Cargo managing complete bonded warehousing, customs clearance, and nationwide delivery for an international beverage brand.",
    simSteps: [
      "Ocean freight containers received at Nexus Logistics Center.",
      "Customs duty clearance & barcode inventory staging.",
      "Order pick & pack executed upon retail store requests.",
      "Dispatching trucks for same-day delivery to island-wide supermarkets."
    ],
    comparison: {
      focus: "Physical Execution & Operations",
      primaryActor: "3PL Provider (e.g. Nexus Cargo)",
      cargoType: "Multi-client general cargo, containers, parcels",
      keyGoal: "Operational cost reduction & asset optimization",
      techNeeded: "WMS, TMS, EDI Integrations"
    }
  },
  fourthparty: {
    id: "fourthparty",
    num: "05",
    title: "Fourth-Party Logistics (4PL)",
    tagline: "End-to-End Supply Chain Lead Orchestrator",
    icon: "🌐",
    badge: "Strategic Advisory",
    desc: "A master supply chain integrator that designs, builds, and manages an enterprise's entire logistics architecture, managing multiple 3PLs and ocean/air carriers.",
    activities: [
      "Supply chain network design & route optimization",
      "Managing multiple 3PL vendors & carrier contracts",
      "Big data analytics, demand forecasting & control tower",
      "Control tower visibility across global shipping lanes"
    ],
    activeNodes: ["node-supplier", "node-factory", "node-hub", "node-consumer"],
    speed: { text: "Strategic Real-Time Control", percent: 90 },
    cost: { text: "Strategic Management Fee", percent: 75 },
    tech: { text: "AI Control Tower & Unified APIs", percent: 98 },
    eco: { text: "Global Carbon Minimization", percent: 85 },
    scenario: "A global retail brand hiring a 4PL lead orchestrator to manage 4 ocean carriers, 3 customs brokers, and 5 regional 3PL warehouses across Asia.",
    simSteps: [
      "AI Control tower detects port congestion at Singapore.",
      "Reroutes 12 ocean shipments dynamically to alternative ports.",
      "Coordinates 3PL trucks at destination for immediate offloading.",
      "Provides real-time carbon & cost dashboard to executive board."
    ],
    comparison: {
      focus: "Strategic Network Design & Oversight",
      primaryActor: "4PL Lead Logistics Partner",
      cargoType: "Enterprise-wide global supply chain flows",
      keyGoal: "End-to-end visibility, strategic optimization",
      techNeeded: "AI Control Tower, Business Intelligence, APIs"
    }
  },
  production: {
    id: "production",
    num: "06",
    title: "Production Logistics",
    tagline: "Internal Assembly & Factory Material Flow",
    icon: "⚙️",
    badge: "Intralogistics",
    desc: "Managing internal material flows, buffer stocks, and parts delivery within a manufacturing plant to keep assembly lines running smoothly.",
    activities: [
      "Just-In-Time (JIT) & Just-In-Sequence (JIS) line feeding",
      "Automated Guided Vehicle (AGV) internal transit",
      "Work-In-Progress (WIP) inventory buffer management",
      "Lean manufacturing & kitting line replenishment"
    ],
    activeNodes: ["node-supplier", "node-factory"],
    speed: { text: "Synchronized to Seconds", percent: 95 },
    cost: { text: "Factory Automation", percent: 60 },
    tech: { text: "Robotics, AGVs & IoT Sensors", percent: 92 },
    eco: { text: "Zero Factory Waste", percent: 70 },
    scenario: "Automated guided vehicles delivering microchip kits to assembly stations in a high-tech electronics manufacturing facility.",
    simSteps: [
      "Sensors detect component bin dropping below 15% capacity.",
      "Robotic forklift retrieves kitted parts from internal buffer.",
      "Autonomous vehicle navigates factory floor to station #4.",
      "Assembly line workers receive microchips without stopping work."
    ],
    comparison: {
      focus: "Inside factory walls (Intralogistics)",
      primaryActor: "Factory Operations & Automation Robots",
      cargoType: "Parts kits, sub-assemblies, raw materials",
      keyGoal: "Zero assembly line downtime, lean inventory",
      techNeeded: "MES (Manufacturing Execution System), AGVs, RFID"
    }
  },
  distribution: {
    id: "distribution",
    num: "07",
    title: "Distribution Logistics",
    tagline: "Wholesale & Cross-Dock Hub Delivery",
    icon: "🏪",
    badge: "Commercial Dispatch",
    desc: "Movement of finished goods from regional distribution centers (DCs) and cross-dock facilities to retail stores, supermarkets, and regional stockists.",
    activities: [
      "Regional Distribution Center (RDC) hub operations",
      "Cross-docking (transfer without long storage)",
      "Multi-stop truck routing to retail networks",
      "Temperature-controlled cold chain distribution"
    ],
    activeNodes: ["node-hub", "node-consumer"],
    speed: { text: "Daily / Scheduled Express", percent: 85 },
    cost: { text: "High Transport & Handling", percent: 75 },
    tech: { text: "Dynamic Route Optimizer & Scanners", percent: 88 },
    eco: { text: "Consolidated Multi-Stop Loads", percent: 65 },
    scenario: "Daily cross-dock distribution of fresh dairy & frozen goods from central warehouse to 150 supermarket branches across Western Province.",
    simSteps: [
      "Refrigerated trucks dock at distribution center at 4:00 AM.",
      "Cargo sorted & palletized into store-specific delivery zones.",
      "Route optimization software generates shortest GPS transit path.",
      "Deliveries completed & electronic Proof of Delivery (ePOD) signed."
    ],
    comparison: {
      focus: "Hub to Market (Regional B2B)",
      primaryActor: "Distributors, Wholesalers, Truck Fleets",
      cargoType: "FMCG, perishable foods, consumer goods",
      keyGoal: "High product availability & fresh stock rotation",
      techNeeded: "Routing Software, Cold Chain Telematics, ePOD"
    }
  },
  military: {
    id: "military",
    num: "08",
    title: "Military Logistics",
    tagline: "Strategic Mobilization & Defense Support",
    icon: "🪖",
    badge: "Strategic Defense",
    desc: "Planning and executing the movement, maintenance, and sustainment of armed forces, equipment, fuel, and supplies during peacetime or active deployment.",
    activities: [
      "Heavy military transport aircraft & naval strategic sealift",
      "Tactical fuel, ammunition & ration supply chain",
      "Mobile field hospital & equipment maintenance units",
      "Secure communications & encrypted cargo tracking"
    ],
    activeNodes: ["node-factory", "node-hub", "node-consumer"],
    speed: { text: "Critical Immediate Mobilization", percent: 98 },
    cost: { text: "High Resilience Infra", percent: 90 },
    tech: { text: "Encrypted Satellite & Rugged Systems", percent: 95 },
    eco: { text: "Mission Success Priority", percent: 30 },
    scenario: "Air-lifting tactical relief vehicles, field medical units, and rations via heavy cargo aircraft to a remote international peacekeeping base.",
    simSteps: [
      "Strategic air command authorizes emergency flight plan.",
      "Heavy military cargo transport loaded with armored vehicles.",
      "Tactical flight & air-drop or landing at field airstrip.",
      "Immediate field deployment & supply distribution."
    ],
    comparison: {
      focus: "Defense & Strategic Security",
      primaryActor: "Armed Forces Logistics Corps & Heavy Transport",
      cargoType: "Armaments, fuel, rations, medical field gear",
      keyGoal: "Uncompromised security & mission readiness",
      techNeeded: "Encrypted Satellite GPS, Heavy Strategic Airlift"
    }
  },
  emergency: {
    id: "emergency",
    num: "09",
    title: "Emergency & Humanitarian",
    tagline: "Disaster Relief & Rapid Crisis Response",
    icon: "🚑",
    badge: "Humanitarian Relief",
    desc: "Rapid deployment of essential supplies—food, clean water, medical equipment, and shelter—to disaster-stricken or conflict zones under chaotic conditions.",
    activities: [
      "Priority charter flights & emergency customs clearance",
      "Humanitarian aid consolidation & relief drop zones",
      "Cold-chain vaccine & emergency blood transportation",
      "NGO & international relief agency coordination"
    ],
    activeNodes: ["node-factory", "node-hub", "node-consumer"],
    speed: { text: "Ultra Fast (< 24 Hours)", percent: 99 },
    cost: { text: "High Emergency Charter", percent: 85 },
    tech: { text: "GIS Disaster Mapping & Satellite", percent: 85 },
    eco: { text: "Life Saving First Priority", percent: 40 },
    scenario: "Airfreighting 50 tons of emergency medical kits, water purification units, and tents to flood-affected areas in South Asia within 18 hours.",
    simSteps: [
      "Emergency cargo flight chartered & priority air corridor granted.",
      "Cargo offloaded at nearest operational runway.",
      "Helicopter & 4x4 truck distribution to cut-off rural towns.",
      "Clean water units operational; medical clinics established."
    ],
    comparison: {
      focus: "Humanitarian Crisis & Life Saving",
      primaryActor: "UN, Red Cross, Disaster Response Teams",
      cargoType: "Vaccines, water purification, tents, food",
      keyGoal: "Speed of response & saving lives",
      techNeeded: "GIS Disaster Mapping, Satellite Comms, Air Charter"
    }
  },
  green: {
    id: "green",
    num: "10",
    title: "Green & Sustainable Logistics",
    tagline: "Eco-Friendly Transport & Zero Emission Strategy",
    icon: "🌿",
    badge: "Sustainability",
    desc: "Designing supply chain operations to minimize carbon footprint, greenhouse emissions, noise pollution, and material waste through eco-technologies.",
    activities: [
      "Biofuel ocean vessels & Electric Commercial Vehicles (EVs)",
      "Modal shift (Air to Sea / Road to Rail freight)",
      "Reusable plastic containers (RPCs) & eco-packaging",
      "Carbon accounting, offset tracking & green warehousing"
    ],
    activeNodes: ["node-supplier", "node-factory", "node-hub", "node-consumer", "node-recycle"],
    speed: { text: "Optimized Sustainable Pace", percent: 70 },
    cost: { text: "Long-Term Cost Savings", percent: 70 },
    tech: { text: "Carbon Analytics & EV Telematics", percent: 92 },
    eco: { text: "Maximum (Zero Emissions)", percent: 100 },
    scenario: "Switching export shipments from high-emission air freight to LNG/Biofuel ocean vessels & electric truck last-mile in European cities.",
    simSteps: [
      "Carbon footprint audit calculates 80% emission reduction opportunity.",
      "Cargo loaded onto Bio-LNG powered container ship at Colombo Port.",
      "Electric heavy-duty trucks handle port-to-warehouse drayage.",
      "Zero-emission delivery verified & green certification awarded."
    ],
    comparison: {
      focus: "Environmental Sustainability & Net-Zero",
      primaryActor: "Green Logistics Carriers, Eco Enterprises",
      cargoType: "Eco-packaged goods, sustainable freight",
      keyGoal: "Minimizing carbon emissions & environmental impact",
      techNeeded: "Carbon Footprint Calculators, EV Fleet Telematics"
    }
  }
};

let activeLogisticsModelKey = "inbound";
let simIntervalTimer = null;

function initLogisticsGrid() {
  renderLogisticsModelNav();
  populateLogisticsCompareDropdowns();
  selectLogisticsModel("inbound");
}

function renderLogisticsModelNav() {
  const navContainer = document.getElementById("logistics-model-nav");
  if (!navContainer) return;

  navContainer.innerHTML = Object.keys(LOGISTICS_MODELS_DATA).map(key => {
    const item = LOGISTICS_MODELS_DATA[key];
    return `
      <button class="logistics-nav-pill ${key === activeLogisticsModelKey ? 'active' : ''}" 
              onclick="selectLogisticsModel('${key}')" id="pill-model-${key}">
        <span class="pill-icon">${item.icon}</span>
        <span class="pill-text">${item.num}. ${item.title}</span>
      </button>
    `;
  }).join('');
}

function selectLogisticsModel(key) {
  const data = LOGISTICS_MODELS_DATA[key];
  if (!data) return;

  activeLogisticsModelKey = key;

  // Update Pills
  document.querySelectorAll(".logistics-nav-pill").forEach(p => p.classList.remove("active"));
  const activePill = document.getElementById(`pill-model-${key}`);
  if (activePill) {
    activePill.classList.add("active");
    activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Update Header & Badge
  document.getElementById("logistics-active-icon").textContent = data.icon;
  document.getElementById("logistics-active-title").textContent = data.title;
  document.getElementById("logistics-active-tagline").textContent = data.tagline;
  document.getElementById("logistics-active-badge").textContent = data.badge;

  // Update Pipeline Nodes Highlight
  const allNodes = ["node-supplier", "node-factory", "node-hub", "node-consumer", "node-recycle"];
  allNodes.forEach(nodeId => {
    const el = document.getElementById(nodeId);
    if (el) {
      if (data.activeNodes.includes(nodeId)) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  });

  // Update Pipeline Connectors Highlight
  const connectors = ["conn-1", "conn-2", "conn-3", "conn-4"];
  connectors.forEach((connId, idx) => {
    const connEl = document.getElementById(connId);
    if (connEl) {
      const nodeA = allNodes[idx];
      const nodeB = allNodes[idx + 1];
      if (data.activeNodes.includes(nodeA) && data.activeNodes.includes(nodeB)) {
        connEl.classList.add("active");
      } else {
        connEl.classList.remove("active");
      }
    }
  });

  // Update Description & Activities
  document.getElementById("logistics-active-desc").textContent = data.desc;
  const actList = document.getElementById("logistics-active-activities");
  if (actList) {
    actList.innerHTML = data.activities.map(act => `<li><span class="act-bullet">✓</span> ${act}</li>`).join('');
  }

  // Update KPI Meters
  document.getElementById("kpi-speed-val").textContent = data.speed.text;
  document.getElementById("kpi-speed-fill").style.width = `${data.speed.percent}%`;

  document.getElementById("kpi-cost-val").textContent = data.cost.text;
  document.getElementById("kpi-cost-fill").style.width = `${data.cost.percent}%`;

  document.getElementById("kpi-tech-val").textContent = data.tech.text;
  document.getElementById("kpi-tech-fill").style.width = `${data.tech.percent}%`;

  document.getElementById("kpi-eco-val").textContent = data.eco.text;
  document.getElementById("kpi-eco-fill").style.width = `${data.eco.percent}%`;

  // Reset Simulation Box
  document.getElementById("sim-scenario-text").textContent = data.scenario;
  const simWrapper = document.getElementById("sim-progress-wrapper");
  if (simWrapper) simWrapper.style.display = "none";
  const btnRun = document.getElementById("btn-run-sim");
  if (btnRun) {
    btnRun.disabled = false;
    btnRun.innerHTML = `<span class="sim-btn-icon">▶</span> Run Live Simulation`;
  }
  if (simIntervalTimer) clearInterval(simIntervalTimer);
}

function runCurrentLogisticsSimulation() {
  const data = LOGISTICS_MODELS_DATA[activeLogisticsModelKey];
  if (!data) return;

  const btnRun = document.getElementById("btn-run-sim");
  const simWrapper = document.getElementById("sim-progress-wrapper");
  const progressBar = document.getElementById("sim-progress-bar");
  const statusText = document.getElementById("sim-status-text");

  if (simIntervalTimer) clearInterval(simIntervalTimer);

  btnRun.disabled = true;
  btnRun.innerHTML = `<span class="sim-btn-icon">⏳</span> Simulating...`;
  simWrapper.style.display = "block";
  progressBar.style.width = "0%";

  let stepIdx = 0;
  const steps = data.simSteps;
  const totalSteps = steps.length;

  statusText.textContent = `Step 1: ${steps[0]}`;
  progressBar.style.width = `${((1) / totalSteps) * 100}%`;

  simIntervalTimer = setInterval(() => {
    stepIdx++;
    if (stepIdx < totalSteps) {
      statusText.textContent = `Step ${stepIdx + 1}: ${steps[stepIdx]}`;
      progressBar.style.width = `${((stepIdx + 1) / totalSteps) * 100}%`;
    } else {
      clearInterval(simIntervalTimer);
      statusText.textContent = `✅ Simulation Completed: All cargo milestones reached successfully!`;
      btnRun.disabled = false;
      btnRun.innerHTML = `<span class="sim-btn-icon">🔄</span> Re-Run Simulation`;
    }
  }, 1800);
}

function setLogisticsView(viewType) {
  const btnExplorer = document.getElementById("logistics-btn-explorer");
  const btnCompare = document.getElementById("logistics-btn-compare");
  const viewExplorer = document.getElementById("logistics-view-explorer");
  const viewCompare = document.getElementById("logistics-view-compare");

  if (viewType === 'explorer') {
    btnExplorer.classList.add("active");
    btnCompare.classList.remove("active");
    viewExplorer.style.display = "block";
    viewCompare.style.display = "none";
  } else {
    btnCompare.classList.add("active");
    btnExplorer.classList.remove("active");
    viewCompare.style.display = "block";
    viewExplorer.style.display = "none";
    renderLogisticsComparison();
  }
}

function populateLogisticsCompareDropdowns() {
  const selectA = document.getElementById("compare-model-a");
  const selectB = document.getElementById("compare-model-b");
  if (!selectA || !selectB) return;

  const optionsHTML = Object.keys(LOGISTICS_MODELS_DATA).map(key => {
    const item = LOGISTICS_MODELS_DATA[key];
    return `<option value="${key}">${item.num}. ${item.title}</option>`;
  }).join('');

  selectA.innerHTML = optionsHTML;
  selectB.innerHTML = optionsHTML;

  selectA.value = "thirdparty";
  selectB.value = "fourthparty";
}

function renderLogisticsComparison() {
  const keyA = document.getElementById("compare-model-a").value;
  const keyB = document.getElementById("compare-model-b").value;
  const table = document.getElementById("logistics-compare-table");
  if (!table) return;

  const mA = LOGISTICS_MODELS_DATA[keyA];
  const mB = LOGISTICS_MODELS_DATA[keyB];

  table.innerHTML = `
    <thead>
      <tr>
        <th style="width: 25%;">Feature Comparison</th>
        <th style="width: 37.5%; text-align: center;">${mA.icon} ${mA.title}</th>
        <th style="width: 37.5%; text-align: center;">${mB.icon} ${mB.title}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Primary Strategic Focus</strong></td>
        <td>${mA.comparison.focus}</td>
        <td>${mB.comparison.focus}</td>
      </tr>
      <tr>
        <td><strong>Primary Operational Actor</strong></td>
        <td>${mA.comparison.primaryActor}</td>
        <td>${mB.comparison.primaryActor}</td>
      </tr>
      <tr>
        <td><strong>Cargo & Flow Type</strong></td>
        <td>${mA.comparison.cargoType}</td>
        <td>${mB.comparison.cargoType}</td>
      </tr>
      <tr>
        <td><strong>Core Strategic Goal</strong></td>
        <td>${mA.comparison.keyGoal}</td>
        <td>${mB.comparison.keyGoal}</td>
      </tr>
      <tr>
        <td><strong>Core Systems Required</strong></td>
        <td>${mA.comparison.techNeeded}</td>
        <td>${mB.comparison.techNeeded}</td>
      </tr>
      <tr>
        <td><strong>Speed & Urgency Level</strong></td>
        <td>${mA.speed.text} (${mA.speed.percent}%)</td>
        <td>${mB.speed.text} (${mB.speed.percent}%)</td>
      </tr>
      <tr>
        <td><strong>Sustainability & Eco Rating</strong></td>
        <td>${mA.eco.text} (${mA.eco.percent}%)</td>
        <td>${mB.eco.text} (${mB.eco.percent}%)</td>
      </tr>
    </tbody>
  `;
}


/* ==========================================
   10. CONTACT FORM HANDLER
   ========================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-msg").value;
    const submitBtn = form.querySelector("button[type='submit']");
    
    // UI Feedback state
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Message...";
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "4c5f2dca-0449-478a-8228-a48af98ae7ec",
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });
      
      const result = await response.json();
      
      if (response.status === 200) {
        alert("Thank you! Your message has been sent successfully to Darshika @ Nexys Cargo. We will contact you soon.");
        form.reset();
      } else {
        alert(`Failed to send message: ${result.message || 'Unknown error'}. Please try again.`);
      }
    } catch (error) {
      alert("Failed to connect to the server. Please check your internet connection and try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// ==========================================
// NEW INTERACTIVE TOOLS LOGIC
// ==========================================

// ==========================================
// Tool 5: Bilateral Trade Documentation Checklist Generator
// ==========================================

const countryNames = {
  LK: { name: "Sri Lanka", flag: "🇱🇰", region: "South Asia" },
  CN: { name: "China", flag: "🇨🇳", region: "East Asia" },
  US: { name: "United States", flag: "🇺🇸", region: "North America" },
  DE: { name: "Germany (EU)", flag: "🇩🇪", region: "Europe" },
  IN: { name: "India", flag: "🇮🇳", region: "South Asia" },
  GB: { name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  AE: { name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East" },
  JP: { name: "Japan", flag: "🇯🇵", region: "East Asia" },
  AU: { name: "Australia", flag: "🇦🇺", region: "Oceania" },
  VN: { name: "Vietnam", flag: "🇻🇳", region: "Southeast Asia" },
  SG: { name: "Singapore", flag: "🇸🇬", region: "Southeast Asia" },
  NL: { name: "Netherlands (EU)", flag: "🇳🇱", region: "Europe" }
};

const docKnowledgeBase = {
  commercial_invoice: {
    title: "Commercial Invoice",
    authority: "Exporter / Shipper",
    deadline: "Prior to origin gate-in and customs clearance",
    rejectionRisks: "HS code mismatch, missing invoice currency, un-signed invoice, incorrect Incoterms breakdown.",
    details: "The primary legal and financial document declaring cargo value, buyer/seller details, 6-digit HS tariff codes, Incoterms 2020, and payment terms."
  },
  packing_list: {
    title: "Detailed Packing List",
    authority: "Shipper / Freight Packer",
    deadline: "Prior to container stuffing / warehouse receipt",
    rejectionRisks: "Discrepancy between invoice gross weight and actual scale weight, un-numbered carton counts.",
    details: "Specifies precise cargo breakdown per package, container stuffing orientation, net/gross weight, dimensions, and shipping marks."
  },
  bill_of_lading: {
    title: "Ocean Bill of Lading (B/L) / Sea Waybill",
    authority: "Ocean Transport Carrier (Vessel Operator / Freight Forwarder)",
    deadline: "Issued 24-48 hours after vessel departure from origin port",
    rejectionRisks: "Missing onboard notation date, seal number mismatch, un-signed original endorsement.",
    details: "Acts as official contract of carriage, receipt of cargo by vessel, and legal document of title required for destination cargo release."
  },
  air_waybill: {
    title: "Air Waybill (AWB) / Master AWB",
    authority: "Airline / Air Freight Forwarder",
    deadline: "Issued upon cargo acceptance at airport freight terminal",
    rejectionRisks: "Chargeable weight calculation error, missing ICAO/IATA dangerous goods code.",
    details: "Non-negotiable contract of carriage for air cargo, tracking number for flight transit and customs clearance."
  },
  isf_10_2: {
    title: "US Customs ISF 10+2 (Importer Security Filing)",
    authority: "US Importer of Record / Authorized Customs Broker",
    deadline: "STRICT CUT-OFF: Must be filed 24 Hours BEFORE vessel departure at origin port",
    rejectionRisks: "$5,000 fine per late filing by US CBP, hold on container at US discharge port.",
    details: "Mandatory security filing for ocean imports to the USA requiring 10 data elements from importer and 2 from carrier."
  },
  ics2_ens: {
    title: "EU Import Control System 2 (ICS2) ENS Filing",
    authority: "Carrier / Forwarder",
    deadline: "STRICT CUT-OFF: Must be filed 24 Hours BEFORE vessel loading at origin port",
    rejectionRisks: "Do Not Load (DNL) order issued by EU customs, vessel loading refusal.",
    details: "Advance cargo security declaration for all shipments entering or transiting European Union customs territory."
  },
  ccam_filing: {
    title: "China Customs Advance Manifest (CCAM)",
    authority: "Carrier / Shipping Agent",
    deadline: "STRICT CUT-OFF: 24 Hours prior to cargo loading at origin port",
    rejectionRisks: "Immediate rejection of vessel stowage slot by GACC (China Customs).",
    details: "Mandatory electronic cargo manifest filing required for all imports entering Chinese maritime ports."
  },
  cusdec_sl: {
    title: "Sri Lanka ASYCUDA CUSDEC Export/Import Declaration",
    authority: "Licensed Customs House Agent (CHA) / Declarant",
    deadline: "Prior to port gate-in (export) or prior to discharge (import)",
    rejectionRisks: "Incorrect TIN/VAT registration number, missing SVAT voucher, HS code misclassification.",
    details: "Official customs declaration submitted electronically via Sri Lanka Customs ASYCUDA World system."
  },
  icegate_be: {
    title: "India ICEGATE Bill of Entry / Shipping Bill",
    authority: "Customs Broker / Importer via ICEGATE Portal",
    deadline: "Prior to end of day following vessel arrival at Indian port",
    rejectionRisks: "Late filing penalty per day, CAROTAR 2020 origin compliance verification query.",
    details: "Electronic declaration filed on Indian Customs ICEGATE portal for duty calculation and cargo release."
  },
  cds_uk: {
    title: "UK Customs Declaration Service (CDS) Entry",
    authority: "UK Declarant / Customs Agent",
    deadline: "Prior to vessel arrival or GVMS movement reference generation",
    rejectionRisks: "Invalid GB EORI number, missing CPC procedure code.",
    details: "Official UK HMRC customs entry declaration system governing all imports following Brexit."
  },
  mirsal_uae: {
    title: "Dubai Customs Mirsal II Declaration",
    authority: "Dubai Customs Broker / Importer",
    deadline: "24 Hours prior to cargo arrival at UAE port/airport",
    rejectionRisks: "Unregistered UAE Customs Code, failure to submit commercial invoice in Arabic.",
    details: "Electronic customs clearing declaration required for all cargo entering UAE free zones or mainland."
  },
  sea_ams_jp: {
    title: "Japan Sea AMS (Advance Manifest System)",
    authority: "Carrier / NVOCC",
    deadline: "STRICT CUT-OFF: 24 Hours prior to departure from origin port",
    rejectionRisks: "Japan Customs Do Not Load notice, administrative fines.",
    details: "Electronic advance manifest rule requiring vessel operators to file cargo details to Japan NACCS."
  },
  bmsb_cert: {
    title: "Seasonal BMSB Stink Bug Treatment Certificate",
    authority: "Approved Offshore Treatment Provider (Heat / Fumigation)",
    deadline: "Prior to vessel departure during seasonal window (Sept - May)",
    rejectionRisks: "Immediate refusal of vessel berth by DAFF Australia, container re-export order.",
    details: "Mandatory biosecurity treatment certificate for high-risk target goods shipped to Australia/NZ."
  },
  certificate_of_origin: {
    title: "Certificate of Origin (Preferential / Non-Preferential)",
    authority: "Chamber of Commerce / National Trade Ministry",
    deadline: "Submitted during import customs clearance",
    rejectionRisks: "Invalid origin criteria stamp, missing Chamber verification QR code.",
    details: "Official document certifying the manufacturing country of origin to qualify for concessionary tariffs under FTAs."
  },
  msds_dgd: {
    title: "Shipper's Declaration for Dangerous Goods (DGD) & SDS",
    authority: "Certified ICAO/IMDG Dangerous Goods Packer",
    deadline: "Submitted at time of booking & container stuffing",
    rejectionRisks: "Rejection by vessel master, emergency port detention, severe regulatory fines.",
    details: "Mandatory hazardous material safety dossier containing 16-section Safety Data Sheet (SDS) & IMDG UN classification."
  },
  phytosanitary_health: {
    title: "Phytosanitary / Quarantine & Health Certificate",
    authority: "National Plant Protection Organization (NPPO) / Food Safety Authority",
    deadline: "Issued prior to export shipment departure",
    rejectionRisks: "Immediate quarantine hold, container fumigation order, cargo destruction.",
    details: "Official plant/food health certification confirming cargo is free from regulated pests and fits human consumption."
  }
};

let currentDocChecklistState = [];
let currentActiveFilter = 'all';

function generateDocChecklist() {
  const origin = document.getElementById('doc-origin-country').value;
  const dest = document.getElementById('doc-dest-country').value;
  const mode = document.getElementById('doc-transport-mode').value;
  const cargo = document.getElementById('doc-cargo-type').value;
  const resultDiv = document.getElementById('doc-checklist-result');

  const originInfo = countryNames[origin] || { name: origin, flag: "🌐" };
  const destInfo = countryNames[dest] || { name: dest, flag: "🌐" };

  // Detect Trade Agreement Corridors
  let activeFTA = null;
  const corridorKey = `${origin}-${dest}`;
  if ((origin === 'LK' && dest === 'IN') || (origin === 'IN' && dest === 'LK')) {
    activeFTA = { name: "SAFTA / ISFTA Preferential Tariff Corridor", code: "ISFTA / SAFTA Form I", desc: "0-5% Concessionary Duty rates applicable." };
  } else if ((origin === 'DE' && dest === 'NL') || (origin === 'NL' && dest === 'DE')) {
    activeFTA = { name: "EU Single Market & Customs Union", code: "Free Movement", desc: "No customs duties or tariffs required." };
  } else if ((origin === 'DE' && dest === 'GB') || (origin === 'GB' && dest === 'DE')) {
    activeFTA = { name: "UK-EU Trade and Cooperation Agreement (TCA)", code: "EUR.1 / Statement on Origin", desc: "Zero tariff access with origin compliance." };
  } else if (['CN', 'VN', 'SG', 'JP', 'AU'].includes(origin) && ['CN', 'VN', 'SG', 'JP', 'AU'].includes(dest)) {
    activeFTA = { name: "RCEP Trade Corridor", code: "Form RCEP", desc: "Regional Comprehensive Economic Partnership tariff concessions." };
  }

  // Build Comprehensive Document Array
  currentDocChecklistState = [
    { key: "commercial_invoice", name: "Commercial Invoice", category: "title", priority: "MANDATORY CUSTOMS", badgeClass: "badge-customs", checked: false },
    { key: "packing_list", name: "Detailed Packing List", category: "title", priority: "CARRIER TITLE", badgeClass: "badge-title", checked: false }
  ];

  // Transport Mode Document
  if (mode === 'ocean') {
    currentDocChecklistState.push({ key: "bill_of_lading", name: "Ocean Bill of Lading (B/L) / Sea Waybill", category: "title", priority: "TITLE OF GOODS", badgeClass: "badge-title", checked: false });
  } else {
    currentDocChecklistState.push({ key: "air_waybill", name: "Air Waybill (AWB)", category: "title", priority: "CARRIER TITLE", badgeClass: "badge-title", checked: false });
  }

  // 24H Pre-Loading Security Filings & Country Mandates
  if (dest === 'US' && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "isf_10_2", name: "US Customs ISF 10+2 (Importer Security Filing)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }
  if ((dest === 'DE' || dest === 'NL') && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "ics2_ens", name: "EU ICS2 Entry Summary Declaration (ENS)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }
  if (dest === 'CN' && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "ccam_filing", name: "China Customs Advance Manifest (CCAM)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }
  if (dest === 'JP' && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "sea_ams_jp", name: "Japan Sea AMS (Advance Manifest)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }

  // Destination Customs Declarations
  if (origin === 'LK') {
    currentDocChecklistState.push({ key: "cusdec_sl", name: "Sri Lanka CUSDEC Export Declaration", category: "customs", priority: "ORIGIN CUSTOMS", badgeClass: "badge-customs", checked: false });
  }
  if (dest === 'IN') {
    currentDocChecklistState.push({ key: "icegate_be", name: "India ICEGATE Bill of Entry & CAROTAR Form", category: "customs", priority: "DESTINATION CUSTOMS", badgeClass: "badge-customs", checked: false });
  }
  if (dest === 'GB') {
    currentDocChecklistState.push({ key: "cds_uk", name: "UK Customs Declaration Service (CDS) Entry", category: "customs", priority: "DESTINATION CUSTOMS", badgeClass: "badge-customs", checked: false });
  }
  if (dest === 'AE') {
    currentDocChecklistState.push({ key: "mirsal_uae", name: "Dubai Customs Mirsal II Declaration", category: "customs", priority: "DESTINATION CUSTOMS", badgeClass: "badge-customs", checked: false });
  }

  // Seasonal & Biosecurity
  if (dest === 'AU') {
    currentDocChecklistState.push({ key: "bmsb_cert", name: "Australia Seasonal BMSB Stink Bug Treatment Cert", category: "safety", priority: "BIOSECURITY MANDATE", badgeClass: "badge-safety", checked: false });
  }

  // Trade Agreement Certificate of Origin
  if (activeFTA) {
    currentDocChecklistState.push({ key: "certificate_of_origin", name: `Certificate of Origin (${activeFTA.code})`, category: "customs", priority: "PREFERENTIAL TARIFF", badgeClass: "badge-customs", checked: false });
  } else {
    currentDocChecklistState.push({ key: "certificate_of_origin", name: "Standard Chamber Certificate of Origin", category: "customs", priority: "CUSTOMS REQUIREMENT", badgeClass: "badge-customs", checked: false });
  }

  // Cargo Category Special Requirements
  if (cargo === 'dangerous') {
    currentDocChecklistState.push({ key: "msds_dgd", name: "IMO/ICAO Dangerous Goods Declaration & SDS", category: "safety", priority: "HAZARDOUS MANDATE", badgeClass: "badge-safety", checked: false });
  } else if (cargo === 'food') {
    currentDocChecklistState.push({ key: "phytosanitary_health", name: "Phytosanitary & Food Safety Health Certificate", category: "safety", priority: "QUARANTINE MANDATE", badgeClass: "badge-safety", checked: false });
  }

  renderDocChecklistUI(originInfo, destInfo, activeFTA);
}

function renderDocChecklistUI(originInfo, destInfo, activeFTA) {
  const resultDiv = document.getElementById('doc-checklist-result');
  const totalCount = currentDocChecklistState.length;
  const completedCount = currentDocChecklistState.filter(d => d.checked).length;
  const pct = Math.round((completedCount / totalCount) * 100) || 0;

  let html = `
    <!-- Corridor Route Banner -->
    <div class="doc-route-banner">
      <div class="doc-route-flags">
        <span>${originInfo.flag} ${originInfo.name}</span>
        <span class="doc-route-arrow">➔</span>
        <span>${destInfo.flag} ${destInfo.name}</span>
      </div>
      ${activeFTA ? `<span class="doc-trade-agreement">📜 ${activeFTA.name}</span>` : `<span class="doc-trade-agreement" style="border-color:#94A3B8; color:#94A3B8;">🌐 Standard MFN Corridor</span>`}
    </div>

    <!-- Live Completion Progress Tracker Bar -->
    <div class="doc-progress-wrapper">
      <div class="doc-progress-text">
        <span>Dossier Completion Progress</span>
        <span id="doc-pct-text">${completedCount} of ${totalCount} Required Documents (${pct}%)</span>
      </div>
      <div class="doc-progress-bg">
        <div class="doc-progress-fill" id="doc-progress-fill" style="width: ${pct}%;"></div>
      </div>
    </div>

    <!-- Filter Pills -->
    <div class="doc-filter-pills">
      <button class="doc-pill ${currentActiveFilter === 'all' ? 'active' : ''}" onclick="filterDocCategory('all')">All Documents (${totalCount})</button>
      <button class="doc-pill ${currentActiveFilter === '24h' ? 'active' : ''}" onclick="filterDocCategory('24h')">🚨 24h Pre-Loading Filings</button>
      <button class="doc-pill ${currentActiveFilter === 'title' ? 'active' : ''}" onclick="filterDocCategory('title')">📄 Transport Titles</button>
      <button class="doc-pill ${currentActiveFilter === 'customs' ? 'active' : ''}" onclick="filterDocCategory('customs')">⚖️ Customs & Origin</button>
      <button class="doc-pill ${currentActiveFilter === 'safety' ? 'active' : ''}" onclick="filterDocCategory('safety')">🛡️ Safety & Inspection</button>
    </div>

    <!-- Document List Items -->
    <div id="doc-items-list">
  `;

  currentDocChecklistState.forEach((doc, idx) => {
    if (currentActiveFilter !== 'all' && doc.category !== currentActiveFilter) return;

    const info = docKnowledgeBase[doc.key] || { details: "Standard required shipment document.", authority: "Authority", deadline: "Pre-departure" };

    html += `
      <div class="doc-item-card ${doc.checked ? 'completed' : ''}" id="doc-card-${idx}">
        <input type="checkbox" class="doc-checkbox" ${doc.checked ? 'checked' : ''} onchange="toggleDocCheckbox(${idx})">
        <div style="flex:1;">
          <span class="doc-priority-badge ${doc.badgeClass}">${doc.priority}</span>
          <strong style="display:block; font-size:1.05rem; color:var(--primary-navy); margin-bottom:4px;">${doc.name}</strong>
          <p style="font-size:0.88rem; color:#64748B; margin-bottom:8px;">${info.details}</p>
          <div style="display:flex; gap:20px; font-size:0.8rem; color:#475569;">
            <span>🏛️ <strong>Authority:</strong> ${info.authority}</span>
            <span>⏱️ <strong>Deadline:</strong> ${info.deadline}</span>
          </div>
          <button class="doc-detail-btn" onclick="openDocDetailModal('${doc.key}')">🔍 View Full Document Guide & Rejection Risks</button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  resultDiv.innerHTML = html;
}

function toggleDocCheckbox(index) {
  if (currentDocChecklistState[index]) {
    currentDocChecklistState[index].checked = !currentDocChecklistState[index].checked;
    
    // Update card styling live
    const card = document.getElementById(`doc-card-${index}`);
    if (card) {
      if (currentDocChecklistState[index].checked) {
        card.classList.add('completed');
      } else {
        card.classList.remove('completed');
      }
    }

    // Update progress bar
    const totalCount = currentDocChecklistState.length;
    const completedCount = currentDocChecklistState.filter(d => d.checked).length;
    const pct = Math.round((completedCount / totalCount) * 100) || 0;

    const pctText = document.getElementById('doc-pct-text');
    const fillBar = document.getElementById('doc-progress-fill');

    if (pctText) pctText.innerText = `${completedCount} of ${totalCount} Required Documents (${pct}%)`;
    if (fillBar) fillBar.style.width = `${pct}%`;
  }
}

function filterDocCategory(category) {
  currentActiveFilter = category;
  const origin = document.getElementById('doc-origin-country').value;
  const dest = document.getElementById('doc-dest-country').value;
  const originInfo = countryNames[origin] || { name: origin, flag: "🌐" };
  const destInfo = countryNames[dest] || { name: dest, flag: "🌐" };
  
  renderDocChecklistUI(originInfo, destInfo, null);
}

function openDocDetailModal(docKey) {
  const doc = docKnowledgeBase[docKey];
  if (!doc) return;

  // Remove existing modal if any
  closeDocDetailModal();

  const modalHtml = `
    <div class="doc-modal-overlay" id="doc-modal-overlay" onclick="closeDocDetailModal()">
      <div class="doc-modal-container" onclick="event.stopPropagation()">
        <div class="doc-modal-header">
          <h4 style="font-size:1.1rem; font-weight:700;">📄 ${doc.title}</h4>
          <button style="background:none; border:none; color:#FFF; font-size:1.5rem; cursor:pointer;" onclick="closeDocDetailModal()">✕</button>
        </div>
        <div class="doc-modal-body">
          <div class="doc-modal-section">
            <h5>🏛️ Issuing / Regulatory Authority</h5>
            <p>${doc.authority}</p>
          </div>
          <div class="doc-modal-section">
            <h5>⏱️ Strict Cut-Off &amp; Filing Deadline</h5>
            <p style="color:#DC2626; font-weight:700;">${doc.deadline}</p>
          </div>
          <div class="doc-modal-section">
            <h5>⚠️ Common Customs Rejection &amp; Fine Risks</h5>
            <p style="background:#FEE2E2; padding:12px; border-radius:8px; border-left:4px solid #DC2626; color:#991B1B;">${doc.rejectionRisks}</p>
          </div>
          <div class="doc-modal-section">
            <h5>📋 Operational Instructions &amp; Purpose</h5>
            <p>${doc.details}</p>
          </div>
          <button class="btn btn-primary" style="width:100%; padding:12px; margin-top:15px;" onclick="closeDocDetailModal()">Close Guide</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeDocDetailModal() {
  const modal = document.getElementById('doc-modal-overlay');
  if (modal) modal.remove();
}

function printDocChecklist() {
  window.print();
}

// Tool 6: Dangerous Goods (DG) Class Identifier
// Tool 6: Dangerous Goods (DG) Class & Segregation Master Suite Engine
let currentDGSelectedClass = '';

const dgDictionary = {
  // Class 1
  fireworks: { un: "UN0336", cls: "Class 1.4G", label: "💥", desc: "Fireworks, non-mass explosion hazard.", restrict: "Strictly regulated. Forbidden on passenger aircraft. Cargo Aircraft Only (CAO).", erg: "Guide 114" },
  flares: { un: "UN0092", cls: "Class 1.3G", label: "💥", desc: "Flares, surface. Pyrotechnic signalling devices.", restrict: "Forbidden on passenger aircraft. CAO restricted under IATA DGR.", erg: "Guide 114" },
  ammunition: { un: "UN0012", cls: "Class 1.4S", label: "💥", desc: "Cartridges for weapons, inert projectile.", restrict: "Permitted in limited quantities with written carrier approval.", erg: "Guide 114" },
  // Class 2
  aerosols: { un: "UN1950", cls: "Class 2.1", label: "🔥💨", desc: "Aerosols, flammable (e.g. spray paint, hairspray, butane).", restrict: "Limited Quantity (LQ) exceptions apply up to 1L per inner container.", erg: "Guide 126" },
  oxygen: { un: "UN1072", cls: "Class 2.2 / 5.1", label: "💨⚡", desc: "Oxygen, compressed. Non-flammable gas but strongly oxidising.", restrict: "Requires rigid outer packaging for air transport. Keep free of oil/grease.", erg: "Guide 122" },
  nitrogen: { un: "UN1066", cls: "Class 2.2", label: "💨", desc: "Nitrogen, compressed. Asphyxiant gas.", restrict: "Requires adequate cargo hold ventilation if leaked.", erg: "Guide 121" },
  lpg: { un: "UN1075", cls: "Class 2.1", label: "🔥💨", desc: "Petroleum gases, liquefied (LPG / Propane / Butane).", restrict: "Forbidden on passenger aircraft. Strict volume limits on CAO.", erg: "Guide 115" },
  ammonia: { un: "UN1005", cls: "Class 2.3", label: "☣️💨", desc: "Anhydrous ammonia. Toxic and corrosive gas.", restrict: "Forbidden on passenger aircraft. Toxic hazard label mandatory.", erg: "Guide 125" },
  // Class 3
  paint: { un: "UN1263", cls: "Class 3", label: "🔥", desc: "Paint or paint related material (flammable liquids).", restrict: "Allowed on PAX & CAO subject to volume limits per inner packaging.", erg: "Guide 128" },
  perfume: { un: "UN1266", cls: "Class 3", label: "🔥", desc: "Perfumery products with flammable solvents.", restrict: "Consumer commodity exceptions apply if inner volume <= 500ml.", erg: "Guide 127" },
  gasoline: { un: "UN1203", cls: "Class 3", label: "🔥", desc: "Motor spirit, petrol or gasoline.", restrict: "Highly restricted. Very low volume limits. Flash point < -40°C.", erg: "Guide 128" },
  alcohol: { un: "UN1170", cls: "Class 3", label: "🔥", desc: "Ethanol (Ethyl alcohol) or ethanol solution.", restrict: "Regulated based on alcohol concentration percentage (> 24% ABV).", erg: "Guide 127" },
  // Class 4
  matches: { un: "UN1331", cls: "Class 4.1", label: "🔥", desc: "Matches, 'strike anywhere'. Flammable solid.", restrict: "Forbidden on all passenger and cargo aircraft. Ocean/Road only.", erg: "Guide 133" },
  sodium: { un: "UN1428", cls: "Class 4.3", label: "🔥💧", desc: "Sodium metal. Dangerous when wet; emits flammable gases with water.", restrict: "Must be kept hermetically sealed under mineral oil or argon gas.", erg: "Guide 138" },
  camphor: { un: "UN2717", cls: "Class 4.1", label: "🔥", desc: "Camphor, synthetic. Flammable solid.", restrict: "Regulated. Keep away from heat sources and oxidizers.", erg: "Guide 133" },
  // Class 5
  hydrogen_peroxide: { un: "UN2014", cls: "Class 5.1 / 8", label: "⚡🧪", desc: "Hydrogen peroxide, aqueous solution. Oxidizing and corrosive.", restrict: "Strictly regulated. Vented packaging required to release oxygen pressure.", erg: "Guide 140" },
  ammonium_nitrate: { un: "UN1942", cls: "Class 5.1", label: "⚡", desc: "Ammonium nitrate. Strong oxidizing agent.", restrict: "Highly regulated due to mass explosion potential if contaminated.", erg: "Guide 140" },
  // Class 6
  pesticides: { un: "UN2588", cls: "Class 6.1", label: "☠️", desc: "Pesticide, solid, toxic, n.o.s.", restrict: "Forbidden next to foodstuffs or animal feeds under IMDG Chapter 7.2.", erg: "Guide 151" },
  cyanide: { un: "UN1588", cls: "Class 6.1", label: "☠️", desc: "Cyanides, inorganic, solid, n.o.s.", restrict: "Extremely toxic. Requires UN-tested specification packaging.", erg: "Guide 157" },
  infectious_human: { un: "UN2814", cls: "Class 6.2", label: "☣️", desc: "Infectious substance, affecting humans (Category A virus/bacteria).", restrict: "Strict triple-packaging required (IATA P620 / UN 4GU).", erg: "Guide 158" },
  clinical_waste: { un: "UN3291", cls: "Class 6.2", label: "☣️", desc: "Clinical waste, unspecified, n.o.s.", restrict: "Requires rigid, leak-proof, puncture-resistant biohazard packaging.", erg: "Guide 158" },
  // Class 7
  radioactive_excepted: { un: "UN2910", cls: "Class 7", label: "☢️", desc: "Radioactive material, excepted package.", restrict: "Permitted subject to strict surface radiation dose limits.", erg: "Guide 161" },
  uranium: { un: "UN2979", cls: "Class 7", label: "☢️", desc: "Uranium metal, pyrophoric.", restrict: "Highly regulated. Requires radiation shielding and IAEA approval.", erg: "Guide 162" },
  // Class 8
  sulfuric_acid: { un: "UN2796", cls: "Class 8", label: "🧪", desc: "Sulphuric acid with not more than 51% acid.", restrict: "Corrosive to human skin and metals. Acid-resistant packaging required.", erg: "Guide 157" },
  batteries_wet: { un: "UN2794", cls: "Class 8", label: "🧪⚡", desc: "Batteries, wet, filled with acid.", restrict: "Must be packed upright, protected against short circuits and acid leaks.", erg: "Guide 154" },
  bleach: { un: "UN1791", cls: "Class 8", label: "🧪", desc: "Hypochlorite solutions (Sodium Bleach).", restrict: "Corrosive. Keep away from acids to prevent toxic chlorine gas release.", erg: "Guide 154" },
  // Class 9
  lithium_ion: { un: "UN3480", cls: "Class 9", label: "🔋", desc: "Lithium ion batteries. High risk of thermal runaway and fire.", restrict: "Forbidden on Passenger Aircraft. CAO restricted. Max 30% state of charge (SoC).", erg: "Guide 147" },
  lithium_metal: { un: "UN3090", cls: "Class 9", label: "🔋", desc: "Lithium metal batteries (non-rechargeable).", restrict: "Forbidden on Passenger Aircraft. Special Provision A88 / A99 applies.", erg: "Guide 147" },
  dry_ice: { un: "UN1845", cls: "Class 9", label: "💨🧊", desc: "Carbon dioxide, solid (Dry Ice). Sublimes into gas displacing oxygen.", restrict: "Requires gas-venting outer packaging. Pilot notification mandatory.", erg: "Guide 120" },
  magnetized: { un: "UN2807", cls: "Class 9", label: "🧲", desc: "Magnetized material.", restrict: "May interfere with aircraft compasses. Regulated if field > 0.418 A/m at 4.6m.", erg: "Guide 171" },
  vehicles: { un: "UN3166", cls: "Class 9", label: "🚗", desc: "Vehicle, flammable gas/liquid powered.", restrict: "Fuel tanks must be drained to 1/4 full or less.", erg: "Guide 128" }
};

function switchDGSubTab(tabName) {
  const secId = document.getElementById('dg-sec-identifier');
  const secSeg = document.getElementById('dg-sec-segregation');
  const secEval = document.getElementById('dg-sec-evaluator');

  const btn1 = document.getElementById('dg-tab-1');
  const btn2 = document.getElementById('dg-tab-2');
  const btn3 = document.getElementById('dg-tab-3');

  if (secId) secId.style.display = tabName === 'identifier' ? 'block' : 'none';
  if (secSeg) secSeg.style.display = tabName === 'segregation' ? 'block' : 'none';
  if (secEval) secEval.style.display = tabName === 'evaluator' ? 'block' : 'none';

  [btn1, btn2, btn3].forEach(b => {
    if (b) {
      b.style.background = 'var(--bg-light)';
      b.style.color = 'var(--text-color)';
      b.style.border = '1px solid var(--border-color)';
      b.classList.remove('active');
    }
  });

  if (tabName === 'identifier' && btn1) {
    btn1.style.background = 'var(--primary-navy)';
    btn1.style.color = '#fff';
    btn1.style.border = 'none';
    btn1.classList.add('active');
    updateDGIdentifier();
  } else if (tabName === 'segregation' && btn2) {
    btn2.style.background = 'var(--primary-navy)';
    btn2.style.color = '#fff';
    btn2.style.border = 'none';
    btn2.classList.add('active');
    calculateDGSegregation();
  } else if (tabName === 'evaluator' && btn3) {
    btn3.style.background = 'var(--primary-navy)';
    btn3.style.color = '#fff';
    btn3.style.border = 'none';
    btn3.classList.add('active');
    calculateDGEvaluation();
  }
}

function selectDGClass(classVal) {
  currentDGSelectedClass = classVal;
  
  const buttons = document.querySelectorAll('#dg-placard-grid .dg-placard-btn');
  buttons.forEach(btn => {
    btn.style.opacity = '0.7';
    btn.style.boxShadow = 'none';
  });

  const activeBtn = Array.from(buttons).find(b => b.getAttribute('onclick')?.includes(`'${classVal}'`));
  if (activeBtn) {
    activeBtn.style.opacity = '1';
    activeBtn.style.boxShadow = '0 0 0 2px var(--accent-orange)';
  }

  updateDGIdentifier();
}

function updateDGIdentifier() {
  const container = document.getElementById('dg-result-container');
  if (!container) return;

  const searchQuery = (document.getElementById('dg-search-input')?.value || '').toLowerCase().trim();
  const selectedClass = currentDGSelectedClass;

  container.style.display = 'block';

  let itemsFound = [];

  for (const key in dgDictionary) {
    const item = dgDictionary[key];

    // Filter by class if selected
    let matchesClass = true;
    if (selectedClass) {
      matchesClass = item.cls.includes(`Class ${selectedClass}`);
    }

    // Filter by search query (UN number, description, class, restrict)
    let matchesSearch = true;
    if (searchQuery) {
      const textToSearch = `${item.un} ${item.cls} ${item.desc} ${item.restrict} ${key}`.toLowerCase();
      matchesSearch = textToSearch.includes(searchQuery);
    }

    if (matchesClass && matchesSearch) {
      itemsFound.push(item);
    }
  }

  if (itemsFound.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; background: var(--bg-light); border-radius: 12px; margin-top: 15px;">
        <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
        <h5 style="color: var(--primary-navy); margin-bottom: 8px; font-size: 1.1rem;">No Dangerous Goods Found</h5>
        <p style="color: var(--text-muted); font-size: 0.9rem;">No Hazmat item matches your filter/search. Try searching "UN3480", "Lithium", "Paint", or "Acid".</p>
      </div>
    `;
    return;
  }

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
      <h5 style="color: var(--primary-navy); font-weight: 700; font-size: 1.1rem; margin: 0;">
        Showing ${itemsFound.length} Hazardous Commodity Item(s)
      </h5>
      ${selectedClass ? `<span style="background: var(--accent-orange); color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 700;">Class ${selectedClass} Selected</span>` : ''}
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
  `;

  itemsFound.forEach(data => {
    html += `
      <div style="background: var(--bg-white); border-radius: 12px; padding: 22px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span style="font-size: 2.8rem;">${data.label}</span>
            <span style="background: #FEF3C7; color: #92400E; border: 1px solid #F59E0B; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.85rem;">${data.erg}</span>
          </div>
          <h5 style="color: var(--primary-navy); font-size: 1.25rem; margin-bottom: 4px; font-weight: 800; font-family: monospace;">${data.un}</h5>
          <div style="font-weight: 700; color: var(--accent-orange); margin-bottom: 12px; font-size: 0.95rem;">${data.cls}</div>
          <p style="color: var(--text-color); font-size: 0.9rem; margin-bottom: 15px; line-height: 1.5;">${data.desc}</p>
        </div>
        <div style="background: rgba(255, 90, 31, 0.05); padding: 12px; border-radius: 8px; border-left: 3px solid var(--accent-orange); font-size: 0.85rem; color: var(--primary-navy);">
          <strong>Transport Restriction:</strong> ${data.restrict}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// IMDG Segregation Matrix Rule Engine
function calculateDGSegregation() {
  const c1 = document.getElementById('dg-seg-class1')?.value || '3';
  const c2 = document.getElementById('dg-seg-class2')?.value || '5.1';
  const resultDiv = document.getElementById('dg-segregation-result');

  if (!resultDiv) return;

  if (c1 === c2) {
    resultDiv.innerHTML = `
      <div style="text-align: center; background: #ECFDF5; border: 1px solid #10B981; border-radius: 10px; padding: 20px; color: #065F46;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">✅</div>
        <h5 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Same Class Co-Loading Permitted</h5>
        <p style="font-size: 0.9rem; margin: 0;">Class ${c1} and Class ${c2} belong to the same hazard class. Standard packaging & stowage requirements apply under IMDG Code Chapter 7.2.</p>
      </div>
    `;
    return;
  }

  // Define Segregation Matrix Rules (IMDG Code Table 7.2.4)
  // Segregation Codes:
  // 1 = Away From (At least 3 metres separation)
  // 2 = Separated From (At least 6 metres separation / bulkhead)
  // 3 = Separated by a complete compartment or hold from
  // 4 = Separated longitudinally by an intervening complete compartment or hold from
  // X = No specific segregation required by general table (check individual UN entries)

  let rule = { code: "1", title: "Away From", color: "#F59E0B", bg: "#FEF3C7", desc: "At least 3 metres horizontal separation required." };

  const pairKey = [c1, c2].sort().join('_');

  if (c1.startsWith('1') || c2.startsWith('1')) {
    rule = { code: "4", title: "🚫 Forbidden in Same Container (Separated Longitudinally)", color: "#DC2626", bg: "#FEE2E2", desc: "Class 1 Explosives must NEVER be co-loaded in the same freight container or vehicle with other hazard classes under IMDG Code 7.2." };
  } else if (pairKey === '3_5.1' || pairKey === '3_5.2' || pairKey === '2.1_5.1' || pairKey === '4.1_5.1') {
    rule = { code: "2", title: "🛑 Separated From (Strict Distance Required)", color: "#DC2626", bg: "#FEE2E2", desc: "Oxidizers (Class 5) supply oxygen and react violently with Flammables (Class 3 / 2.1). Co-loading in the same container is STRICTLY FORBIDDEN." };
  } else if (pairKey === '6.1_8' || pairKey === '3_8') {
    rule = { code: "1", title: "⚠️ Away From (Min 3m Separation)", color: "#D97706", bg: "#FEF3C7", desc: "Corrosives (Class 8) and Flammables/Toxics must be stowed away from each other to prevent container wall corrosion and toxic chemical reactions." };
  } else if (pairKey === '5.1_8' || pairKey === '5.2_8') {
    rule = { code: "2", title: "🛑 Separated From (Corrosive & Oxidizer Risk)", color: "#DC2626", bg: "#FEE2E2", desc: "Corrosive liquid leak contacting oxidizing agent can trigger spontaneous combustion or explosion. Separate by bulkhead." };
  } else if (c1 === '9' || c2 === '9') {
    rule = { code: "X", title: "✅ No General IMDG Segregation Restriction", color: "#059669", bg: "#D1FAE5", desc: "Class 9 Miscellaneous Goods (e.g. Dry Ice, Li-Ion batteries) have no general segregation conflict with Class " + (c1 === '9' ? c2 : c1) + ", subject to specific UN Special Provisions." };
  }

  resultDiv.innerHTML = `
    <div style="background: ${rule.bg}; border: 2px solid ${rule.color}; border-radius: 12px; padding: 22px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="font-size: 2rem;">⚡</span>
        <div>
          <h5 style="color: ${rule.color}; font-size: 1.15rem; font-weight: 800; margin: 0;">${rule.title}</h5>
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-navy);">IMDG Code 7.2 Rule between Class ${c1} &amp; Class ${c2}</span>
        </div>
      </div>
      <p style="color: var(--primary-navy); font-size: 0.95rem; line-height: 1.6; margin: 0;">${rule.desc}</p>
    </div>
  `;
}

// Transport Mode & Packing Group Evaluator
function calculateDGEvaluation() {
  const mode = document.getElementById('dg-eval-mode')?.value || 'cao';
  const pg = document.getElementById('dg-eval-pg')?.value || 'II';
  const pkg = document.getElementById('dg-eval-pkg')?.value || 'un_spec';
  const resultDiv = document.getElementById('dg-evaluator-result');

  if (!resultDiv) return;

  let modeText = "Cargo Aircraft Only (CAO)";
  if (mode === 'pax') modeText = "Passenger Aircraft (PAX)";
  if (mode === 'ocean') modeText = "Ocean Freight Container (IMDG)";
  if (mode === 'road') modeText = "Road / Rail Transport (ADR)";

  let pgHazard = "Medium Hazard";
  let pgColor = "#D97706";
  if (pg === 'I') { pgHazard = "High Hazard (Great Danger)"; pgColor = "#DC2626"; }
  if (pg === 'III') { pgHazard = "Low Hazard (Minor Danger)"; pgColor = "#059669"; }

  let specMarking = `UN 4G/${pg === 'I' ? 'X' : (pg === 'II' ? 'Y' : 'Z')}15/S/26/USA/+AA1234`;

  let paxAlert = "";
  if (mode === 'pax' && pg === 'I') {
    paxAlert = `<div style="background: #FEE2E2; color: #991B1B; padding: 10px; border-radius: 6px; font-weight: 700; margin-bottom: 12px;">⚠️ WARNING: Packing Group I high hazard dangerous goods are generally FORBIDDEN on Passenger Aircraft under IATA DGR.</div>`;
  }

  resultDiv.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 15px;">
      ${paxAlert}
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Selected Transport Mode</span>
          <h5 style="color: var(--primary-navy); font-weight: 800; margin: 0; font-size: 1.1rem;">${modeText}</h5>
        </div>
        <span style="background: ${pgColor}; color: #fff; padding: 6px 12px; border-radius: 20px; font-weight: 800; font-size: 0.85rem;">Packing Group ${pg} (${pgHazard})</span>
      </div>

      <div style="background: var(--bg-white); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color);">
        <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Mandatory UN Packaging Specification Marking:</label>
        <code style="font-size: 1.1rem; color: var(--accent-orange); font-weight: 800; font-family: monospace;">${specMarking}</code>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <div style="background: var(--bg-white); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="color: var(--primary-navy); display: block; margin-bottom: 4px; font-size: 0.9rem;">📄 Documentation:</strong>
          <span style="font-size: 0.85rem; color: var(--text-color);">Shipper's Declaration for Dangerous Goods (DGD) Mandatory</span>
        </div>
        <div style="background: var(--bg-white); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="color: var(--primary-navy); display: block; margin-bottom: 4px; font-size: 0.9rem;">🏷️ Labeling Requirement:</strong>
          <span style="font-size: 0.85rem; color: var(--text-color);">Primary Hazard Diamond Label + Cargo Aircraft Only Label (if CAO)</span>
        </div>
        <div style="background: var(--bg-white); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="color: var(--primary-navy); display: block; margin-bottom: 4px; font-size: 0.9rem;">🚨 Emergency Response:</strong>
          <span style="font-size: 0.85rem; color: var(--text-color);">24/7 Emergency Telephone Number Mandatory on Waybill</span>
        </div>
      </div>
    </div>
  `;
}

// Tool 7: Temperature / Reefer Cargo Simulator - Full Interactive Engine
const reeferCommodityDB = {
  frozen: {
    label: 'Deep Frozen', tempMin: -25, tempMax: -18, zone: 'DEEP FREEZE ZONE', zoneColor: '#1E40AF',
    items: [
      { id:'frozen_meat', name:'Frozen Meat (Beef/Lamb)', emoji:'🥩', temp:-20, vent:'Closed', humidity:'Off', o2:'N/A', co2:'N/A', defrost:'Every 6 hrs', logger:'Required', ctnr:"40' RF HC", desc:'Bone-in or boneless cuts (beef, lamb, pork quarters) vacuum-packed for export.', shelfLife:'12-18 months', preCool:'Yes (container must reach -20°C before loading)', maxDoorOpen:'30 min max', packaging:'Vacuum-sealed cartons on pallets', alerts:[{type:'danger',icon:'🚨',title:'Thaw Risk',text:'If temp rises above -15°C for more than 2 hours, surface bacteria multiplication begins. Cargo is rejected at destination.'},{type:'warning',icon:'⏱️',title:'Loading Speed',text:'All pallets must be loaded within 30 minutes. Dock levellers must be sealed to prevent warm air ingress.'},{type:'info',icon:'📋',title:'Halal/Kosher Docs',text:'Many Middle East and EU importers require Halal or Kosher certification attached to each carton and declared on the BL.'}] },
      { id:'frozen_seafood', name:'Frozen Seafood (Shrimp/Fish)', emoji:'🦐', temp:-22, vent:'Closed', humidity:'Off', o2:'N/A', co2:'N/A', defrost:'Every 6 hrs', logger:'Required', ctnr:"40' RF HC", desc:'IQF (Individually Quick Frozen) shrimp, fish fillets, squid rings for retail and HoReCa markets.', shelfLife:'18-24 months', preCool:'Yes (-22°C minimum)', maxDoorOpen:'20 min max', packaging:'IQF bags in master cartons, block-stacked', alerts:[{type:'danger',icon:'🧊',title:'Glaze Melt',text:'IQF products have a protective ice glaze. Temperature fluctuation above -18°C causes glaze to melt, leading to dehydration and freezer burn.'},{type:'warning',icon:'🐟',title:'Odour Cross-contamination',text:'Never mix raw seafood reefers with fruit or dairy. Residual odour can taint co-loaded cargo even in separate containers.'},{type:'info',icon:'📊',title:'HACCP Compliance',text:'Full HACCP traceability from catch/harvest to port of loading must be documented. EU requires health certificate per consignment.'}] },
      { id:'ice_cream', name:'Ice Cream & Frozen Desserts', emoji:'🍦', temp:-25, vent:'Closed', humidity:'Off', o2:'N/A', co2:'N/A', defrost:'Every 4 hrs', logger:'Required', ctnr:"40' RF HC", desc:'Premium ice cream tubs, novelty bars, and frozen desserts requiring ultra-low temperatures.', shelfLife:'12 months', preCool:'Yes (-25°C for 4+ hours before loading)', maxDoorOpen:'15 min max', packaging:'Insulated cartons, dry ice boosters optional', alerts:[{type:'danger',icon:'🌡️',title:'Ultra-Sensitive',text:'Even a brief spike to -20°C causes partial melt-refreeze resulting in icy crystal texture. Product becomes unsellable.'},{type:'warning',icon:'🔌',title:'Power Gap Risk',text:'During vessel-to-terminal power transfer (genset swap), ensure zero power gap. Ice cream is the most temperature-sensitive frozen commodity.'},{type:'info',icon:'💰',title:'High-Value Cargo',text:'Premium ice cream shipments can exceed $200,000 per 40RF container. Marine cargo insurance with temperature clause is essential.'}] },
      { id:'frozen_veg', name:'Frozen Vegetables (Peas/Corn)', emoji:'🥦', temp:-18, vent:'Closed', humidity:'Off', o2:'N/A', co2:'N/A', defrost:'Every 6 hrs', logger:'Required', ctnr:"40' RF HC", desc:'IQF green peas, sweet corn, mixed vegetables for retail frozen food sections.', shelfLife:'24 months', preCool:'Yes (-18°C standard)', maxDoorOpen:'30 min max', packaging:'Retail bags in master cartons', alerts:[{type:'warning',icon:'📦',title:'Stacking Height',text:'Frozen vegetable cartons are lighter than meat. Do not exceed 8-high stacking to prevent crush damage and airflow blockage.'},{type:'info',icon:'✅',title:'Simpler Requirements',text:'Frozen vegetables are among the most forgiving frozen commodities. Standard -18°C with no atmosphere control needed.'}] }
    ]
  },
  chilled: {
    label: 'Chilled', tempMin: -2, tempMax: 5, zone: 'CHILLED ZONE', zoneColor: '#0E7490',
    items: [
      { id:'fresh_meat', name:'Fresh Chilled Meat (Beef)', emoji:'🥩', temp:0, vent:'Closed', humidity:'85-90%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"40' RF HC", desc:'Vacuum-packed chilled beef primals with 60-90 day shelf life for premium export markets (EU, Japan, Middle East).', shelfLife:'60-90 days (vacuum)', preCool:'Yes (container at 0°C before loading)', maxDoorOpen:'30 min max', packaging:'Vacuum-sealed, bone guard, packed in wax-lined cartons', alerts:[{type:'danger',icon:'🦠',title:'Pathogen Growth',text:'Above +4°C, Salmonella and E.coli begin rapid multiplication. Container must never exceed +2°C. Real-time IoT monitoring recommended.'},{type:'warning',icon:'💧',title:'Humidity Critical',text:'Too low humidity causes surface drying (dark discoloration). Too high causes condensation and mould. Maintain 85-90% RH.'},{type:'info',icon:'📝',title:'Health Certificate',text:'Each chilled meat shipment requires a government-issued Veterinary Health Certificate specific to the destination country.'}] },
      { id:'dairy', name:'Dairy Products (Cheese/Yogurt)', emoji:'🧀', temp:4, vent:'Closed', humidity:'75-85%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"40' RF HC", desc:'Hard/soft cheeses, yogurt, cream, and cultured dairy for retail distribution.', shelfLife:'3-12 months (varies by type)', preCool:'Yes (+4°C stable)', maxDoorOpen:'30 min max', packaging:'Shrink-wrapped on food-grade pallets', alerts:[{type:'warning',icon:'🧀',title:'Odour Absorption',text:'Cheese readily absorbs surrounding odours. Never co-load with strong-smelling commodities. Use a clean, odour-free container.'},{type:'info',icon:'🌡️',title:'Narrow Tolerance',text:'Dairy products must remain between +2°C and +6°C. Freezing damages texture irreversibly in soft cheeses and yogurt.'}] },
      { id:'fresh_fish', name:'Fresh Fish (Sashimi Grade)', emoji:'🐟', temp:-1, vent:'Closed', humidity:'90-95%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"20' RF", desc:'Premium sashimi-grade tuna, salmon, and sea bass (air-freighted or fast-vessel) for Japanese and premium markets.', shelfLife:'7-14 days', preCool:'Yes (-1°C, just above freeze point)', maxDoorOpen:'15 min max', packaging:'Gel ice packs, styrofoam boxes, wet-lock absorbent pads', alerts:[{type:'danger',icon:'⏰',title:'Ultra-Short Shelf Life',text:'Fresh sashimi-grade fish has 7-14 day total shelf life from catch. Transit must be under 48-72 hours for air freight, or use super-cooled containers.'},{type:'danger',icon:'🧊',title:'Cannot Freeze',text:'Freezing destroys cell structure and downgrades sashimi-grade to standard. Temperature must stay at precisely -1°C to +1°C.'},{type:'info',icon:'🇯🇵',title:'Japanese Market Standards',text:'Japan requires individual lot traceability, mercury testing certificates, and Ministry of Health import notification for all fresh fish.'}] }
    ]
  },
  fruits: {
    label: 'Fruits & Vegetables', tempMin: 2, tempMax: 14, zone: 'PRODUCE ZONE', zoneColor: '#15803D',
    items: [
      { id:'bananas', name:'Bananas (Green/Ripening)', emoji:'🍌', temp:13.3, vent:'Open (25 CBM/hr)', humidity:'85-90%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"40' RF HC", desc:'Green bananas shipped at 13.3°C to delay ripening. Ethylene management is critical during transit.', shelfLife:'3-4 weeks (green)', preCool:'Pulp temp pre-cooled to 13.3°C', maxDoorOpen:'60 min max', packaging:'Perforated poly bags in ventilated cartons', alerts:[{type:'danger',icon:'🍌',title:'Ethylene Sensitivity',text:'Bananas produce ethylene as they ripen. If ventilation fails and ethylene accumulates, entire container ripens prematurely and arrives yellow/overripe.'},{type:'warning',icon:'🌡️',title:'Chilling Injury',text:'Below 12°C, banana skin turns grey-black (chilling injury). This makes the fruit unsellable even though internal quality may be fine.'},{type:'info',icon:'🌬️',title:'Ventilation Essential',text:'25 CBM/hr fresh air exchange removes ethylene and CO₂ buildup. Ventilation must remain open throughout the voyage.'}] },
      { id:'avocados', name:'Avocados (Hass)', emoji:'🥑', temp:5, vent:'Open (15 CBM/hr)', humidity:'85-90%', o2:'2-5%', co2:'3-10%', defrost:'Off', logger:'Required', ctnr:"40' RF HC (CA)", desc:'Hass avocados from Peru, Chile, Kenya, shipped in Controlled Atmosphere containers to extend shelf life.', shelfLife:'4-6 weeks (CA)', preCool:'Yes (pulp temp 5°C)', maxDoorOpen:'30 min max', packaging:'Single-layer trays in telescoping boxes', alerts:[{type:'danger',icon:'🫁',title:'Controlled Atmosphere Critical',text:'Avocados require CA (Controlled Atmosphere) with reduced O₂ and elevated CO₂ to slow ripening. Without CA, shelf life drops from 6 weeks to 2 weeks.'},{type:'warning',icon:'🤕',title:'Pressure Bruising',text:'Avocados bruise easily. Never stack more than 5 cartons high. Use corner protectors and anti-slip sheets between layers.'},{type:'info',icon:'🌍',title:'CA Container Premium',text:'CA-equipped reefers cost 30-50% more than standard reefers. The investment is justified by the extended shelf life and reduced waste.'}] },
      { id:'grapes', name:'Table Grapes', emoji:'🍇', temp:0, vent:'Open (10 CBM/hr)', humidity:'90-95%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required + SO₂ pads', ctnr:"40' RF HC", desc:'Seedless table grapes (Thompson, Crimson, Red Globe) from India, South Africa, Chile requiring SO₂ pad fumigation.', shelfLife:'6-8 weeks', preCool:'Forced-air pre-cooling to 0°C', maxDoorOpen:'30 min max', packaging:'SO₂ pads inside poly-lined cartons, pallet wrap with venting holes', alerts:[{type:'danger',icon:'🍄',title:'Botrytis (Grey Mould)',text:'Grapes are highly susceptible to Botrytis cinerea. SO₂ generator pads must be placed inside every carton. Without them, mould appears within 3-4 days.'},{type:'warning',icon:'❄️',title:'Freeze Point Close to Set Point',text:'Grapes freeze at -1.5°C. Set temp is 0°C. Thermostat calibration must be precise: a 2°C overshoot means frozen, cracked berries.'},{type:'info',icon:'🧪',title:'SO₂ Residue Limits',text:'SO₂ residue on arrival must be below 10 ppm (EU/US limits). Excessive SO₂ causes bleaching. Use dual-release (fast + slow) pads.'}] },
      { id:'citrus', name:'Citrus Fruits (Oranges/Lemons)', emoji:'🍊', temp:4, vent:'Open (15 CBM/hr)', humidity:'85-90%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"40' RF HC", desc:'Navel oranges, Valencia oranges, lemons, and limes for wholesale fruit markets.', shelfLife:'6-10 weeks', preCool:'Yes (degreened and pre-cooled)', maxDoorOpen:'45 min max', packaging:'Waxed cartons, nested or tray-packed', alerts:[{type:'warning',icon:'🍊',title:'Oleocellosis Risk',text:'If citrus fruit is handled when wet or cold, essential oil glands rupture causing brown sunken spots (oleocellosis). Allow fruit to warm to ambient before packing.'},{type:'info',icon:'🌬️',title:'Ethylene Sensitivity',text:'Citrus is a low ethylene producer but moderate sensitivity. Keep ventilation open to prevent CO₂ buildup and off-flavors.'}] }
    ]
  },
  pharma: {
    label: 'Pharmaceuticals', tempMin: 2, tempMax: 8, zone: 'PHARMA COLD CHAIN', zoneColor: '#7C3AED',
    items: [
      { id:'vaccines', name:'Vaccines (2-8°C)', emoji:'💉', temp:5, vent:'Closed', humidity:'Off', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required (GDP)', ctnr:"20' RF + Envirotainer", desc:'Temperature-sensitive vaccines (COVID-19, influenza, polio) requiring strict GDP-compliant cold chain from manufacturer to clinic.', shelfLife:'6-24 months (varies)', preCool:'Yes (+5°C stable for 4+ hours)', maxDoorOpen:'10 min max', packaging:'Pre-qualified thermal shippers (Envirotainer, va-Q-tec), PCM phase-change materials', alerts:[{type:'danger',icon:'💀',title:'Life-Critical Cargo',text:'Vaccine temperature excursion above +8°C or below +2°C can render entire batches ineffective. Some vaccines are destroyed by freezing. Lives depend on compliance.'},{type:'danger',icon:'📋',title:'GDP Compliance',text:'WHO GDP (Good Distribution Practice) requires continuous temperature monitoring with calibrated data loggers. Any gap in records = cargo rejection.'},{type:'warning',icon:'🔐',title:'Security & Chain of Custody',text:'High-value pharmaceutical cargo requires tamper-evident seals, GPS tracking, and documented chain of custody at every handover point.'},{type:'info',icon:'🏥',title:'Last-Mile Challenge',text:'The most critical risk is in last-mile delivery from port to clinic. Reefer trucks must maintain +2-8°C with backup cooling systems.'}] },
      { id:'biologics', name:'Biologics & Biotech Products', emoji:'🧬', temp:5, vent:'Closed', humidity:'Off', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required (GDP)', ctnr:"20' RF", desc:'Monoclonal antibodies, insulin, blood plasma products (extremely high-value temperature-sensitive biologics).', shelfLife:'Variable (6-36 months)', preCool:'Yes (+5°C)', maxDoorOpen:'10 min max', packaging:'Validated thermal packaging, redundant cooling, Phase Change Materials', alerts:[{type:'danger',icon:'💰',title:'Extreme Value',text:'A single reefer of biologics can be worth $2-10 million. Marine cargo insurance with temperature deviation clause and consequential loss cover is essential.'},{type:'warning',icon:'🌡️',title:'Zero Tolerance',text:'Biologics have zero tolerance for temperature excursion. Even 30 minutes outside +2-8°C range triggers a formal deviation investigation and potential batch destruction.'}] }
    ]
  },
  ambient: {
    label: 'Controlled Ambient', tempMin: 12, tempMax: 25, zone: 'CONTROLLED AMBIENT', zoneColor: '#B45309',
    items: [
      { id:'chocolate', name:'Chocolate & Confectionery', emoji:'🍫', temp:18, vent:'Closed', humidity:'Dehumidification On', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Recommended', ctnr:"40' RF HC", desc:'Premium chocolate bars, pralines, and confectionery, sensitive to heat and humidity causing bloom and melting.', shelfLife:'12-18 months', preCool:'Yes (+18°C)', maxDoorOpen:'30 min max', packaging:'Insulated inner liners, thermal blankets for last-mile', alerts:[{type:'warning',icon:'🍫',title:'Chocolate Bloom',text:'Fat bloom (white streaks) occurs when chocolate exceeds 28°C then re-cools. Sugar bloom occurs from humidity condensation. Both make product unsellable.'},{type:'warning',icon:'💧',title:'Condensation Risk',text:'When moving from cold reefer to warm tropical air, condensation forms on chocolate surfaces. Dehumidification must run throughout transit.'},{type:'info',icon:'🌡️',title:'Not Frozen, Not Chilled',text:'Chocolate should never be frozen or chilled below 15°C. This is a controlled ambient shipment requiring consistent 16-20°C range.'}] },
      { id:'wine', name:'Fine Wine & Spirits', emoji:'🍷', temp:14, vent:'Closed', humidity:'60-70%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"40' RF HC", desc:'Premium wines, champagnes, and aged spirits requiring temperature stability to prevent heat damage and cork failure.', shelfLife:'Years (stable)', preCool:'Yes (+14°C)', maxDoorOpen:'30 min max', packaging:'Individual bottle separators in reinforced cartons, horizontal stacking for cork wines', alerts:[{type:'danger',icon:'🍷',title:'Heat Damage (Cooked Wine)',text:'Wine exposed to temperatures above 25°C undergoes accelerated ageing and "cooked" off-flavours. Premium bottles worth $50-500+ each become worthless.'},{type:'warning',icon:'🔄',title:'Temperature Cycling',text:'Repeated temperature fluctuations cause cork expansion/contraction leading to micro-leaks ("weeping"). Wine must remain at a stable temperature throughout.'},{type:'info',icon:'📦',title:'Vibration Sensitivity',text:'Extended vibration during ocean transit stirs sediment in aged wines. Importers may require 2-4 weeks of rest post-arrival before distribution.'}] },
      { id:'cosmetics', name:'Cosmetics & Personal Care', emoji:'💄', temp:20, vent:'Closed', humidity:'Dehumidification On', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Recommended', ctnr:"40' RF HC", desc:'Luxury cosmetics, perfumes, skincare creams, temperature-sensitive formulations that separate or degrade in heat.', shelfLife:'24-36 months', preCool:'Yes (+20°C)', maxDoorOpen:'30 min max', packaging:'Individual boxes, foam inserts, upright orientation for liquids', alerts:[{type:'warning',icon:'💄',title:'Emulsion Separation',text:'Creams and lotions are oil-in-water emulsions. Temperatures above 35°C or below 5°C cause irreversible separation.'},{type:'info',icon:'☀️',title:'Tropical Route Risk',text:'Shipments transiting through hot zones (Red Sea, Persian Gulf) during summer need reefer protection even for "ambient" cosmetics.'}] }
    ]
  },
  flowers: {
    label: 'Cut Flowers', tempMin: 0.5, tempMax: 4, zone: 'FLORAL COLD CHAIN', zoneColor: '#DB2777',
    items: [
      { id:'roses', name:'Cut Roses', emoji:'🌹', temp:1, vent:'Open (10 CBM/hr)', humidity:'90-95%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"40' RF HC", desc:'Long-stem roses from Kenya, Ecuador, Colombia: the world\'s most traded cut flower by volume.', shelfLife:'7-12 days', preCool:'Forced-air pre-cool to 1°C within 2 hours of harvest', maxDoorOpen:'15 min max', packaging:'Bunched in sleeves, packed in Procona buckets or dry cartons', alerts:[{type:'danger',icon:'🌹',title:'Ethylene Kills Flowers',text:'Even trace ethylene (as low as 0.1 ppm) causes petal drop, yellowing, and accelerated senescence. Never transport flowers near fruit, vegetables, or engine exhaust.'},{type:'warning',icon:'⏰',title:'Time is Everything',text:'From harvest to consumer vase, total cold chain is 5-7 days max. Any delay at airport, customs, or port directly reduces consumer vase life.'},{type:'info',icon:'💧',title:'Hydration Critical',text:'Roses shipped in Procona water buckets have 30% longer vase life than dry-packed. Wet shipping adds weight but dramatically improves quality.'}] },
      { id:'mixed_flowers', name:'Mixed Bouquet Flowers', emoji:'💐', temp:2, vent:'Open (10 CBM/hr)', humidity:'90-95%', o2:'N/A', co2:'N/A', defrost:'Off', logger:'Required', ctnr:"40' RF HC", desc:'Carnations, chrysanthemums, lilies, gerberas, and mixed assortments for wholesale auction markets.', shelfLife:'7-14 days (species-dependent)', preCool:'Forced-air pre-cool to 2°C', maxDoorOpen:'15 min max', packaging:'Mixed bunches in cartons, hydration tubes for sensitive varieties', alerts:[{type:'warning',icon:'🌸',title:'Mixed Temperature Needs',text:'Different flower species have different optimal temperatures. Lilies prefer 1°C while tropical orchids need 8-12°C. Mixed loads require compromise settings.'},{type:'info',icon:'🏪',title:'Auction Clock System',text:'Most flowers transit to Dutch auction houses (Aalsmeer, Flora Holland). Arrival timing is critical: late arrivals miss the auction clock and sell at significant discount.'}] }
    ]
  }
};

let reeferCurrentCategory = 'frozen';

function reeferSelectCategory(cat) {
  reeferCurrentCategory = cat;
  
  // Update active button
  document.querySelectorAll('.reefer-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  
  // Populate commodity dropdown
  const select = document.getElementById('reefer-commodity-select');
  const catData = reeferCommodityDB[cat];
  select.innerHTML = '<option value="" disabled selected>-- Choose a commodity --</option>';
  catData.items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = `${item.emoji} ${item.name}`;
    select.appendChild(opt);
  });
  
  // Hide dashboard until commodity is selected
  document.getElementById('reefer-dashboard').style.display = 'none';
}

function reeferSelectCommodity() {
  const select = document.getElementById('reefer-commodity-select');
  const itemId = select.value;
  if (!itemId) return;
  
  const catData = reeferCommodityDB[reeferCurrentCategory];
  const item = catData.items.find(i => i.id === itemId);
  if (!item) return;
  
  // Show dashboard
  document.getElementById('reefer-dashboard').style.display = 'block';
  
  // 1. Update thermometer
  updateReeferThermometer(item.temp, catData);
  
  // 2. Update temperature readout
  document.getElementById('reefer-temp-big').textContent = `${item.temp > 0 ? '+' : ''}${item.temp}°C`;
  document.getElementById('reefer-temp-range-label').textContent = `Range: ${catData.tempMin > 0 ? '+' : ''}${catData.tempMin}°C to ${catData.tempMax > 0 ? '+' : ''}${catData.tempMax}°C`;
  const badge = document.getElementById('reefer-temp-zone-badge');
  badge.textContent = catData.zone;
  badge.style.background = `linear-gradient(135deg, ${catData.zoneColor}, ${catData.zoneColor}CC)`;
  
  // Update temp display color based on temperature
  const tempBig = document.getElementById('reefer-temp-big');
  if (item.temp <= -15) tempBig.style.color = '#1E40AF';
  else if (item.temp <= 0) tempBig.style.color = '#0284C7';
  else if (item.temp <= 8) tempBig.style.color = '#0E7490';
  else if (item.temp <= 15) tempBig.style.color = '#15803D';
  else tempBig.style.color = '#B45309';
  
  // 3. Update container visual
  const ctnrBox = document.getElementById('reefer-container-box');
  ctnrBox.classList.remove('frozen-bg', 'chilled-bg', 'warm-bg');
  if (item.temp <= -10) ctnrBox.classList.add('frozen-bg');
  else if (item.temp <= 8) ctnrBox.classList.add('chilled-bg');
  else ctnrBox.classList.add('warm-bg');
  
  document.getElementById('reefer-cargo-emoji').textContent = item.emoji;
  document.getElementById('reefer-ctnr-type').textContent = item.ctnr.toUpperCase();
  document.getElementById('reefer-commodity-title').textContent = item.name;
  document.getElementById('reefer-commodity-desc').textContent = item.desc;
  
  // Show/hide frost particles based on temperature
  const frostContainer = document.getElementById('reefer-frost-particles');
  if (item.temp <= 5) {
    frostContainer.style.display = 'block';
    frostContainer.querySelectorAll('.frost-p').forEach(p => {
      p.textContent = item.temp <= -10 ? '❄' : '·';
      p.style.color = item.temp <= -10 ? 'rgba(186,230,253,0.8)' : 'rgba(186,230,253,0.5)';
    });
  } else {
    frostContainer.style.display = 'none';
  }
  
  // 4. Update PTI parameters
  document.getElementById('pti-temp').textContent = `${item.temp > 0 ? '+' : ''}${item.temp}°C`;
  document.getElementById('pti-vent').textContent = item.vent;
  document.getElementById('pti-humidity').textContent = item.humidity;
  document.getElementById('pti-o2').textContent = item.o2;
  document.getElementById('pti-co2').textContent = item.co2;
  document.getElementById('pti-defrost').textContent = item.defrost;
  document.getElementById('pti-logger').textContent = item.logger;
  document.getElementById('pti-ctnr-type').textContent = item.ctnr;
  
  // 5. Update cold chain timeline text
  document.getElementById('tl-precool-text').textContent = `Container pre-cooled to ${item.temp > 0 ? '+' : ''}${item.temp}°C before cargo loading. ${item.preCool}`;
  document.getElementById('tl-loading-text').textContent = `Cargo loaded within max door-open time: ${item.maxDoorOpen}. Packaging: ${item.packaging}.`;
  document.getElementById('tl-voyage-text').textContent = `Connected to vessel power grid. ${item.logger === 'Required' || item.logger === 'Required (GDP)' ? 'Data logger records every 15 min.' : 'Temperature spot-checked periodically.'} Defrost: ${item.defrost}.`;
  
  // 6. Populate alerts
  const alertsGrid = document.getElementById('reefer-alerts-grid');
  alertsGrid.innerHTML = '';
  (item.alerts || []).forEach(alert => {
    alertsGrid.innerHTML += `
      <div class="reefer-alert-card ${alert.type}">
        <span class="alert-icon">${alert.icon}</span>
        <div class="alert-text">
          <strong>${alert.title}</strong>
          ${alert.text}
        </div>
      </div>`;
  });
  
  // 7. Populate cargo profile card
  const profileCard = document.getElementById('reefer-profile-card');
  profileCard.innerHTML = `
    <div class="reefer-profile-grid">
      <div class="reefer-profile-stat">
        <div class="profile-stat-label">Shelf Life</div>
        <div class="profile-stat-value">${item.shelfLife}</div>
      </div>
      <div class="reefer-profile-stat">
        <div class="profile-stat-label">Pre-Cooling</div>
        <div class="profile-stat-value">${item.preCool}</div>
      </div>
      <div class="reefer-profile-stat">
        <div class="profile-stat-label">Max Door-Open</div>
        <div class="profile-stat-value">${item.maxDoorOpen}</div>
      </div>
      <div class="reefer-profile-stat">
        <div class="profile-stat-label">Container Type</div>
        <div class="profile-stat-value">${item.ctnr}</div>
      </div>
      <div class="reefer-profile-stat">
        <div class="profile-stat-label">Packaging</div>
        <div class="profile-stat-value">${item.packaging}</div>
      </div>
      <div class="reefer-profile-stat">
        <div class="profile-stat-label">Data Logger</div>
        <div class="profile-stat-value">${item.logger}</div>
      </div>
    </div>
    <div class="reefer-profile-note">
      <strong>💡 Industry Note:</strong> ${item.desc} Recommended set point: <strong>${item.temp > 0 ? '+' : ''}${item.temp}°C</strong>. Always verify carrier-specific PTI requirements and destination country phytosanitary/veterinary regulations before booking.
    </div>`;
  
  // Smooth scroll to dashboard
  document.getElementById('reefer-dashboard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateReeferThermometer(tempC, catData) {
  // Map temperature (-30 to +40) to SVG Y position (210 to 20)
  // -30°C = y:210 (bottom), +40°C = y:20 (top)
  const minTemp = -30, maxTemp = 40;
  const minY = 210, maxY = 20;
  const clampedTemp = Math.max(minTemp, Math.min(maxTemp, tempC));
  const ratio = (clampedTemp - minTemp) / (maxTemp - minTemp);
  const targetY = minY - (ratio * (minY - maxY));
  const fillHeight = 210 - targetY;
  
  const fill = document.getElementById('reefer-thermo-fill');
  fill.setAttribute('y', targetY);
  fill.setAttribute('height', fillHeight);
  
  // Move arrow indicator
  const arrow = document.getElementById('reefer-thermo-arrow');
  arrow.setAttribute('points', `58,${targetY} 68,${targetY - 5} 68,${targetY + 5}`);
  
  // Update bulb color
  const bulb = document.getElementById('reefer-thermo-bulb');
  if (tempC <= -15) bulb.setAttribute('fill', '#1E40AF');
  else if (tempC <= 0) bulb.setAttribute('fill', '#0284C7');
  else if (tempC <= 8) bulb.setAttribute('fill', '#0E7490');
  else if (tempC <= 20) bulb.setAttribute('fill', '#F59E0B');
  else bulb.setAttribute('fill', '#EF4444');
}

// Backward compatibility wrapper for old function name
function updateReeferSimulator(type) {
  reeferSelectCategory(type);
  // Auto-select first item
  const catData = reeferCommodityDB[type];
  if (catData && catData.items.length > 0) {
    const select = document.getElementById('reefer-commodity-select');
    select.value = catData.items[0].id;
    reeferSelectCommodity();
  }
}

// Initialize reefer commodity dropdown on page load
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('reefer-commodity-select')) {
    reeferSelectCategory('frozen');
  }
});

// Tool 8: HS Code & Duty Structure Explainer
const hsDictionary = {
  beef: { ch: "02", hd: "01", sub: "20", nat: "00", descCh: "Meat and edible meat offal", descHd: "Meat of bovine animals, fresh or chilled", descSub: "Other cuts with bone in", duty: "25%", vat: "18%", other: "PAL Applicable" },
  poultry: { ch: "02", hd: "07", sub: "12", nat: "00", descCh: "Meat and edible meat offal", descHd: "Meat and edible offal, of poultry, fresh, chilled or frozen", descSub: "Not cut in pieces, frozen", duty: "25%", vat: "18%", other: "PAL & SCL Applicable" },
  fish: { ch: "03", hd: "02", sub: "11", nat: "00", descCh: "Fish and crustaceans, molluscs and other aquatic invertebrates", descHd: "Fish, fresh or chilled", descSub: "Trout", duty: "15%", vat: "18%", other: "Exempt from CESS" },
  shrimps: { ch: "03", hd: "06", sub: "17", nat: "00", descCh: "Fish and crustaceans, molluscs and other aquatic invertebrates", descHd: "Crustaceans, whether in shell or not, frozen", descSub: "Other frozen shrimps and prawns", duty: "15%", vat: "18%", other: "Fisheries Quality License" },
  milk: { ch: "04", hd: "01", sub: "20", nat: "00", descCh: "Dairy produce; birds' eggs; natural honey", descHd: "Milk and cream, not concentrated nor containing added sugar", descSub: "Fat content exceeding 1% but not exceeding 6%", duty: "20%", vat: "18%", other: "Special Commodity Levy" },
  butter: { ch: "04", hd: "05", sub: "10", nat: "00", descCh: "Dairy produce; birds' eggs; natural honey", descHd: "Butter and other fats and oils derived from milk", descSub: "Butter", duty: "20%", vat: "18%", other: "Special Commodity Levy" },
  cheese: { ch: "04", hd: "06", sub: "90", nat: "00", descCh: "Dairy produce; birds' eggs; natural honey", descHd: "Cheese and curd", descSub: "Other cheese", duty: "20%", vat: "18%", other: "Special Commodity Levy" },
  potatoes: { ch: "07", hd: "01", sub: "90", nat: "00", descCh: "Edible vegetables and certain roots and tubers", descHd: "Potatoes, fresh or chilled", descSub: "Other (non-seed)", duty: "15%", vat: "18%", other: "Applicable" },
  onions: { ch: "07", hd: "03", sub: "10", nat: "00", descCh: "Edible vegetables and certain roots and tubers", descHd: "Onions, shallots, garlic, leeks and other alliaceous vegetables", descSub: "Onions and shallots", duty: "15%", vat: "18%", other: "Special Commodity Levy" },
  bananas: { ch: "08", hd: "03", sub: "90", nat: "00", descCh: "Edible fruit and nuts; peel of citrus fruit or melons", descHd: "Bananas, including plantains, fresh or dried", descSub: "Other fresh bananas", duty: "20%", vat: "18%", other: "Phytosanitary Permit Required" },
  apples: { ch: "08", hd: "08", sub: "10", nat: "00", descCh: "Edible fruit and nuts; peel of citrus fruit or melons", descHd: "Apples, pears and quinces, fresh", descSub: "Apples", duty: "20%", vat: "18%", other: "Phytosanitary Permit Required" },
  coffee: { ch: "09", hd: "01", sub: "11", nat: "00", descCh: "Coffee, tea, maté and spices", descHd: "Coffee, whether or not roasted or decaffeinated", descSub: "Not roasted, Not decaffeinated", duty: "30%", vat: "18%", other: "High CESS" },
  tea: { ch: "09", hd: "02", sub: "10", nat: "00", descCh: "Coffee, tea, maté and spices", descHd: "Tea, whether or not flavoured", descSub: "Green tea (not fermented)", duty: "20%", vat: "18%", other: "Applicable" },
  cinnamon: { ch: "09", hd: "06", sub: "11", nat: "00", descCh: "Coffee, tea, maté and spices", descHd: "Cinnamon and cinnamon-tree flowers", descSub: "Cinnamon (Cinnamomum zeylanicum Blume)", duty: "15%", vat: "18%", other: "Export/Import Quality Standard" },
  wheat: { ch: "10", hd: "01", sub: "19", nat: "00", descCh: "Cereals", descHd: "Wheat and meslin", descSub: "Durum wheat, Other", duty: "10%", vat: "18%", other: "Applicable" },
  rice: { ch: "10", hd: "06", sub: "30", nat: "00", descCh: "Cereals", descHd: "Rice", descSub: "Semi-milled or wholly milled rice, whether or not polished", duty: "15%", vat: "18%", other: "Import License Required" },
  palm_oil: { ch: "15", hd: "11", sub: "10", nat: "00", descCh: "Animal or vegetable fats and oils", descHd: "Palm oil and its fractions, whether or not refined", descSub: "Crude oil", duty: "15%", vat: "18%", other: "PAL Applicable" },
  sugar: { ch: "17", hd: "01", sub: "14", nat: "00", descCh: "Sugars and sugar confectionery", descHd: "Cane or beet sugar and chemically pure sucrose", descSub: "Other cane sugar", duty: "30%", vat: "18%", other: "Special Commodity Levy" },
  chocolate: { ch: "18", hd: "06", sub: "32", nat: "00", descCh: "Cocoa and cocoa preparations", descHd: "Chocolate and other food preparations containing cocoa", descSub: "Not in blocks, Not filled", duty: "30%", vat: "18%", other: "High CESS" },
  spaghetti: { ch: "19", hd: "02", sub: "19", nat: "00", descCh: "Preparations of cereals, flour, starch or milk", descHd: "Pasta, whether or not cooked or stuffed", descSub: "Uncooked pasta, not containing eggs", duty: "20%", vat: "18%", other: "Applicable (CESS)" },
  fruit_juice: { ch: "20", hd: "09", sub: "89", nat: "00", descCh: "Preparations of vegetables, fruit, nuts or other parts of plants", descHd: "Fruit juices and vegetable juices", descSub: "Juice of any other single fruit or vegetable", duty: "25%", vat: "18%", other: "Sugar Excise Tax / CESS" },
  mineral_water: { ch: "22", hd: "01", sub: "10", nat: "00", descCh: "Beverages, spirits and vinegar", descHd: "Waters, including natural or artificial mineral waters", descSub: "Mineral waters and aerated waters", duty: "20%", vat: "18%", other: "PAL Applicable" },
  beer: { ch: "22", hd: "03", sub: "00", nat: "00", descCh: "Beverages, spirits and vinegar", descHd: "Beer made from malt", descSub: "-", duty: "Excise Duty", vat: "18%", other: "Excise License Required" },
  wine: { ch: "22", hd: "04", sub: "21", nat: "00", descCh: "Beverages, spirits and vinegar", descHd: "Wine of fresh grapes", descSub: "In containers holding 2 l or less", duty: "High Excise", vat: "18%", other: "PAL Applicable" },
  whisky: { ch: "22", hd: "08", sub: "30", nat: "00", descCh: "Beverages, spirits and vinegar", descHd: "Undenatured ethyl alcohol; spirits, liqueurs", descSub: "Whiskies", duty: "High Excise Duty", vat: "18%", other: "Excise License Required" },
  cigarettes: { ch: "24", hd: "02", sub: "20", nat: "00", descCh: "Tobacco and manufactured tobacco substitutes", descHd: "Cigars, cheroots, cigarillos and cigarettes", descSub: "Cigarettes containing tobacco", duty: "High Excise", vat: "18%", other: "Strict Health Regulations & License" },
  cement: { ch: "25", hd: "23", sub: "29", nat: "00", descCh: "Salt; sulphur; earths and stone; lime and cement", descHd: "Portland cement, aluminous cement, slag cement", descSub: "Other Portland cement", duty: "15%", vat: "18%", other: "SLSI Standard Certification Required" },
  petroleum: { ch: "27", hd: "09", sub: "00", nat: "00", descCh: "Mineral fuels, mineral oils and products of their distillation", descHd: "Petroleum oils and oils obtained from bituminous minerals, crude", descSub: "-", duty: "5%", vat: "18%", other: "PAL Applicable" },
  lubricating_oil: { ch: "27", hd: "10", sub: "19", nat: "00", descCh: "Mineral fuels, mineral oils and products of their distillation", descHd: "Petroleum oils and oils obtained from bituminous minerals", descSub: "Other lubricating oils", duty: "15%", vat: "18%", other: "PUCSL License Required" },
  medicaments: { ch: "30", hd: "04", sub: "90", nat: "00", descCh: "Pharmaceutical products", descHd: "Medicaments for therapeutic or prophylactic uses", descSub: "Other", duty: "0%", vat: "Exempt", other: "NMRA Approval Required" },
  fertilizers: { ch: "31", hd: "02", sub: "10", nat: "00", descCh: "Fertilisers", descHd: "Mineral or chemical fertilisers, nitrogenous", descSub: "Urea, whether or not in aqueous solution", duty: "0%", vat: "18%", other: "License Required" },
  paints: { ch: "32", hd: "08", sub: "90", nat: "00", descCh: "Tanning or dyeing extracts; tannins and their derivatives; dyes, pigments, paints", descHd: "Paints and varnishes based on synthetic polymers", descSub: "Other", duty: "15%", vat: "18%", other: "Applicable" },
  perfumes: { ch: "33", hd: "03", sub: "00", nat: "00", descCh: "Essential oils and resinoids; perfumery, cosmetic or toilet preparations", descHd: "Perfumes and toilet waters", descSub: "-", duty: "30%", vat: "18%", other: "High CESS" },
  soaps: { ch: "34", hd: "01", sub: "11", nat: "00", descCh: "Soap, organic surface-active agents, washing preparations", descHd: "Soap; organic surface-active products for use as soap", descSub: "For toilet use (including medicated products)", duty: "20%", vat: "18%", other: "CESS Applicable" },
  pvc_pipes: { ch: "39", hd: "17", sub: "23", nat: "00", descCh: "Plastics and articles thereof", descHd: "Tubes, pipes and hoses, and fittings therefor, of plastics", descSub: "Of polymers of vinyl chloride (PVC)", duty: "15%", vat: "18%", other: "SLSI Standard Required" },
  plastic_bags: { ch: "39", hd: "23", sub: "21", nat: "00", descCh: "Plastics and articles thereof", descHd: "Articles for the conveyance or packing of goods, of plastics", descSub: "Sacks and bags of polymers of ethylene", duty: "20%", vat: "18%", other: "Environmental Levy" },
  conveyor_belts: { ch: "40", hd: "10", sub: "12", nat: "00", descCh: "Rubber and articles thereof", descHd: "Conveyor or transmission belts or belting, of vulcanised rubber", descSub: "Reinforced only with textile materials", duty: "10%", vat: "18%", other: "Industrial Duty Rate" },
  tires: { ch: "40", hd: "11", sub: "10", nat: "00", descCh: "Rubber and articles thereof", descHd: "New pneumatic tyres, of rubber", descSub: "Of a kind used on motor cars", duty: "30%", vat: "18%", other: "High CESS" },
  gloves_surgical: { ch: "40", hd: "15", sub: "11", nat: "00", descCh: "Rubber and articles thereof", descHd: "Articles of apparel and clothing accessories, of vulcanised rubber", descSub: "Surgical gloves", duty: "10%", vat: "Exempt", other: "NMRA Approval Required" },
  suitcases: { ch: "42", hd: "02", sub: "12", nat: "00", descCh: "Articles of leather; saddlery and harness; travel goods", descHd: "Trunks, suit-cases, vanity-cases, executive-cases", descSub: "With outer surface of plastics or of textile materials", duty: "20%", vat: "18%", other: "CESS Applicable" },
  handbags: { ch: "42", hd: "02", sub: "21", nat: "00", descCh: "Articles of leather; saddlery and harness; travel goods", descHd: "Trunks, suit-cases, vanity-cases, executive-cases", descSub: "With outer surface of leather or of composition leather", duty: "20%", vat: "18%", other: "Applicable" },
  plywood: { ch: "44", hd: "12", sub: "33", nat: "00", descCh: "Wood and articles of wood; wood charcoal", descHd: "Plywood, veneered panels and similar laminated wood", descSub: "Other plywood with at least one outer ply of non-coniferous wood", duty: "15%", vat: "18%", other: "Forest Department Permit" },
  paper: { ch: "48", hd: "02", sub: "56", nat: "00", descCh: "Paper and paperboard; articles of paper pulp", descHd: "Uncoated paper and paperboard", descSub: "Weighing 40 g/m2 or more but not more than 150 g/m2", duty: "10%", vat: "18%", other: "Applicable" },
  printed_books: { ch: "49", hd: "01", sub: "99", nat: "00", descCh: "Printed books, newspapers, pictures and other products", descHd: "Printed books, brochures, leaflets and similar printed matter", descSub: "Other printed books", duty: "0%", vat: "Exempt", other: "Zero Duty & VAT Exempt" },
  cotton_yarn: { ch: "52", hd: "05", sub: "11", nat: "00", descCh: "Cotton", descHd: "Cotton yarn (other than sewing thread)", descSub: "Measuring 714.29 decitex or more", duty: "5%", vat: "18%", other: "Applicable" },
  tshirts: { ch: "61", hd: "09", sub: "10", nat: "00", descCh: "Apparel and clothing accessories, knitted or crocheted", descHd: "T-shirts, singlets and other vests, knitted or crocheted", descSub: "Of cotton", duty: "15%", vat: "18%", other: "Applicable (CESS)" },
  denim_jeans: { ch: "62", hd: "03", sub: "42", nat: "00", descCh: "Apparel and clothing accessories, not knitted or crocheted", descHd: "Men's or boys' suits, ensembles, jackets, blazers, trousers", descSub: "Trousers and bib overalls, of cotton (Denim)", duty: "15%", vat: "18%", other: "CESS Applicable" },
  bed_linen: { ch: "63", hd: "02", sub: "31", nat: "00", descCh: "Other made up textile articles; sets; worn clothing", descHd: "Bed linen, table linen, toilet linen and kitchen linen", descSub: "Of cotton, other", duty: "15%", vat: "18%", other: "Applicable (CESS)" },
  footwear: { ch: "64", hd: "03", sub: "99", nat: "00", descCh: "Footwear, gaiters and the like; parts of such articles", descHd: "Footwear with outer soles of rubber, plastics, leather", descSub: "Other footwear", duty: "20%", vat: "18%", other: "Applicable" },
  leather_shoes: { ch: "64", hd: "03", sub: "59", nat: "00", descCh: "Footwear, gaiters and the like; parts of such articles", descHd: "Footwear with outer soles of rubber, plastics, leather", descSub: "Other footwear, with uppers of leather", duty: "20%", vat: "18%", other: "High CESS" },
  footwear_sports: { ch: "64", hd: "02", sub: "19", nat: "00", descCh: "Footwear, gaiters and the like; parts of such articles", descHd: "Other footwear with outer soles and uppers of rubber or plastics", descSub: "Sports footwear, other", duty: "20%", vat: "18%", other: "High CESS" },
  steel: { ch: "72", hd: "08", sub: "10", nat: "00", descCh: "Iron and steel", descHd: "Flat-rolled products of iron or non-alloy steel", descSub: "In coils, not further worked than hot-rolled", duty: "10%", vat: "18%", other: "Applicable" },
  steel_pipes: { ch: "73", hd: "06", sub: "30", nat: "00", descCh: "Articles of iron or steel", descHd: "Other tubes, pipes and hollow profiles, of iron or steel", descSub: "Other, welded, of circular cross-section, of iron or non-alloy steel", duty: "15%", vat: "18%", other: "Applicable" },
  structural_steel: { ch: "73", hd: "08", sub: "90", nat: "00", descCh: "Articles of iron or steel", descHd: "Structures and parts of structures, of iron or steel", descSub: "Other structures", duty: "15%", vat: "18%", other: "Applicable" },
  copper_wire: { ch: "74", hd: "08", sub: "11", nat: "00", descCh: "Copper and articles thereof", descHd: "Copper wire", descSub: "Of refined copper, maximum cross-sectional dimension exceeding 6 mm", duty: "5%", vat: "18%", other: "Applicable" },
  aluminum: { ch: "76", hd: "01", sub: "10", nat: "00", descCh: "Aluminium and articles thereof", descHd: "Unwrought aluminium", descSub: "Aluminium, not alloyed", duty: "5%", vat: "18%", other: "Applicable" },
  aluminum_windows: { ch: "76", hd: "10", sub: "10", nat: "00", descCh: "Aluminium and articles thereof", descHd: "Aluminium structures and parts of structures", descSub: "Doors, windows and their frames and thresholds for doors", duty: "20%", vat: "18%", other: "CESS Applicable" },
  tools: { ch: "82", hd: "05", sub: "59", nat: "00", descCh: "Tools, implements, cutlery, spoons and forks, of base metal", descHd: "Hand tools (including glaziers' diamonds)", descSub: "Other hand tools", duty: "10%", vat: "18%", other: "Applicable" },
  air_conditioners: { ch: "84", hd: "15", sub: "10", nat: "00", descCh: "Nuclear reactors, boilers, machinery and mechanical appliances", descHd: "Air conditioning machines", descSub: "Window or wall types, self-contained or split-system", duty: "15%", vat: "18%", other: "Energy Labeling Required" },
  refrigerators: { ch: "84", hd: "18", sub: "10", nat: "00", descCh: "Nuclear reactors, boilers, machinery and mechanical appliances", descHd: "Refrigerators, freezers and other refrigerating or freezing equipment", descSub: "Combined refrigerator-freezers, fitted with separate external doors", duty: "15%", vat: "18%", other: "PAL & CESS Applicable" },
  elevators: { ch: "84", hd: "28", sub: "10", nat: "00", descCh: "Nuclear reactors, boilers, machinery and mechanical appliances", descHd: "Other lifting, handling, loading or unloading machinery", descSub: "Lifts and skip hoists", duty: "5%", vat: "18%", other: "Safety Certification Required" },
  washing_machines: { ch: "84", hd: "50", sub: "11", nat: "00", descCh: "Nuclear reactors, boilers, machinery and mechanical appliances", descHd: "Household or laundry-type washing machines", descSub: "Fully-automatic machines, capacity not exceeding 10 kg", duty: "15%", vat: "18%", other: "CESS Applicable" },
  computers: { ch: "84", hd: "71", sub: "30", nat: "00", descCh: "Nuclear reactors, boilers, machinery and mechanical appliances", descHd: "Automatic data processing machines and units thereof", descSub: "Portable automatic data processing machines", duty: "0%", vat: "18%", other: "PAL Applicable" },
  generators: { ch: "85", hd: "02", sub: "11", nat: "00", descCh: "Electrical machinery and equipment and parts thereof", descHd: "Electric generating sets and rotary converters", descSub: "Of an output not exceeding 75 kVA", duty: "5%", vat: "18%", other: "PAL Applicable" },
  batteries: { ch: "85", hd: "07", sub: "60", nat: "00", descCh: "Electrical machinery and equipment and parts thereof", descHd: "Electric accumulators", descSub: "Lithium-ion", duty: "15%", vat: "18%", other: "Applicable" },
  smartphones: { ch: "85", hd: "17", sub: "12", nat: "00", descCh: "Electrical machinery and equipment and parts thereof", descHd: "Telephone sets, including smartphones", descSub: "Smartphones", duty: "0%", vat: "18%", other: "PAL Applicable" },
  solar_panels: { ch: "85", hd: "41", sub: "43", nat: "00", descCh: "Electrical machinery and equipment and parts thereof", descHd: "Semiconductor devices; photovoltaic cells", descSub: "Photovoltaic cells assembled in modules or panels", duty: "0%", vat: "18%", other: "Green Tech Duty Concessions" },
  tractors: { ch: "87", hd: "01", sub: "91", nat: "00", descCh: "Vehicles other than railway or tramway rolling-stock", descHd: "Tractors (other than tractors of heading 87.09)", descSub: "Agricultural tractors, engine power not exceeding 18 kW", duty: "0%", vat: "18%", other: "Agricultural Concessions" },
  cars: { ch: "87", hd: "03", sub: "23", nat: "00", descCh: "Vehicles other than railway or tramway rolling-stock", descHd: "Motor cars and other motor vehicles principally designed for the transport of persons", descSub: "Of a cylinder capacity exceeding 1,500 cc but not exceeding 3,000 cc", duty: "Extremely High Duty/Excise", vat: "18%", other: "Luxury Tax Applicable" },
  electric_cars: { ch: "87", hd: "03", sub: "80", nat: "00", descCh: "Vehicles other than railway or tramway rolling-stock", descHd: "Motor cars and other motor vehicles", descSub: "Other vehicles, with only electric motor for propulsion", duty: "Concessional Band", vat: "18%", other: "EV Policy Concessions" },
  trucks: { ch: "87", hd: "04", sub: "21", nat: "00", descCh: "Vehicles other than railway or tramway rolling-stock", descHd: "Motor vehicles for the transport of goods", descSub: "g.v.w. Not exceeding 5 tonnes", duty: "15%", vat: "18%", other: "Commercial License Band" },
  bicycles: { ch: "87", hd: "12", sub: "00", nat: "00", descCh: "Vehicles other than railway or tramway rolling-stock", descHd: "Bicycles and other cycles (including delivery tricycles)", descSub: "Not motorized", duty: "10%", vat: "18%", other: "Applicable" },
  spectacles: { ch: "90", hd: "04", sub: "10", nat: "00", descCh: "Optical, photographic, checking, precision instruments", descHd: "Spectacles, goggles and the like, corrective, protective", descSub: "Sunglasses", duty: "15%", vat: "18%", other: "PAL Applicable" },
  medical_imaging: { ch: "90", hd: "18", sub: "12", nat: "00", descCh: "Optical, photographic, checking, precision, medical instruments", descHd: "Instruments and appliances used in medical, surgical or dental sciences", descSub: "Ultrasonic scanning apparatus", duty: "0%", vat: "Exempt", other: "NMRA Approval Required" },
  wristwatches: { ch: "91", hd: "01", sub: "11", nat: "00", descCh: "Clocks and watches and parts thereof", descHd: "Wrist-watches, pocket-watches and other watches", descSub: "With mechanical display only", duty: "15%", vat: "18%", other: "PAL Applicable" },
  furniture: { ch: "94", hd: "03", sub: "60", nat: "00", descCh: "Furniture; bedding, mattresses, mattress supports, cushions", descHd: "Other furniture and parts thereof", descSub: "Other wooden furniture", duty: "20%", vat: "18%", other: "High CESS" },
  mattresses: { ch: "94", hd: "04", sub: "21", nat: "00", descCh: "Furniture; bedding, mattresses, mattress supports", descHd: "Mattress supports; articles of bedding", descSub: "Mattresses of cellular rubber or plastics", duty: "20%", vat: "18%", other: "High CESS" },
  led_lamps: { ch: "94", hd: "05", sub: "42", nat: "00", descCh: "Furniture; bedding; luminaires and lighting fittings", descHd: "Luminaires and lighting fittings", descSub: "Designed for use solely with light-emitting diode (LED) light sources", duty: "10%", vat: "18%", other: "Applicable" },
  toys: { ch: "95", hd: "03", sub: "00", nat: "00", descCh: "Toys, games and sports requisites; parts and accessories thereof", descHd: "Tricycles, scooters, pedal cars and similar toys; dolls' carriages", descSub: "-", duty: "15%", vat: "18%", other: "Applicable" },
  pens: { ch: "96", hd: "08", sub: "10", nat: "00", descCh: "Miscellaneous manufactured articles", descHd: "Ball-point pens; felt tipped and other porous-tipped pens", descSub: "Ball-point pens", duty: "10%", vat: "18%", other: "Applicable" }
};

function updateHSCodeExplainer() {
  const select = document.getElementById('hs-item-select');
  const category = select.value;
  if (!category) return;

  const container = document.getElementById('hs-result-container');
  const chap = document.getElementById('hs-chapter');
  const head = document.getElementById('hs-heading');
  const sub = document.getElementById('hs-subheading');
  const nat = document.getElementById('hs-national');
  const descChap = document.getElementById('hs-desc-chapter');
  const descHead = document.getElementById('hs-desc-heading');
  const descSub = document.getElementById('hs-desc-subheading');
  const duty = document.getElementById('hs-duty');
  const vat = document.getElementById('hs-vat');
  const other = document.getElementById('hs-other');
  
  container.style.display = 'block';
  
  const data = hsDictionary[category];
  if (data) {
    chap.textContent = data.ch; 
    head.textContent = data.hd; 
    sub.textContent = data.sub; 
    nat.textContent = data.nat;
    descChap.textContent = data.descCh;
    descHead.textContent = data.descHd;
    descSub.textContent = data.descSub;
    duty.textContent = data.duty; 
    vat.textContent = data.vat; 
    other.textContent = data.other;
  }
}

function filterHSOptions() {
  const input = document.getElementById('hs-search-input').value.toLowerCase();
  const select = document.getElementById('hs-item-select');
  const optgroups = select.getElementsByTagName('optgroup');
  
  let hasMatches = false;

  for (let i = 0; i < optgroups.length; i++) {
    const options = optgroups[i].getElementsByTagName('option');
    let groupHasMatch = false;

    for (let j = 0; j < options.length; j++) {
      const text = options[j].text.toLowerCase();
      if (text.includes(input)) {
        options[j].style.display = '';
        groupHasMatch = true;
        hasMatches = true;
      } else {
        options[j].style.display = 'none';
      }
    }

    optgroups[i].style.display = groupHasMatch ? '' : 'none';
  }
  
  // If only one option is visible, auto-select it (excluding disabled)
  if (hasMatches && input.length > 2) {
    let visibleCount = 0;
    let lastVisible = null;
    
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].style.display !== 'none' && !select.options[i].disabled) {
        visibleCount++;
        lastVisible = select.options[i];
      }
    }
    
    if (visibleCount === 1) {
      select.value = lastVisible.value;
      updateHSCodeExplainer();
    }
  }
}

