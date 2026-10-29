/**
 * Nexus Knowledge Hub - AI Chatbot Engine (js/chat.js)
 */
/* ==========================================
   9. NEXUS AI CHATBOT (STATEFUL CONVERSATION)
   ========================================== */
const NEXUS_AI_SYSTEM_PROMPT = `You are "Nexus AI," a Master Senior Professor & Global Freight Forwarding Tutor representing Nexus Cargo Knowledge Hub. Your mission is to provide exceptionally thorough, educational, accurate, and actionable responses to help users learn international trade, shipping, customs compliance, and supply chain logistics.

Core Teaching Persona & Response Directives:
1. **Educational & Comprehensive**: Provide rich, structured, step-by-step explanations that teach the underlying concepts thoroughly. Avoid brief 1-sentence answers.
2. **Clear Formatting**: Structure every response using clean Markdown with section headings (###), bold key terms, bullet points, and numbered steps for maximum readability.
3. **Practical Industry Examples**: Include real-world scenarios (e.g. exporting garments or tea from Sri Lanka to Western Europe/USA, importing electronics or machinery from China, air-freighting perishables).
4. **Formulas & Calculations**: Whenever asked about CBM, Volumetric Weight, Chargeable Weight, Freight Costs, Demurrage, or Duty, provide the exact mathematical formula with a clear, step-by-step worked-out example.
5. **Sri Lanka & Global Trade Specifics**: Seamlessly integrate Sri Lankan trade procedures when relevant (e.g., Sri Lanka Customs ASYCUDA CUSDEC clearance, Sri Lanka Tea Board permits, Colombo Port terminals CICT/SAGT/JCT, Katunayake Air Cargo Village) alongside global maritime/air standards.
6. **Multi-lingual Mastery**: Respond in the language used by the user. If the user asks in Sinhala or Singlish, provide fluent, easy-to-understand explanations in Sinhala/English mix or clear Sinhala with technical terms in English.
7. **Pro-Tips**: Conclude responses with a practical "💡 Logistics Pro-Tip" or "⚠️ Compliance Warning".

CRITICAL RESPONSE RULE:
- NEVER output raw database records, topic tags like "[Topic: X -> Subtopic: Y]", "Summary:", or "Content:" prefixes.
- When knowledge base context is provided, synthesize it into a natural, expert, conversational answer as if you already know this information.
- Always respond as a knowledgeable expert speaking directly to the user — not as a data retrieval system.

Boundaries:
- Focus exclusively on logistics, freight forwarding, customs clearance, Incoterms, supply chain, and global trade.
- Maintain a polite, highly professional, encouraging, and academic tone.`;

let conversationHistory = [];
let currentTopicContext = null;


const SHIPPING_BOT_ANSWERS = {
  greeting: "Hello! I am Nexus AI, your global logistics and trade advisor. How can I help you today? You can ask me anything about global logistics, airports, seaports, shipping routes, customs compliance, or freight operations worldwide!",
  incoterms: "Incoterms (International Commercial Terms) divide shipping costs and risks between buyer and seller. The 11 terms in Incoterms 2020/2026 are: EXW, FCA, FAS, FOB, CFR, CIF, CPT, CIP, DAP, DPU, and DDP. Do you have a specific term in mind?",
  fob: "FOB (Free On Board) dictates that the seller clears cargo for export and loads it onto the vessel. Risk transfers to the buyer once the goods are safely loaded on board at the origin port. The buyer pays for sea freight and import clearances.",
  exw: "EXW (Ex Works) places maximum risk and cost on the buyer. The seller only makes goods available at their factory. The buyer handles export customs, shipping, insurance, and destination haulage.",
  cbm: "CBM (Cubic Meter) is the metric for volume. Formula: Length(m) x Width(m) x Height(m) x Quantity. In air freight, 1 CBM charges at 166.67 kg. In ocean LCL, it charges at 1000 kg (1 Ton).",
  volumetric: "Air Volumetric Weight is calculated as: (Length x Width x Height in cm) / 6000, or total CBM x 166.67. If this exceeds actual weight, you are charged on this volume index.",
  container: "Dry container capacities: 20ft (33.2 CBM, ~28 tonne payload) and 40ft (67.7 CBM, ~26 tonne payload). High Cube (40ft HC) yields 76.4 CBM. Reefers are refrigerated boxes for temperature control.",
  demurrage: "Demurrage is a penalty charged by shipping lines for keeping a container inside the port past the allowed free days (3-7 days). Detention is charged for keeping the container empty outside the port past free return limits.",
  lithium: "Lithium batteries are classified as Class 9 Miscellaneous Dangerous Goods. Under IATA rules, they require UN packaging, specific security labels, and a Shipper's Declaration for Dangerous Goods (DGD).",
  help: "Ask me questions like:\n- 'How is volumetric weight calculated?'\n- 'What is the risk split under FOB?'\n- 'Explain LCL consolidation.'\n- 'Tell me about demurrage vs detention.'"
};

