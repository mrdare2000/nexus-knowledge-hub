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
          question: "What mandatory Inland Revenue registration number must Sri Lankan traders declare on customs entry declarations (CUSDEC)?",
          modelAnswer: "TIN (Tax Identification Number)",
          keywords: ["tin", "tax identification number"],
          explanation: "TIN (Tax Identification Number) issued by IRD is mandatory for Sri Lanka Customs CUSDEC processing."
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
          keywords: ["revenue ton", "revenue tons", "revenue tonne", "revenue tonnes", "rev ton", "w/m", "w m", "wm", "rt", "r.t.", "r/t", "weight or measure", "weight or measurement"],
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
          keywords: ["ams", "automated manifest system", "automated manifest"],
          explanation: "AMS (Automated Manifest System) is the US CBP electronic system for advance cargo information filing, working alongside ISF 10+2 for import security."
        },
        {
          id: "w4-q12",
          type: "short",
          category: "Ocean Freight Operations",
          question: "What ocean freight logistics term describes transferring cargo containers from one vessel to another at an intermediate hub port before reaching the final destination?",
          modelAnswer: "Transshipment",
          keywords: ["transshipment", "transhipment", "trans-shipment", "trans shipment", "transshipping"],
          explanation: "Transshipment allows carriers to consolidate cargo volumes through major hub ports (e.g., Singapore, Colombo, Dubai) for onward connection to smaller feeder ports."
        },
        {
          id: "w4-q13",
          type: "short",
          category: "Air Cargo Standards",
          question: "What IATA reference publication provides standardized worldwide air cargo rate tariffs, rules, and routing regulations used by airlines and freight forwarders?",
          modelAnswer: "TACT (The Air Cargo Tariff)",
          keywords: ["tact", "air cargo tariff", "the air cargo tariff"],
          explanation: "TACT (The Air Cargo Tariff) is IATA's official tariff publication covering rates, rules, and regulations for international air cargo transport."
        },
        {
          id: "w4-q14",
          type: "short",
          category: "Customs Classification",
          question: "Which Harmonized System (HS) chapter number covers 'Vehicles other than railway or tramway rolling stock', including automobiles, trucks, and motorcycles?",
          modelAnswer: "Chapter 87",
          keywords: ["87", "chapter 87", "ch 87", "chap 87", "hs 87", "hs chapter 87"],
          explanation: "HS Chapter 87 encompasses all motor vehicles (cars, trucks, buses, motorcycles) and their parts, excluding railway rolling stock (Chapter 86)."
        },
        {
          id: "w4-q15",
          type: "short",
          category: "Supply Chain Management",
          question: "What collaborative inventory replenishment arrangement allows the supplier to monitor and replenish the buyer's stock levels automatically based on real-time consumption data?",
          modelAnswer: "VMI (Vendor Managed Inventory)",
          keywords: ["vmi", "vendor managed inventory", "vendor management inventory", "vendor-managed inventory", "vendor-management inventory", "vendor managed", "vendor management"],
          explanation: "VMI (Vendor Managed Inventory) shifts replenishment responsibility to the supplier, reducing stockouts and improving supply chain efficiency."
        },
        {
          id: "w4-q16",
          type: "short",
          category: "Maritime Safety",
          question: "What marking painted on a ship's hull indicates the maximum safe loading draft limit permitted under various water density and seasonal ocean conditions?",
          modelAnswer: "Plimsoll Line (Load Line)",
          keywords: ["plimsoll", "load line", "plimsoll line", "plimsoll mark", "loadline"],
          explanation: "The Plimsoll Line (or Load Line), mandated by the International Load Line Convention, prevents vessel overloading by marking maximum draft limits for different water conditions."
        },
        {
          id: "w4-q17",
          type: "short",
          category: "Warehouse Technology",
          question: "What software system manages and optimizes warehouse operations including receiving, put-away, inventory tracking, order picking, packing, and shipping?",
          modelAnswer: "WMS (Warehouse Management System)",
          keywords: ["wms", "warehouse management system", "warehouse managing system", "warehouse management"],
          explanation: "WMS (Warehouse Management System) software provides real-time visibility into inventory levels, optimizes storage locations, and directs warehouse workflows."
        },
        {
          id: "w4-q18",
          type: "short",
          category: "Trade Lanes & Maritime Chokepoints",
          question: "What narrow maritime chokepoint between Iran and Oman carries approximately 20-25% of the world's daily oil supply via tanker traffic?",
          modelAnswer: "Strait of Hormuz",
          keywords: ["hormuz", "strait of hormuz", "hormuz strait"],
          explanation: "The Strait of Hormuz connects the Persian Gulf to the Gulf of Oman and is the world's most critical oil transit chokepoint."
        },
        {
          id: "w4-q19",
          type: "short",
          category: "Freight Charges",
          question: "What port-related charge covers the cost of handling containers at the marine terminal, including loading and unloading between the vessel and the container yard?",
          modelAnswer: "THC (Terminal Handling Charge)",
          keywords: ["thc", "terminal handling charge", "terminal handling charges", "terminal handling fee", "terminal handling"],
          explanation: "THC (Terminal Handling Charge) is levied at both origin and destination ports to cover container handling costs at terminal facilities."
        },
        {
          id: "w4-q20",
          type: "short",
          category: "Phytosanitary Compliance",
          question: "What international phytosanitary standard requires all solid wood packaging materials (pallets, crates, dunnage) used in international trade to be heat-treated or fumigated to prevent pest spread?",
          modelAnswer: "ISPM 15",
          keywords: ["ispm 15", "ispm15", "ispm-15", "ispm"],
          explanation: "ISPM 15 (International Standards for Phytosanitary Measures No. 15) mandates treatment and marking of wood packaging to prevent cross-border transmission of invasive insects and plant diseases."
        }
      ]
    },
    {
      id: "week-5",
      title: "Weekly Quiz 05 — Special Edition 01: Crossword Puzzle 🧩",
      description: "Logistics Word Crossword Puzzle • 10 Words • 5 Across + 5 Down Clues • 100 Marks",
      quizType: "crossword",
      totalMarks: 100,
      crosswordData: {
        gridRows: 22,
        gridCols: 15,
        words: [
          { id: "A1", number: 1, direction: "across", word: "INCOTERMS", clue: "Standardized 3-letter international trade rules published by ICC defining buyer/seller obligations.", hint: "Examples include FOB, CIF, EXW, DDP.", row: 1, col: 1 },
          { id: "A2", number: 3, direction: "across", word: "FREIGHT", clue: "Goods or cargo transported by ship, aircraft, train, or truck for commercial trade.", hint: "Also refers to the payment rate for cargo transport.", row: 4, col: 5 },
          { id: "A3", number: 5, direction: "across", word: "PALLET", clue: "Flat wooden or plastic portable platform used to stack, consolidate, and handle unitized cargo.", hint: "Standard sizes include EUR-pallet and ISO pallet.", row: 8, col: 1 },
          { id: "A4", number: 7, direction: "across", word: "BARGE", clue: "Flat-bottomed vessel used primarily on rivers and inland canals to carry heavy bulk cargo.", hint: "Usually towed or pushed by tugboats.", row: 12, col: 3 },
          { id: "A5", number: 9, direction: "across", word: "REROUTE", clue: "To alter the planned pathway or destination of a shipment while in transit.", hint: "Done when unexpected delays or port congestion occur.", row: 15, col: 7 },

          { id: "D1", number: 2, direction: "down", word: "CUSTOMS", clue: "Government authority responsible for collecting tariffs and controlling the flow of goods across borders.", hint: "Conducts inspections and enforces import duties.", row: 1, col: 3 },
          { id: "D2", number: 4, direction: "down", word: "REEFER", clue: "Refrigerated container equipped with active cooling unit for temperature-sensitive cargo.", hint: "Used for fruits, pharmaceuticals, and meat.", row: 3, col: 7 },
          { id: "D3", number: 6, direction: "down", word: "EXPORT", clue: "To send goods or commercial products to another country for international sale or trade.", hint: "Opposite of import.", row: 8, col: 5 },
          { id: "D4", number: 8, direction: "down", word: "DEMURRAGE", clue: "Penalty fee charged when a container is held inside the port terminal past allowed free time.", hint: "Charged per day by ocean carriers inside port yard.", row: 11, col: 7 },
          { id: "D5", number: 10, direction: "down", word: "EMBARGO", clue: "Official government ban on trade or commercial activity with a specific country.", hint: "Strict economic sanction on cross-border trade.", row: 15, col: 13 }
        ]
      }
    },
    {
      id: "week-6",
      title: "Weekly Quiz 06",
      description: "20 Questions • 20 Multiple Choice Questions (MCQs)",
      questions: [
        {
          id: "w6-q1",
          type: "mcq",
          category: "Incoterms® Rules",
          question: "Under Incoterms® 2020 DPU (Delivered at Place Unloaded), who is responsible for unloading the goods from the arriving transport at the named place of destination?",
          options: [
            "The Buyer",
            "The Seller",
            "The Ocean Carrier",
            "The Customs Broker"
          ],
          answerIndex: 1,
          explanation: "DPU is the only Incoterm rule that explicitly requires the seller to unload cargo from the arriving transport vehicle at destination."
        },
        {
          id: "w6-q2",
          type: "mcq",
          category: "Container Shipping & Port Operations",
          question: "What does TEU stand for in global container shipping metrics?",
          options: [
            "Tonnage Equivalent Unit",
            "Twenty-foot Equivalent Unit",
            "Terminal Export Unit",
            "Total Effective Usage"
          ],
          answerIndex: 1,
          explanation: "TEU (Twenty-foot Equivalent Unit) is the standard capacity unit based on a standard 20-foot shipping container."
        },
        {
          id: "w6-q3",
          type: "mcq",
          category: "Air Freight & IATA Regulations",
          question: "Which IATA manual specifies worldwide rules and packaging standards for shipping Dangerous Goods (HAZMAT) by air?",
          options: [
            "IATA TACSS",
            "IATA DGR (Dangerous Goods Regulations)",
            "ICAO Annex 17",
            "FIATA Model Rules"
          ],
          answerIndex: 1,
          explanation: "The IATA Dangerous Goods Regulations (DGR) is the official industry manual for preparing, packaging, labeling, and shipping hazmat by air."
        },
        {
          id: "w6-q4",
          type: "mcq",
          category: "Customs Compliance & Trade",
          question: "What type of customs bond is required for importers who regularly clear shipments throughout a 12-month period?",
          options: [
            "Single Entry Bond (SEB)",
            "Continuous Import Bond",
            "Customs Carnet Bond",
            "Warehouse Entry Bond"
          ],
          answerIndex: 1,
          explanation: "A Continuous Import Bond covers all import entries through any port of entry during an ongoing 1-year period."
        },
        {
          id: "w6-q5",
          type: "mcq",
          category: "Warehouse Management Systems",
          question: "In warehouse inventory management, what does the LIFO inventory valuation strategy stand for?",
          options: [
            "Logistics In, Freight Out",
            "Last In, First Out",
            "Linear Inventory Fixed Output",
            "Level Inflow, Fast Outflow"
          ],
          answerIndex: 1,
          explanation: "LIFO (Last-In, First-Out) assumes the newest inventory received is processed or sold first."
        },
        {
          id: "w6-q6",
          type: "mcq",
          category: "Ocean Routes & Maritime Chokepoints",
          question: "Which strategic maritime chokepoint connects the Red Sea to the Gulf of Aden and the Indian Ocean?",
          options: [
            "Strait of Malacca",
            "Bab el-Mandeb Strait",
            "Strait of Gibraltar",
            "Sunda Strait"
          ],
          answerIndex: 1,
          explanation: "The Bab el-Mandeb Strait lies between Yemen and the Horn of Africa, serving as the southern gateway to the Red Sea and Suez Canal."
        },
        {
          id: "w6-q7",
          type: "mcq",
          category: "Ocean Freight Rate Surcharges",
          question: "What does the surcharge acronym GRI stand for in ocean freight pricing negotiations?",
          options: [
            "General Rate Increase",
            "Gross Revenue Index",
            "Global Re-route Indemnity",
            "Guaranteed Risk Insurance"
          ],
          answerIndex: 0,
          explanation: "GRI (General Rate Increase) is an adjustment applied by ocean shipping lines to raise base freight rates across specific trade routes."
        },
        {
          id: "w6-q8",
          type: "mcq",
          category: "Supply Chain KPIs & Performance",
          question: "What supply chain KPI measures orders delivered complete, undamaged, on time, and with accurate invoicing?",
          options: [
            "OTIF (On-Time In-Full)",
            "Perfect Order Rate (POR)",
            "Cash-to-Cash Cycle Time",
            "Inventory Turnover Ratio"
          ],
          answerIndex: 1,
          explanation: "Perfect Order Rate evaluates the percentage of orders meeting all 4 fulfillment criteria: complete, on time, damage-free, and correctly documented."
        },
        {
          id: "w6-q9",
          type: "mcq",
          category: "Maritime Documentation",
          question: "What defines a 'Clean Bill of Lading' in ocean transportation?",
          options: [
            "A B/L printed on recycled green paper",
            "A B/L issued with no clause or notation indicating damaged cargo or defective packaging",
            "A B/L issued directly by customs without freight charges",
            "A B/L that covers non-hazardous materials only"
          ],
          answerIndex: 1,
          explanation: "A Clean Bill of Lading confirms that cargo was received on board in apparent good order and condition without noted defects."
        },
        {
          id: "w6-q10",
          type: "mcq",
          category: "Intermodal & Multimodal Transport",
          question: "What is the primary distinction between Intermodal Transport and Multimodal Transport?",
          options: [
            "Intermodal uses aircraft only; Multimodal uses ocean ships only",
            "Intermodal uses separate contracts per carrier leg; Multimodal operates under a single contract with one MTO",
            "Intermodal does not use standard containers; Multimodal requires containers",
            "There is no operational difference between the two terms"
          ],
          answerIndex: 1,
          explanation: "Intermodal transport involves multiple contracts for each transport leg, whereas Multimodal transport uses one single contract under one Multimodal Transport Operator (MTO)."
        },
        {
          id: "w6-q11",
          type: "mcq",
          category: "Temperature-Controlled Logistics",
          question: "What is the standard deep-freeze temperature range maintained inside specialized reefer containers for frozen cargo?",
          options: [
            "0°C to +4°C",
            "-20°C to -25°C",
            "-50°C to -80°C",
            "+10°C to +15°C"
          ],
          answerIndex: 1,
          explanation: "Standard deep-freeze reefer containers operate between -20°C and -25°C to preserve frozen foods and biological pharmaceuticals."
        },
        {
          id: "w6-q12",
          type: "mcq",
          category: "Contract Logistics",
          question: "What does the acronym VMI stand for in buyer-supplier supply chain relationships?",
          options: [
            "Variable Material Inspection",
            "Vendor Managed Inventory",
            "Volume Measured Import",
            "Verified Maritime Insurance"
          ],
          answerIndex: 1,
          explanation: "Vendor Managed Inventory (VMI) is a practice where the supplier monitors inventory levels and manages replenishment at the buyer's facility."
        },
        {
          id: "w6-q13",
          type: "mcq",
          category: "Air Cargo Load Planning",
          question: "What does ULD stand for in air cargo handling and aircraft loading?",
          options: [
            "Universal Loading Dock",
            "Unit Load Device",
            "Under-deck Logistics Unit",
            "Upper Level Distribution"
          ],
          answerIndex: 1,
          explanation: "Unit Load Devices (ULDs) are specialized air cargo pallets and contoured containers used to load freight into aircraft holds."
        },
        {
          id: "w6-q14",
          type: "mcq",
          category: "Terminal Operations & Fees",
          question: "What is the distinction between container 'Demurrage' and 'Detention' fees?",
          options: [
            "Demurrage is for air cargo; Detention is for sea freight",
            "Demurrage applies inside the port terminal; Detention applies outside the port terminal past allowed free time",
            "Demurrage is paid to customs; Detention is paid to truck drivers",
            "Demurrage is for damaged goods; Detention is for lost containers"
          ],
          answerIndex: 1,
          explanation: "Demurrage is incurred when an uncollected container stays inside the port past free days. Detention applies when an empty container is retained outside the port past free return days."
        },
        {
          id: "w6-q15",
          type: "mcq",
          category: "Cargo Protection & Dunnage",
          question: "What is the main operational purpose of using inflatable air dunnage bags inside shipping containers?",
          options: [
            "To lower ambient internal temperature during transit",
            "To fill void spaces and prevent cargo shifting during ocean or rail movement",
            "To absorb moisture and humidity",
            "To increase container weight for customs compliance"
          ],
          answerIndex: 1,
          explanation: "Inflatable air dunnage bags fill void gaps between cargo pallets to brace the load against shifting and impact damage in transit."
        },
        {
          id: "w6-q16",
          type: "mcq",
          category: "Incoterms® Rules",
          question: "Under the FOB (Free On Board) Incoterm 2020, at what exact point does legal risk of loss transfer to the buyer?",
          options: [
            "When cargo leaves the seller's warehouse",
            "When cargo is loaded on board the vessel nominated by the buyer at the named port of loading",
            "When cargo arrives at the destination discharge port",
            "When the ocean carrier issues the final bill of lading"
          ],
          answerIndex: 1,
          explanation: "Under FOB terms, risk transfers to the buyer as soon as the goods are placed safely on board the ocean vessel at the loading port."
        },
        {
          id: "w6-q17",
          type: "mcq",
          category: "International Trade Policy",
          question: "What is the purpose of 'Rules of Origin' under Free Trade Agreements (FTAs)?",
          options: [
            "To dictate which language is printed on outer export cartons",
            "To establish product origin criteria required to qualify for preferential duty rates",
            "To enforce that all exports are produced by state-owned enterprises",
            "To mandate that cargo must ship under DDP Incoterms"
          ],
          answerIndex: 1,
          explanation: "Rules of Origin establish the specific production or value-add criteria required for goods to qualify for reduced or zero tariff rates under FTAs."
        },
        {
          id: "w6-q18",
          type: "mcq",
          category: "Ocean Carrier Fleets",
          question: "What type of vessel features built-in internal ramps allowing vehicles and wheeled cargo to drive on and off unassisted?",
          options: [
            "Capesize Bulk Carrier",
            "Ro-Ro (Roll-on/Roll-off) Ship",
            "VLCC Crude Tanker",
            "Gearless Container Vessel"
          ],
          answerIndex: 1,
          explanation: "Ro-Ro (Roll-on/Roll-off) vessels are equipped with internal ramps designed for drive-on/drive-off transport of cars, trucks, and trailer cargo."
        },
        {
          id: "w6-q19",
          type: "mcq",
          category: "Last-Mile & Order Fulfillment",
          question: "In logistics warehouse operations, what does 'Cross-Docking' mean?",
          options: [
            "Storing goods in long-term warehouse racks over 6 months",
            "Directly transferring incoming freight from inbound trucks to outbound vehicles with minimal or zero storage time",
            "Inspecting hazardous cargo on a marine pier",
            "Returning rejected goods back to overseas suppliers"
          ],
          answerIndex: 1,
          explanation: "Cross-docking is a lean distribution strategy where inbound freight is unloaded and directly reloaded onto outbound vehicles without storage."
        },
        {
          id: "w6-q20",
          type: "mcq",
          category: "Supply Chain Visibility",
          question: "What technology uses radio frequency signals to automatically identify and track tagged pallets without direct line-of-sight scanning?",
          options: [
            "2D Barcode DataMatrix",
            "RFID (Radio Frequency Identification)",
            "Optical Character Recognition (OCR)",
            "GPS Telematics"
          ],
          answerIndex: 1,
          explanation: "RFID (Radio Frequency Identification) enables automatic wireless scanning and data capture from cargo tags through radio signals."
        }
      ]
    },
    {
      id: "week-7",
      title: "Weekly Quiz 07",
      description: "20 Questions • 20 Multiple Choice Questions (MCQs)",
      questions: [
        {
          id: "w7-q1",
          type: "mcq",
          category: "Air Freight Operations",
          question: "What is the maximum structural gross payload weight allowed for a standard 96\" x 125\" PMC air cargo pallet (P6P) in main-deck freighter operations?",
          options: [
            "~1,500 kg",
            "~3,175 kg",
            "~11,300 kg",
            "~6,800 kg"
          ],
          answerIndex: 3,
          explanation: "A standard PMC main-deck air cargo pallet (96\" x 125\") has a maximum structural gross weight limit of approximately 6,800 kg (15,000 lbs)."
        },
        {
          id: "w7-q2",
          type: "mcq",
          category: "Maritime Law & Liability",
          question: "Under Hague-Visby Rules, what is the legal liability limit per package for sea carriers in international ocean freight claims?",
          options: [
            "666.67 SDR",
            "100 SDR",
            "1,000 SDR",
            "2,000 SDR"
          ],
          answerIndex: 0,
          explanation: "Under Hague-Visby Rules, ocean carrier liability is limited to 666.67 SDR (Special Drawing Rights) per package or 2 SDR per kg, whichever is higher."
        },
        {
          id: "w7-q3",
          type: "mcq",
          category: "Incoterms® Rules",
          question: "Under Incoterms® 2020 CPT (Carriage Paid To), at what exact physical point does legal risk of loss transfer from seller to buyer?",
          options: [
            "Upon arrival at the destination port",
            "When import customs clearance is completed",
            "When goods are handed over to the first carrier nominated by the seller",
            "When cargo is unloaded at the buyer's warehouse"
          ],
          answerIndex: 2,
          explanation: "Under CPT, risk transfers when goods are delivered to the first carrier at origin, even though the seller pays transport costs to destination."
        },
        {
          id: "w7-q4",
          type: "mcq",
          category: "Ocean Freight & Chartering",
          question: "What does the maritime term 'Laytime' refer to in charter party agreements?",
          options: [
            "The voyage duration between loading and discharge ports",
            "The contractually agreed period allowed for loading and unloading cargo at berth without incurring penalties",
            "The period a vessel undergoes drydock repairs",
            "The storage period inside port warehouses"
          ],
          answerIndex: 1,
          explanation: "Laytime is the agreed time allowed to charterers for cargo operations. Exceeding laytime incurs demurrage charges."
        },
        {
          id: "w7-q5",
          type: "mcq",
          category: "Customs & Regulatory Compliance",
          question: "What is an AEO (Authorized Economic Operator) certification under the WCO SAFE Framework?",
          options: [
            "A license required to operate reefer trucks",
            "A mandatory insurance policy for high-value air cargo",
            "An international maritime safety passport for vessel captains",
            "A customs-accredited status granting simplified procedures, fast-track clearance, and reduced inspection rates"
          ],
          answerIndex: 3,
          explanation: "AEO is an accredited customs security partnership granting compliant traders simplified customs procedures and fast-track clearance."
        },
        {
          id: "w7-q6",
          type: "mcq",
          category: "Cold Chain Logistics",
          question: "What is the primary function of a Cold Chain Data Logger inside pharmaceutical or perishables containers?",
          options: [
            "To continuously monitor and record ambient temperature and humidity throughout transit",
            "To automatically adjust truck engine speed",
            "To calculate ocean freight charges automatically",
            "To prevent physical theft of cargo boxes"
          ],
          answerIndex: 0,
          explanation: "Data loggers record real-time temperature/humidity data to verify that temperature-sensitive cargo remained within required thermal limits."
        },
        {
          id: "w7-q7",
          type: "mcq",
          category: "Container Terminal Operations",
          question: "Which heavy terminal equipment straddles container rows to stack containers up to 4-5 high in port yards?",
          options: [
            "Reach Stacker",
            "Heavy Forklift",
            "Rubber-Tyred Gantry (RTG) Crane / Straddle Carrier",
            "Side Loader Truck"
          ],
          answerIndex: 2,
          explanation: "RTG cranes and Straddle Carriers operate across container yards to stack, retrieve, and load containers onto chassis trucks."
        },
        {
          id: "w7-q8",
          type: "mcq",
          category: "Air Cargo Regulations",
          question: "According to IATA DGR, what mandatory document must accompany all hazardous air shipments prepared by a certified shipper?",
          options: [
            "Bill of Lading",
            "Shipper's Declaration for Dangerous Goods (DGD)",
            "Commercial Invoice",
            "Delivery Order"
          ],
          answerIndex: 1,
          explanation: "A Shipper's Declaration for Dangerous Goods (DGD) is legally required for all dangerous goods transported by commercial aircraft."
        },
        {
          id: "w7-q9",
          type: "mcq",
          category: "Supply Chain Dynamics",
          question: "How is the 'Bullwhip Effect' defined in supply chain inventory management?",
          options: [
            "Physical damage caused to cargo by rough ocean waves",
            "Sudden sharp increases in jet fuel surcharges",
            "Port congestion caused by dockworker strikes",
            "Amplification of demand variability as order signals travel upstream from consumer to manufacturer"
          ],
          answerIndex: 3,
          explanation: "The Bullwhip Effect occurs when minor fluctuations in retail demand cause increasing swings in wholesale order volumes up the supply chain."
        },
        {
          id: "w7-q10",
          type: "mcq",
          category: "Freight Forwarding & LCL",
          question: "In LCL (Less than Container Load) shipping, what document is issued by the freight forwarder to the individual shipper?",
          options: [
            "House Bill of Lading (HBL)",
            "Master Bill of Lading (MBL)",
            "Sea Waybill",
            "Customs Manifest"
          ],
          answerIndex: 0,
          explanation: "Freight forwarders issue a House Bill of Lading (HBL) to individual cargo owners while receiving one Master Bill of Lading (MBL) from the ocean carrier."
        },
        {
          id: "w7-q11",
          type: "mcq",
          category: "Maritime Geography & Strategic Routes",
          question: "Which strategic maritime choke point connects the Persian Gulf to the Gulf of Oman, handling over 20% of global oil shipments?",
          options: [
            "Strait of Malacca",
            "Bab-el-Mandeb Strait",
            "Strait of Hormuz",
            "Bosporus Strait"
          ],
          answerIndex: 2,
          explanation: "The Strait of Hormuz is a critical narrow maritime passage for global oil tankers traveling from Persian Gulf producers to world markets."
        },
        {
          id: "w7-q12",
          type: "mcq",
          category: "Warehousing & Inventory Control",
          question: "Which inventory management policy dispatches the oldest received stock units before newer arrivals?",
          options: [
            "LIFO (Last-In, First-Out)",
            "FIFO (First-In, First-Out)",
            "FEFO (First-Expired, First-Out)",
            "Weighted Average Cost"
          ],
          answerIndex: 1,
          explanation: "FIFO (First-In, First-Out) ensures oldest inventory is dispatched first to minimize inventory degradation and obsolescence."
        },
        {
          id: "w7-q13",
          type: "mcq",
          category: "Special Cargo & Oversized Freight",
          question: "What container type is designed with collapsible end-frames to transport heavy out-of-gauge (OOG) machinery?",
          options: [
            "40ft Standard Dry Van",
            "Insulated Reefer Container",
            "Flexitank Container",
            "Flat Rack Container"
          ],
          answerIndex: 3,
          explanation: "Flat Rack containers have open sides and collapsible ends to accommodate oversized, heavy machinery exceeding standard container dimensions."
        },
        {
          id: "w7-q14",
          type: "mcq",
          category: "Marine Cargo Insurance",
          question: "Under Institute Cargo Clauses (ICC), which coverage tier offers the widest 'All Risks' coverage for ocean transit?",
          options: [
            "Institute Cargo Clauses (A)",
            "Institute Cargo Clauses (B)",
            "Institute Cargo Clauses (C)",
            "Free of Particular Average (FPA)"
          ],
          answerIndex: 0,
          explanation: "Institute Cargo Clauses (A) provides the broadest 'All Risks' protection subject only to explicitly listed exclusions."
        },
        {
          id: "w7-q15",
          type: "mcq",
          category: "Multimodal Rail Transportation",
          question: "What does TOFC ('Piggyback') service stand for in intermodal rail logistics?",
          options: [
            "Transport On Freight Craft",
            "Trucking Over Freight Corridors",
            "Trailer-on-Flatcar",
            "Tonnage On Fast Carrier"
          ],
          answerIndex: 2,
          explanation: "TOFC (Trailer-on-Flatcar), commonly called Piggyback, involves transporting highway semi-trailers on long-distance railway flatcars."
        },
        {
          id: "w7-q16",
          type: "mcq",
          category: "Customs Documentation",
          question: "What is an ATA Carnet in international trade logistics?",
          options: [
            "A vessel speed certificate",
            "A 'Passport for Goods' enabling duty-free temporary import of commercial samples and exhibition equipment",
            "A hazardous waste disposal permit",
            "A foreign exchange control receipt"
          ],
          answerIndex: 1,
          explanation: "An ATA Carnet acts as a passport for goods, allowing temporary duty-free import of commercial samples and equipment into participating countries."
        },
        {
          id: "w7-q17",
          type: "mcq",
          category: "Ocean Vessel Chartering",
          question: "Under a Time Charter agreement, who pays for operational expenses such as bunker fuel, port charges, and canal dues?",
          options: [
            "The Shipowner",
            "The Port Authority",
            "The Marine Insurance Underwriter",
            "The Charterer"
          ],
          answerIndex: 3,
          explanation: "Under a Time Charter, the shipowner supplies vessel and crew, while the charterer pays variable voyage costs including fuel (bunkers) and port fees."
        },
        {
          id: "w7-q18",
          type: "mcq",
          category: "E-Commerce Fulfillment",
          question: "What defines 'Micro-Fulfillment' in modern urban logistics networks?",
          options: [
            "Operating small, automated urban storage hubs located close to consumers for rapid 1-2 hour delivery",
            "Constructing mega-warehouses near seaport gates",
            "Shipping small parcels exclusively via ocean freight",
            "Manual sorting of postal mail"
          ],
          answerIndex: 0,
          explanation: "Micro-fulfillment centers (MFCs) leverage small urban facilities and automated picking systems to fulfill local e-commerce orders rapidly."
        },
        {
          id: "w7-q19",
          type: "mcq",
          category: "Reverse Logistics",
          question: "What process manages the movement of products from end-users back to sellers for return, repair, or recycling?",
          options: [
            "Inbound Logistics",
            "Outbound Distribution",
            "Reverse Logistics",
            "Cross-Docking"
          ],
          answerIndex: 2,
          explanation: "Reverse Logistics encompasses all operations related to the return, reuse, recycling, or disposal of products after consumer sale."
        },
        {
          id: "w7-q20",
          type: "mcq",
          category: "Green & Sustainable Logistics",
          question: "What global IMO environmental regulation went into effect on Jan 1, 2020, limiting marine fuel sulfur content to 0.50%?",
          options: [
            "SOLAS Container Weight Verification",
            "IMO 2020 Low Sulfur Mandate",
            "MARPOL Annex II Chemical Code",
            "Kyoto Protocol Logistics Annex"
          ],
          answerIndex: 1,
          explanation: "IMO 2020 enforced a global 0.50% mass-by-mass sulfur limit on marine fuel oil to reduce sulfur oxide emissions from ocean shipping."
        }
      ]
    },
    {
      id: "week-8",
      title: "Weekly Quiz 08",
      description: "20 Questions • 20 Multiple Choice Questions (MCQs)",
      questions: [
        {
          id: "w8-q1",
          type: "mcq",
          category: "Customs Clearance & Valuation",
          question: "What is the primary method of customs valuation prescribed by the WTO Customs Valuation Agreement for calculating import duties?",
          options: [
            "Computed Value Method",
            "Deductive Value Method",
            "Fallback / Reasonable Means Method",
            "Transaction Value of the Imported Goods"
          ],
          answerIndex: 3,
          explanation: "The WTO Customs Valuation Agreement establishes the 'Transaction Value' (the price actually paid or payable for the goods) as the primary basis for customs valuation."
        },
        {
          id: "w8-q2",
          type: "mcq",
          category: "Ocean Freight & Maritime Law",
          question: "Which maritime regulations reserve domestic coastal maritime shipping trade exclusively to national-flagged, locally built, and domestically crewed vessels?",
          options: [
            "Cabotage Laws (such as the US Jones Act)",
            "General Average Doctrine",
            "UNCTAD Liner Code",
            "Flag of Convenience Exemption"
          ],
          answerIndex: 0,
          explanation: "Cabotage laws (e.g. the US Merchant Marine Act of 1920 / Jones Act) govern coastal maritime shipping within a nation's territory, restricting foreign-flagged vessel operations."
        },
        {
          id: "w8-q3",
          type: "mcq",
          category: "Air Freight Rating",
          question: "In air cargo chartering and ULD rating, what is the 'Pivot Weight'?",
          options: [
            "The empty tare weight of an aircraft pallet",
            "The maximum structural payload limit of the aircraft belly cargo door",
            "The baseline minimum billable weight assigned to a ULD, above which additional over-pivot per-kilo rates apply",
            "The dimensional weight ratio of hazardous cargo"
          ],
          answerIndex: 2,
          explanation: "Pivot Weight is the agreed flat-rate threshold weight for a ULD; any weight exceeding this threshold is charged at an additional over-pivot rate per kg."
        },
        {
          id: "w8-q4",
          type: "mcq",
          category: "Incoterms® 2020 Rules",
          question: "Under Incoterms® 2020 DAP (Delivered at Place), who is responsible for customs import clearance and paying import tariffs or taxes at destination?",
          options: [
            "The Seller",
            "The Buyer",
            "The Ocean Shipping Carrier",
            "Divided equally 50/50 between Buyer and Seller"
          ],
          answerIndex: 1,
          explanation: "Under DAP terms, the seller delivers goods ready for unloading at destination, while the buyer is responsible for import customs clearance, duties, and local taxes."
        },
        {
          id: "w8-q5",
          type: "mcq",
          category: "Dangerous Goods & Hazmat",
          question: "Under the IMDG Code and UN Hazard Classification, which DG Class covers Flammable Solids, Self-Reactive Substances, and Solid Desensitized Explosives?",
          options: [
            "Class 2",
            "Class 3",
            "Class 5",
            "Class 4"
          ],
          answerIndex: 3,
          explanation: "UN Class 4 covers Flammable Solids (4.1), Substances Liable to Spontaneous Combustion (4.2), and Substances emitting flammable gases when in contact with water (4.3)."
        },
        {
          id: "w8-q6",
          type: "mcq",
          category: "Inventory & Warehouse Strategy",
          question: "In warehouse inventory management, what characterizes 'Class A' inventory items under an ABC Inventory Analysis (Pareto 80/20 Rule)?",
          options: [
            "The small percentage (~15-20%) of inventory items accounting for ~70-80% of total annual consumption value",
            "High-volume, low-value items requiring minimal security",
            "Damaged goods pending supplier return",
            "Seasonal promotional items shipped exclusively via air freight"
          ],
          answerIndex: 0,
          explanation: "Class A items represent top-tier, high-value inventory requiring tight control and frequent stock monitoring despite comprising a small fraction of total SKU count."
        },
        {
          id: "w8-q7",
          type: "mcq",
          category: "Trade Finance & Banking",
          question: "Which standardized international rules published by the ICC govern the issuance and operation of Letters of Credit (L/C) in international trade?",
          options: [
            "Incoterms® 2020",
            "SOLAS Chapter VI",
            "UCP 600 (Uniform Customs and Practice for Documentary Credits)",
            "FIATA Model Rules"
          ],
          answerIndex: 2,
          explanation: "UCP 600 (ICC Publication No. 600) provides globally recognized rules governing commercial Letters of Credit used by banks and traders worldwide."
        },
        {
          id: "w8-q8",
          type: "mcq",
          category: "Maritime Trade Corridors",
          question: "Which narrow natural maritime passage connects the Black Sea to the Sea of Marmara, serving as a critical export route for regional grain and energy cargoes?",
          options: [
            "Kiel Canal",
            "Bosporus Strait",
            "Strait of Gibraltar",
            "Strait of Hormuz"
          ],
          answerIndex: 1,
          explanation: "The Bosporus Strait in Turkey connects the Black Sea to the Sea of Marmara and Aegean, forming a key maritime bottleneck for Black Sea international trade."
        },
        {
          id: "w8-q9",
          type: "mcq",
          category: "Container Fleet Equipment",
          question: "Which container type features removable top roof bows and a tarpaulin cover for loading heavy or tall machinery from above with an overhead crane?",
          options: [
            "High Cube Container",
            "ISO Tank Container",
            "Side-Door Container",
            "Open Top Container"
          ],
          answerIndex: 3,
          explanation: "Open Top containers are designed for over-height cargo or heavy machinery that cannot be easily loaded through standard end doors."
        },
        {
          id: "w8-q10",
          type: "mcq",
          category: "Port Terminal Operations",
          question: "What is the primary operational role of a Reach Stacker in port container yards?",
          options: [
            "Lifting, transport, and stacking of containers up to 5-6 rows deep in yard bays",
            "Towing ocean freighters into port docks",
            "Loading containers directly onto ocean vessels over water",
            "Scanning customs paperwork at port gates"
          ],
          answerIndex: 0,
          explanation: "Reach Stackers are heavy-duty container handlers equipped with flexible boom arms capable of lifting, maneuvering, and stacking containers across multiple yard rows."
        },
        {
          id: "w8-q11",
          type: "mcq",
          category: "Maritime Documentation",
          question: "What is the primary legal distinction between a Sea Waybill and a negotiable Bill of Lading (B/L)?",
          options: [
            "A Sea Waybill can only be used for air cargo",
            "A negotiable B/L does not require carrier endorsement",
            "A Sea Waybill is non-negotiable and does not confer title, allowing cargo release without surrendering physical paper originals",
            "A Sea Waybill is issued exclusively by customs officials"
          ],
          answerIndex: 2,
          explanation: "A Sea Waybill serves as receipt of goods and evidence of contract, but unlike a negotiable B/L, it is not a document of title and does not require physical surrender for destination delivery."
        },
        {
          id: "w8-q12",
          type: "mcq",
          category: "Lean Logistics & Routing",
          question: "In automotive and lean supply chains, what does 'Milk Run' logistics routing mean?",
          options: [
            "Transporting refrigerated dairy products under cold-chain SOPs",
            "A scheduled routing method where one transport vehicle collects consolidated component shipments from multiple local suppliers on a fixed loop route",
            "Shipping cargo on empty returning ocean vessels",
            "Transferring air cargo directly to passenger aircraft bellies"
          ],
          answerIndex: 1,
          explanation: "A Milk Run is a lean logistics routing pattern where a single vehicle visits multiple supplier sites to gather smaller shipments, minimizing total transport distance and stock levels."
        },
        {
          id: "w8-q13",
          type: "mcq",
          category: "Ocean Freight Pricing",
          question: "What ocean freight surcharge is billed by shipping lines to offset fuel costs associated with using compliant Low Sulfur Marine Fuel Oil?",
          options: [
            "DTHC (Destination Terminal Handling Charge)",
            "ISPS (International Ship and Port Facility Security Fee)",
            "PSS (Peak Season Surcharge)",
            "LSS (Low Sulfur Surcharge)"
          ],
          answerIndex: 3,
          explanation: "LSS (Low Sulfur Surcharge) compensates ocean carriers for the price premium of ultra-low sulfur fuel oils mandated by IMO environmental regulations."
        },
        {
          id: "w8-q14",
          type: "mcq",
          category: "Customs Regulations",
          question: "What customs provision grants importers a full or partial refund of paid import duties when raw materials are subsequently processed and re-exported?",
          options: [
            "Duty Drawback",
            "Anti-Dumping Duty",
            "Countervailing Duty",
            "Value-Added Tax (VAT) Exemption"
          ],
          answerIndex: 0,
          explanation: "Duty Drawback is a customs mechanism allowing businesses to reclaim previously paid import duties on components incorporated into goods exported abroad."
        },
        {
          id: "w8-q15",
          type: "mcq",
          category: "Aviation Cargo Security",
          question: "In air cargo security frameworks, what designation is given to a shipper whose facilities and procedures are certified to originate secure cargo for commercial flights?",
          options: [
            "Authorized Customs Broker",
            "Bonded Drayage Provider",
            "Known Consignor / Regulated Agent",
            "Accredited Freight Forwarder"
          ],
          answerIndex: 2,
          explanation: "Known Consignor status verifies that a shipper maintains strict security controls, allowing cargo to bypass additional airport screening before aircraft loading."
        },
        {
          id: "w8-q16",
          type: "mcq",
          category: "Supply Chain Financial Metrics",
          question: "What supply chain metric measures the time elapsed between cash payment to suppliers for inventory materials and cash collection from customers for sales?",
          options: [
            "Order Lead Time",
            "Cash-to-Cash Cycle Time",
            "Terminal Dwell Time",
            "Days Sales of Inventory (DSI)"
          ],
          answerIndex: 1,
          explanation: "Cash-to-Cash Cycle Time measures working capital efficiency by calculating how long cash is tied up in operating inventory before customer payment recovery."
        },
        {
          id: "w8-q17",
          type: "mcq",
          category: "Maritime Safety History",
          question: "Which major IMO safety convention was initially adopted in 1914 in response to the RMS Titanic disaster to establish international vessel safety standards?",
          options: [
            "MARPOL Convention",
            "STCW Convention",
            "MLC (Maritime Labour Convention)",
            "SOLAS (Safety of Life at Sea)"
          ],
          answerIndex: 3,
          explanation: "SOLAS (Safety of Life at Sea) was created in 1914 following the Titanic catastrophe, mandating lifeboats, structural fire protection, and navigational safety."
        },
        {
          id: "w8-q18",
          type: "mcq",
          category: "Reefer & Perishable Logistics",
          question: "What advanced reefer technology dynamically controls oxygen (O2), carbon dioxide (CO2), and nitrogen gas concentrations to slow fruit respiration during transit?",
          options: [
            "Controlled Atmosphere (CA) Technology",
            "Passive Thermal Insulation",
            "Cryogenic Nitrogen Injection",
            "Dehumidified Air Blast Cooling"
          ],
          answerIndex: 0,
          explanation: "Controlled Atmosphere (CA) technology modifies internal container air composition to put perishable produce into 'dormancy', extending shelf life over long ocean voyages."
        },
        {
          id: "w8-q19",
          type: "mcq",
          category: "Trucking & Carrier Operations",
          question: "In freight trucking operations, what does the term 'Deadheading' describe?",
          options: [
            "Operating a truck beyond legally allowable driver shift limits",
            "Parking a chassis inside a customs bonded yard",
            "Driving a commercial vehicle or trailer back without carrying revenue-generating cargo",
            "Transporting hazardous chemicals without placard tags"
          ],
          answerIndex: 2,
          explanation: "Deadheading refers to running an empty truck or container chassis on a leg where no paid freight is being transported, resulting in uncompensated fuel and labor expense."
        },
        {
          id: "w8-q20",
          type: "mcq",
          category: "E-Commerce Fulfillment",
          question: "In modern retail e-commerce logistics, what is a 'Dark Store'?",
          options: [
            "A warehouse operating without indoor lights to save energy",
            "A commercial retail unit converted exclusively into an automated order picking/fulfillment center with no walk-in shoppers",
            "A customs warehouse holding seized contraband",
            "A refrigerated storage vault operating exclusively at night"
          ],
          answerIndex: 1,
          explanation: "Dark Stores are strategically located fulfillment hubs formatted like supermarkets but closed to foot traffic, optimized purely for rapid online order picking and packing."
        }
      ]
    },
    {
      id: "week-9",
      title: "Weekly Quiz 09",
      description: "20 Questions • 20 Multiple Choice Questions (MCQs)",
      questions: [
        {
          id: "w9-q1",
          type: "mcq",
          category: "Incoterms® Rules",
          question: "Under Incoterms® 2020, which rule is the ONLY one that can be used for all modes of transport including multimodal, road, air, and rail — but NOT recommended for traditional ocean shipments where goods are sold at port?",
          options: [
            "FOB (Free On Board)",
            "FCA (Free Carrier)",
            "CIF (Cost, Insurance & Freight)",
            "FAS (Free Alongside Ship)"
          ],
          answerIndex: 1,
          explanation: "FCA (Free Carrier) is suitable for all transport modes. It is particularly recommended over FOB when containers are used, as risk transfers at the named inland point rather than at the ship's rail."
        },
        {
          id: "w9-q2",
          type: "mcq",
          category: "Ocean Freight & Container Operations",
          question: "What is the standard maximum payload weight (cargo + packing) for a 20-foot General Purpose (20GP) ISO shipping container?",
          options: [
            "~10,000 kg",
            "~18,000 kg",
            "~28,200 kg",
            "~40,000 kg"
          ],
          answerIndex: 2,
          explanation: "A standard 20GP ISO container has a maximum payload weight of approximately 28,200 kg (28.2 metric tons), with a tare weight of ~2,200 kg and a gross weight limit of ~30,400 kg."
        },
        {
          id: "w9-q3",
          type: "mcq",
          category: "Customs & Trade Compliance",
          question: "What is 'Anti-Dumping Duty' (ADD) in international trade customs regulation?",
          options: [
            "A tax on goods dumped into landfills near ports",
            "A punitive tariff imposed on imported goods sold below their home-market fair value to protect domestic industry",
            "A surcharge on container overweight violations",
            "A penalty for incorrect Harmonized System (HS) code declarations"
          ],
          answerIndex: 1,
          explanation: "Anti-Dumping Duty is levied by importing countries on foreign goods sold below their normal value (dumped), protecting domestic manufacturers from unfair foreign competition under WTO Agreement on Anti-Dumping."
        },
        {
          id: "w9-q4",
          type: "mcq",
          category: "Air Freight & IATA",
          question: "What IATA classification designates cargo that must be transported in the passenger aircraft cabin rather than the belly hold due to size, value, or special handling requirements?",
          options: [
            "AVI (Live Animals)",
            "BIG (Outsized Baggage)",
            "CAO (Cargo Aircraft Only)",
            "Cabin Baggage (hand carry)"
          ],
          answerIndex: 2,
          explanation: "CAO (Cargo Aircraft Only) is the IATA designation for dangerous goods or cargo that is too hazardous or sensitive to fly on passenger aircraft and must ship on dedicated freighter aircraft only."
        },
        {
          id: "w9-q5",
          type: "mcq",
          category: "Maritime Law & Documentation",
          question: "What is a 'Letter of Indemnity' (LOI) in ocean freight operations?",
          options: [
            "A certificate confirming vessel seaworthiness issued by flag state",
            "A written guarantee indemnifying a carrier for releasing cargo without production of original Bills of Lading",
            "A mandatory insurance renewal document",
            "A government-issued export license for restricted goods"
          ],
          answerIndex: 1,
          explanation: "A Letter of Indemnity (LOI) is issued by a shipper or consignee to induce an ocean carrier to release cargo at destination without presentation of the original negotiable Bill of Lading, at the issuer's financial risk."
        },
        {
          id: "w9-q6",
          type: "mcq",
          category: "Supply Chain Risk Management",
          question: "What supply chain resilience strategy involves maintaining a buffer stock of critical inventory above normal safety stock levels specifically to absorb unexpected supply disruptions?",
          options: [
            "Cross-Docking",
            "Nearshoring",
            "Strategic Reserve / Buffer Stock",
            "Drop Shipping"
          ],
          answerIndex: 2,
          explanation: "Strategic Reserve / Buffer Stock is excess inventory held deliberately above the safety stock threshold to protect against extreme supply disruptions, port shutdowns, or demand spikes — a lesson reinforced by COVID-19 supply chain shocks."
        },
        {
          id: "w9-q7",
          type: "mcq",
          category: "Freight Technology & Digitalization",
          question: "What decentralized digital ledger technology enables immutable, tamper-proof recording of supply chain transactions, shipment milestones, and document verification across multiple trading parties?",
          options: [
            "Cloud ERP (Enterprise Resource Planning)",
            "WMS (Warehouse Management System)",
            "Blockchain Technology",
            "RFID Tag Network"
          ],
          answerIndex: 2,
          explanation: "Blockchain creates a shared, distributed ledger where each transaction block is cryptographically linked, making it ideal for transparent and tamper-resistant tracking of cargo events, documentation, and multi-party trade finance."
        },
        {
          id: "w9-q8",
          type: "mcq",
          category: "Port & Terminal Operations",
          question: "What is the function of a 'Vessel Traffic Service' (VTS) system operated by port authorities?",
          options: [
            "Automatically loading containers onto vessels",
            "Monitoring and managing maritime traffic in busy port approaches and channels to ensure safe navigation",
            "Processing import customs declarations electronically",
            "Collecting ocean freight payments from shipping lines"
          ],
          answerIndex: 1,
          explanation: "Vessel Traffic Service (VTS) is the maritime equivalent of air traffic control — port authorities use radar, AIS, and VHF communication to monitor vessel movements and prevent collisions in ports and restricted waterways."
        },
        {
          id: "w9-q9",
          type: "mcq",
          category: "Ocean Freight Rates & Surcharges",
          question: "What does PSS stand for in ocean freight rate structures, and when is it typically applied?",
          options: [
            "Port Security Surcharge — applied after cargo is seized by customs",
            "Peak Season Surcharge — applied during high-demand shipping seasons (e.g. pre-Chinese New Year, pre-Christmas)",
            "Pilotage Staging Surcharge — applied at anchorage waiting areas",
            "Reefer Power Supply Surcharge — applied to refrigerated containers"
          ],
          answerIndex: 1,
          explanation: "PSS (Peak Season Surcharge) is levied by ocean carriers during high-volume shipping periods when vessel space demand significantly exceeds supply, typically June–October (Asia–US/Europe pre-holiday peak)."
        },
        {
          id: "w9-q10",
          type: "mcq",
          category: "Trade Finance",
          question: "Under a Documentary Collection arrangement, what is the key difference between D/P (Documents against Payment) and D/A (Documents against Acceptance)?",
          options: [
            "D/P requires cargo insurance; D/A does not",
            "D/P releases documents only upon immediate cash payment; D/A releases documents against buyer's acceptance of a time draft for future payment",
            "D/P uses Letters of Credit; D/A uses Open Account",
            "D/P is for air cargo; D/A is for ocean freight only"
          ],
          answerIndex: 1,
          explanation: "In D/P (Documents against Payment), the buyer must pay immediately to receive shipping documents. In D/A (Documents against Acceptance), the buyer accepts a bill of exchange (time draft) promising future payment, giving them credit terms to collect the goods now."
        },
        {
          id: "w9-q11",
          type: "mcq",
          category: "Warehousing & Distribution",
          question: "What is 'Slotting Optimization' in warehouse management operations?",
          options: [
            "Programming robotic arms to disassemble cargo pallets",
            "Assigning products to specific storage locations based on velocity, weight, and ergonomics to minimize travel time and labor costs",
            "Scheduling docking bays for inbound truck arrivals",
            "Allocating container slots on a vessel by weight class"
          ],
          answerIndex: 1,
          explanation: "Slotting Optimization strategically positions inventory within a warehouse based on order frequency (velocity), product characteristics, and pick-path efficiency to dramatically reduce picker travel distance and order cycle time."
        },
        {
          id: "w9-q12",
          type: "mcq",
          category: "Dangerous Goods & IMDG",
          question: "Which UN Dangerous Goods Class covers Toxic (poisonous) and Infectious Substances such as pesticides and biological specimens?",
          options: [
            "Class 3",
            "Class 5",
            "Class 6",
            "Class 8"
          ],
          answerIndex: 2,
          explanation: "UN Class 6 encompasses Division 6.1 (Toxic Substances — materials causing death or injury by inhalation, skin absorption, or ingestion) and Division 6.2 (Infectious Substances — biological agents posing disease risk to humans or animals)."
        },
        {
          id: "w9-q13",
          type: "mcq",
          category: "Customs Procedures",
          question: "What is an 'In-Bond' shipment in US customs operations?",
          options: [
            "A shipment fully cleared through customs before arrival",
            "Cargo moving under customs control through the US without paying duties, destined for another port or a bonded warehouse",
            "A shipment requiring mandatory fumigation treatment",
            "An express courier shipment with pre-paid import duties"
          ],
          answerIndex: 1,
          explanation: "An In-Bond (IT — Immediate Transportation) shipment allows cargo to move through US territory under customs bond without paying duties, typically to reach the intended final port of entry or a bonded warehouse for deferred clearance."
        },
        {
          id: "w9-q14",
          type: "mcq",
          category: "Green & Sustainable Logistics",
          question: "What emission reduction strategy involves shipping cargo on slower vessels to significantly reduce fuel consumption and CO2 emissions per voyage?",
          options: [
            "Cabotage Routing",
            "Slow Steaming",
            "Deadheading",
            "Port Omission"
          ],
          answerIndex: 1,
          explanation: "Slow Steaming reduces vessel engine speed below designed optimum, cutting fuel consumption by up to 50% and CO2 emissions significantly, though it extends transit times. Widely adopted post-2008 fuel price crisis as a cost and environmental tool."
        },
        {
          id: "w9-q15",
          type: "mcq",
          category: "Air Cargo & Belly Freight",
          question: "What is 'Belly Freight' in air cargo operations?",
          options: [
            "Oversized cargo strapped to aircraft landing gear",
            "Dangerous goods stored in pressurized upper deck compartments",
            "Revenue-generating cargo transported in the lower deck holds of passenger aircraft alongside passenger baggage",
            "Cargo flown on military transport aircraft under contract"
          ],
          answerIndex: 2,
          explanation: "Belly Freight refers to commercial cargo loaded in the lower hold (belly) compartments of passenger aircraft. Airlines monetize unused belly space by accepting general cargo, mail, and express parcels alongside checked passenger baggage."
        },
        {
          id: "w9-q16",
          type: "mcq",
          category: "Logistics Process & SOPs",
          question: "What does the logistics term 'Proof of Delivery' (POD) refer to and why is it critical in freight operations?",
          options: [
            "A certificate of origin proving goods were manufactured domestically",
            "A document signed by the consignee acknowledging physical receipt of goods, serving as legal confirmation of successful delivery",
            "A customs release stamp issued at port gates",
            "An IATA regulated cargo weight confirmation note"
          ],
          answerIndex: 1,
          explanation: "Proof of Delivery (POD) is a signed delivery receipt confirming the consignee received the shipment. It is critical for settling freight claims, invoicing disputes, customer service issues, and supply chain audit trails."
        },
        {
          id: "w9-q17",
          type: "mcq",
          category: "Carrier Liability & Insurance",
          question: "Under the Montreal Convention 1999, what is the air carrier's liability limit for cargo loss or damage in international air freight (in Special Drawing Rights per kilogram)?",
          options: [
            "8.33 SDR/kg",
            "19 SDR/kg",
            "666.67 SDR/kg",
            "22 SDR/kg"
          ],
          answerIndex: 3,
          explanation: "The Montreal Convention 1999 sets the air carrier liability limit at 22 SDR (Special Drawing Rights) per kilogram of cargo lost, damaged, or delayed in international air transport — updated from the original Warsaw Convention limit."
        },
        {
          id: "w9-q18",
          type: "mcq",
          category: "Container Equipment Types",
          question: "What type of ISO tank container is designed to transport bulk liquid chemicals, foodstuffs, or gases under pressure in a cylindrical vessel mounted within a standard ISO frame?",
          options: [
            "Flat Rack Container",
            "Open Top Container",
            "ISO Tank Container (Tanktainer)",
            "Flexitank Container"
          ],
          answerIndex: 2,
          explanation: "ISO Tank Containers (Tanktainers) feature a cylindrical stainless steel pressure vessel enclosed within a standard ISO outer frame, enabling bulk liquid or gas transport via sea, road, or rail without cargo transhipment."
        },
        {
          id: "w9-q19",
          type: "mcq",
          category: "Maritime Trade & Economics",
          question: "What index, published daily by the Baltic Exchange in London, is the most widely used benchmark for measuring global dry bulk ocean freight rates?",
          options: [
            "World Container Index (WCI)",
            "SCFI (Shanghai Containerized Freight Index)",
            "BDI (Baltic Dry Index)",
            "Drewry Freight Rate Benchmark"
          ],
          answerIndex: 2,
          explanation: "The Baltic Dry Index (BDI) tracks daily freight rates across major dry bulk shipping routes (Capesize, Panamax, Supramax) and is a leading economic indicator of global trade volume and commodity demand."
        },
        {
          id: "w9-q20",
          type: "mcq",
          category: "Logistics & Supply Chain Strategy",
          question: "What procurement and supply chain strategy involves relocating manufacturing or sourcing operations to geographically closer countries to reduce lead times, geopolitical risk, and carbon footprint?",
          options: [
            "Offshoring",
            "Nearshoring / Friendshoring",
            "Drop Shipping",
            "Vertical Integration"
          ],
          answerIndex: 1,
          explanation: "Nearshoring (shifting production to nearby countries) and Friendshoring (sourcing from geopolitically allied nations) are post-pandemic supply chain resilience strategies to reduce dependency on distant single-source suppliers."
        }
      ]
    },
    {
      id: "week-10",
      title: "Weekly Quiz 10",
      description: "🧩 Special Edition • Logistics Crossword Puzzle • 10 Words",
      quizType: "crossword",
      crosswordData: {
        gridRows: 15,
        gridCols: 14,
        words: [
          {
            id: "cw10-w1",
            number: 1,
            word: "LASHING",
            direction: "down",
            row: 0,
            col: 2,
            clue: "The process of securing cargo inside containers or on vessels using straps, ropes, chains or bars to prevent shifting or damage during transit",
            hint: "Cargo must be properly _____ to survive rough seas"
          },
          {
            id: "cw10-w2",
            number: 2,
            word: "INCOTERMS",
            direction: "down",
            row: 0,
            col: 5,
            clue: "A globally standardized set of 11 trade terms published by the ICC that define responsibilities, risks and costs between buyers and sellers in international commercial contracts",
            hint: "FOB, CIF, DDP, EXW are examples of these trade rules"
          },
          {
            id: "cw10-w3",
            number: 3,
            word: "CUSTOMS",
            direction: "across",
            row: 2,
            col: 5,
            clue: "The government authority and process responsible for regulating and controlling goods that enter or leave a country, collecting import duties, and enforcing trade compliance",
            hint: "Every international shipment must clear through this authority"
          },
          {
            id: "cw10-w4",
            number: 4,
            word: "DEMURRAGE",
            direction: "down",
            row: 3,
            col: 0,
            clue: "The penalty fee charged by shipping lines when an importer retains a container beyond the agreed free-time period at the destination port terminal",
            hint: "Free days exceeded at the port terminal triggers this daily charge"
          },
          {
            id: "cw10-w5",
            number: 5,
            word: "BONDED",
            direction: "across",
            row: 3,
            col: 4,
            clue: "A type of licensed warehouse or customs-supervised zone where dutiable imported goods are stored without payment of import duty until released for local sale or re-export",
            hint: "_____ warehouse allows duty-deferred storage of imported goods"
          },
          {
            id: "cw10-w6",
            number: 6,
            word: "MANIFEST",
            direction: "across",
            row: 5,
            col: 0,
            clue: "The official cargo document or electronic filing listing all goods, containers, shipper details, and consignee information aboard a vessel or aircraft, submitted to port and customs authorities before arrival",
            hint: "Shipping lines must file this document to customs before vessel arrival"
          },
          {
            id: "cw10-w7",
            number: 7,
            word: "FUMIGATION",
            direction: "down",
            row: 5,
            col: 4,
            clue: "A mandatory phytosanitary treatment using approved chemical gases such as methyl bromide or phosphine applied to wooden packaging materials and agricultural cargo to eliminate pests under ISPM-15 regulations",
            hint: "Wooden pallets must have the IPPC mark after this treatment"
          },
          {
            id: "cw10-w8",
            number: 8,
            word: "TRANSSHIP",
            direction: "down",
            row: 5,
            col: 7,
            clue: "The transfer of cargo from one vessel to another at an intermediate port hub before the shipment continues its onward journey to the final destination port",
            hint: "Colombo and Singapore are major _______ hubs in Asia"
          },
          {
            id: "cw10-w9",
            number: 9,
            word: "FREIGHT",
            direction: "across",
            row: 6,
            col: 6,
            clue: "The commercial transportation of goods by sea, air, road or rail; also refers to the charge or cost paid to a carrier for transporting cargo from the port or place of origin to the destination",
            hint: "In CIF pricing: FOB + _______ + Insurance = CIF"
          },
          {
            id: "cw10-w10",
            number: 10,
            word: "PACKING",
            direction: "across",
            row: 13,
            col: 7,
            clue: "The process of preparing, wrapping and placing goods into suitable containers, cartons or protective materials for safe transportation, with details documented in a Packing List submitted to customs",
            hint: "The _______ List accompanies every commercial shipment"
          }
        ]
      },
      questions: []
    },
    {
      id: "week-11",
      title: "Weekly Quiz 11",
      description: "20 Questions • 20 Multiple Choice Questions (MCQs) • 100 Marks",
      totalMarks: 100,
      questions: [
        {
          id: "w11-q1",
          type: "mcq",
          category: "Freight Consolidation & Groupage",
          question: "What logistics service combines multiple smaller LCL shipments from different shippers into a single full container load (FCL) at a consolidation warehouse before ocean dispatch?",
          options: [
            "Direct FCL Booking",
            "Buyer's Consolidation (Groupage)",
            "Drayage Service",
            "Vessel Chartering"
          ],
          answerIndex: 1,
          explanation: "Buyer's Consolidation (Groupage) is a freight forwarder service that groups multiple small LCL shipments into one FCL container to reduce per-unit ocean freight costs and streamline customs clearance at destination."
        },
        {
          id: "w11-q2",
          type: "mcq",
          category: "Maritime Insurance & P&I Clubs",
          question: "What type of mutual marine insurance association provides shipowners with third-party liability coverage for crew injuries, oil spill pollution, cargo damage claims, and wreck removal?",
          options: [
            "Lloyd's of London Syndicate",
            "Protection & Indemnity (P&I) Club",
            "Institute Cargo Clauses Underwriter",
            "Marine Hull & Machinery Insurer"
          ],
          answerIndex: 1,
          explanation: "P&I Clubs are mutual (non-profit) insurance associations where shipowners collectively pool third-party liability risks including crew illness/death, pollution, collision liability, and cargo claims. The International Group of P&I Clubs covers ~90% of world ocean tonnage."
        },
        {
          id: "w11-q3",
          type: "mcq",
          category: "Supply Chain KPIs & Analytics",
          question: "What logistics performance metric, expressed as a ratio, measures how many times a company's entire inventory stock is sold and replenished within a given accounting period?",
          options: [
            "Freight Cost per Ton-Kilometer",
            "Warehouse Throughput Rate",
            "Inventory Turnover Ratio",
            "Order Fill Rate"
          ],
          answerIndex: 2,
          explanation: "Inventory Turnover Ratio = Cost of Goods Sold / Average Inventory Value. A higher ratio indicates efficient inventory management with faster sell-through and lower holding costs."
        },
        {
          id: "w11-q4",
          type: "mcq",
          category: "Digital Freight & Technology",
          question: "What technology platform uses algorithms to digitally match available truck capacity with shipper cargo loads in real-time, reducing empty miles and improving utilization?",
          options: [
            "Warehouse Management System (WMS)",
            "Digital Freight Matching Platform (Digital Brokerage)",
            "Container Booking System (CBS)",
            "Port Community System (PCS)"
          ],
          answerIndex: 1,
          explanation: "Digital Freight Matching platforms (e.g. Uber Freight, Convoy, Loadsmart) use AI algorithms and real-time data to connect available truck capacity with cargo loads, reducing empty-mile deadhead runs and improving fleet asset utilization."
        },
        {
          id: "w11-q5",
          type: "mcq",
          category: "Warehouse Automation & Robotics",
          question: "What automated warehouse storage and retrieval technology uses computer-controlled cranes operating within high-density racking systems to store and pick pallets or totes without human intervention?",
          options: [
            "Conveyor Belt Sortation",
            "AS/RS (Automated Storage & Retrieval System)",
            "Voice-Directed Picking",
            "Manual Pallet Racking"
          ],
          answerIndex: 1,
          explanation: "AS/RS (Automated Storage and Retrieval Systems) are robotic warehouse solutions using computer-controlled stacker cranes or shuttles to automatically place and retrieve loads from high-bay racking, maximizing vertical space and throughput."
        },
        {
          id: "w11-q6",
          type: "mcq",
          category: "Free Trade Zones & Special Economic Areas",
          question: "What is the primary customs distinction between a Free Trade Zone (FTZ) and a standard Bonded Warehouse?",
          options: [
            "FTZs only handle air cargo; Bonded Warehouses only handle sea cargo",
            "FTZs allow manufacturing, assembly, and value-added processing of goods without duty payment; Bonded Warehouses primarily allow storage only",
            "Bonded Warehouses are tax-free; FTZs require full duty payment on entry",
            "There is no difference — they are the same facility"
          ],
          answerIndex: 1,
          explanation: "Free Trade Zones permit manufacturing, assembly, re-labeling, and value-added processing of imported goods duty-free, while Bonded Warehouses are primarily restricted to secure storage and minor handling of dutiable goods pending customs clearance."
        },
        {
          id: "w11-q7",
          type: "mcq",
          category: "Freight Forwarding Licensing & Regulation",
          question: "What Federal Maritime Commission (FMC) license is required for a freight forwarder operating as a non-vessel-owning carrier to issue their own ocean Bills of Lading in the United States?",
          options: [
            "IATA Cargo Agent License",
            "AEO Certification",
            "OTI-NVOCC License (Ocean Transportation Intermediary - Non-Vessel Operating Common Carrier)",
            "Customs Broker License (CBL)"
          ],
          answerIndex: 2,
          explanation: "An OTI-NVOCC License from the FMC authorizes freight forwarders to act as ocean carriers by issuing their own House Bills of Lading, publishing tariffs, and assuming carrier liability without owning vessels."
        },
        {
          id: "w11-q8",
          type: "mcq",
          category: "Air Freight Digitalization",
          question: "What IATA industry initiative aims to replace traditional paper Air Waybills (AWB) with fully electronic, paperless cargo documentation across the global air freight supply chain?",
          options: [
            "IATA NDC (New Distribution Capability)",
            "IATA e-AWB (Electronic Air Waybill)",
            "IATA BSP (Billing & Settlement Plan)",
            "IATA CASS (Cargo Accounts Settlement System)"
          ],
          answerIndex: 1,
          explanation: "IATA's e-AWB initiative eliminates paper Air Waybills by creating a single electronic contract of carriage record, reducing processing costs, speeding customs clearance, and minimizing document errors in air freight."
        },
        {
          id: "w11-q9",
          type: "mcq",
          category: "Port Operations & Technology",
          question: "What centralized digital platform connects and coordinates electronic information exchange among all port stakeholders — shipping lines, terminal operators, customs, freight forwarders, and truckers?",
          options: [
            "TOS (Terminal Operating System)",
            "ERP (Enterprise Resource Planning)",
            "PCS (Port Community System)",
            "AIS (Automatic Identification System)"
          ],
          answerIndex: 2,
          explanation: "A Port Community System (PCS) is a neutral electronic platform that connects multiple port stakeholder systems, enabling single-window data exchange for vessel calls, cargo clearance, truck appointments, and trade documentation."
        },
        {
          id: "w11-q10",
          type: "mcq",
          category: "Special Economic Zones & Trade Policy",
          question: "What is the primary economic purpose of a Special Economic Zone (SEZ) established by developing countries?",
          options: [
            "To restrict all foreign direct investment within national borders",
            "To create designated geographic areas offering tax incentives, duty exemptions, and relaxed regulations to attract foreign investment and boost exports",
            "To ban the export of locally manufactured goods",
            "To increase import tariffs on raw materials entering the zone"
          ],
          answerIndex: 1,
          explanation: "Special Economic Zones (SEZs) are government-designated areas offering preferential tax rates, customs duty exemptions, and simplified business regulations to attract foreign direct investment (FDI), promote manufacturing, and generate export revenue."
        },
        {
          id: "w11-q11",
          type: "mcq",
          category: "Smart Containers & IoT Technology",
          question: "What Internet of Things (IoT) technology enables real-time remote monitoring of container location (GPS), internal temperature, humidity, door open/close status, and shock events throughout transit?",
          options: [
            "RFID Tag Scanning",
            "Barcode Label Printing",
            "Smart Container Tracking Devices (IoT Telemetry Sensors)",
            "Manual Container Inspection at Port Gates"
          ],
          answerIndex: 2,
          explanation: "Smart container IoT devices use cellular, satellite, or Bluetooth sensors attached to containers to transmit real-time GPS position, temperature, humidity, light (door intrusion), and shock/tilt data to cloud platforms throughout the supply chain."
        },
        {
          id: "w11-q12",
          type: "mcq",
          category: "Cargo Surveying & Claims",
          question: "What independent professional is appointed by insurers or cargo interests to inspect, assess, and document the nature and extent of cargo damage for marine insurance claims?",
          options: [
            "Customs Broker",
            "Marine Cargo Surveyor (Loss Adjuster)",
            "Ship Classification Inspector",
            "Port Health Officer"
          ],
          answerIndex: 1,
          explanation: "A Marine Cargo Surveyor (or Loss Adjuster) is an independent professional who inspects damaged cargo, determines the cause and extent of loss, and prepares survey reports used to settle insurance claims between cargo interests and underwriters."
        },
        {
          id: "w11-q13",
          type: "mcq",
          category: "International Trade Agreements",
          question: "What mega-regional Free Trade Agreement, signed in November 2020, is the world's largest trade bloc covering 15 Asia-Pacific nations including China, Japan, South Korea, Australia, and all 10 ASEAN members?",
          options: [
            "USMCA (United States-Mexico-Canada Agreement)",
            "CPTPP (Comprehensive and Progressive Trans-Pacific Partnership)",
            "RCEP (Regional Comprehensive Economic Partnership)",
            "AfCFTA (African Continental Free Trade Area)"
          ],
          answerIndex: 2,
          explanation: "RCEP (Regional Comprehensive Economic Partnership) is the world's largest FTA by GDP and population, covering ~30% of global GDP across 15 signatory nations, reducing tariffs and harmonizing rules of origin across the Asia-Pacific region."
        },
        {
          id: "w11-q14",
          type: "mcq",
          category: "Customs Valuation Methods",
          question: "When the primary Transaction Value method cannot be used for customs duty calculation, which alternative WTO valuation method uses the selling price of identical or similar imported goods as the customs value basis?",
          options: [
            "Computed Value Method",
            "Deductive Value Method (Resale Minus)",
            "Transaction Value of Identical or Similar Goods",
            "Fallback / Reasonable Means Method"
          ],
          answerIndex: 2,
          explanation: "The WTO Customs Valuation Agreement prescribes a sequential hierarchy: if Transaction Value fails, customs may use the Transaction Value of Identical Goods (Method 2) or Similar Goods (Method 3) as alternative bases for duty assessment."
        },
        {
          id: "w11-q15",
          type: "mcq",
          category: "Maritime Environmental Regulations",
          question: "Which MARPOL Annex specifically regulates the prevention of pollution by garbage from ships, prohibiting the discharge of all plastics and restricting disposal of other waste materials at sea?",
          options: [
            "MARPOL Annex I (Oil Pollution)",
            "MARPOL Annex II (Noxious Liquid Substances)",
            "MARPOL Annex V (Garbage)",
            "MARPOL Annex VI (Air Pollution)"
          ],
          answerIndex: 2,
          explanation: "MARPOL Annex V governs the disposal of garbage from ships, completely banning the discharge of all plastics at sea, and setting strict distance and Special Area restrictions for disposing food waste, cargo residues, and other ship-generated garbage."
        },
        {
          id: "w11-q16",
          type: "mcq",
          category: "Alternative Marine Fuels & Decarbonization",
          question: "What alternative marine fuel, stored at approximately -162°C, is increasingly adopted by ocean carriers as a transitional lower-emission fuel to meet IMO decarbonization targets?",
          options: [
            "Heavy Fuel Oil (HFO)",
            "Marine Diesel Oil (MDO)",
            "LNG (Liquefied Natural Gas)",
            "Methanol Blend"
          ],
          answerIndex: 2,
          explanation: "LNG (Liquefied Natural Gas) produces approximately 25% less CO2, 90% less NOx, and virtually zero SOx compared to traditional Heavy Fuel Oil (HFO), making it a transitional marine fuel toward IMO 2050 decarbonization goals."
        },
        {
          id: "w11-q17",
          type: "mcq",
          category: "Autonomous Logistics & Future Technology",
          question: "What emerging logistics technology uses self-driving trucks equipped with LiDAR, cameras, and AI navigation systems to operate long-haul highway freight corridors without a human driver?",
          options: [
            "Electric Vehicle (EV) Delivery Vans",
            "Autonomous Trucking (Self-Driving Trucks / Level 4+ Autonomy)",
            "Drone Last-Mile Delivery",
            "Hyperloop Cargo Transport"
          ],
          answerIndex: 1,
          explanation: "Autonomous trucking (Level 4/5 SAE) uses LiDAR, radar, cameras, and AI algorithms to enable trucks to navigate highway corridors without human intervention, targeting long-haul 'middle mile' routes to address driver shortage and reduce operating costs."
        },
        {
          id: "w11-q18",
          type: "mcq",
          category: "Supply Chain Digital Twins",
          question: "What advanced digital technology creates a virtual replica of an entire physical supply chain network, allowing companies to simulate scenarios, predict disruptions, and optimize logistics decisions in real-time?",
          options: [
            "Blockchain Smart Contract",
            "Digital Twin (Supply Chain Simulation Model)",
            "RFID Tag Cloud",
            "Automated Manifest System (AMS)"
          ],
          answerIndex: 1,
          explanation: "A Digital Twin is a virtual, real-time replica of a physical supply chain that uses IoT data, AI, and machine learning to simulate what-if scenarios, predict bottlenecks, optimize inventory positioning, and improve resilience planning."
        },
        {
          id: "w11-q19",
          type: "mcq",
          category: "Trade Credit Insurance & Risk",
          question: "What type of commercial insurance protects exporters against the risk of buyer non-payment due to insolvency, bankruptcy, protracted default, or political risk in the buyer's country?",
          options: [
            "Marine Cargo Insurance (ICC Clause A)",
            "Trade Credit Insurance (Export Credit Insurance)",
            "Professional Indemnity Insurance",
            "Warehouse Keeper's Liability Insurance"
          ],
          answerIndex: 1,
          explanation: "Trade Credit Insurance protects sellers/exporters from financial losses when foreign buyers fail to pay due to commercial risks (insolvency, protracted default) or political risks (war, currency inconvertibility, government payment moratorium)."
        },
        {
          id: "w11-q20",
          type: "mcq",
          category: "Maritime Crew & Training Standards",
          question: "Which IMO convention establishes minimum international standards for the training, certification, and watchkeeping of seafarers aboard commercial vessels to ensure maritime safety?",
          options: [
            "MLC 2006 (Maritime Labour Convention)",
            "SOLAS (Safety of Life at Sea)",
            "STCW Convention (Standards of Training, Certification and Watchkeeping for Seafarers)",
            "ISM Code (International Safety Management)"
          ],
          answerIndex: 2,
          explanation: "The STCW Convention (1978, revised 2010) sets global minimum standards for merchant navy officer and rating qualifications, watchkeeping hours, competency assessments, and mandatory safety training certificates required aboard all commercial vessels."
        }
      ]
    }
  ]
};


if (typeof window !== 'undefined') {
  window.NEXUS_QUIZ_DATABASE = NEXUS_QUIZ_DATABASE;
}
