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
          keywords: ["on board", "loaded on board", "loaded aboard"],
          explanation: "In FOB (Free On Board), risk passes from seller to buyer the moment cargo is physically loaded aboard the vessel at origin."
        },
        {
          id: "w1-q12",
          type: "short",
          category: "Shipping Basics",
          question: "What does the abbreviation TEU stand for in container shipping statistics?",
          modelAnswer: "Twenty-foot Equivalent Unit",
          keywords: ["teu", "twenty-foot equivalent", "twenty foot equivalent"],
          explanation: "TEU is the universal unit of measurement equal to one standard 20ft ISO container."
        },
        {
          id: "w1-q13",
          type: "short",
          category: "Customs & Compliance",
          question: "What automated electronic customs clearance portal is operated by UNCTAD and Sri Lanka Customs?",
          modelAnswer: "ASYCUDA World",
          keywords: ["asycuda"],
          explanation: "ASYCUDA (Automated System for Customs Data) World handles electronic CUSDEC declarations."
        },
        {
          id: "w1-q14",
          type: "short",
          category: "Shipping Documents",
          question: "Which essential document lists the itemized box counts, net weights, gross weights, and package dimensions of a shipment?",
          modelAnswer: "Packing List (PL)",
          keywords: ["packing list"],
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
          keywords: ["air waybill", "awb"],
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
          keywords: ["vgm", "verified gross mass"],
          explanation: "SOLAS VGM mandates accurate container weight measurement to prevent vessel instability."
        },
        {
          id: "w1-q20",
          type: "short",
          category: "Supply Chain & Logistics",
          question: "What logistics acronym describes a non-asset lead logistics provider managing an entire supply chain ecosystem?",
          modelAnswer: "4PL (Fourth-Party Logistics)",
          keywords: ["4pl", "fourth-party logistics", "fourth party"],
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
          keywords: ["tin", "tax identification number"],
          explanation: "TIN is mandatory for IRD & Sri Lanka Customs registration."
        },
        {
          id: "w2-q13",
          type: "short",
          category: "Shipping Documents",
          question: "What document proves the country of manufacture of goods to claim preferential tariff discounts?",
          modelAnswer: "Certificate of Origin (COO)",
          keywords: ["certificate of origin", "coo"],
          explanation: "Certificate of Origin (COO) verifies manufacturing country for FTA duty benefits."
        },
        {
          id: "w2-q14",
          type: "short",
          category: "Ocean Freight",
          question: "What container shipping acronym represents less-than-container-load consolidated cargo?",
          modelAnswer: "LCL (Less than Container Load)",
          keywords: ["lcl", "less than container"],
          explanation: "LCL consolidates multiple shippers' goods into a shared container."
        },
        {
          id: "w2-q15",
          type: "short",
          category: "Freight Charges",
          question: "What surcharge compensates carriers for exchange rate fluctuations between USD and local currency?",
          modelAnswer: "CAF (Currency Adjustment Factor)",
          keywords: ["caf", "currency adjustment"],
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
          keywords: ["msds", "sds", "safety data sheet"],
          explanation: "MSDS/SDS outlines hazardous chemical storage and emergency procedures."
        },
        {
          id: "w2-q18",
          type: "short",
          category: "Supply Chain",
          question: "What phenomenon describes how small fluctuations in retail demand create amplified swings upstream in supply chains?",
          modelAnswer: "The Bullwhip Effect",
          keywords: ["bullwhip"],
          explanation: "The Bullwhip Effect causes distorted inventory forecasting upstream."
        },
        {
          id: "w2-q19",
          type: "short",
          category: "Trade Lane Guides",
          question: "What major US West Coast port pair handles the largest volume of Asian container imports?",
          modelAnswer: "Port of Los Angeles & Port of Long Beach (LA/LB)",
          keywords: ["los angeles", "long beach"],
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
          keywords: ["alongside", "free alongside"],
          explanation: "FAS (Free Alongside Ship) requires placing cargo alongside the vessel on the quay or barge."
        },
        {
          id: "w3-q12",
          type: "short",
          category: "Air Freight",
          question: "What 11-digit document tracking number identifies Master Air Waybills, starting with a 3-digit airline prefix?",
          modelAnswer: "MAWB Number (Master Air Waybill Number)",
          keywords: ["mawb", "master air waybill"],
          explanation: "MAWB numbers consist of a 3-digit airline code prefix followed by an 8-digit tracking serial."
        },
        {
          id: "w3-q13",
          type: "short",
          category: "Customs & Security",
          question: "What pre-arrival security declaration filing is mandatory for cargo entering European Union sea and air ports?",
          modelAnswer: "ICS2 (Import Control System 2) / ENS (Entry Summary Declaration)",
          keywords: ["ics2", "ics 2", "ens", "entry summary declaration", "import control system"],
          explanation: "ICS2 / ENS requires advance cargo data submission prior to loading destined for EU territory."
        },
        {
          id: "w3-q14",
          type: "short",
          category: "Ocean Freight Pricing",
          question: "What rating standard unit equals 1 CBM or 1,000 kg (whichever yields higher freight revenue) for LCL cargo?",
          modelAnswer: "Revenue Ton (W/M - Weight or Measurement)",
          keywords: ["revenue ton", "w/m", "weight or measure"],
          explanation: "Revenue Ton (W/M) charges LCL freight based on volume (CBM) or weight (metric ton), whichever is greater."
        },
        {
          id: "w3-q15",
          type: "short",
          category: "Warehousing & Inventory",
          question: "What inventory rotation principle dispatches the oldest batch of received goods first to prevent stock deterioration?",
          modelAnswer: "FIFO (First In, First Out)",
          keywords: ["fifo", "first in first out", "first-in first-out"],
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
          keywords: ["letter of credit", "l/c", "lc"],
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
          keywords: ["data logger", "temperature logger", "temperature recorder"],
          explanation: "Data Loggers record continuous temperature metrics to verify cold-chain compliance upon arrival."
        },
        {
          id: "w3-q20",
          type: "short",
          category: "Supply Chain Strategy",
          question: "What inventory supply strategy delivers raw components to production lines immediately before assembly without buffer storage?",
          modelAnswer: "Just-In-Time (JIT)",
          keywords: ["jit", "just-in-time", "just in time"],
          explanation: "Just-In-Time (JIT) minimizes holding costs by scheduling material arrivals precisely as needed in production."
        }
      ]
    },
    {
      id: "week-4",
      title: "Weekly Quiz 04",
      description: "20 Questions • 10 MCQ + 10 Short Answer",
      questions: [
        // 10 MCQs
        {
          id: "w4-q1",
          type: "mcq",
          category: "Marine Insurance",
          question: "What maritime insurance principle requires all cargo stakeholders to proportionally share financial losses when cargo is intentionally sacrificed to save a vessel in peril?",
          options: [
            "Marine Particular Average",
            "General Average",
            "Salvage Award",
            "Abandonment Clause"
          ],
          answerIndex: 1,
          explanation: "General Average is a centuries-old maritime law principle where all parties in a sea venture (ship, cargo, freight) proportionally share losses resulting from voluntary sacrifice made to preserve the voyage."
        },
        {
          id: "w4-q2",
          type: "mcq",
          category: "Trade Compliance",
          question: "What internationally recognized customs certification program grants trusted traders expedited clearance and reduced inspections under the WCO SAFE Framework of Standards?",
          options: [
            "C-TPAT (Customs-Trade Partnership Against Terrorism)",
            "AEO (Authorized Economic Operator)",
            "ISO 28000 Supply Chain Security",
            "FAST (Free and Secure Trade)"
          ],
          answerIndex: 1,
          explanation: "AEO (Authorized Economic Operator) is a WCO global standard granting certified traders benefits including fewer inspections, priority processing, and mutual recognition between countries."
        },
        {
          id: "w4-q3",
          type: "mcq",
          category: "E-commerce Logistics",
          question: "In e-commerce supply chains, which segment of the delivery chain typically accounts for over 50% of total shipping costs due to fragmented residential deliveries?",
          options: [
            "First-mile (origin pickup)",
            "Line-haul (trunk transport)",
            "Last-mile delivery",
            "Reverse logistics (returns)"
          ],
          answerIndex: 2,
          explanation: "Last-mile delivery — the final leg from distribution hub to customer doorstep — is the most expensive and complex logistics segment due to low drop density and failed delivery attempts."
        },
        {
          id: "w4-q4",
          type: "mcq",
          category: "Intermodal Transport",
          question: "What intermodal freight method involves loading highway truck trailers directly onto railway flatcars for long-distance trunk haul transport?",
          options: [
            "Containerization (ISO Box)",
            "TOFC / Piggyback",
            "Ro-Pax Ferry",
            "Drayage"
          ],
          answerIndex: 1,
          explanation: "TOFC (Trailer on Flatcar), also known as Piggyback, combines the flexibility of truck transport with the cost efficiency of rail for long-distance intermodal freight movement."
        },
        {
          id: "w4-q5",
          type: "mcq",
          category: "Maritime Law",
          question: "Which international convention governs the rights, responsibilities, and liability limits of ocean carriers for cargo loss or damage under Bills of Lading?",
          options: [
            "Rotterdam Rules",
            "Hague-Visby Rules",
            "Hamburg Rules",
            "Warsaw Convention"
          ],
          answerIndex: 1,
          explanation: "The Hague-Visby Rules (1968 amendment to 1924 Hague Rules) remain the most widely adopted international convention governing carrier liability for ocean cargo claims."
        },
        {
          id: "w4-q6",
          type: "mcq",
          category: "Port Operations",
          question: "What large-scale port equipment is used to load and discharge shipping containers between vessel decks and the quayside terminal?",
          options: [
            "Reach Stacker",
            "Rubber-Tyred Gantry (RTG)",
            "Ship-to-Shore (STS) Gantry Crane",
            "Straddle Carrier"
          ],
          answerIndex: 2,
          explanation: "Ship-to-Shore (STS) Gantry Cranes, also called quay cranes, are the primary equipment for loading and discharging containers from vessels at modern container terminals."
        },
        {
          id: "w4-q7",
          type: "mcq",
          category: "Customs Procedures",
          question: "What type of customs-regulated storage facility allows imported goods to be stored without payment of import duties until they are released into domestic consumption?",
          options: [
            "Free Trade Zone (FTZ)",
            "Bonded Warehouse",
            "Cross-Dock Terminal",
            "Inland Container Depot (ICD)"
          ],
          answerIndex: 1,
          explanation: "A Bonded Warehouse is a secured facility licensed by customs authorities where imported goods can be stored, manipulated, or manufactured without paying duties until withdrawal for local use or re-export."
        },
        {
          id: "w4-q8",
          type: "mcq",
          category: "Green Logistics & Compliance",
          question: "What IMO regulation, effective January 1, 2020, limits the sulfur content in marine vessel fuel oil to 0.50% m/m globally to reduce SOx air pollution?",
          options: [
            "MARPOL Annex VI / IMO 2020 Sulfur Cap",
            "SOLAS Chapter XI-2 (ISPS Code)",
            "ISM Code (International Safety Management)",
            "Ballast Water Management Convention"
          ],
          answerIndex: 0,
          explanation: "IMO 2020 (MARPOL Annex VI) reduced the global sulfur cap from 3.50% to 0.50% m/m, requiring ships to use low-sulfur fuel oil (LSFO) or install exhaust gas scrubbers."
        },
        {
          id: "w4-q9",
          type: "mcq",
          category: "Trade Finance",
          question: "What is the most common and fastest method of international trade payment where the buyer's bank directly wires funds electronically to the seller's bank account?",
          options: [
            "Documentary Collection (D/P)",
            "Letter of Credit (L/C)",
            "Telegraphic Transfer (T/T Wire)",
            "Open Account (O/A) with 90-day terms"
          ],
          answerIndex: 2,
          explanation: "Telegraphic Transfer (T/T), also known as wire transfer, is the most widely used international payment method offering speed and simplicity, though it carries higher risk for the exporter compared to L/C."
        },
        {
          id: "w4-q10",
          type: "mcq",
          category: "Freight Technology",
          question: "What electronic technology standard enables automated, paperless exchange of structured trade documents (purchase orders, invoices, shipping notices) between supply chain partners?",
          options: [
            "Blockchain (Distributed Ledger)",
            "EDI (Electronic Data Interchange)",
            "RFID (Radio Frequency Identification)",
            "IoT (Internet of Things)"
          ],
          answerIndex: 1,
          explanation: "EDI (Electronic Data Interchange) is the computer-to-computer exchange of business documents in standardized formats (EDIFACT, ANSI X12), eliminating paper-based processing in logistics."
        },

        // 10 Short Answer Questions
        {
          id: "w4-q11",
          type: "short",
          category: "Customs & Compliance",
          question: "What US Customs electronic system requires ocean carriers to transmit cargo manifest data at least 24 hours before a vessel departs from a foreign port bound for the United States?",
          modelAnswer: "AMS (Automated Manifest System)",
          keywords: ["ams", "automated manifest system"],
          explanation: "AMS (Automated Manifest System) is the US CBP electronic system for advance cargo information filing, working alongside ISF 10+2 for import security."
        },
        {
          id: "w4-q12",
          type: "short",
          category: "Ocean Freight Operations",
          question: "What ocean freight logistics term describes transferring cargo containers from one vessel to another at an intermediate hub port before reaching the final destination?",
          modelAnswer: "Transshipment",
          keywords: ["transshipment", "transhipment", "trans-shipment"],
          explanation: "Transshipment allows carriers to consolidate cargo volumes through major hub ports (e.g., Singapore, Colombo, Dubai) for onward connection to smaller feeder ports."
        },
        {
          id: "w4-q13",
          type: "short",
          category: "Air Cargo Standards",
          question: "What IATA reference publication provides standardized worldwide air cargo rate tariffs, rules, and routing regulations used by airlines and freight forwarders?",
          modelAnswer: "TACT (The Air Cargo Tariff)",
          keywords: ["tact", "air cargo tariff"],
          explanation: "TACT (The Air Cargo Tariff) is IATA's official tariff publication covering rates, rules, and regulations for international air cargo transport."
        },
        {
          id: "w4-q14",
          type: "short",
          category: "Customs Classification",
          question: "Which Harmonized System (HS) chapter number covers 'Vehicles other than railway or tramway rolling stock', including automobiles, trucks, and motorcycles?",
          modelAnswer: "Chapter 87",
          keywords: ["87", "chapter 87"],
          explanation: "HS Chapter 87 encompasses all motor vehicles (cars, trucks, buses, motorcycles) and their parts, excluding railway rolling stock (Chapter 86)."
        },
        {
          id: "w4-q15",
          type: "short",
          category: "Supply Chain Management",
          question: "What collaborative inventory replenishment arrangement allows the supplier to monitor and replenish the buyer's stock levels automatically based on real-time consumption data?",
          modelAnswer: "VMI (Vendor Managed Inventory)",
          keywords: ["vmi", "vendor managed inventory", "vendor-managed inventory"],
          explanation: "VMI (Vendor Managed Inventory) shifts replenishment responsibility to the supplier, reducing stockouts and improving supply chain efficiency."
        },
        {
          id: "w4-q16",
          type: "short",
          category: "Maritime Safety",
          question: "What marking painted on a ship's hull indicates the maximum safe loading draft limit permitted under various water density and seasonal ocean conditions?",
          modelAnswer: "Plimsoll Line (Load Line)",
          keywords: ["plimsoll", "load line"],
          explanation: "The Plimsoll Line (or Load Line), mandated by the International Load Line Convention, prevents vessel overloading by marking maximum draft limits for different water conditions."
        },
        {
          id: "w4-q17",
          type: "short",
          category: "Warehouse Technology",
          question: "What software system manages and optimizes warehouse operations including receiving, put-away, inventory tracking, order picking, packing, and shipping?",
          modelAnswer: "WMS (Warehouse Management System)",
          keywords: ["wms", "warehouse management system"],
          explanation: "WMS (Warehouse Management System) software provides real-time visibility into inventory levels, optimizes storage locations, and directs warehouse workflows."
        },
        {
          id: "w4-q18",
          type: "short",
          category: "Trade Lanes & Maritime Chokepoints",
          question: "What narrow maritime chokepoint between Iran and Oman carries approximately 20-25% of the world's daily oil supply via tanker traffic?",
          modelAnswer: "Strait of Hormuz",
          keywords: ["hormuz"],
          explanation: "The Strait of Hormuz connects the Persian Gulf to the Gulf of Oman and is the world's most critical oil transit chokepoint."
        },
        {
          id: "w4-q19",
          type: "short",
          category: "Freight Charges",
          question: "What port-related charge covers the cost of handling containers at the marine terminal, including loading and unloading between the vessel and the container yard?",
          modelAnswer: "THC (Terminal Handling Charge)",
          keywords: ["thc", "terminal handling"],
          explanation: "THC (Terminal Handling Charge) is levied at both origin and destination ports to cover container handling costs at terminal facilities."
        },
        {
          id: "w4-q20",
          type: "short",
          category: "Phytosanitary Compliance",
          question: "What international phytosanitary standard requires all solid wood packaging materials (pallets, crates, dunnage) used in international trade to be heat-treated or fumigated to prevent pest spread?",
          modelAnswer: "ISPM 15",
          keywords: ["ispm 15", "ispm15", "ispm"],
          explanation: "ISPM 15 (International Standards for Phytosanitary Measures No. 15) mandates treatment and marking of wood packaging to prevent cross-border transmission of invasive insects and plant diseases."
        }
      ]
    }
  ]
};


if (typeof window !== 'undefined') {
  window.NEXUS_QUIZ_DATABASE = NEXUS_QUIZ_DATABASE;
}