let isNexusAiChatInitialized = false;

function initNexusAIChat() {
  const sendBtn = document.getElementById("chat-send-btn");
  const textInput = document.getElementById("chat-input");
  const msgArea = document.getElementById("chat-msg-area");
  
  if (!sendBtn || !textInput || !msgArea) return;

  // Guard against re-binding event listeners multiple times
  if (isNexusAiChatInitialized) return;
  isNexusAiChatInitialized = true;
  
  appendChatMessage("system", SHIPPING_BOT_ANSWERS.greeting);
  conversationHistory.push({ role: "model", parts: [{ text: SHIPPING_BOT_ANSWERS.greeting }] });
  
  sendBtn.addEventListener("click", () => {
    handleUserChatMessage();
  });
  
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserChatMessage();
    }
  });
  
  const presetBtns = document.querySelectorAll(".chat-preset-query");
  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      textInput.value = btn.textContent.trim();
      handleUserChatMessage();
    });
  });
}

function appendChatMessage(sender, text) {
  const msgArea = document.getElementById("chat-msg-area");
  if (!msgArea) return;
  
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${sender}`;
  
  const avatar = document.createElement("div");
  avatar.className = `chat-avatar ${sender}`;
  
  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  
  if (text === "... reasoning") {
    bubble.innerHTML = `
      <div class="typing-indicator" style="font-style: italic; color: var(--primary-navy); opacity: 0.8; font-size: 0.9rem; font-weight: 600;">
        Thinking <span></span><span></span><span></span>
      </div>
    `;
  } else {
    bubble.innerHTML = parseMarkdown(text);
  }
  
  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  
  msgArea.appendChild(msgDiv);
  msgArea.scrollTop = msgArea.scrollHeight;
}

// XSS Sanitizer — strips dangerous HTML/JS from AI output before rendering
function sanitizeForDisplay(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?\/?>|<\/embed>/gi, '')
    .replace(/<link[\s\S]*?\/?>|<\/link>/gi, '')
    .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\bon\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript\s*:/gi, 'blocked:')
    .replace(/data\s*:\s*text\/html/gi, 'blocked:')
    .replace(/vbscript\s*:/gi, 'blocked:');
}

// Custom lightweight Markdown-to-HTML parser
function parseMarkdown(text) {
  // Sanitize input to prevent XSS before parsing
  text = sanitizeForDisplay(text);
  let lines = text.split("\n");
  let html = [];
  let inList = false;
  let inTable = false;
  let tableHeaderParsed = false;
  let tableRows = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // 1. Table Parsing
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableHeaderParsed = false;
        tableRows = [];
      }
      
      let cells = line.split("|").map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // Skip markdown divider lines like |---|---|
      if (cells.every(c => c.match(/^[-:]+$/))) {
        tableHeaderParsed = true;
        continue;
      }
      
      tableRows.push({ cells, isHeader: !tableHeaderParsed });
      continue;
    } else {
      if (inTable) {
        // Output accumulated table
        let tableHTML = '<table>';
        let hasHeader = tableRows.some(r => r.isHeader);
        
        if (hasHeader) {
          tableHTML += '<thead>';
          tableRows.filter(r => r.isHeader).forEach(r => {
            tableHTML += '<tr>' + r.cells.map(c => `<th>${parseInlineMarkdown(c)}</th>`).join('') + '</tr>';
          });
          tableHTML += '</thead>';
        }
        
        tableHTML += '<tbody>';
        tableRows.filter(r => !r.isHeader).forEach(r => {
          tableHTML += '<tr>' + r.cells.map(c => `<td>${parseInlineMarkdown(c)}</td>`).join('') + '</tr>';
        });
        tableHTML += '</tbody></table>';
        
        html.push(tableHTML);
        inTable = false;
      }
    }
    
    // 2. Lists Parsing
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) {
        inList = true;
        html.push("<ul>");
      }
      let content = line.substring(2);
      html.push(`<li>${parseInlineMarkdown(content)}</li>`);
      continue;
    } else {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    }
    
    // 3. Headers
    if (line.startsWith("### ")) {
      html.push(`<h3>${parseInlineMarkdown(line.substring(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      html.push(`<h2>${parseInlineMarkdown(line.substring(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      html.push(`<h1>${parseInlineMarkdown(line.substring(2))}</h1>`);
      continue;
    }
    
    // 4. Paragraph
    if (line !== "") {
      html.push(`<p>${parseInlineMarkdown(line)}</p>`);
    } else if (html.length > 0 && html[html.length - 1] !== "<br>") {
      html.push("<br>");
    }
  }
  
  // Close trailing blocks
  if (inTable) {
    let tableHTML = '<table><tbody>';
    tableRows.forEach(r => {
      tableHTML += '<tr>' + r.cells.map(c => `<td>${parseInlineMarkdown(c)}</td>`).join('') + '</tr>';
    });
    tableHTML += '</tbody></table>';
    html.push(tableHTML);
  }
  if (inList) {
    html.push("</ul>");
  }
  
  return html.join("\n");
}

function parseInlineMarkdown(text) {
  // Bold
  let parsed = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic
  parsed = parsed.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Inline Code
  parsed = parsed.replace(/`(.*?)`/g, "<code>$1</code>");
  return parsed;
}


async function handleUserChatMessage() {
  const textInput = document.getElementById("chat-input");
  const query = textInput.value.trim();
  if (query === "") return;
  
  appendChatMessage("user", query);
  textInput.value = "";
  
  conversationHistory.push({ role: "user", parts: [{ text: query }] });
  
  appendChatMessage("system", "... reasoning");
  const typingMsg = document.querySelector(".chat-message.system:last-child");
  
  setTimeout(async () => {
    try {
      // 1. Primary Engine: Vercel Serverless (platform GEMINI_API_KEY — no user key needed)
      const responseText = await callVercelAPI();
      if (typingMsg) typingMsg.remove();
      appendChatMessage("system", responseText);
      conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
    } catch (err) {
      console.warn("Vercel API unavailable, trying free AI proxy...", err);
      try {
        // 2. Secondary Engine: Pollinations Free AI (keyless)
        const responseText = await callFreeAI();
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", responseText);
        conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
      } catch (err2) {
        // 3. Offline Fallback: Local Knowledge Engine
        const fallbackMsg = getLocalConversationalResponse(query);
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", fallbackMsg);
        conversationHistory.push({ role: "model", parts: [{ text: fallbackMsg }] });
      }
    }
  }, 400);
}

// Keyless Free AI proxy call
async function callFreeAI() {
  const systemText = NEXUS_AI_SYSTEM_PROMPT;
  
  const messages = [
    {
      role: "system",
      content: systemText
    }
  ];

  
  let latestUserQuery = "";
  conversationHistory.forEach(msg => {
    const text = msg.parts[0].text;
    if (text.includes("... reasoning") || text.includes("... thinking") || text === "") return;
    
    if (msg.role === "user") {
      latestUserQuery = text;
    }
    
    messages.push({
      role: msg.role === "model" ? "assistant" : "user",
      content: text
    });
  });
  
  // 1. Try JSON POST payload (preserves full multi-turn conversational history)
  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });
    
    if (response.ok) {
      const resultText = await response.text();
      if (resultText && resultText.trim() !== "") {
        return resultText;
      }
    }
  } catch (e) {
    console.warn("Pollinations POST connection failed, attempting GET fallback...", e);
  }
  
  // 2. Fallback to robust GET query (guarantees completion even on CORS/POST blockages)
  const promptText = `System Context: ${systemText}\n\nUser Question: ${latestUserQuery}`;
  const encodedPrompt = encodeURIComponent(promptText);
  const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=openai`);
  
  if (!response.ok) {
    throw new Error(`GET Fallback HTTP ${response.status}`);
  }
  
  const resultText = await response.text();
  if (!resultText || resultText.trim() === "") {
    throw new Error("Empty response from AI GET fallback.");
  }
  return resultText;
}


// Local Conversational Response Engine with Stop Words Filtering & Regional Intelligence
function getLocalConversationalResponse(query) {
  const q = query.toLowerCase().trim();
  
  // 0. Chinese New Year / Spring Festival Logistics Impact Matcher
  if (q.includes("china new year") || q.includes("chinese new year") || q.includes("cny") || q.includes("spring festival") || (q.includes("china") && (q.includes("new year") || q.includes("festival") || q.includes("holiday")))) {
    return `### 🧧 Impact of Chinese New Year (CNY) on Global Shipping & Logistics\n\nChinese New Year (Spring Festival) causes the largest annual disruption to global supply chains:\n\n1. **Factory Closures & Production Halt**:\n   - Chinese manufacturing plants close for **2 to 4 weeks** (between late January and mid-February). Millions of factory workers travel home, causing a complete production standstill across China.\n\n2. **The Pre-CNY Shipping Surge (Peak Season)**:\n   - In the **4 to 6 weeks leading up to CNY**, importers and exporters rush to ship cargo before factories lock doors.\n   - **Freight Rates Surge**: Ocean and air freight spot rates spike dramatically due to intense space competition.\n   - **Equipment Shortages**: Container availability at origin ports (Shanghai, Ningbo, Shenzhen) becomes extremely tight.\n\n3. **Blank Sailings (Vessel Cancellations)**:\n   - During and immediately after CNY, ocean carriers execute widespread **Blank Sailings** (cancelling scheduled ship voyages) because export volumes drop sharply.\n\n4. **Post-CNY Recovery Period (3-4 Weeks)**:\n   - Factories take **3 to 4 weeks to return to 100% operational capacity** as migrant labor returns gradually. Shipping volumes remain sluggish until late March.\n\n💡 *Logistics Best Practice: Book cargo space at least 4 to 6 weeks BEFORE Chinese New Year to avoid rolled cargo and Peak Season Surcharges (PSS).*`;
  }
  
  // 1. Regional Freight & Airport / Seaport Intelligence Hub
  if ((q.includes("europe") || q.includes("eroupe") || q.includes("european") || q.includes("eu")) && (q.includes("airport") || q.includes("air") || q.includes("hub") || q.includes("flight") || q.includes("famous") || q.includes("detail"))) {
    return `### ✈️ Major Cargo & Passenger Airports in Europe\n\nEurope operates several of the world's most critical air freight gateways and aviation hubs:\n\n1. **Frankfurt Airport (FRA - Germany)**:\n   - Europe's busiest air cargo hub (~2.2 million tonnes annually). Primary base for Lufthansa Cargo featuring specialized GDP-certified cold-chain facilities for pharma.\n\n2. **Paris Charles de Gaulle (CDG - France)**:\n   - Major European express hub (FedEx European hub) handling over 2 million tonnes of cargo per year.\n\n3. **Amsterdam Airport Schiphol (AMS - Netherlands)**:\n   - Premier multimodal gateway connecting directly to Europe's largest seaport (Rotterdam) and Europe's rail network.\n\n4. **London Heathrow Airport (LHR - United Kingdom)**:\n   - The UK's primary air freight portal, processing over 1.5 million tonnes of high-value belly-hold cargo.\n\n5. **Luxembourg Findel Airport (LUX)**:\n   - Operational hub for Cargolux, operating strictly as a dedicated all-cargo freighter hub.\n\n💡 *Air Freight Calculation Tip: Chargeable weight is always the higher of Gross Weight or Volumetric Weight (L x W x H in cm / 6000).*`;
  }

  if ((q.includes("japan") || q.includes("tokyo") || q.includes("osaka")) && (q.includes("airport") || q.includes("air") || q.includes("hub") || q.includes("flight"))) {
    return `### ✈️ Major Air Freight Gateways in Japan\n\nJapan operates some of the world's most technologically advanced air cargo hubs:\n\n1. **Narita International Airport (NRT - Tokyo)**:\n   - Japan's primary international air cargo gateway, handling ~2 million tonnes annually.\n   - Features the **NRT Cold Chain Cluster** (temperature-regulated warehouses for pharma and fresh produce).\n2. **Tokyo Haneda Airport (HND)**:\n   - Located close to Tokyo city center; ideal for urgent express shipments and belly-hold cargo on passenger flights.\n3. **Kansai International Airport (KIX - Osaka)**:\n   - 24/7 offshore island airport serving Western Japan's electronics and biotech manufacturing sectors.\n4. **Chubu Centrair Airport (NGO - Nagoya)**:\n   - Dedicated hub for automotive parts (Toyota supply chain) and aerospace components.\n\n💡 *Air Freight Calculation Tip: Chargeable weight for Japan shipments is the higher of Gross Weight or Volumetric Weight (L x W x H in cm / 6000).*`;
  }

  if ((q.includes("japan") || q.includes("tokyo") || q.includes("yokohama") || q.includes("kobe")) && (q.includes("port") || q.includes("sea") || q.includes("ocean") || q.includes("vessel"))) {
    return `### 🚢 Major Ocean Ports in Japan\n\nJapan's container shipping is centered around key maritime clusters:\n\n- **Keihin Ports (Tokyo Bay)**: Tokyo, Yokohama, and Kawasaki ports (major import gateways for consumer goods).\n- **Hanshin Ports (Kansai)**: Kobe and Osaka ports (major industrial export hubs).\n- **Nagoya Port**: Japan's largest port by total cargo throughput, driving automobile exports.`;
  }

  if ((q.includes("sri lanka") || q.includes("colombo")) && (q.includes("customs") || q.includes("cusdec") || q.includes("clearance"))) {
    return `### 🇱🇰 Sri Lanka Customs & Trade Clearance\n\n- **CUSDEC (Customs Declaration)**: Submitted electronically via ASYCUDA World system.\n- **Primary Regulatory Approvals**: SL Tea Board (for tea exports), NMRA (National Medicines Regulatory Authority for pharma), Import & Export Control Department.\n- **Colombo Port Hub**: CICT (Colombo International Container Terminals), SAGT (South Asia Gateway Terminals), and JCT (Jaya Container Terminal).\n- **Air Cargo**: Katunayake Air Cargo Village (CMB BIA Airport).`;
  }

  if (q.includes("singapore") || q.includes("changi") || q.includes("pasir panjang")) {
    return `### 🇸🇬 Singapore Global Logistics Hub\n\n- **PSA Singapore**: The world's largest transshipment port, connecting 600+ ports globally.\n- **Changi Air Cargo Centre (SIN)**: 24/7 free trade zone with specialized cold-chain and express handling.`;
  }

  if (q.includes("dubai") || q.includes("jebel ali") || q.includes("uae")) {
    return `### 🇦🇪 Dubai & Middle East Logistics Hub\n\n- **Jebel Ali Port (DP World)**: Largest man-made harbor and premier Middle East transshipment port.\n- **Dubai Cargo City (DXB / DWC)**: Seamless sea-to-air multimodal connectivity within 4 hours.`;
  }
  
  // 2. Core Shipping Topic matchers
  if (q.includes("incoterm")) {
    currentTopicContext = "incoterms";
    return SHIPPING_BOT_ANSWERS.incoterms;
  }
  if (q.includes("fob")) {
    currentTopicContext = "fob";
    return SHIPPING_BOT_ANSWERS.fob;
  }
  if (q.includes("exw")) {
    currentTopicContext = "exw";
    return SHIPPING_BOT_ANSWERS.exw;
  }
  if (q.includes("cbm") || q.includes("cubic meter")) {
    currentTopicContext = "cbm";
    return SHIPPING_BOT_ANSWERS.cbm;
  }
  if (q.includes("volumetric") || q.includes("chargeable") || q.includes("weight")) {
    currentTopicContext = "volumetric";
    return SHIPPING_BOT_ANSWERS.volumetric;
  }
  if (q.includes("container") || q.includes("size")) {
    currentTopicContext = "container";
    return SHIPPING_BOT_ANSWERS.container;
  }
  if (q.includes("demurrage") || q.includes("detention")) {
    currentTopicContext = "demurrage";
    return SHIPPING_BOT_ANSWERS.demurrage;
  }
  if (q.includes("battery") || q.includes("lithium")) {
    currentTopicContext = "lithium";
    return SHIPPING_BOT_ANSWERS.lithium;
  }
  
  // 3. Stateful Context Reference Matches (resolving "it", "this", "who pays", "how")
  if (currentTopicContext) {
    if (q.includes("who pays") || q.includes("responsibility") || q.includes("buyer") || q.includes("seller") || q.includes("risk")) {
      if (currentTopicContext === "fob") {
        return "Under FOB: The seller pays all trucking, clearance, and port handling charges at the origin port. The buyer takes over risk and pays the ocean freight, cargo insurance, and all import port duties/fees.";
      }
      if (currentTopicContext === "exw") {
        return "Under EXW: The buyer pays for everything from origin pickup onward. The seller pays nothing once cargo is ready at their warehouse door.";
      }
      if (currentTopicContext === "incoterms") {
        return "It depends entirely on the term! Under DDP, the seller pays everything. Under EXW, the buyer pays everything. For FOB, it split at the ship's rail. Which term are you assessing?";
      }
    }
    
    if (q.includes("how to calculate") || q.includes("formula") || q.includes("math")) {
      if (currentTopicContext === "cbm") {
        return "The formula is: Length (m) x Width (m) x Height (m) x Quantity = Total CBM. Do you have dimensions to run?";
      }
      if (currentTopicContext === "volumetric") {
        return "For Air Cargo: (Length x Width x Height in cm) / 6000. For Sea LCL: 1 CBM is equivalent to 1000 kg (1 Ton).";
      }
    }
    
    if (q.includes("what sizes") || q.includes("capacity") || q.includes("dimension")) {
      if (currentTopicContext === "container") {
        return "A standard 20ft Dry fits ~28-30 CBM cargo. A 40ft Dry fits ~58-65 CBM. A 40ft High Cube goes up to ~68-75 CBM volume capacity.";
      }
    }
  }
  
  // 4. Greetings and Help
  if (/\b(hi|hello|hey|greetings|howdy)\b/i.test(q)) {
    return SHIPPING_BOT_ANSWERS.greeting;
  }
  if (q.includes("help") || q.includes("list")) {
    return SHIPPING_BOT_ANSWERS.help;
  }
  
  // 5. Standalone Conversational Freight AI Engine (Trade Lanes, Routes, Customs, Regulations)
  if ((q.includes("china") || q.includes("asia")) && (q.includes("usa") || q.includes("america") || q.includes("us") || q.includes("transpacific"))) {
    return `### 🌐 Transpacific Shipping Corridor (China & Asia to USA)\n\nThe Transpacific container shipping lane is the highest-volume maritime trade corridor in the world:\n\n1. **US West Coast (USWC)**:\n   - **Primary Ports**: Los Angeles (LA), Long Beach (LB), Oakland, Seattle/Tacoma.\n   - **Transit Time**: 12 to 16 days direct ocean transit from Shanghai/Ningbo/Shenzhen.\n\n2. **US East Coast (USEC)**:\n   - **Primary Ports**: New York / New Jersey, Savannah, Charleston, Norfolk (routed via the Panama Canal).\n   - **Transit Time**: 24 to 32 days ocean transit.\n\n3. **Intermodal Landbridge (MLB / IPI)**:\n   - Cargo Discharges at USWC ports and moves by rail (BNSF / Union Pacific) to inland hubs like Chicago, Dallas, Memphis, and Atlanta.\n\n4. **Key Customs Compliance Requirements**:\n   - **ISF 10+2 Filing**: Must be filed with US Customs (CBP) at least 24 hours BEFORE cargo is loaded on the ship at origin.\n   - **Section 301 Tariffs**: Import tariffs applicable to Chinese-origin goods.\n   - **AMS (Automated Manifest System)**: Transmitted by carriers before vessel departure.`;
  }

  if ((q.includes("china") || q.includes("asia")) && (q.includes("europe") || q.includes("uk") || q.includes("eu") || q.includes("suez"))) {
    return `### 🇪🇺 Far East to Europe Trade Lane (FEWB)\n\nThe Asia-Europe trade lane connects East Asian manufacturing hubs to European consumer markets:\n\n1. **Key Routing & Transit Times**:\n   - **Via Suez Canal**: 25-30 days to Northern Europe (Rotterdam, Hamburg, Antwerp, Felixstowe) and Mediterranean (Valencia, Piraeus).\n   - **Via Cape of Good Hope (Red Sea Bypass)**: Adds ~10-14 days due to rerouting around Southern Africa.\n\n2. **Major Alliances**: Ocean Alliance, 2M, Premier Alliance.\n\n3. **Customs & Rules**: ICS2 (Import Control System 2) pre-arrival security declarations, EORI number requirement, and EU Customs Duties.`;
  }

  if (q.includes("trade lane") || q.includes("shipping lane") || q.includes("corridor") || q.includes("route")) {
    return `### 🌐 Major Global Trade Lanes\n\n1. **Transpacific (Asia - North America)**: Largest volume lane connecting China/SE Asia to US West/East Coasts.\n2. **Asia - Europe (FEWB)**: Major consumer goods route passing through the Strait of Malacca, Red Sea/Suez, and Mediterranean.\n3. **Transatlantic (Europe - North America)**: Connects Northern Europe to US East Coast (NY/NJ, Savannah).\n4. **Intra-Asia**: Fastest growing trade corridor connecting China, Vietnam, Thailand, Malaysia, Singapore, India, and Sri Lanka.`;
  }

  if (q.includes("free trade") || q.includes("fta") || q.includes("tariff") || q.includes("duty free")) {
    return `### 📜 Free Trade Agreements (FTAs) & Tariff Preferences\n\nFree Trade Agreements reduce or eliminate customs import tariffs between member nations:\n\n1. **Rules of Origin**: Products must qualify as "originating goods" under specific Regional Value Content (RVC) or Change in Tariff Classification (CTC) rules.\n2. **Proof of Origin**: Exporters must obtain official Certificates of Origin (e.g., Form A, Form E, EUR.1, or RCEP Certificate).\n3. **Major Global FTAs**: RCEP (Asia-Pacific), USMCA (US-Mexico-Canada), CPTPP, EU-Singapore FTA, SAFTA (South Asia).`;
  }

  if (q.includes("bill of lading") || q.includes("bl") || q.includes("hawb") || q.includes("mawb") || q.includes("lading")) {
    return `### 📄 Bill of Lading (B/L) & Air Waybill (AWB) Guide\n\n1. **Ocean Bill of Lading (B/L)**:\n   - **Master B/L (MBL)**: Issued by the ocean shipping line to the freight forwarder.\n   - **House B/L (HBL)**: Issued by the freight forwarder to the actual shipper/consignee.\n   - **Document Types**: Negotiable Original B/L (requires 3 originals surrendered), Express Release / Sea Waybill (no physical originals needed), Telex Release.\n\n2. **Air Waybill (AWB)**:\n   - **MAWB**: Issued by the airline.\n   - **HAWB**: Issued by the forwarder.\n   - *Note: AWBs are strictly non-negotiable transport contracts (never document of title).*`;
  }



  // Dynamic fallback: Search Knowledge Base context
  const kbContext = getRelevantKnowledgeContext(query);
  if (kbContext) {
    // Strip prefix labels, keep actual content text for clean conversational output
    const cleanLines = kbContext
      .split('\n')
      .map(line => {
        if (line.startsWith('[Topic:')) return null;
        if (line.startsWith('Summary: ')) return line.slice(9).trim();
        if (line.startsWith('Content: ')) return line.slice(9).trim();
        return line.trim() || null;
      })
      .filter(line => line !== null && line.length > 5)
      .join('\n\n')
      .trim();
    return `### 🌐 Nexus Freight Intelligence\n\nRegarding **"${query}"**:\n\n${cleanLines}\n\n💡 *You are currently in offline mode. Connect to the internet for full AI-powered analysis.*`;
  }

  return `### 🌐 Global Freight & Logistics Intelligence\n\nRegarding your query (**"${query}"**):\n\nGlobal freight forwarding encompasses **Air Freight**, **Ocean Freight (FCL/LCL)**, **Inland Trucking**, and **Customs Compliance**:\n\n- **Air Freight**: Fast transit (1-5 days) charged on Volumetric Weight \`(L x W x H in cm / 6000)\` or Gross Weight.\n- **Ocean Freight**: Economical bulk shipping via 20ft/40ft containers or LCL consolidation.\n- **Customs & Compliance**: Requires Commercial Invoice, Packing List, Bill of Lading / Air Waybill, and Harmonized System (HS) Codes.\n\n*Please specify any airport, seaport, trade lane, or calculation details you would like to explore further!*`;
}



// RAG Knowledge Base Retrieval Function
function getRelevantKnowledgeContext(userQuery) {
  const kbData = getKBData();
  if (!kbData || !kbData.categories) return "";
  
  const q = (userQuery || "").toLowerCase();
  const words = q.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 2 && !['what', 'how', 'why', 'when', 'where', 'which', 'who', 'the', 'and', 'for', 'can', 'you', 'tell', 'about', 'with', 'does', 'this', 'that', 'from'].includes(w));
  
  if (words.length === 0) return "";
  
  let matches = [];
  
  kbData.categories.forEach(cat => {
    cat.subtopics.forEach(sub => {
      let score = 0;
      const titleLower = (sub.title || "").toLowerCase();
      const summaryLower = (sub.summary || "").toLowerCase();
      const contentLower = (sub.content || "").toLowerCase();
      
      words.forEach(word => {
        if (titleLower.includes(word)) score += 5;
        if (summaryLower.includes(word)) score += 3;
        if (contentLower.includes(word)) score += 1;
      });
      
      if (score > 0) {
        matches.push({
          category: cat.title,
          title: sub.title,
          summary: sub.summary,
          snippet: sub.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 450),
          score: score
        });
      }
    });
  });
  
  matches.sort((a, b) => b.score - a.score);
  const topMatches = matches.slice(0, 3);
  
  if (topMatches.length === 0) return "";
  
  return topMatches.map(m => `[Topic: ${m.category} -> Subtopic: ${m.title}]\nSummary: ${m.summary}\nContent: ${m.snippet}...`).join("\n\n");
}

// Vercel Serverless AI Call — Primary AI Engine (uses server-side GEMINI_API_KEY env var)
async function callVercelAPI() {
  let cleanHistory = [];
  let lastRole = null;
  let latestUserQuery = "";

  conversationHistory.forEach(msg => {
    const text = msg.parts[0].text;
    if (text.includes("... reasoning") || text.includes("... thinking") || text === "") return;
    let role = msg.role === "system" ? "model" : msg.role;
    if (msg.role === "user") latestUserQuery = text;
    if (lastRole === role) {
      cleanHistory[cleanHistory.length - 1].parts[0].text += "\n" + text;
    } else {
      cleanHistory.push({ role, parts: [{ text }] });
      lastRole = role;
    }
  });

  if (cleanHistory.length > 0 && cleanHistory[0].role === "model") cleanHistory = cleanHistory.slice(1);
  if (cleanHistory.length === 0) cleanHistory.push({ role: "user", parts: [{ text: "Hello" }] });

  const ragContext = getRelevantKnowledgeContext(latestUserQuery);
  let systemPromptText = NEXUS_AI_SYSTEM_PROMPT;
  if (ragContext) {
    systemPromptText += `\n\n[RELEVANT KNOWLEDGE BASE CONTEXT]:\n${ragContext}\n\nUse this context to ground your answer accurately. DO NOT output the raw context — synthesize it into a natural expert response.`;
  }

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history: cleanHistory, systemPrompt: systemPromptText })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Vercel API HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data.text || data.text.trim() === "") throw new Error("Empty response from Vercel API");
  return data.text;
}

