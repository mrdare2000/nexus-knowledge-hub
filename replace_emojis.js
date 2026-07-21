const fs = require('fs');
let content = fs.readFileSync('D:\\Antigravity Projects\\Nexus Knowldge Hub\\knowledge_base.js', 'utf8');

// Fix Main Topics (There are 12)
content = content.replace(/id: "shipping-basics",[\s\S]*?icon: "📋"/, 'id: "shipping-basics",\n      title: "1. Shipping Basics",\n      description: "For beginners and internal team training.",\n      icon: "📦"');
content = content.replace(/id: "ocean-freight",[\s\S]*?icon: "📋"/, 'id: "ocean-freight",\n      title: "2. Ocean Freight",\n      description: "Container shipping rules, terms, and routing.",\n      icon: "🚢"');
content = content.replace(/id: "air-freight",[\s\S]*?icon: "📋"/, 'id: "air-freight",\n      title: "3. Air Freight",\n      description: "Airline terms, chargeable weight, and speed.",\n      icon: "✈️"');
content = content.replace(/id: "trade-incoterms",[\s\S]*?icon: "📋"/, 'id: "trade-incoterms",\n      title: "4. Trade & Incoterms",\n      description: "FOB, CIF, EXW, DDP obligations.",\n      icon: "⚖️"');
content = content.replace(/id: "customs-compliance",[\s\S]*?icon: "📋"/, 'id: "customs-compliance",\n      title: "5. Customs & Compliance",\n      description: "Border control and taxation.",\n      icon: "🛂"');
content = content.replace(/id: "documentation",[\s\S]*?icon: "📋"/, 'id: "documentation",\n      title: "6. Documentation",\n      description: "B/L, Commercial Invoices, Packing Lists.",\n      icon: "📄"');
content = content.replace(/id: "pricing-and-rates",[\s\S]*?icon: "📋"/, 'id: "pricing-and-rates",\n      title: "7. Pricing and Rate Knowledge",\n      description: "How to quote, calculate margins, and read tariffs.",\n      icon: "💵"');
content = content.replace(/id: "warehouse-logistics",[\s\S]*?icon: "📋"/, 'id: "warehouse-logistics",\n      title: "8. Warehouse & Logistics",\n      description: "Storage, cross-docking, and inventory.",\n      icon: "🏢"');
content = content.replace(/id: "special-cargo",[\s\S]*?icon: "📋"/, 'id: "special-cargo",\n      title: "9. Special Cargo Handling",\n      description: "Dangerous goods, heavy lift, and perishables.",\n      icon: "⚠️"');
content = content.replace(/id: "major-trade-lanes",[\s\S]*?icon: "📋"/, 'id: "major-trade-lanes",\n      title: "10. Major Trade Lanes",\n      description: "Key global shipping routes.",\n      icon: "🗺️"');
content = content.replace(/id: "process-flows",[\s\S]*?icon: "📋"/, 'id: "process-flows",\n      title: "11. Process Flows and SOPs",\n      description: "Very useful for internal training.",\n      icon: "🔄"');
content = content.replace(/id: "glossary",[\s\S]*?icon: "📋"/, 'id: "glossary",\n      title: "12. Glossary and Quick Reference",\n      description: "Best for search and indexing.",\n      icon: "📖"');


// Smart regex replacements for ✅ based on context
const replacements = [
    { regex: /✅(?=\s*(Ocean|FCL|LCL|Vessel|Ship|Port|Sea|Maritime|Container|B\/L|Bill of Lading))/gi, emoji: '🚢' },
    { regex: /✅(?=\s*(Air|IATA|ULD|Flight|Airport|AWB|Aircraft))/gi, emoji: '✈️' },
    { regex: /✅(?=\s*(Customs|Clearance|Tariff|Border|Compliance|HS Code))/gi, emoji: '🛂' },
    { regex: /✅(?=\s*(Warehouse|Storage|CFS|Bonded|Inventory|Facility))/gi, emoji: '🏢' },
    { regex: /✅(?=\s*(Dangerous|Hazardous|DGR|Risk|Warning|Critical|Catch|Hold|Penalty|Fine))/gi, emoji: '⚠️' },
    { regex: /✅(?=\s*(Temperature|Reefer|Cold|Perishable|Freeze))/gi, emoji: '❄️' },
    { regex: /✅(?=\s*(Document|Invoice|Packing List|Form|Paperwork|Certificate|Declaration|Template))/gi, emoji: '📄' },
    { regex: /✅(?=\s*(Calculate|Formula|Cost|Price|Rate|Margin|Profit|Fee|Charge))/gi, emoji: '💰' },
    { regex: /✅(?=\s*(Route|Lane|Map|Geography|Transit))/gi, emoji: '🗺️' },
    { regex: /✅(?=\s*(Import|Inbound|Arrival|Destination))/gi, emoji: '📥' },
    { regex: /✅(?=\s*(Export|Outbound|Departure|Origin))/gi, emoji: '📤' },
    { regex: /✅(?=\s*(Truck|Haulage|Road|Transport|Delivery|Cartage))/gi, emoji: '🚛' },
    { regex: /✅(?=\s*(Train|Rail|Intermodal))/gi, emoji: '🚂' },
    { regex: /✅(?=\s*(USA|US|America))/gi, emoji: '🇺🇸' },
    { regex: /✅(?=\s*(China|CN|Asia))/gi, emoji: '🇨🇳' },
    { regex: /✅(?=\s*(Europe|EU))/gi, emoji: '🇪🇺' },
    { regex: /✅(?=\s*(Download|Link|Click))/gi, emoji: '⬇️' },
    { regex: /✅(?=\s*(Step|Process|Flow|Sequence|Phase|Stage))/gi, emoji: '🔄' },
    { regex: /✅(?=\s*(Time|Date|Cut-off|Deadline|Schedule))/gi, emoji: '⏳' },
    { regex: /✅(?=\s*(Security|Safe|Protect|Insurance|Liability))/gi, emoji: '🛡️' },
    { regex: /✅(?=\s*(Weight|Mass|Heavy|Ton|Kilo|Volume|CBM|Dimension))/gi, emoji: '⚖️' },
    { regex: /✅(?=\s*(Incoterm|FOB|EXW|CIF|DDP|Trade))/gi, emoji: '🤝' },
    { regex: /✅(?=\s*(Green))/gi, emoji: '🟢' },
    { regex: /✅(?=\s*(Yellow))/gi, emoji: '🟡' },
    { regex: /✅(?=\s*(Red))/gi, emoji: '🔴' },
    { regex: /✅(?=\s*(Plant|Phyto|Wood|ISPM))/gi, emoji: '🌱' },
    { regex: /✅(?=\s*(Food|Agri|Health))/gi, emoji: '🍎' },
    // General headers
    { regex: /<h4[^>]*>✅/gi, emoji: '<h4 style="margin:0 0 10px 0; color:inherit;">📌' },
    { regex: /<strong[^>]*>✅/gi, emoji: '<strong style="color:inherit;">🔹' },
    { regex: /<li>✅/gi, emoji: '<li>🔸' }
];

replacements.forEach(r => {
    content = content.replace(r.regex, r.emoji);
});

// Any remaining ✅ inside list items or spans that didn't match
content = content.replace(/✅/g, '🔸');

fs.writeFileSync('D:\\Antigravity Projects\\Nexus Knowldge Hub\\knowledge_base.js', content, 'utf8');
console.log('Smart emoji replacement complete!');
