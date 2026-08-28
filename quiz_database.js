// Nexus Quiz Hub - Weekly Logistics & Freight Knowledge Assessment Database
// Contains curated 20-question weekly assessment pools (10 MCQs + 10 Short Answer Questions per week)

var NEXUS_QUIZ_DATABASE = window.NEXUS_QUIZ_DATABASE = {
  weeks: [
    {
      id: "week-1",
      title: "Weekly Quiz 01",
      description: "20 Questions • 10 MCQ + 10 Short Answer",
      questions: [
        // 10 MCQs
        {
          id: "w1-q1",
          type: "mcq",
          category: "History of Logistics & Trade",
          question: "Who is considered the father of modern containerization for introducing the 20ft steel box in 1956 aboard the SS Ideal-X?",
          options: [
            "Thomas Meadows",
            "Malcom McLean",
            "Ferdinand de Lesseps",
            "Robert Fulton"
          ],
          answerIndex: 1,
          explanation: "Malcom McLean, an American trucking entrepreneur, introduced standardized container shipping on April 26, 1956, slashing port loading costs by over 97%."
        },
        {
          id: "w1-q2",
          type: "mcq",
          category: "Incoterms® 2026",
          question: "Under which Incoterm does the Seller carry maximum legal risk and responsibility up to the buyer's factory door?",
          options: [
            "EXW (Ex Works)",
            "FOB (Free On Board)",
            "CIF (Cost, Insurance & Freight)",
            "DDP (Delivered Duty Paid)"
          ],
          answerIndex: 3,
          explanation: "DDP (Delivered Duty Paid) requires the seller to handle origin trucking, main freight, import customs clearance, taxes/VAT, and final door delivery."
        },
        {
          id: "w1-q3",
          type: "mcq",
          category: "Ocean Freight",
          question: "What is the standard payload volume capacity of a 40' High Cube (40HC) ocean shipping container?",
          options: [
            "~33.2 CBM",
            "~67.7 CBM",
            "~76.4 CBM",
            "~88.5 CBM"
          ],
          answerIndex: 2,
          explanation: "A 40ft High Cube container has an internal volume of ~76.4 CBM, offering 1 foot extra height compared to a standard 40GP (~67.7 CBM)."
        },
        {
          id: "w1-q4",
          type: "mcq",
          category: "Shipping Documents",
          question: "Which type of Bill of Lading allows cargo to be released at destination without physically surrendering original paper documents?",
          options: [
            "Negotiable Master B/L",
            "Original Ocean Bill of Lading",
            "Telex Release / Express Release",
            "Charter Party Bill of Lading"
          ],
          answerIndex: 2,
          explanation: "A Telex Release (or Express Sea Waybill) allows destination port agents to release cargo electronically once the original B/L is surrendered at origin."
        },
        {
          id: "w1-q5",
          type: "mcq",
          category: "Air Freight",
          question: "What is the standard IATA volumetric divisor used to calculate air cargo chargeable weight (in cm³/kg)?",
          options: [
            "1,000 cm³/kg",
            "3,000 cm³/kg",
            "5,000 cm³/kg",
            "6,000 cm³/kg"
          ],
          answerIndex: 3,
          explanation: "IATA standard air cargo volumetric weight formula is (Length x Width x Height in cm) / 6000 = Volumetric Weight in kg."
        },
        {
          id: "w1-q6",
          type: "mcq",
          category: "Customs & Compliance",
          question: "How many digits are in the globally standardized Harmonized System (HS) code baseline maintained by the WCO?",
          options: [
            "4 Digits",
            "6 Digits",
            "8 Digits",
            "10 Digits"
          ],
          answerIndex: 1,
          explanation: "The World Customs Organization (WCO) standardizes the first 6 digits of HS codes worldwide. Individual countries add national tariff digits (digits 7-10)."
        },
        {
          id: "w1-q7",
          type: "mcq",
          category: "Freight Pricing & Rates",
          question: "What does the surcharge acronym BAF stand for in ocean freight rate quotations?",
          options: [
            "Base Allowance Fee",
            "Bunker Adjustment Factor",
            "Border Assessment Fee",
            "Bulk Allocation Surcharge"
          ],
          answerIndex: 1,
          explanation: "BAF (Bunker Adjustment Factor) is a floating ocean freight fuel surcharge adjusted based on crude oil fuel prices."
        },
        {
          id: "w1-q8",
          type: "mcq",
          category: "History of Canals",
          question: "In what year did the Suez Canal officially open to international maritime trade?",
          options: [
            "1815",
            "1869",
            "1914",
            "1956"
          ],
          answerIndex: 1,
          explanation: "The Suez Canal in Egypt officially opened on November 17, 1869, bypassing the entire African continent and saving 8,900 km between Europe and Asia."
        },
        {
          id: "w1-q9",
          type: "mcq",
          category: "Special Cargo Handling",
          question: "Which Dangerous Goods (DG) class covers Lithium-Ion batteries used in laptops and electric vehicles?",
          options: [
            "Class 3 (Flammable Liquids)",
            "Class 6 (Toxic Substances)",
            "Class 8 (Corrosives)",
            "Class 9 (Miscellaneous Dangerous Goods)"
          ],
          answerIndex: 3,
          explanation: "Lithium batteries are classified under UN Dangerous Goods Class 9 (Miscellaneous Dangerous Goods)."
        },
        {
          id: "w1-q10",
          type: "mcq",
          category: "Logistics Process & SOPs",
          question: "Which document must be submitted to US Customs at least 24 hours prior to loading a container on a vessel at origin?",
          options: [
            "Certificate of Origin",
            "ISF 10+2 (Importer Security Filing)",
            "Delivery Order (DO)",
            "Air Waybill (AWB)"
          ],
          answerIndex: 1,
          explanation: "Under US FMC regulations, ISF 10+2 must be transmitted to US CBP at least 24 hours before the vessel departs origin to avoid a $5,000 penalty."
        },

        // 10 Short Answer Questions
        {
          id: "w1-q11",
          type: "short",
          category: "Incoterms® 2026",
          question: "Under FOB terms, at what exact physical point does legal risk transfer from the Seller to the Buyer?",
          modelAnswer: "Once the goods are loaded on board the vessel at the named port of shipment.",
          keywords: ["loaded", "on board", "vessel", "shipment", "ship"],
          explanation: "In FOB (Free On Board), risk passes from seller to buyer the moment cargo is physically loaded aboard the vessel at origin."
        },
        {
          id: "w1-q12",
          type: "short",
          category: "Shipping Basics",
          question: "What does the abbreviation TEU stand for in container shipping statistics?",
          modelAnswer: "Twenty-foot Equivalent Unit",
          keywords: ["twenty", "foot", "equivalent", "unit"],
          explanation: "TEU is the universal unit of measurement equal to one standard 20ft ISO container."
        },
        {
          id: "w1-q13",
          type: "short",
          category: "Customs & Compliance",
          question: "What automated electronic customs clearance portal is operated by UNCTAD and Sri Lanka Customs?",
          modelAnswer: "ASYCUDA World",
          keywords: ["asycuda", "world"],
          explanation: "ASYCUDA (Automated System for Customs Data) World handles electronic CUSDEC declarations."
        },
        {
          id: "w1-q14",
          type: "short",
          category: "Shipping Documents",
          question: "Which essential document lists the itemized box counts, net weights, gross weights, and package dimensions of a shipment?",
          modelAnswer: "Packing List (PL)",
          keywords: ["packing", "list"],
          explanation: "The Packing List details cargo packaging breakdown for physical customs verification."
        },
        {
          id: "w1-q15",
          type: "short",
          category: "Freight Pricing",
          question: "What is the penalty fee charged by ocean lines when an importer keeps a container past its free-time period at the port terminal?",
          modelAnswer: "Demurrage",
          keywords: ["demurrage"],
          explanation: "Demurrage is charged per container per day for exceeding allowable free-time storage inside port terminals."
        },
        {
          id: "w1-q16",
          type: "short",
          category: "History of Logistics & Trade",
          question: "In what year did the Panama Canal open, connecting the Atlantic and Pacific oceans?",
          modelAnswer: "1914",
          keywords: ["1914"],
          explanation: "The Panama Canal opened on August 15, 1914."
        },
        {
          id: "w1-q17",
          type: "short",
          category: "Air Freight",
          question: "What non-negotiable contract document is issued by airlines for air cargo transport?",
          modelAnswer: "Air Waybill (AWB)",
          keywords: ["air", "waybill", "awb"],
          explanation: "An Air Waybill (AWB) acts as receipt of goods and contract of carriage in air freight."
        },
        {
          id: "w1-q18",
          type: "short",
          category: "Special Cargo Handling",
          question: "What type of specialized refrigerated container is used to ship temperature-controlled pharmaceuticals and perishables?",
          modelAnswer: "Reefer Container (Refrigerated Container)",
          keywords: ["reefer", "refrigerated"],
          explanation: "Reefer containers maintain precise cold-chain temperature ranges (-30°C to +30°C)."
        },
        {
          id: "w1-q19",
          type: "short",
          category: "Logistics Process & SOPs",
          question: "What mandatory SOLAS regulation requires shippers to provide certified weight declarations before container vessel loading?",
          modelAnswer: "VGM (Verified Gross Mass)",
          keywords: ["vgm", "verified", "gross", "mass"],
          explanation: "SOLAS VGM mandates accurate container weight measurement to prevent vessel instability."
        },
        {
          id: "w1-q20",
          type: "short",
          category: "Supply Chain & Logistics",
          question: "What logistics acronym describes a non-asset lead logistics provider managing an entire supply chain ecosystem?",
          modelAnswer: "4PL (Fourth-Party Logistics)",
          keywords: ["4pl", "fourth", "party"],
          explanation: "4PL integrators manage 3PLs, technology, and end-to-end supply chain execution."
        }
      ]
    },
    {
      id: "week-2",
      title: "Weekly Quiz 02",
      description: "20 Questions • 10 MCQ + 10 Short Answer",
      questions: [
        {
          id: "w2-q1",
          type: "mcq",
          category: "Air Freight",
          question: "If a package measures 100cm x 100cm x 60cm and weighs 80kg actual weight, what is its chargeable air freight weight?",
          options: [
            "80 kg",
            "100 kg",
            "120 kg",
            "150 kg"
          ],
          answerIndex: 1,
          explanation: "Volumetric Weight = (100x100x60)/6000 = 100 kg. Since 100 kg > 80 kg actual weight, Chargeable Weight is 100 kg."
        },
        {
          id: "w2-q2",
          type: "mcq",
          category: "Trade & Incoterms",
          question: "Under CIF terms, what minimum marine insurance coverage is the seller legally required to purchase for the buyer?",
          options: [
            "Institute Cargo Clauses (A) - All Risks",
            "Institute Cargo Clauses (C) - Minimum Risk",
            "War Risk Only",
            "No insurance required"
          ],
          answerIndex: 1,
          explanation: "CIF requires minimum Clause (C) coverage. CIP requires maximum Clause (A) All Risks coverage."
        },
        {
          id: "w2-q3",
          type: "mcq",
          category: "Customs & Compliance",
          question: "What does CUSDEC stand for in international customs clearance procedures?",
          options: [
            "Customs Declaration",
            "Cargo Utilization System Document",
            "Central Union Standard Freight Code",
            "Customs Duty Exemption Certificate"
          ],
          answerIndex: 0,
          explanation: "CUSDEC stands for Customs Declaration document filed electronically via ASYCUDA."
        },
        {
          id: "w2-q4",
          type: "mcq",
          category: "Special Cargo Handling",
          question: "Which UN hazard class covers Explosives such as fireworks and ammunition?",
          options: [
            "Class 1",
            "Class 2",
            "Class 4",
            "Class 7"
          ],
          answerIndex: 0,
          explanation: "Class 1 covers all explosive materials."
        },
        {
          id: "w2-q5",
          type: "mcq",
          category: "Freight Charges & Rates",
          question: "What fee is charged when a trucker waits beyond allowable free loading time at a factory loading dock?",
          options: [
            "Demurrage",
            "Detention",
            "Truck Detention / Stoppage Fee",
            "Gate-In Fee"
          ],
          answerIndex: 2,
          explanation: "Truck Detention (or Waiting Time Fee) accrues when driver waiting time exceeds factory loading grace periods (usually 2 hours)."
        },
        {
          id: "w2-q6",
          type: "mcq",
          category: "Shipping Documents",
          question: "Who issues the House Bill of Lading (HBL)?",
          options: [
            "Vessel Operating Ocean Carrier (VOCC)",
            "Freight Forwarder / NVOCC",
            "Customs Officer",
            "Port Authority"
          ],
          answerIndex: 1,
          explanation: "A Freight Forwarder or NVOCC issues the House Bill of Lading (HBL) to the actual cargo shipper."
        },
        {
          id: "w2-q7",
          type: "mcq",
          category: "Trade Lane Guides",
          question: "What major canal connects the Red Sea to the Mediterranean Sea?",
          options: [
            "Panama Canal",
            "Suez Canal",
            "Erie Canal",
            "Kiel Canal"
          ],
          answerIndex: 1,
          explanation: "The Suez Canal in Egypt connects the Red Sea directly to the Mediterranean."
        },
        {
          id: "w2-q8",
          type: "mcq",
          category: "Process Flows & SOPs",
          question: "What is an EIR in container depot operations?",
          options: [
            "Export Insurance Receipt",
            "Equipment Interchange Receipt",
            "Electronic Identification Record",
            "Emergency Inspection Report"
          ],
          answerIndex: 1,
          explanation: "Equipment Interchange Receipt (EIR) documents container physical condition during gate handoffs."
        },
        {
          id: "w2-q9",
          type: "mcq",
          category: "Warehousing & Inventory",
          question: "Which warehousing strategy dispatches incoming goods directly to outbound trucks with zero long-term storage?",
          options: [
            "Kitting",
            "Cross-Docking",
            "Cycle Counting",
            "Bonded Warehousing"
          ],
          answerIndex: 1,
          explanation: "Cross-docking moves goods directly from receiving to outbound transport without intermediate storage."
        },
        {
          id: "w2-q10",
          type: "mcq",
          category: "History of Logistics & Trade",
          question: "In 1926, which international organization was founded in Vienna to standardize freight forwarding rules?",
          options: [
            "IATA",
            "IMO",
            "FIATA",
            "WCO"
          ],
          answerIndex: 2,
          explanation: "FIATA (International Federation of Freight Forwarders Associations) was founded on May 31, 1926."
        },
        // Short Answer Questions 11-20
        {
          id: "w2-q11",
          type: "short",
          category: "Incoterms® 2026",
          question: "Under FCA terms, who is responsible for clearing export customs at origin?",
          modelAnswer: "The Seller",
          keywords: ["seller", "exporter"],
          explanation: "FCA requires the seller to clear goods for export before delivering to buyer's carrier."
        },
        {
          id: "w2-q12",
          type: "short",
          category: "Customs Clearance",
          question: "What tax identification number must Sri Lankan exporters declare on customs entry documents?",
          modelAnswer: "TIN (Tax Identification Number)",
          keywords: ["tin", "tax"],
          explanation: "TIN is mandatory for IRD & Sri Lanka Customs registration."
        },
        {
          id: "w2-q13",
          type: "short",
          category: "Shipping Documents",
          question: "What document proves the country of manufacture of goods to claim preferential tariff discounts?",
          modelAnswer: "Certificate of Origin (COO)",
          keywords: ["certificate", "origin", "coo"],
          explanation: "Certificate of Origin (COO) verifies manufacturing country for FTA duty benefits."
        },
        {
          id: "w2-q14",
          type: "short",
          category: "Ocean Freight",
          question: "What container shipping acronym represents less-than-container-load consolidated cargo?",
          modelAnswer: "LCL (Less than Container Load)",
          keywords: ["lcl", "less"],
          explanation: "LCL consolidates multiple shippers' goods into a shared container."
        },
        {
          id: "w2-q15",
          type: "short",
          category: "Freight Charges",
          question: "What surcharge compensates carriers for exchange rate fluctuations between USD and local currency?",
          modelAnswer: "CAF (Currency Adjustment Factor)",
          keywords: ["caf", "currency"],
          explanation: "CAF covers currency exchange rate volatility."
        },
        {
          id: "w2-q16",
          type: "short",
          category: "Air Freight",
          question: "What three-letter IATA code identifies Colombo Bandaranaike International Airport?",
          modelAnswer: "CMB",
          keywords: ["cmb"],
          explanation: "CMB is the official IATA airport code for Katunayake/Colombo."
        },
        {
          id: "w2-q17",
          type: "short",
          category: "Special Cargo Handling",
          question: "What document specifies 16 safety sections for handling dangerous chemical cargo?",
          modelAnswer: "MSDS / SDS (Safety Data Sheet)",
          keywords: ["msds", "sds", "safety", "data", "sheet"],
          explanation: "MSDS/SDS outlines hazardous chemical storage and emergency procedures."
        },
        {
          id: "w2-q18",
          type: "short",
          category: "Supply Chain",
          question: "What phenomenon describes how small fluctuations in retail demand create amplified swings upstream in supply chains?",
          modelAnswer: "The Bullwhip Effect",
          keywords: ["bullwhip", "effect"],
          explanation: "The Bullwhip Effect causes distorted inventory forecasting upstream."
        },
        {
          id: "w2-q19",
          type: "short",
          category: "Trade Lane Guides",
          question: "What major US West Coast port pair handles the largest volume of Asian container imports?",
          modelAnswer: "Port of Los Angeles & Port of Long Beach (LA/LB)",
          keywords: ["los angeles", "long beach", "la", "lb"],
          explanation: "LA/LB is the primary US West Coast ocean gateway."
        },
        {
          id: "w2-q20",
          type: "short",
          category: "Glossary",
          question: "What maritime term refers to the vertical distance between a ship's waterline and the bottom of its hull?",
          modelAnswer: "Draft (or Draught)",
          keywords: ["draft", "draught"],
          explanation: "Vessel draft determines minimum water depth required for port navigation."
        }
      ]
    },
    {
      id: "week-3",
      title: "Weekly Quiz 03",
      description: "20 Questions • 10 MCQ + 10 Short Answer",
      questions: [
        // 10 MCQs
        {
          id: "w3-q1",
          type: "mcq",
          category: "Air Freight",
          question: "What is the standardized metal container or pallet used to consolidate cargo inside aircraft lower decks called?",
          options: [
            "ISO Container",
            "Unit Load Device (ULD)",
            "Intermodal Swap Body",
            "Barge Container"
          ],
          answerIndex: 1,
          explanation: "Unit Load Devices (ULDs), such as AKE containers or PMC pallets, allow rapid loading and unloading of aircraft holds."
        },
        {
          id: "w3-q2",
          type: "mcq",
          category: "Incoterms® 2026",
          question: "Under CIP (Carriage and Insurance Paid to) terms, what level of minimum insurance coverage must the seller procure for the buyer?",
          options: [
            "Institute Cargo Clauses (C) - Minimum Risk",
            "Institute Cargo Clauses (B) - Basic Risk",
            "Institute Cargo Clauses (A) - All Risks",
            "No mandatory insurance requirement"
          ],
          answerIndex: 2,
          explanation: "Incoterms® rules mandate Clause (A) 'All Risks' insurance coverage under CIP terms, whereas CIF only requires Clause (C)."
        },
        {
          id: "w3-q3",
          type: "mcq",
          category: "Ocean Freight",
          question: "What classification is given to ultra-large container ships with carrying capacities exceeding 20,000 TEUs?",
          options: [
            "Handysize",
            "Panamax",
            "ULCV (Ultra Large Container Vessel)",
            "Aframax"
          ],
          answerIndex: 2,
          explanation: "Ultra Large Container Vessels (ULCVs) carry over 20,000 TEUs and operate primarily on major Asia-Europe trade lanes."
        },
        {
          id: "w3-q4",
          type: "mcq",
          category: "Shipping Contracts",
          question: "What legal contract governs the hire and operation of an entire vessel between a shipowner and a charterer?",
          options: [
            "Bill of Lading (B/L)",
            "Charter Party Agreement",
            "Letter of Indemnity (LOI)",
            "Freight Manifest"
          ],
          answerIndex: 1,
          explanation: "A Charter Party agreement details terms, freight rates, and laytime for voyage or time charters."
        },
        {
          id: "w3-q5",
          type: "mcq",
          category: "Customs & Valuation",
          question: "Which type of customs duty is calculated as a fixed monetary rate per physical unit (e.g. $2.00 per kg) rather than cargo value?",
          options: [
            "Ad Valorem Duty",
            "Specific Duty",
            "Compound Duty",
            "Anti-Dumping Duty"
          ],
          answerIndex: 1,
          explanation: "Specific duty is assessed on physical metrics (weight, volume, quantity) independent of commercial value."
        },
        {
          id: "w3-q6",
          type: "mcq",
          category: "Incoterms® 2026",
          question: "Which Incoterm rule introduced in 2020 requires the seller to deliver and unload goods at the named place of destination?",
          options: [
            "DPU (Delivered at Place Unloaded)",
            "DAP (Delivered at Place)",
            "FAS (Free Alongside Ship)",
            "CPT (Carriage Paid To)"
          ],
          answerIndex: 0,
          explanation: "DPU (formerly DAT) is the only Incoterm that explicitly requires the seller to unload cargo at destination."
        },
        {
          id: "w3-q7",
          type: "mcq",
          category: "History of Canals & Ports",
          question: "In what year did the expanded Panama Canal (Third Set of Locks) open to accommodate Neopanamax mega-vessels?",
          options: [
            "1999",
            "2008",
            "2016",
            "2020"
          ],
          answerIndex: 2,
          explanation: "The expanded Panama Canal opened on June 26, 2016, enabling ships up to 14,000 TEU to transit the locks."
        },
        {
          id: "w3-q8",
          type: "mcq",
          category: "Special Cargo Handling",
          question: "What maritime vessel type utilizes internal ramps to drive wheeled cargo such as automobiles, trucks, and trailers directly on board?",
          options: [
            "Capesize Bulk Carrier",
            "Ro-Ro (Roll-on / Roll-off)",
            "Product Tanker",
            "Feeder Containership"
          ],
          answerIndex: 1,
          explanation: "Ro-Ro vessels feature built-in ramps for driving wheeled vehicles directly into vessel cargo decks."
        },
        {
          id: "w3-q9",
          type: "mcq",
          category: "Freight Rates & Surcharges",
          question: "What surcharge do ocean carriers apply when vessels face excessive waiting times at anchorage due to overcrowded terminals?",
          options: [
            "PCS (Port Congestion Surcharge)",
            "GRI (General Rate Increase)",
            "PSS (Peak Season Surcharge)",
            "THC (Terminal Handling Charge)"
          ],
          answerIndex: 0,
          explanation: "Port Congestion Surcharge (PCS) compensates ocean carriers for operating delays and fuel consumed while idling at anchor."
        },
        {
          id: "w3-q10",
          type: "mcq",
          category: "Dangerous Goods & Compliance",
          question: "Under IMDG Regulations, which UN Hazard Class covers Corrosive Liquids and Solids (e.g. sulfuric acid, battery fluid)?",
          options: [
            "Class 2",
            "Class 5",
            "Class 8",
            "Class 9"
          ],
          answerIndex: 2,
          explanation: "Class 8 dangerous goods encompass corrosive substances capable of damaging living tissue or ship structure."
        },

        // 10 Short Answer Questions
        {
          id: "w3-q11",
          type: "short",
          category: "Incoterms® 2026",
          question: "Under FAS terms, where must the seller place the cargo for delivery to complete export obligations?",
          modelAnswer: "Alongside the vessel at the named port of shipment",
          keywords: ["alongside", "vessel", "ship", "port", "quay", "wharf"],
          explanation: "FAS (Free Alongside Ship) requires placing cargo alongside the vessel on the quay or barge."
        },
        {
          id: "w3-q12",
          type: "short",
          category: "Air Freight",
          question: "What 11-digit document tracking number identifies Master Air Waybills, starting with a 3-digit airline prefix?",
          modelAnswer: "MAWB Number (Master Air Waybill Number)",
          keywords: ["mawb", "air", "waybill", "number"],
          explanation: "MAWB numbers consist of a 3-digit airline code prefix followed by an 8-digit tracking serial."
        },
        {
          id: "w3-q13",
          type: "short",
          category: "Customs & Security",
          question: "What pre-arrival security declaration filing is mandatory for cargo entering European Union sea and air ports?",
          modelAnswer: "ICS2 (Import Control System 2) / ENS (Entry Summary Declaration)",
          keywords: ["ics2", "ens", "entry", "summary", "declaration"],
          explanation: "ICS2 / ENS requires advance cargo data submission prior to loading destined for EU territory."
        },
        {
          id: "w3-q14",
          type: "short",
          category: "Ocean Freight Pricing",
          question: "What rating standard unit equals 1 CBM or 1,000 kg (whichever yields higher freight revenue) for LCL cargo?",
          modelAnswer: "Revenue Ton (W/M - Weight or Measurement)",
          keywords: ["revenue", "ton", "w/m", "weight", "measurement"],
          explanation: "Revenue Ton (W/M) charges LCL freight based on volume (CBM) or weight (metric ton), whichever is greater."
        },
        {
          id: "w3-q15",
          type: "short",
          category: "Warehousing & Inventory",
          question: "What inventory rotation principle dispatches the oldest batch of received goods first to prevent stock deterioration?",
          modelAnswer: "FIFO (First In, First Out)",
          keywords: ["fifo", "first", "in", "out"],
          explanation: "FIFO prevents obsolescence and expiration by shipping the oldest inventory stock first."
        },
        {
          id: "w3-q16",
          type: "short",
          category: "Trade Lanes & Maritime",
          question: "What key maritime bottleneck strait between Sumatra and the Malay Peninsula carries over 25% of world sea trade?",
          modelAnswer: "Strait of Malacca",
          keywords: ["malacca", "strait"],
          explanation: "The Strait of Malacca is the primary sea lane connecting Asia with the Middle East and Europe."
        },
        {
          id: "w3-q17",
          type: "short",
          category: "Trade Finance",
          question: "What financial payment instrument issued by an importing bank guarantees payment to the exporter against compliant shipping documents?",
          modelAnswer: "Letter of Credit (L/C)",
          keywords: ["letter", "credit", "lc"],
          explanation: "A Letter of Credit (L/C) provides bank-backed payment security in international trade."
        },
        {
          id: "w3-q18",
          type: "short",
          category: "Container Operations",
          question: "What fee does a shipping line charge an importer for failing to return an empty container to the depot within allowed free days?",
          modelAnswer: "Container Detention",
          keywords: ["detention"],
          explanation: "Detention accrues when empty containers are held beyond agreed free time outside the port terminal."
        },
        {
          id: "w3-q19",
          type: "short",
          category: "Cold Chain Logistics",
          question: "What electronic temperature monitoring device placed inside reefer shipments records thermal logs during transit?",
          modelAnswer: "Data Logger (Temperature Logger)",
          keywords: ["data", "logger", "temperature", "recorder"],
          explanation: "Data Loggers record continuous temperature metrics to verify cold-chain compliance upon arrival."
        },
        {
          id: "w3-q20",
          type: "short",
          category: "Supply Chain Strategy",
          question: "What inventory supply strategy delivers raw components to production lines immediately before assembly without buffer storage?",
          modelAnswer: "Just-In-Time (JIT)",
          keywords: ["just", "in", "time", "jit"],
          explanation: "Just-In-Time (JIT) minimizes holding costs by scheduling material arrivals precisely as needed in production."
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.NEXUS_QUIZ_DATABASE = NEXUS_QUIZ_DATABASE;
}