async function callGeminiAPI(customKey) {
  const activeKey = customKey;
  if (!activeKey) throw new Error("No Gemini API key provided");
  let cleanHistory = [];
  let lastRole = null;
  let latestUserQuery = "";
  
  conversationHistory.forEach(msg => {
    const text = msg.parts[0].text;
    if (text.includes("... reasoning") || text.includes("... thinking") || text === "") return;
    
    let role = msg.role;
    if (role === "system") {
      role = "model";
    } else if (role === "user") {
      latestUserQuery = text;
    }
    
    if (lastRole === role) {
      cleanHistory[cleanHistory.length - 1].parts[0].text += "\n" + text;
    } else {
      cleanHistory.push({
        role: role,
        parts: [{ text: text }]
      });
      lastRole = role;
    }
  });

  if (cleanHistory.length > 0 && cleanHistory[0].role === "model") {
    cleanHistory = cleanHistory.slice(1);
  }
  
  if (cleanHistory.length === 0) {
    cleanHistory.push({
      role: "user",
      parts: [{ text: "Hello" }]
    });
  }

  // Extract RAG Knowledge Base Grounding Context
  const ragContext = getRelevantKnowledgeContext(latestUserQuery);
  let systemPromptText = NEXUS_AI_SYSTEM_PROMPT;
  if (ragContext) {
    systemPromptText += `\n\n[RELEVANT PLATFORM KNOWLEDGE BASE DOMAIN DATA]:\n${ragContext}\n\nUse the above reference data to ground your educational explanation accurately.`;
  }

  // Exact Official Google Gemini REST API endpoint with URL key parameter to avoid CORS preflight blocking
  let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: cleanHistory,
      systemInstruction: {
        parts: [{ text: systemPromptText }]
      }
    })
  });
  
  // Try gemini-2.0-flash fallback if 1.5-flash returns non-200
  if (!response.ok) {
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${activeKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: cleanHistory,
        systemInstruction: {
          parts: [{ text: systemPromptText }]
        }
      })
    });
  }
  
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData.error ? errData.error.message : `HTTP ${response.status}`;
    throw new Error(errMsg);
  }
  
  const data = await response.json();
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
    return data.candidates[0].content.parts.map(p => p.text).join("");
  } else if (data.text) {
    return data.text;
  } else {
    return "Error parsing response.";
  }
}

