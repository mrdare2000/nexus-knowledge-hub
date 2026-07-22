// Nexus Knowledge Hub - Core Knowledge Base Data
// This file acts as the database for the learning platform and Nexus AI context.
// 100% complete coverage of all topics and subtopics from the recommended guidelines.
// Features embedded custom SVG infographics and custom layout configurations.

var NEXUS_KNOWLEDGE_BASE = window.NEXUS_KNOWLEDGE_BASE = {
  categories: [
    {
      id: "shipping-basics",
      title: "1. Shipping Basics",
      description: "For beginners and internal team training.",
      icon: "📦",
      subtopics: [
        {
          id: "what-is-freight-forwarding",
          title: "What is Freight Forwarding?",
          summary: "A guide to how freight forwarders coordinate international logistics.",
          image: "images/what_is_freight_forwarding.png",
          content: `
            <p><strong>Freight Forwarding</strong> is the strategic coordination, management, and shipment of goods from one point to another using single or multiple carriers via ocean, air, road, or rail transit. A freight forwarder acts as a specialized intermediary between shippers and transportation services, utilizing volume agreements to secure cost-effective shipping lanes.</p>
            <h3>Core Functions of a Freight Forwarder:</h3>
            <ul>
              <li><strong>Negotiation & Carrier Booking:</strong> Securing freight space on vessels, aircraft, and cargo trucks.</li>
              <li><strong>Documentation Management:</strong> Preparing Bills of Lading, Certificate of Origin, and export filings.</li>
              <li><strong>Warehousing & Packing:</strong> Storing goods securely and packaging them for ocean or air environments.</li>
              <li><strong>Customs Clearance Coordination:</strong> Navigating complex import/export tariff codes and restrictions.</li>
            </ul>
            <h3>The 6-Step Logistics Chain:</h3>
            <ol>
              <li><strong>Export Haulage:</strong> Transfer of cargo from the shipper's warehouse or factory to the forwarder's origin consolidation warehouse.</li>
              <li><strong>Export Customs Clearance:</strong> Submission of cargo declarations (e.g., CUSDEC) and commercial invoices to origin border authorities for clearance.</li>
              <li><strong>Origin Handling:</strong> Unloading, inspection, verification of cargo dimensions, and loading the cargo onto the main transport vessel or aircraft.</li>
              <li><strong>Import Customs Clearance:</strong> Destination border assessment where import duties, taxes, and cargo checks are filed and processed.</li>
              <li><strong>Destination Handling:</strong> Unloading the container from the vessel, transfer to a Container Freight Station (CFS), and sorting for individual consignees.</li>
              <li><strong>Import Haulage:</strong> Final delivery of cargo from the destination warehouse directly to the consignee's delivery premises.</li>
            </ol>
          `,
          youtube: "https://www.youtube.com/embed/vXgTvmCYdw0"
        },
        {
          id: "ocean-freight-vs-air-freight",
          title: "Ocean Freight vs Air Freight",
          summary: "Key differences in speed, cost, weight, and environmental impact.",
          image: "images/ocean_vs_air_freight.png",
          content: `
            <p>Choosing the correct transport mode is a strategic decision balancing speed, cargo characteristics, budgets, and environmental impact.</p>
            <h3>Comparison Matrix:</h3>
            <table class="kb-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Ocean Freight</th>
                  <th>Air Freight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Transit Time</strong></td>
                  <td>15 to 50 days (Slow, dependent on ports and sea conditions)</td>
                  <td>1 to 5 days (Fast, highly reliable schedules)</td>
                </tr>
                <tr>
                  <td><strong>Cost Structure</strong></td>
                  <td>Charged per CBM or container size (Very cost-effective for heavy loads)</td>
                  <td>Charged on Volumetric or Chargeable weight (High premium rates)</td>
                </tr>
                <tr>
                  <td><strong>Cargo Safety</strong></td>
                  <td>Moderate (Higher risk of moisture, salinity, movement damage)</td>
                  <td>Excellent (Minimal handling, highly secure airport terminals)</td>
                </tr>
                <tr>
                  <td><strong>CO2 Emissions</strong></td>
                  <td>Very low emissions footprint per ton-kilometer</td>
                  <td>High carbon emissions footprint</td>
                </tr>
              </tbody>
            </table>
            <h3>Deciding Factors:</h3>
            <ul>
              <li><strong>High-Value & Perishable Items:</strong> Vaccines, fresh seafood, and luxury electronics are suited for Air Freight due to time sensitivity.</li>
              <li><strong>Bulk & Heavy Cargo:</strong> Coal, steel, vehicles, and raw commodities must move via Ocean Freight to maintain cost viability.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/md86IaCB6vg"
        },
        {
          id: "fcl-vs-lcl-shipments",
          title: "FCL vs LCL Shipments",
          summary: "Understanding Full Container Loads vs Less than Container Loads.",
          image: "images/fcl_vs_lcl_shipment.png",
          content: `
            <p>Ocean freight cargo packing models are split based on shipment volumes and security requirements:</p>
            <h3>1. FCL (Full Container Load)</h3>
            <p>Under FCL, a single shipper leases and occupies the entire container. The container is packed, locked, and sealed at the shipper's warehouse, moving directly to the port without container consolidation steps.</p>
            <ul>
              <li><strong>Best for:</strong> Shipments exceeding 15 CBM, or highly fragile goods requiring dedicated space.</li>
              <li><strong>Pros:</strong> Faster transit (no consolidation delay), lower risk of cargo loss/mixup, and lower handling rates per unit.</li>
            </ul>
            <h3>2. LCL (Less than Container Load)</h3>
            <p>Under LCL, multiple shippers share container volume. Individual shipments are brought to a Container Freight Station (CFS) where they are sorted and consolidated (stuffed) into a single container. At destination, the container is opened at a CFS and split (de-stuffed) for delivery.</p>
            <ul>
              <li><strong>Best for:</strong> Small cargo volumes (typically 1 to 14 CBM).</li>
              <li><strong>Pros:</strong> Only pay for the exact volume used, saving shipping costs for smaller volumes.</li>
            </ul>
            <p><strong>Cost Break-Even Point:</strong> Once LCL volumes reach about 15 CBM, the CFS handling charges (per CBM fees) make LCL more expensive than renting a full 20ft container (FCL) outright, even if the container is only half full.</p>
          `,
          youtube: "https://www.youtube.com/embed/G6jWl1oZ-bA"
        },
        {
          id: "export-import-cross-trade",
          title: "Export, Import and Cross Trade",
          summary: "Directional logistics flows and managing third-country shipments.",
          image: "images/export_import_cross_trade.png",
          content: `
            <p>International shipping flows are structured based on the locations of the buyer, the seller, and the cargo origin:</p>
            <h3>1. Export Shipments</h3>
            <p>The transport of cargo out of the national territory of the shipper. Requires local export customs declarations (e.g. CUSDEC), export compliance inspections, and local port origin clearances.</p>
            <h3>2. Import Shipments</h3>
            <p>The entry of foreign cargo into the national territory. Focuses on destination handling, customs clearance checks, calculation of import tariffs, duties, sales tax, and final local container haulage.</p>
            <h3>3. Cross Trade (Triangular Shipments)</h3>
            <p>Cross Trade describes cargo shipped from Country A (Origin) to Country B (Destination), where the commercial contract is managed and billed by a freight forwarder in Country C (Intermediary). The physical cargo never enters Country C.</p>
            <ul>
              <li><strong>Confidentiality Challenge:</strong> The intermediary shipper in Country C does not want the buyer in Country B to know the supplier in Country A (or vice versa) to protect their margins.</li>
              <li><strong>Switch Bill of Lading Solution:</strong> The forwarder issues a second set of Bills of Lading (Switch B/L) at Country C, replacing the origin shipper information with the intermediary's info before cargo arrives at destination.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/tM1X7H5L108"
        },
        {
          id: "key-shipping-terms-explained",
          title: "Key Shipping Terms Explained",
          summary: "Quick reference definitions for core shipping abbreviations.",
          image: "images/key_shipping_terms.png",
          content: `
            <p>Familiarity with standard international logistics acronyms is essential for clear communication:</p>
            <h3>Ports and Places:</h3>
            <ul>
              <li><strong>POL (Port of Loading):</strong> The ocean port where the container is loaded onto the vessel.</li>
              <li><strong>POD (Port of Discharge):</strong> The ocean port where the container is unloaded from the vessel.</li>
              <li><strong>CY (Container Yard):</strong> The port area where full containers are stored before loading or after unloading.</li>
              <li><strong>CFS (Container Freight Station):</strong> A warehouse facility where LCL cargo is sorted, stuffed, or de-stuffed.</li>
            </ul>
            <h3>Timelines and Status:</h3>
            <ul>
              <li><strong>ETD (Estimated Time of Departure):</strong> Scheduled departure time of the vessel/plane from origin.</li>
              <li><strong>ETA (Estimated Time of Arrival):</strong> Scheduled arrival time of the vessel/plane at destination.</li>
              <li><strong>Cut-Off Time:</strong> The final deadline by which the container or cargo must be delivered to the port terminal to make the scheduled sailing.</li>
            </ul>
            <h3>Financial Splits:</h3>
            <ul>
              <li><strong>Freight Prepaid:</strong> Shipping costs are paid by the shipper at origin.</li>
              <li><strong>Freight Collect:</strong> Shipping costs are paid by the consignee at destination.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "freight-forwarder-carrier-consignee-shipper",
          title: "Roles: Forwarder, Carrier, Consignee and Shipper Roles",
          summary: "Chain of custody and responsibilities in global transport.",
          image: "images/shipping_stakeholder_roles.png",
          content: `
            <p>Every commercial cargo shipment involves specific legal entities with divided liabilities, rights, and responsibilities:</p>
            <h3>1. Shipper (Consignor)</h3>
            <p>The party selling the goods. Responsibilities include proper cargo packing, preparing commercial invoices and packing lists, and ensuring cargo is ready for origin haulage.</p>
            <h3>2. Freight Forwarder</h3>
            <p>The logistics architect. They organize cargo tracking, book space with shipping/airlines, prepare the Bill of Lading, file customs documents, and manage local warehouses. They act as principal or agent under FIATA conditions.</p>
            <h3>3. Carrier</h3>
            <p>The physical transporter of the goods. This includes ocean shipping lines (e.g., Maersk, MSC) or air freight carriers (e.g., Qatar Cargo). Carriers issue Master Bills of Lading and carry the physical liability for transport safety.</p>
            <h3>4. Consignee</h3>
            <p>The buyer or receiver of the cargo. The consignee is responsible for clearing the import customs at destination, paying import duties/taxes, collection of delivery orders, and arranging destination haulage.</p>
          `,
          youtube: "https://www.youtube.com/embed/9g3z1wLgWuo"
        }
      ]
    },
    {
      id: "ocean-freight",
      title: "2. Ocean Freight",
      description: "Container shipping rules, terms, and routing.",
      icon: "🚢",
      subtopics: [
        {
          id: "types-of-shipping-containers",
          title: "Types of Shipping Containers",
          summary: "An overview of container equipment types used in sea shipping.",
          image: "images/ocean_containers.png",
          content: `
            <p>Choosing the correct shipping container is vital to protect cargo integrity and minimize deadweight transport costs. Standard container designs are classified under international ISO standards:</p>
            <h3>1. Dry Van / General Purpose (DV/GP)</h3>
            <p>Standard fully enclosed containers with rigid walls, roof, and end doors. Used for dry general cargo like textiles, packaged consumer products, paper, and dry bulk items.</p>
            <h3>2. Reefer Container (RF)</h3>
            <p>Thermally insulated containers equipped with an integrated refrigeration compressor unit powered by the vessel's electrical grid. Designed to transport perishables, food items, chemicals, and pharmaceutical drugs at temperature ranges from -30°C to +30°C.</p>
            <h3>3. Open Top Container (OT)</h3>
            <p>Features a removable tarpaulin roof rather than a solid metal ceiling. Ideal for loading oversized cargo (like heavy steel beams, machinery, logs) from above using overhead cranes.</p>
            <h3>4. Flat Rack Container (FR)</h3>
            <p>Features collapsible flat bulkheads at both ends and lacks side walls. Designed to transport Out-of-Gauge (OOG) machinery, yachts, boilers, and heavy vehicles that exceed standard container width and height limits.</p>
            <h3>5. ISO Tank Container</h3>
            <p>A cylindrical steel tank mounted within a standard 20ft container frame. Designed for bulk transport of food-grade liquids, spirits, gases, and dangerous chemicals.</p>
          `,
          youtube: "https://www.youtube.com/embed/t-6Qx4_4G7k"
        },
        {
          id: "container-sizes-specifications",
          title: "Container Sizes and Specifications",
          summary: "Internal metrics, tare, and payloads for ocean equipment.",
          image: "images/ocean_containers.png",
          layoutType: "infographic",
          content: `
            <p>Understanding internal dimensions and load limitations is critical to calculate CBM capacity and avoid overloading violations:</p>
            <table class="kb-table">
              <thead>
                <tr>
                  <th>Metric / Dimension</th>
                  <th>20ft Dry Van</th>
                  <th>40ft Dry Van</th>
                  <th>40ft High Cube (HC)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Internal Length</strong></td>
                  <td>5.90 m (19.4 ft)</td>
                  <td>12.03 m (39.5 ft)</td>
                  <td>12.03 m (39.5 ft)</td>
                </tr>
                <tr>
                  <td><strong>Internal Width</strong></td>
                  <td>2.35 m (7.8 ft)</td>
                  <td>2.35 m (7.8 ft)</td>
                  <td>2.35 m (7.8 ft)</td>
                </tr>
                <tr>
                  <td><strong>Internal Height</strong></td>
                  <td>2.39 m (7.9 ft)</td>
                  <td>2.39 m (7.9 ft)</td>
                  <td>2.69 m (8.9 ft)</td>
                </tr>
                <tr>
                  <td><strong>Usable Volume</strong></td>
                  <td>~33.2 CBM</td>
                  <td>~67.7 CBM</td>
                  <td>~76.4 CBM</td>
                </tr>
                <tr>
                  <td><strong>Tare Weight</strong></td>
                  <td>2,200 kg (4,850 lbs)</td>
                  <td>3,700 kg (8,160 lbs)</td>
                  <td>3,900 kg (8,600 lbs)</td>
                </tr>
                <tr>
                  <td><strong>Max Cargo Payload</strong></td>
                  <td>28,280 kg (62,350 lbs)</td>
                  <td>26,780 kg (59,040 lbs)</td>
                  <td>26,580 kg (58,600 lbs)</td>
                </tr>
              </tbody>
            </table>
            <p><strong>Note:</strong> While a 40ft container is double the length of a 20ft container, its maximum cargo weight payload is actually slightly <em>lower</em> because the weight of the larger steel container body (Tare Weight) reduces the allowable cargo limit.</p>
          `,
          youtube: "https://www.youtube.com/embed/z1XoD9p6WlA",
          linkToWidget: "containers"
        },
        {
          id: "fcl-shipping-process",
          title: "FCL Shipping Process",
          summary: "Step-by-step Full Container Load logistics steps.",
          image: "images/ocean_shipping_process.png",
          content: `
            <p>The Full Container Load (FCL) process follows a structured logistical flow to ensure security and speed:</p>
            <h3>FCL Step-by-Step Flowchart:</h3>
            <ol>
              <li><strong>Booking Confirmation:</strong> The shipper sends details to the forwarder, who books space on a vessel. A Booking Confirmation (BC) with container release instructions is issued.</li>
              <li><strong>Container Release:</strong> Haulage truck picks up the empty container from the port container yard/depot and transports it to the shipper's factory.</li>
              <li><strong>Stuffing and Sealing:</strong> The shipper loads the goods inside, balances the cargo, and secures it. A high-security bolt seal (complying with ISO 17712) is locked on the container door.</li>
              <li><strong>Customs Gate-In:</strong> The truck hauls the sealed container to the port terminal. Export customs clearance (CUSDEC filing) is completed.</li>
              <li><strong>Ocean Passage:</strong> The port gantry cranes load the container onto the vessel for sea transit. The forwarder issues a Bill of Lading (B/L).</li>
              <li><strong>Discharge & Import:</strong> At destination port, the container is unloaded. Import customs are cleared, duties paid, and the container is hauled to the consignee's warehouse for final unloading.</li>
            </ol>
          `,
          youtube: "https://www.youtube.com/embed/z1XoD9p6WlA"
        },
        {
          id: "lcl-shipping-process",
          title: "LCL Shipping Process",
          summary: "Less-than-container consolidation and CFS handling guides.",
          image: "images/ocean_shipping_process.png",
          content: `
            <p>When a shipper's cargo does not fill a full container, Less than Container Load (LCL) consolidation is used to share costs:</p>
            <h3>LCL Consolidation Process:</h3>
            <ol>
              <li><strong>Delivery to CFS:</strong> The shipper delivers loose boxes or pallets to the freight forwarder's designated origin Container Freight Station (CFS).</li>
              <li><strong>Receipt & Measurement:</strong> CFS personnel verify the cargo dimensions, weight, and check for any physical damage. A Cargo Receipt is issued.</li>
              <li><strong>Stuffing (Consolidation):</strong> The forwarder group consolidates cargo from multiple shippers going to the same destination port, packing them together into a shared container.</li>
              <li><strong>Ocean Voyage:</strong> The container undergoes standard export clearance, terminal loading, and ocean transit.</li>
              <li><strong>De-stuffing (Deconsolidation):</strong> At the destination port CFS, the container seal is broken. Workers unload the container and split the individual packages according to their House Bills of Lading.</li>
              <li><strong>Consignee Release:</strong> Individual consignees collect their respective cargo from the CFS after paying local handling fees.</li>
            </ol>
          `,
          youtube: "https://www.youtube.com/embed/j1uS1D_P2X8"
        },
        {
          id: "container-loading-basics",
          title: "Container Loading Basics",
          summary: "Weight distribution, dunnage, and lashing protocols.",
          image: "images/ocean_containers.png",
          content: `
            <p>Improper cargo stuffing leads to container damage, vessel imbalances, and severe accidents at sea. Follow these core loading protocols:</p>
            <h3>1. Uniform Weight Distribution</h3>
            <p>Do not concentrate heavy weights in one corner or in the center. Spread cargo weight evenly across the entire floor plan. Ensure the center of gravity aligns closely with the center of the container.</p>
            <h3>2. Lashing & Securing</h3>
            <p>Use tie-down straps, ropes, or chains attached directly to the steel D-rings built into the container floor corners. This prevents longitudinal and lateral movement during ship pitching.</p>
            <h3>3. Dunnage Utilization</h3>
            <p>Fill voids and empty gaps between cargo items using inflatable dunnage air bags, wood blocks, or packaging foam. Empty gaps allow cargo to shift and crash, damaging adjacent boxes.</p>
            <h3>4. Packing Order</h3>
            <p>Always place heavy items on the bottom and light items on top. Never stack heavy cargo on top of fragile boxes. Keep liquid drums upright and isolate them from dry, moisture-absorbent goods.</p>
          `,
          youtube: "https://www.youtube.com/embed/t-6Qx4_4G7k"
        },
        {
          id: "ocean-freight-routing",
          title: "Ocean Freight Routing",
          summary: "Global shipping lanes, hub-and-spoke networks.",
          image: "images/ocean_routing.png",
          content: `
            <p>Ocean networks use a hub-and-spoke routing model to achieve economies of scale and optimize vessel space:</p>
            <h3>Main Maritime Routes:</h3>
            <ul>
              <li><strong>Transpacific:</strong> Connecting manufacturing centers in East Asia (China, Japan) with North American West Coast ports.</li>
              <li><strong>Asia-Europe:</strong> Passing through the South China Sea, Malacca Strait, Indian Ocean, Suez Canal, and the Mediterranean Sea to reach Northern Europe.</li>
              <li><strong>Transatlantic:</strong> Connecting European hub ports with North American East Coast terminals.</li>
            </ul>
            <h3>The Hub-and-Spoke System:</h3>
            <p>Mega containerships (carrying 18,000+ TEUs) operate main loop routes, docking only at massive deep-water transshipment hubs (e.g., Singapore, Shanghai, Colombo, Rotterdam). Smaller regional feeder vessels then transport containers from these hubs to smaller local ports (spokes).</p>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "transshipment-explained",
          title: "Transshipment Explained",
          summary: "Why cargo is moved between vessels at intermediate ports.",
          image: "images/ocean_routing.png",
          content: `
            <p><strong>Transshipment</strong> occurs when a container is discharged from one vessel at an intermediate port and subsequently loaded onto another vessel to reach its final port of discharge.</p>
            <h3>Key Reasons for Transshipment:</h3>
            <ul>
              <li><strong>No Direct Service:</strong> If the carrier has no direct shipping lane connecting Port A to Port B, they route cargo through a transshipment hub.</li>
              <li><strong>Vessel Size Optimization:</strong> Large container ships cannot dock at shallow-water ports. They transship cargo to smaller feeder vessels suited for shallow channels.</li>
              <li><strong>Consolidation:</strong> Hubs allow carriers to consolidate containers from multiple origins heading to the same destination region.</li>
            </ul>
            <p><strong>Customs Status:</strong> Transshipment cargo remains in a designated international customs zone at the port. It does not require formal import customs clearance in the transit country.</p>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "vessel-schedules-transit-times",
          title: "Vessel Schedules and Transit Times",
          summary: "Understanding cut-offs, transit duration, and blank sailings.",
          image: "images/ocean_routing.png",
          content: `
            <p>Shipping lines coordinate port operations on strict schedules, though schedules are subject to maritime delays:</p>
            <h3>1. Scheduled Deadlines (Cut-offs)</h3>
            <ul>
              <li><strong>CY Cut-Off:</strong> The final deadline by which the loaded and sealed container must arrive at the port terminal yard. Late containers are rolled over.</li>
              <li><strong>SI Cut-Off:</strong> Shipping Instructions Cut-off. The final date by which the shipper must submit cargo descriptions and consignee details to the carrier for Bill of Lading generation.</li>
            </ul>
            <h3>2. Blank Sailing</h3>
            <p>A blank sailing occurs when a carrier cancels a scheduled vessel port call or an entire voyage route. This is used to manage shipping capacity, respond to port labor strikes, adjust for severe delays, or control freight rates during low demand periods.</p>
          `,
          youtube: "https://www.youtube.com/embed/4G1L5fBvM0w"
        },
        {
          id: "detention-demurrage-storage",
          title: "Detention, Demurrage and Storage",
          summary: "How to distinguish equipment charges and port storage fees.",
          image: "images/ocean_demurrage_challenges.png",
          content: `
            <p>Demurrage, detention, and storage penalties generate major expenses if cargo clearances are delayed. Understanding the divisions is crucial:</p>
            <h3>1. Demurrage (Port Inside)</h3>
            <p>A fee charged by the shipping line for keeping the container inside the port terminal yard past the allowed free time (typically 3 to 7 days). It covers the container equipment occupancy at the port.</p>
            <h3>2. Detention (Port Outside)</h3>
            <p>A fee charged by the shipping line for keeping the container equipment outside the port yard past the allowed return free time. This starts when the empty container is pulled out, and ends when it is returned empty to the carrier's depot.</p>
            <h3>3. Port Storage (Ground Rent)</h3>
            <p>A fee charged directly by the port terminal authority (not the shipping line) for the space occupied by the container on the ground. It is separate from demurrage fees.</p>
          `,
          youtube: "https://www.youtube.com/embed/4G1L5fBvM0w"
        },
        {
          id: "common-ocean-freight-challenges",
          title: "Common Ocean Freight Challenges",
          summary: "Congestion, blank sailings, weather delays, and capacity shortages.",
          image: "images/ocean_demurrage_challenges.png",
          content: `
            <p>Ocean freight operations require proactive risk management to counter standard logistics challenges:</p>
            <h3>1. Port Congestion</h3>
            <p>High vessel arrivals combined with labor shortages cause vessels to queue outside ports for days. This delays imports and causes truckers to face delays at terminal gates.</p>
            <h3>2. Container & Equipment Shortage</h3>
            <p>Imbalances in trade lanes cause empty containers to gather in import hubs (like Europe/USA) while manufacturing origins (like China) face container deficits.</p>
            <h3>3. Cargo Rollover</h3>
            <p>Shipping lines often overbook vessel slots. If a vessel reaches capacity, containers are rolled over to the next scheduled sailing, causing delays.</p>
            <h3>4. Blank Sailings</h3>
            <p>Frequent cancellation of schedules by shipping lines disrupts supply chain timelines and requires cargo to be re-booked with alternative carriers.</p>
          `,
          youtube: "https://www.youtube.com/embed/4G1L5fBvM0w"
        }
      ]
    },
    {
      id: "air-freight",
      title: "3. Air Freight",
      description: "Airline terms, chargeable weight, and speed.",
      icon: "✈️",
      subtopics: [
        {
          id: "inside-passenger-aircraft",
          title: "Inside a Passenger Aircraft",
          summary: "Belly holds, cargo limits, and baggage priority on passenger jets.",
          image: "images/inside_passenger_aircraft.png",
          content: `
            <p>Passenger planes play a critical role in global logistics through <strong>belly cargo</strong>. Commercial airliners utilize the pressurized, temperature-controlled compartments beneath the passenger cabin to transport substantial freight volumes.</p>
            <h3>Key Specifications & Constraints:</h3>
            <ul>
              <li><strong>Passenger Luggage Priority:</strong> Check-in bags are always loaded first. Remaining payload capacity is sold for commercial cargo.</li>
              <li><strong>Door Height Limitations:</strong> Belly doors on widebody jets (e.g., Boeing 777, Airbus A350) typically restrict cargo height to <strong>1.6 meters (63 inches)</strong>. Oversized or tall items cannot be loaded.</li>
              <li><strong>ULD Compatibility:</strong> Belly compartments primarily accept contoured <strong>AKE (LD3)</strong> containers that align with the plane's rounded hull.</li>
            </ul>
            <h3>Belly Cargo Capacity by Aircraft Model:</h3>
            <table class="kb-table">
              <thead>
                <tr style="background:#0A2540; color:#fff;">
                  <th>Aircraft Model</th>
                  <th>Max Cargo Payload</th>
                  <th>Container Capacity</th>
                  <th>Belly Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Boeing 777-300ER</strong></td>
                  <td>~20,000 kg (44,000 lbs)</td>
                  <td>14x LD3 / AKE</td>
                  <td>120 m³ (4,200 ft³)</td>
                </tr>
                <tr>
                  <td><strong>Airbus A350-900</strong></td>
                  <td>~16,000 kg (35,000 lbs)</td>
                  <td>12x LD3 / AKE</td>
                  <td>100 m³ (3,500 ft³)</td>
                </tr>
                <tr>
                  <td><strong>Boeing 787-9</strong></td>
                  <td>~15,000 kg (33,000 lbs)</td>
                  <td>10x LD3 / AKE</td>
                  <td>90 m³ (3,178 ft³)</td>
                </tr>
              </tbody>
            </table>
          `,
          youtube: "https://www.youtube.com/embed/1Bv1YyL71pE"
        },
        {
          id: "inside-cargo-aircraft",
          title: "Inside a Cargo Aircraft",
          summary: "Freighter configurations, roller beds, and nose doors.",
          image: "images/inside_cargo_aircraft.png",
          layoutType: "infographic",
          content: `
            <p>Freighters are purpose-built cargo planes. They lack passenger seats and windows, dedicating both the main upper deck and the lower belly deck to high-volume commercial shipments.</p>
            <h3>Freighter Capabilities:</h3>
            <ul>
              <li><strong>Main Deck Cargo Height:</strong> Freighters accept cargo up to <strong>3.0 meters (118 inches)</strong> high, allowing standard industrial pallets to fit on the main deck.</li>
              <li><strong>Nose-Loading Door:</strong> Models like the Boeing 747 Freighter feature an upward-swinging nose door, enabling the loading of extra-long cargo (e.g., turbine blades, drilling shafts) directly.</li>
              <li><strong>Cargo Floor Roller Beds:</strong> Main floors are fitted with motorized Power Drive Units (PDUs) and omnidirectional ball mats, allowing heavy ULDs weighing several tons to be easily rolled into position.</li>
            </ul>
            <!-- Freighter Cargo Deck SVG diagram -->
            <div style="margin: 20px 0; background-color:#F8FAFC; border:1px solid rgba(0,0,0,0.08); padding:15px; border-radius:12px; text-align:center;">
              <svg width="100%" height="150" viewBox="0 0 500 150" style="max-width:400px; margin:0 auto; display:block;">
                <path d="M50,75 C30,75 10,60 5,75 C0,85 20,110 50,110 L450,110 C470,110 490,80 495,75 L490,70 Z" fill="#E2E8F0" stroke="#0A2540" stroke-width="2"/>
                <rect x="90" y="55" width="28" height="28" fill="#FF5A1F" rx="3" stroke="#0A2540" stroke-width="1.5"/>
                <rect x="125" y="55" width="28" height="28" fill="#FF5A1F" rx="3" stroke="#0A2540" stroke-width="1.5"/>
                <rect x="160" y="55" width="28" height="28" fill="#FF5A1F" rx="3" stroke="#0A2540" stroke-width="1.5"/>
                <rect x="195" y="55" width="28" height="28" fill="#FF5A1F" rx="3" stroke="#0A2540" stroke-width="1.5"/>
                <text x="140" y="42" fill="#0A2540" font-size="11" font-family="Outfit" font-weight="700">Main Deck (High-Volume ULDs)</text>
                <rect x="130" y="90" width="18" height="12" fill="#0A2540" rx="2"/>
                <rect x="160" y="90" width="18" height="12" fill="#0A2540" rx="2"/>
                <text x="200" y="100" fill="#0A2540" font-size="9" font-family="Outfit" font-weight="700">Lower Deck (LD3 Belly hold)</text>
              </svg>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/1Bv1YyL71pE",
          linkToWidget: "aircraft"
        },
        {
          id: "air-freight-process-flow",
          title: "Air Freight Process Flow",
          summary: "Operational milestones from booking to airport delivery.",
          image: "images/air_freight_process_flow.png",
          content: `
            <p>Air cargo shipments follow a strict time-sensitive process flow. The entire transit timeline is optimized to minimize terminal ground delays at ports.</p>
            
            <div class="sop-timeline" style="margin: 20px 0;">
              <div class="sop-step" style="border-left: 4px solid #FF5A1F; padding-left: 15px; margin-bottom: 15px;">
                <span style="font-weight:700; color:#FF5A1F; font-size:1.1rem; display:block;">Phase 1: Origin Operations & Booking</span>
                <p style="margin:5px 0 0 0; font-size:0.9rem;">Freight booked with airline $\rightarrow$ Cargo received at agent warehouse $\rightarrow$ Dimension and weight audit $\rightarrow$ Security screening (X-ray or dual-view scanner).</p>
              </div>
              <div class="sop-step" style="border-left: 4px solid #0A2540; padding-left: 15px; margin-bottom: 15px;">
                <span style="font-weight:700; color:#0A2540; font-size:1.1rem; display:block;">Phase 2: Terminal Handover & Loading</span>
                <p style="margin:5px 0 0 0; font-size:0.9rem;">Cargo delivered to airline GHA (Ground Handling Agent) $\rightarrow$ Customs export release $\rightarrow$ Stuffing onto air pallets/containers (ULDs) $\rightarrow$ Manifest generation $\rightarrow$ Loading onto plane deck.</p>
              </div>
              <div class="sop-step" style="border-left: 4px solid #FF5A1F; padding-left: 15px;">
                <span style="font-weight:700; color:#FF5A1F; font-size:1.1rem; display:block;">Phase 3: Destination Discharge & Customs</span>
                <p style="margin:5px 0 0 0; font-size:0.9rem;">Flight landing $\rightarrow$ ULD breakdown at destination GHA warehouse $\rightarrow$ Import customs clearance via broker $\rightarrow$ Terminal release (DO) $\rightarrow$ Final local truck delivery to consignee.</p>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "chargeable-weight-explained",
          title: "Chargeable Weight Explained",
          summary: "How airlines compare volume and gross weight.",
          image: "images/chargeable_weight_explained.png",
          content: `
            <p>Air transport space is finite. Airlines charge based on whichever is greater: the physical cargo weight or the volume occupied. This prevents light but bulky goods (e.g. Styrofoam cups or cotton) from taking up plane space without contributing to revenue.</p>
            <h3>The Core Charging Rule:</h3>
            <p style="background:#F8FAFC; border-left:4px solid #FF5A1F; padding:12px; font-weight:700; font-size:1rem; text-align:center;">
              Chargeable Weight = Max(Gross Weight, Volumetric Weight)
            </p>
            
            <!-- Chargeable weight comparison grid -->
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; font-size:0.9rem;">
              <div style="border: 1px solid rgba(0,0,0,0.08); padding: 12px; border-radius: 8px; background:#fff;">
                <strong style="color:#0A2540; display:block; margin-bottom:5px;">Scenario A: Heavy Cargo (Iron Sheets)</strong>
                <p style="margin:0;">Actual Weight: <strong>1,200 kg</strong></p>
                <p style="margin:0;">Volumetric Weight: <strong>350 kg</strong></p>
                <p style="margin:5px 0 0 0; color:#FF5A1F; font-weight:700;">Chargeable Basis: 1,200 kg (Gross)</p>
              </div>
              <div style="border: 1px solid rgba(0,0,0,0.08); padding: 12px; border-radius: 8px; background:#fff;">
                <strong style="color:#0A2540; display:block; margin-bottom:5px;">Scenario B: Bulky Cargo (Plastic Toys)</strong>
                <p style="margin:0;">Actual Weight: <strong>400 kg</strong></p>
                <p style="margin:0;">Volumetric Weight: <strong>1,150 kg</strong></p>
                <p style="margin:5px 0 0 0; color:#FF5A1F; font-weight:700;">Chargeable Basis: 1,150 kg (Volumetric)</p>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/G6jWl1oZ-bA",
          linkToWidget: "containers"
        },
        {
          id: "volumetric-weight-calculation",
          title: "Volumetric Weight Calculation",
          summary: "Formulas and volumetric ratios in air shipping.",
          image: "images/volumetric_weight_calculation.png",
          content: `
            <p>To convert cargo volume (m³) to equivalent volumetric weight (kg), airlines use standard international ratios. The IATA standard volumetric ratio is:</p>
            <p style="text-align:center; font-weight:700; font-size:1.1rem; color:#0A2540; margin:10px 0;">1 Cubic Meter (CBM) = 166.67 kg</p>
            
            <h3>Calculation Formulas:</h3>
            <div style="background:#F8FAFC; padding:15px; border-radius:10px; margin: 15px 0; border:1px dashed #FF5A1F;">
              <strong style="display:block; margin-bottom:8px; color:#0A2540;">1. Using Centimeters (cm):</strong>
              <code>Volumetric Weight (kg) = (Length x Width x Height in cm) / 6000</code>
              <hr style="border:0; border-top:1px solid #E2E8F0; margin:10px 0;">
              <strong style="display:block; margin-bottom:8px; color:#0A2540;">2. Using Meters (m):</strong>
              <code>Volumetric Weight (kg) = Length x Width x Height in m x 166.67</code>
            </div>
            
            <h3>Step-by-Step Practical Example:</h3>
            <p>Calculate the volumetric weight of a box: <code>120 cm x 80 cm x 100 cm</code> (total volume $0.96\\text{ CBM}$).</p>
            <ol>
              <li>Multiply dimensions: <code>120 x 80 x 100 = 960,000 cm³</code>.</li>
              <li>Divide by IATA factor: <code>960,000 / 6000 = 160 kg</code>.</li>
              <li>Alternatively, calculate CBM: <code>1.2 x 0.8 x 1.0 = 0.96 CBM</code>.</li>
              <li>Multiply by ratio: <code>0.96 CBM x 166.67 = 160 kg</code>.</li>
            </ol>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w",
          linkToWidget: "containers"
        },
        {
          id: "air-cargo-ulds-and-pallets",
          title: "Air Cargo ULDs and Pallets",
          summary: "Unit Load Devices, PMC containers, contours, and netting.",
          image: "images/air_cargo_ulds_pallets.png",
          content: `
            <p>To ensure cargo loading efficiency and flight safety, cargo is packed inside specialized aircraft containers or pallets called <strong>Unit Load Devices (ULDs)</strong>. ULDs clip directly into the cargo deck locking tracks, preventing movement in flight.</p>
            
            <!-- Contour diagram inline SVG -->
            <div style="margin:20px 0; background:#F8FAFC; padding:15px; border-radius:10px; text-align:center; border:1px solid rgba(0,0,0,0.06);">
              <svg width="100%" height="150" viewBox="0 0 400 150" style="max-width:320px; margin:0 auto; display:block;">
                <!-- AKE Container -->
                <path d="M40,20 L100,20 L100,100 L70,120 L40,120 Z" fill="#CBD5E1" stroke="#0A2540" stroke-width="1.5"/>
                <text x="70" y="70" fill="#0A2540" font-size="10" font-weight="700" font-family="Outfit" text-anchor="middle">AKE (LD3)</text>
                <!-- PMC Pallet with cargo outline -->
                <rect x="150" y="115" width="110" height="6" fill="#475569"/>
                <path d="M155,30 L255,30 L255,115 L155,115 Z" fill="#FF5A1F" fill-opacity="0.2" stroke="#FF5A1F" stroke-dasharray="3,3"/>
                <text x="205" y="70" fill="#FF5A1F" font-size="10" font-weight="700" font-family="Outfit" text-anchor="middle">PMC Pallet</text>
              </svg>
            </div>
            
            <h3>Common ULD Specifications:</h3>
            <table class="kb-table">
              <thead>
                <tr style="background:#0A2540; color:#fff;">
                  <th>ULD Type</th>
                  <th>Standard Dimensions</th>
                  <th>Max Capacity</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>AKE (LD3)</strong></td>
                  <td>$156 \\times 153 \\times 163\\text{ cm}$</td>
                  <td>1,588 kg</td>
                  <td>4.5 m³ (159 ft³)</td>
                </tr>
                <tr>
                  <td><strong>PMC (P6P Pallet)</strong></td>
                  <td>$318 \\times 244\\text{ cm}$ ($125 \\times 96\\text{ in}$)</td>
                  <td>6,800 kg</td>
                  <td>11.5 m³ (406 ft³)</td>
                </tr>
              </tbody>
            </table>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "direct-consolidated-deferred-air",
          title: "Direct, Consolidated and Deferred Air Freight",
          summary: "Choosing transit speeds: Express vs Consolidated bookings.",
          image: "images/air_freight_routing_options.png",
          content: `
            <p>Air cargo routing speeds are divided into three commercial tiers depending on cargo urgency and budget limits:</p>
            <h3>1. Direct / Express Air Freight</h3>
            <p>The cargo is booked on the next available commercial flight. Transits are fast (1-2 days) and use direct flights. High cost, ideal for urgent parts or vaccine rollouts.</p>
            <h3>2. Consolidated Air Freight (Consol)</h3>
            <p>The freight agent pools multiple cargo consignments from various shippers into a single bulk ULD. This allows the agent to secure airline volume rates. Cargo leaves on scheduled weekly flights. Moderate cost and transit (3-5 days).</p>
            <h3>3. Deferred Air Freight</h3>
            <p>The lowest priority cargo tier. Cargo routes through transit hubs and is loaded on flights as space becomes available. Economical but slower (5-8 days).</p>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "airport-to-airport-vs-door-to-door",
          title: "Airport-to-Airport vs Door-to-Door",
          summary: "Comparing airport terminal transitions to full delivery scopes.",
          image: "images/airport_vs_door_to_door.png",
          content: `
            <p>Air shipping pricing varies depending on the operational scope of the logistics contract:</p>
            <h3>1. Airport-to-Airport (A2A)</h3>
            <p>The base air freight rate covers the carriage from the origin departure airport terminal to the destination arrival airport terminal. All local pick-up trucking, customs clearances, biosecurity permits, and destination delivery charges are excluded and must be arranged separately by the shipper or receiver.</p>
            <h3>2. Door-to-Door (D2D)</h3>
            <p>A comprehensive logistics solution. The freight forwarder manages the entire chain of custody: truck collection from the exporter's factory, airport terminal handling, customs brokerage, flight transport, destination clearance, and final delivery to the buyer's warehouse.</p>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w"
        },
        {
          id: "airline-handling-cut-off-times",
          title: "Airline Handling and Cut-Off Times",
          summary: "Latest Acceptance Times (LAT) and document closures.",
          image: "images/airline_handling_cut_offs.png",
          content: `
            <p>Unlike ocean vessels, cargo aircraft operate on tight airline turnaround times. Cargo must be ready, checked, and delivered to the carrier before strict deadlines.</p>
            <h3>Key Terminal Deadlines:</h3>
            <ul>
              <li><strong>Latest Acceptance Time (LAT):</strong> The final deadline by which the physical cargo must arrive at the airline's Ground Handling Agent (GHA) warehouse. Typically <strong>4 to 6 hours</strong> prior to flight departure for general cargo, and up to <strong>8 hours</strong> for Dangerous Goods (DG).</li>
              <li><strong>Document Cut-Off:</strong> The deadline to submit the final Air Waybill (AWB) data and customs export declarations. Late document submission will result in the airline offloading the cargo.</li>
              <li><strong>GHA Handling Steps:</strong> GHA checks security labels $\\rightarrow$ performs scale weight audit $\\rightarrow$ places cargo in ULD queue $\\rightarrow$ loads ULD onto flight trailer.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "dangerous-goods-air-freight",
          title: "Dangerous Goods in Air Freight",
          summary: "IATA DGR, safety packing, hazard classes, and declarations.",
          image: "images/dangerous_goods_air_freight.png",
          content: `
            <p>Air transport of hazardous cargo is strictly governed by <strong>IATA Dangerous Goods Regulations (DGR)</strong> to protect crew safety and cabin pressure stability.</p>
            
            <!-- Dangerous goods safety banner -->
            <div style="background:#FFF5F5; border-left:4px solid #E53E3E; padding:12px; border-radius:6px; margin: 15px 0;">
              <strong style="color:#C53030; display:block; margin-bottom:5px;">⚠️ Critical IATA DGR Compliance</strong>
              All Dangerous Goods (DG) must be packed in approved <strong>UN-certified packaging</strong>, carry standard hazard labels, and be accompanied by a signed <strong>Shipper's Declaration for Dangerous Goods (DGD)</strong>.
            </div>
            
            <h3>Common DG Classes in Aviation:</h3>
            <ul>
              <li><strong>Class 9: Miscellaneous (Lithium Batteries):</strong> Highly restricted. Lithium-Ion batteries cannot move on passenger flights if shipped loose; they must route via Cargo Aircraft Only (CAO).</li>
              <li><strong>Class 3: Flammable Liquids:</strong> Paints, adhesives, perfumes. Subject to volume-per-package limits.</li>
              <li><strong>Class 2: Gases:</strong> Aerosols, compressed cylinders. Cabin pressure drop risks make these highly sensitive.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        }
      ]
    },
    {
      id: "trade-incoterms",
      title: "4. Trade & Incoterms",
      description: "FOB, CIF, EXW, DDP obligations.",
      icon: "🛣️",
      subtopics: [
        {
          id: "all-types-of-incoterms-2026",
          title: "All Types of Incoterms 2026",
          summary: "The 11 Incoterms rules defining commercial trade terms.",
          image: "images/all_types_of_incoterms.png",
          layoutType: "infographic",
          content: `
            <p>Incoterms (International Commercial Terms) are the globally recognized standard rules published by the International Chamber of Commerce (ICC) to define the division of costs, tasks, and risks between a buyer and seller in international trade contract transactions.</p>
            <h3>The 11 Rules Divided by Transport Mode:</h3>
            
            <strong>Rules for Any Mode of Transport (Multimodal):</strong>
            <ul>
              <li><strong>EXW (Ex Works):</strong> Seller makes goods available at their warehouse. Buyer bears all costs and risks from origin.</li>
              <li><strong>FCA (Free Carrier):</strong> Seller delivers goods cleared for export to a named carrier chosen by the buyer.</li>
              <li><strong>CPT (Carriage Paid To):</strong> Seller pays carriage to named destination, but risk transfers to buyer when goods are handed over to the first carrier.</li>
              <li><strong>CIP (Carriage and Insurance Paid To):</strong> Same as CPT, but seller must arrange maximum insurance coverage (Institute Cargo Clauses A) in favor of the buyer.</li>
              <li><strong>DAP (Delivered at Place):</strong> Seller delivers goods to named destination, bearing all risks and costs up to arrival (excluding import clearance).</li>
              <li><strong>DPU (Delivered at Place Unloaded):</strong> Same as DAP, but seller is responsible for unloading the cargo from the arrival truck/vessel.</li>
              <li><strong>DDP (Delivered Duty Paid):</strong> Seller delivers goods to buyer's premises, customs-cleared and duties/VAT paid. Maximum obligation for seller.</li>
            </ul>
            
            <strong>Rules for Sea and Inland Waterway Transport:</strong>
            <ul>
              <li><strong>FAS (Free Alongside Ship):</strong> Seller places goods alongside the buyer's vessel at the named origin port.</li>
              <li><strong>FOB (Free On Board):</strong> Seller clears export and loads cargo aboard the vessel. Risk transfers once cargo is loaded.</li>
              <li><strong>CFR (Cost and Freight):</strong> Seller pays ocean freight to destination port, but risk transfers at origin loading.</li>
              <li><strong>CIF (Cost, Insurance and Freight):</strong> Same as CFR, but seller purchases ocean marine insurance (Clause C coverage).</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/5F_3pP3n-9c",
          linkToWidget: "incoterms"
        },
        {
          id: "fob-exw-cif-ddp-explained",
          title: "FOB, EXW, CIF and DDP Explained",
          summary: "Deep dive into the four most common commercial terms.",
          image: "images/fob_exw_cif_ddp_explained.png",
          content: `
            <p>While there are 11 Incoterms, four terms dominate global freight transactions. Choosing between them determines who coordinates shipping, manages customs, and files insurance claims:</p>
            
            <h3>1. EXW (Ex Works) - Minimum Seller Obligation</h3>
            <p>The buyer is responsible for everything: loading goods onto trucks at origin, origin cartage, export customs filings, main ocean/air freight, import customs, duties, and final delivery. Best for buyers with local forwarders in the export country.</p>
            
            <h3>2. FOB (Free On Board) - Standard Maritime Term</h3>
            <p>The seller clears the goods for export and loads them aboard the buyer's designated vessel. Once cargo is placed on the vessel, all costs, risks of damage or loss, and destination logistics transfer to the buyer.</p>
            
            <h3>3. CIF (Cost, Insurance & Freight) - Standard Import Term</h3>
            <p>The seller is responsible for booking and paying the main carriage to the destination arrival port, as well as providing basic marine insurance. However, note that the <strong>risk of loss</strong> transfers to the buyer the moment the cargo is loaded aboard the vessel at origin.</p>
            
            <h3>4. DDP (Delivered Duty Paid) - Maximum Seller Obligation</h3>
            <p>The seller manages the entire process from their origin factory directly to the buyer's destination warehouse. The seller pays for main freight, customs clearance fees, import duties, and local VAT/GST taxes. Ideal for buyers with no import licensing capability.</p>
          `,
          youtube: "https://www.youtube.com/embed/c0tW52b36Xg",
          linkToWidget: "incoterms"
        },
        {
          id: "incoterms-responsibility-matrix",
          title: "Incoterms Responsibility Matrix",
          summary: "Visual cost division mapping for all 11 terms.",
          image: "images/incoterms_2026.jpg",
          content: `
            <p>The Incoterms Responsibility Matrix displays who is legally responsible for each cost component in the international transport chain. Refer to the matrix below for a clear cost-split overview:</p>
            
            <!-- Matrix vector layout -->
            <div style="margin:20px 0; background:#0A2540; color:#fff; padding:15px; border-radius:12px; font-family:'Outfit', sans-serif;">
              <strong style="font-size:1rem; display:block; margin-bottom:12px; text-align:center; color:#FF5A1F;">⚖️ Master Responsibility Split</strong>
              <svg width="100%" height="160" viewBox="0 0 400 160" style="display:block; margin:0 auto; max-width:340px;">
                <rect x="10" y="10" width="380" height="30" fill="#1e3a5f" rx="6"/>
                <text x="30" y="30" fill="#fff" font-size="10" font-weight="700">Stage</text>
                <text x="180" y="30" fill="#fff" font-size="10" font-weight="700">EXW</text>
                <text x="240" y="30" fill="#fff" font-size="10" font-weight="700">FOB</text>
                <text x="300" y="30" fill="#fff" font-size="10" font-weight="700">CIF</text>
                <text x="360" y="30" fill="#fff" font-size="10" font-weight="700">DDP</text>
                
                <text x="30" y="65" fill="#e2e8f0" font-size="10">Origin Loading</text>
                <circle cx="190" cy="62" r="6" fill="#FF5A1F"/>
                <circle cx="250" cy="62" r="6" fill="#10B981"/>
                <circle cx="310" cy="62" r="6" fill="#10B981"/>
                <circle cx="370" cy="62" r="6" fill="#10B981"/>
                
                <text x="30" y="95" fill="#e2e8f0" font-size="10">Ocean Carriage</text>
                <circle cx="190" cy="92" r="6" fill="#FF5A1F"/>
                <circle cx="250" cy="92" r="6" fill="#FF5A1F"/>
                <circle cx="310" cy="92" r="6" fill="#10B981"/>
                <circle cx="370" cy="92" r="6" fill="#10B981"/>
                
                <text x="30" y="125" fill="#e2e8f0" font-size="10">Import Customs</text>
                <circle cx="190" cy="122" r="6" fill="#FF5A1F"/>
                <circle cx="250" cy="122" r="6" fill="#FF5A1F"/>
                <circle cx="310" cy="122" r="6" fill="#FF5A1F"/>
                <circle cx="370" cy="122" r="6" fill="#10B981"/>
              </svg>
              <div style="display:flex; justify-content:center; gap:15px; font-size:0.8rem; margin-top:8px;">
                <span><span style="display:inline-block; width:8px; height:8px; background:#10B981; border-radius:50%; margin-right:4px;"></span>Seller Responsibility</span>
                <span><span style="display:inline-block; width:8px; height:8px; background:#FF5A1F; border-radius:50%; margin-right:4px;"></span>Buyer Responsibility</span>
              </div>
            </div>

            <div style="margin: 20px 0; overflow-x:auto;">
              <table class="kb-table" style="font-size:0.85rem; border-collapse:collapse; width:100%; min-width:600px;">
                <thead>
                  <tr style="background:#0A2540; color:#fff;">
                    <th>Rule</th>
                    <th>Export Customs</th>
                    <th>Origin Terminal</th>
                    <th>Main Carriage</th>
                    <th>Insurance</th>
                    <th>Import Customs</th>
                    <th>Import Duties</th>
                    <th>Unloading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>EXW</strong></td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                  </tr>
                  <tr>
                    <td><strong>FCA</strong></td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                  </tr>
                  <tr>
                    <td><strong>FOB</strong></td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                  </tr>
                  <tr>
                    <td><strong>CIF</strong></td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                  </tr>
                  <tr>
                    <td><strong>DAP</strong></td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                  </tr>
                  <tr>
                    <td><strong>DDP</strong></td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#0A2540; font-weight:700;">Seller</td>
                    <td style="color:#FF5A1F; font-weight:700;">Buyer</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Use the <strong>Interactive Incoterms Matrix</strong> on the home screen to test and compare custom cost divisions across all 11 options.</p>
          `,
          youtube: "https://www.youtube.com/embed/5F_3pP3n-9c",
          linkToWidget: "incoterms"
        },
        {
          id: "buyer-vs-seller-cost-responsibility",
          title: "Buyer vs Seller Cost Responsibility",
          summary: "Allocating fees based on purchase contract terms.",
          content: `
            <p>Cost responsibility details which party pays for which local fees at each stage of transit. Commercial contract terms dictate whether freight is billed as \"Prepaid\" or \"Collect\":</p>
            
            <!-- Premium Cost Responsibility Infographic Image -->
            <img src="images/buyer_seller_cost.png" alt="Buyer vs Seller Cost Responsibility" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">

            <h3>Local Fee Allocations:</h3>
            <ul>
              <li><strong>Origin Local Charges:</strong> Includes export documentation, customs entry declaration, terminal handling charges (OTHC), port gate-in, and origin trucking. Paid by seller under F-groups, C-groups, and D-groups; paid by buyer under EXW.</li>
              <li><strong>Destination Local Charges:</strong> Includes import port discharge fees (DTHC), customs clearance filing fees, local container delivery cartage, and terminal storage ground rents. Paid by buyer under all terms except DDP and DPU.</li>
            </ul>
            
            <h3>The 'FOB Destination' Pitfall:</h3>
            <p>Domestic buyers often confuse \"FOB Origin\" with \"FOB Destination.\" Under international ICC rules, FOB can ONLY be used for sea transport and means risk transfers when cargo is loaded on board the vessel at the port of origin. For multimodal destination deliveries, <strong>DAP</strong> or <strong>DDP</strong> should be used in the purchase contract.</p>
          `,
          youtube: "https://www.youtube.com/embed/yQ5uIe-1pE8"
        },
        {
          id: "risk-transfer-international-trade",
          title: "Risk Transfer in International Trade",
          summary: "Pinpointing the exact moment cargo liability shifts.",
          content: `
            <p>A common misconception in logistics is that risk transfer and cost responsibility move together. Under Incoterms, cost responsibility and risk of cargo damage/loss can shift at entirely different points.</p>
            
            <!-- Premium Risk vs Cost Divergence Image -->
            <img src="images/risk_transfer_trade.png" alt="Risk Transfer in International Trade" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">

            <h3>Key Divergence Points (C-Terms):</h3>
            <ul>
              <li><strong>CIF / CIP:</strong> The seller must pay the main carriage and purchase marine cargo insurance to the destination port. However, <strong>risk transfers to the buyer the moment the container is loaded aboard the vessel at the origin port</strong>.</li>
              <li>If cargo is damaged by sea storms during transit, the buyer must file the insurance claim and bear the delay loss, even though the seller paid the ocean freight.</li>
            </ul>
            
            <h3>The Exact Risk Shifting Points:</h3>
            <ul>
              <li><strong>EXW:</strong> At the seller's factory gate (prior to truck loading).</li>
              <li><strong>FOB:</strong> On board the vessel at the named origin port.</li>
              <li><strong>FCA:</strong> Handed over to the buyer's trucking company or terminal yard.</li>
              <li><strong>DAP:</strong> On board the arriving truck at destination, ready for unloading.</li>
              <li><strong>DPU:</strong> Unloaded from the arriving vehicle onto destination ground.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/yQ5uIe-1pE8"
        },
        {
          id: "common-incoterm-mistakes",
          title: "Common Incoterm Mistakes",
          summary: "Classic pitfalls including misuse of ocean terms for air containers.",
          content: `
            <p>Mistakes in choosing Incoterms lead to cargo delays, custom audits, unexpected port fees, and legal disputes over who bears cargo loss liability. Ensure you avoid these common pitfalls:</p>
            
            <!-- Premium Mistakes & Corrections Infographic Image -->
            <img src="images/incoterm_mistakes.png" alt="Common Incoterm Mistakes" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">

            <h3>1. Using FOB or CIF for Air Freight or Containerized Ocean Cargo</h3>
            <p>FOB and CIF mandate risk transfer at the ship's rail. If cargo is loaded inside a container terminal, the shipper loses physical control long before the cargo crosses the ship's rail. If a container is damaged in the yard, liability is unclear. <strong>Solution:</strong> Use <strong>FCA</strong> instead of FOB, and <strong>CIP</strong> instead of CIF.</p>
            
            <h3>2. Booking DDP without Confirming Import Rights</h3>
            <p>Under DDP, the seller must clear import customs at the destination country. Many countries restrict import clearance to local registered entities. If the exporter does not have a local branch or importer of record (IOR) partner, the container will be stuck at destination customs. <strong>Solution:</strong> Use <strong>DAP</strong>, leaving destination customs processing to the local buyer.</p>
            
            <h3>3. Excluding Destination Local Charges from Quotes</h3>
            <p>Under CFR and CIF, the seller pays for sea carriage. However, port discharge handling charges (DTHC) are billed at the arrival port. If local contracts do not specify who pays terminal fees, the buyer may be hit with massive hidden charges before cargo release, stalling logistics operations.</p>
          `,
          youtube: "https://www.youtube.com/embed/yQ5uIe-1pE8"
        },
        {
          id: "choosing-the-right-incoterm",
          title: "Choosing the Right Incoterm",
          summary: "Tactical guidelines for negotiating shipping contracts.",
          content: `
            <p>Selecting the optimal Incoterm is a strategic business decision. It balances freight control, buying power, and customs capabilities against risk tolerance:</p>
            
            <!-- Premium Decision Helper Infographic Image -->
            <img src="images/choosing_incoterm.png" alt="Choosing the Right Incoterm" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">

            <h3>For Buyers (Importers):</h3>
            <ul>
              <li><strong>Choose FOB / FCA:</strong> If you import regularly and have a strong relationship with a local forwarder. This gives you complete control over shipping rates, routing timelines, and delivery scheduling.</li>
              <li><strong>Avoid EXW:</strong> Unless you have local agents at the origin city who can load, haul, and clear export customs. EXW places massive administrative burdens on the buyer.</li>
            </ul>
            
            <h3>For Sellers (Exporters):</h3>
            <ul>
              <li><strong>Choose FCA / CPT:</strong> If you want to transfer risk of cargo damage as early as possible. FCA allows you to hand over cargo at origin container yards and wash your hands of transit risks.</li>
              <li><strong>Avoid DDP:</strong> Unless you have a mature global presence. DDP places the highest financial, custom compliance, and transport risk on the exporter.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/5F_3pP3n-9c"
        }
      ]
    },
    {
      id: "customs-compliance",
      title: "5. Customs & Compliance",
      description: "Border control and taxation.",
      icon: "📑",
      subtopics: [
        {
          id: "export-customs-process",
          title: "Export Customs Process",
          summary: "Border control filing and origin clearing methods.",
          content: `
            <p>Export clearance is the mandatory legal process of obtaining government permission to send goods out of a country. It serves multiple national interests: verifying that cargo is legal, properly classified, ensuring export taxes are paid (if applicable), and confirming compliance with national security and trade embargo protocols.</p>
            
            <!-- Premium Export Customs Process Image -->
            <img src="images/export_customs.png" alt="Export Customs Process" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">

            <h3>The Step-by-Step Export Process:</h3>
            <ol>
              <li><strong>Documentation Preparation:</strong> The shipper compiles the Commercial Invoice, Packing List, and specific licenses (e.g., restricted goods).</li>
              <li><strong>CUSDEC Submission:</strong> A licensed customs house broker (CHB) logs into the national customs portal (e.g., ASYCUDA in Sri Lanka) and submits the electronic Customs Declaration (CUSDEC).</li>
              <li><strong>Risk Assessment & Routing:</strong> The system assigns a route. Green route means immediate clearance. Red route triggers a physical cargo inspection at the export terminal before loading.</li>
              <li><strong>Gate-In and Loading:</strong> Once the Export Release is granted, the container is permitted to enter the port terminal (Gate-In) and is loaded onto the departing vessel.</li>
            </ol>
            
            <h3>Common Export Pitfalls:</h3>
            <p>Failure to obtain necessary export licenses (like dual-use goods for tech equipment) or misdeclaring cargo weights can lead to the container being shut out of the vessel, resulting in missed sailings and heavy terminal demurrage charges.</p>
          `,
          youtube: "https://www.youtube.com/embed/L13x2aM9WpM"
        },
        {
          id: "import-customs-process",
          title: "Import Customs Process",
          summary: "Entry clearance, declarations, and destination checks.",
          content: `
            <p>Import clearance is significantly more rigorous than export clearance. When cargo arrives, destination border authorities must calculate applicable import duties, VAT/GST, and ensure the goods meet local safety, health, and intellectual property regulations before releasing them to the domestic market.</p>
            
            <img src="images/import_customs.png" alt="Import Customs Process" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border:2px solid #6EE7B7; padding:20px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <strong style="color:#047857; font-size:1.1rem; display:block; margin-bottom:15px; text-align:center;">🛂 Clearance Channels</strong>
              <table style="width:100%; border-collapse:collapse; font-size:0.9rem; text-align:left;">
                <tr style="border-bottom:1px solid #A7F3D0;">
                  <td style="padding:10px;"><strong style="color:#10B981; font-size:1.1rem;">🟢 Green</strong></td>
                  <td style="padding:10px; color:#064E3B;"><strong>Immediate Release.</strong> Low-risk goods from trusted importers. Paperwork is accepted automatically by the system.</td>
                </tr>
                <tr style="border-bottom:1px solid #A7F3D0;">
                  <td style="padding:10px;"><strong style="color:#F59E0B; font-size:1.1rem;">🟡 Yellow</strong></td>
                  <td style="padding:10px; color:#064E3B;"><strong>Document Audit.</strong> Customs officers manually review the invoice, packing list, and origin certificates for valuation accuracy.</td>
                </tr>
                <tr>
                  <td style="padding:10px;"><strong style="color:#EF4444; font-size:1.1rem;">🔴 Red</strong></td>
                  <td style="padding:10px; color:#064E3B;"><strong>Physical Exam.</strong> High-risk cargo. The container is held at the depot for X-ray scans or full manual de-stuffing by officers.</td>
                </tr>
              </table>
            </div>

            <h3>Key Milestones in Import Clearance:</h3>
            <ol>
              <li><strong>Pre-Arrival & Arrival Notification:</strong> The carrier sends an Arrival Notice (AN) to the consignee (importer) a few days before the ship docks.</li>
              <li><strong>Entry Filing & Manifest Matching:</strong> The broker submits the import CUSDEC. This declaration is electronically matched against the carrier's Cargo Manifest to prevent smuggling.</li>
              <li><strong>Valuation and Duty Payment:</strong> Customs assesses the declared HS codes and CIF value. The importer must pay the calculated taxes (Duty + VAT/GST + CESS) to the border authority bank accounts.</li>
              <li><strong>Customs Delivery Order (DO):</strong> Once taxes are paid and the channel is cleared, customs issues a release. The forwarder then issues a Delivery Order to the trucker to collect the cargo.</li>
            </ol>
            <p><em>Pro Tip:</em> Always pre-clear cargo (submit documents before the vessel arrives) to avoid expensive port storage fees (demurrage) that accrue daily after the free-time period ends.</p>
          `,
          youtube: "https://www.youtube.com/embed/L13x2aM9WpM"
        },
        {
          id: "customs-documentation",
          title: "Customs Documentation",
          summary: "Core papers required for smooth border transitions.",
          content: `
            <p>A flawless paper trail is the absolute secret to avoiding border delays. Customs operates on strict verification: if one document contains a typo—such as mismatched weights between the Packing List and the Bill of Lading, or an incorrect HS code🛂customs will freeze the shipment and issue severe penalties.</p>
            
            <img src="images/customs_docs.png" alt="Customs Documentation" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; display:flex; flex-wrap:wrap; gap:15px;">
              <div style="flex:1; min-width:200px; background:#F8FAFC; border:1px solid #CBD5E1; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#334155;">📄 Commercial Invoice (CI)</h4>
                <p style="font-size:0.85rem; color:#475569; margin:0;">The ultimate financial contract. It dictates the buyer, seller, exact 6-digit HS codes, unit values, total purchase price, and the agreed Incoterm (crucial for tax calculation).</p>
              </div>
              <div style="flex:1; min-width:200px; background:#F8FAFC; border:1px solid #CBD5E1; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#334155;">📦 Packing List (PL)</h4>
                <p style="font-size:0.85rem; color:#475569; margin:0;">The physical map of the cargo used for physical inspections. Shows exact box counts, pallet dimensions, net/gross weights, and cubic volume (CBM).</p>
              </div>
              <div style="flex:1; min-width:200px; background:#F8FAFC; border:1px solid #CBD5E1; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#334155;">🚢 Bill of Lading (B/L)</h4>
                <p style="font-size:0.85rem; color:#475569; margin:0;">The official receipt and title of ownership from the carrier. It lists the container number and security seal number, which customs verifies at the gate.</p>
              </div>
            </div>
            
            <h3>Specialized & Regulatory Documentation:</h3>
            <ul>
              <li><strong>Certificate of Origin (COO):</strong> Proves where the goods were manufactured. Mandatory for claiming reduced tariffs under Free Trade Agreements.</li>
              <li><strong>Phytosanitary Certificate:</strong> Required for agricultural products, wooden furniture, and plants to prove they are free from pests, soil, and diseases.</li>
              <li><strong>Material Safety Data Sheet (MSDS):</strong> Mandatory for hazardous or chemical cargo (e.g., batteries, paints) to ensure safe transport and handling.</li>
              <li><strong>Health Certificates:</strong> Required by the FDA or local food authorities for food and beverage imports intended for human consumption.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        },
        {
          id: "hs-codes-explained",
          title: "HS Codes Explained",
          summary: "The global Harmonized System for product tax indexing.",
          content: `
            <p>An <strong>HS Code</strong> (Harmonized System Code) is a standardized numerical method of classifying traded products. Developed by the World Customs Organization (WCO), it is used by over 200 countries to identify products for the application of duties, taxes, and specialized import controls.</p>
            
            <img src="images/hs_codes.png" alt="HS Codes Explained" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background:#F8FAFC; border-left:4px solid #3B82F6; padding:15px; border-radius:0 12px 12px 0;">
              <h4 style="margin:0 0 10px 0; color:#1E3A8A;">Anatomy of an HS Code: Men's Cotton T-Shirt (HS 6109.10)</h4>
              <ul style="margin:0; font-size:0.9rem; color:#334155; line-height: 1.6;">
                <li><strong>Chapter (First 2 Digits - 61):</strong> Broad category. <em>Articles of apparel and clothing accessories, knitted.</em></li>
                <li><strong>Heading (Next 2 Digits - 09):</strong> Specific grouping. <em>T-shirts, singlets and other vests.</em></li>
                <li><strong>Subheading (Next 2 Digits - 10):</strong> Material/Details. <em>Of cotton.</em></li>
                <li><strong>National Digits (Digits 7-10):</strong> Countries often add up to 4 extra digits at the end to establish their own national duty rates or statistical tracking.</li>
              </ul>
            </div>
            
            <h3>Why HS Codes are Critical:</h3>
            <p>Entering the wrong HS Code on a commercial invoice can lead to severe consequences:</p>
            <ul>
              <li><strong>Tax Penalties:</strong> Classifying a luxury watch as a plastic toy to get a 0% duty rate is customs fraud. When caught during an audit, you will be hit with massive fines and potential blacklisting.</li>
              <li><strong>Overpaying Duties:</strong> Importers often accept generic HS codes from their suppliers. If a more specific code exists for your exact product that has a lower tariff rate, you are losing money on every shipment. Always consult a licensed customs broker to index your products.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/eS10pXlTszs"
        },
        {
          id: "duties-taxes-vat-gst",
          title: "Duties, Taxes and VAT/GST",
          summary: "How customs duties are calculated on CIF valuation.",
          content: `
            <p>Import taxes are a major component of landed cargo costs. They are generally calculated on the <strong>CIF Customs Value</strong> (Cost, Insurance, and Freight). This means customs taxes the value of the goods PLUS the cost to ship and insure them to the border. Never assume duty is calculated on just the invoice price!</p>
            
            <img src="images/duties_taxes.png" alt="Duties, Taxes and VAT/GST" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:1px solid #FDE68A; padding:20px; border-radius:12px; font-family:'Outfit', sans-serif;">
              <strong style="color:#B45309; font-size:1.05rem; display:block; margin-bottom:12px;">🔹 The Standard Tax Calculation Formula</strong>
              <div style="background:#FFF; padding:15px; border-radius:8px; margin-bottom:10px; border:1px dashed #FCD34D;">
                <span style="color:#64748B; font-size:0.8rem; display:block; margin-bottom:4px;">STEP 1: Calculate Customs Value (The Base)</span>
                <strong style="color:#0A2540;">CIF Value</strong> = FOB Cargo Value + Main Freight Costs + Marine Insurance Premium
                <p style="font-size:0.8rem; color:#718096; margin: 5px 0 0 0;">If you ship EXW or FOB, customs will ask for your freight invoices to add to the cargo value.</p>
              </div>
              <div style="background:#FFF; padding:15px; border-radius:8px; margin-bottom:10px; border:1px dashed #FCD34D;">
                <span style="color:#64748B; font-size:0.8rem; display:block; margin-bottom:4px;">STEP 2: Calculate Import Duty</span>
                <strong style="color:#0A2540;">Duty Amount</strong> = CIF Value × Duty Rate (%)
                <p style="font-size:0.8rem; color:#718096; margin: 5px 0 0 0;">The Duty Rate is determined entirely by the HS Code assigned to the product.</p>
              </div>
              <div style="background:#FFF; padding:15px; border-radius:8px; border:1px dashed #FCD34D;">
                <span style="color:#64748B; font-size:0.8rem; display:block; margin-bottom:4px;">STEP 3: Calculate VAT / GST (The Tax on the Tax)</span>
                <strong style="color:#0A2540;">VAT Amount</strong> = (CIF Value + Duty Amount + Local Port Charges) × VAT Rate (%)
              </div>
            </div>
            
            <h3>Understanding Tax Exemptions:</h3>
            <p>VAT (Value Added Tax) is often recoverable if the importer is a registered business. However, Import Duties are a sunk cost that directly eats into profit margins, unless you utilize Free Trade Agreements or bonded warehousing.</p>
          `,
          youtube: "https://www.youtube.com/embed/YI4X2Xj4c68"
        },
        {
          id: "certificates-of-origin",
          title: "Certificates of Origin",
          summary: "Preferential vs Non-preferential trade origin proof.",
          content: `
            <p>A <strong>Certificate of Origin (COO)</strong> is a critical international trade document certifying that goods in a particular export shipment are wholly obtained, produced, manufactured, or processed in a particular country.</p>
            
            <h3>The Two Main Types of COOs:</h3>
            <div style="margin:25px 0; display:flex; flex-wrap:wrap; gap:15px;">
              <div style="flex:1; min-width:200px; background:#F8FAFC; border:1px solid #CBD5E1; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#334155;">1. Non-Preferential COO</h4>
                <p style="font-size:0.85rem; color:#475569; margin:0;">Indicates simply where the goods were made. It does not grant the importer any special tariff reductions. It is primarily used by customs to enforce political embargoes, quotas, or anti-dumping duties against specific nations.</p>
              </div>
              <div style="flex:1; min-width:200px; background:#F0FDF4; border:1px solid #86EFAC; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#14532D;">2. Preferential COO</h4>
                <p style="font-size:0.85rem; color:#166534; margin:0;">Issued when a Free Trade Agreement (FTA) exists between the buying and selling countries. This certificate proves the cargo meets the strict rules of origin, granting the buyer reduced or zero import duty rates!</p>
              </div>
            </div>
            
            <h3>How to get one:</h3>
            <p>The exporter must apply for a COO through their local Chamber of Commerce or Ministry of Trade. The authority will audit the factory's production records before physically stamping and signing the certificate.</p>
            
            <img src="images/srilankan_coo.png" alt="Sri Lankan Certificate of Origin" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        },
        {
          id: "free-trade-agreements",
          title: "Free Trade Agreements",
          summary: "Leveraging trade pacts to reduce import tariffs.",
          content: `
            <p>Free Trade Agreements (FTAs) are treaties between two or more countries designed to reduce or eliminate barriers to trade, such as tariffs and import quotas. For businesses, leveraging FTAs is one of the most powerful ways to cut landed costs and make products significantly cheaper in destination markets.</p>
            
            <img src="images/free_trade_agreements.png" alt="Free Trade Agreements Impact" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background:#F8FAFC; border-left:4px solid #10B981; padding:15px; border-radius:0 12px 12px 0;">
              <h4 style="margin:0 0 10px 0; color:#065F46;">⚠️ The "Rules of Origin" Catch</h4>
              <p style="margin:0; font-size:0.9rem; color:#334155;">Simply shipping a product out of an FTA-member country does not qualify it for zero tax. The cargo must meet specific <strong>Rules of Origin (ROO)</strong>. For example, if Sri Lanka and India have an FTA, you cannot import cheap electronics from China into Sri Lanka, put them in a new box, and ship them to India duty-free. You must prove that a substantial percentage of the product's value was <em>actually manufactured</em> locally (value-addition criteria).</p>
            </div>
            
            <h3>Direct Consignment Rule:</h3>
            <p>To claim FTA benefits, cargo must typically be shipped directly from the export country to the import country. If the ship transships through a non-FTA country, customs may require a "Certificate of Non-Manipulation" to prove the cargo was not tampered with while at the intermediate port.</p>
            
            <h3>How to Check FTA Eligibility:</h3>
            <ul>
              <li><strong>Step 1:</strong> Identify the exact 6-digit HS code for your product.</li>
              <li><strong>Step 2:</strong> Check the official Customs Tariff schedule of the destination country to see if an active FTA covers that specific HS code.</li>
              <li><strong>Step 3:</strong> Ensure your supplier can legally provide a <em>Preferential Certificate of Origin</em> stamped by their local government authority.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/eS10pXlTszs"
        },
        {
          id: "customs-holds-and-exams",
          title: "Customs Holds and Exams",
          summary: "Handling border audits, X-rays, and container holds.",
          content: `
            <p>A customs hold is an order to freeze a container at the port terminal. This prevents the importer from taking delivery until a customs discrepancy or security concern is resolved. Holds are the biggest cause of unexpected supply chain delays.</p>
            
            <img src="images/customs_holds_exams.png" alt="Customs Holds and Exams" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%); border:2px solid #FDA4AF; padding:20px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <strong style="color:#E11D48; font-size:1.1rem; display:block; margin-bottom:15px; text-align:center;">🔍 Common Examination Types</strong>
              <table style="width:100%; border-collapse:collapse; font-size:0.9rem; text-align:left; background:#FFF; border-radius:8px; overflow:hidden;">
                <tr style="border-bottom:1px solid #FECDD3;">
                  <td style="padding:12px;"><strong style="color:#BE123C; font-size:1.05rem;">🔹 Manifest / Document Hold</strong></td>
                  <td style="padding:12px; color:#4C1D95;">Usually triggered because customs suspects the invoice value is artificially low (valuation fraud) to avoid taxes. They will request proof of payment (wire transfer receipts to the supplier).</td>
                </tr>
                <tr style="border-bottom:1px solid #FECDD3;">
                  <td style="padding:12px;"><strong style="color:#BE123C; font-size:1.05rem;">🔹 VACIS / NII Exam</strong></td>
                  <td style="padding:12px; color:#4C1D95;">Non-Intrusive Inspection. The truck drives through a giant X-Ray machine to check for anomalies like contraband, drugs, or unmanifested cargo hidden behind the declared goods.</td>
                </tr>
                <tr>
                  <td style="padding:12px;"><strong style="color:#BE123C; font-size:1.05rem;">🔹 CET / Intensive Exam</strong></td>
                  <td style="padding:12px; color:#4C1D95;">The Contraband Enforcement Team physically opens the container. If highly suspicious, the container is moved to a CES (Customs Examination Station) and 100% fully de-stuffed and inspected by hand.</td>
                </tr>
              </table>
            </div>
            
            <h3>Who pays for exams?</h3>
            <p><strong>Note on Costs:</strong> A major shock to new importers is that if customs decides to X-ray or physically examine your container, YOU (the importer) are legally responsible for paying all examination fees, the trucking fees to move it to the exam site, and any terminal demurrage (storage) delays that occur while waiting for customs to finish!</p>
            
            <h3>How to Mitigate Risk of Holds:</h3>
            <ul>
              <li><strong>Continuous Bond:</strong> If shipping to the USA, having a continuous customs bond shows you are a regular, trusted importer rather than a high-risk one-off buyer.</li>
              <li><strong>Flawless Paperwork:</strong> Ensure the Bill of Lading, Commercial Invoice, and Packing List have identical weights, piece counts, and exact matching HS codes. Discrepancies trigger automated system holds.</li>
              <li><strong>Avoid Vague Descriptions:</strong> Never declare cargo as "Auto Parts" or "Apparel". Use detailed descriptions like "Steel Brake Pads for Passenger Vehicles" to avoid suspicion.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/L13x2aM9WpM"
        },
        {
          id: "food-tea-agriculture-imports",
          title: "Food, Tea and Agriculture Imports",
          summary: "Biosecurity compliance for agricultural cargo.",
          content: `
            <p>Importing agricultural commodities like tea, spices, grains, and fresh fruits is heavily regulated. Unlike manufactured goods, agricultural products pose a severe biological threat to destination countries in the form of invasive pests, plant diseases, and foodborne illnesses.</p>
            
            <img src="images/food_agri_imports.png" alt="Food, Tea and Agriculture Imports" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <h3>Critical Certifications:</h3>
            <div style="margin:25px 0; display:flex; flex-wrap:wrap; gap:15px;">
              <div style="flex:1; min-width:200px; background:#F0FDF4; border:1px solid #86EFAC; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#14532D;">🌱 Phytosanitary Certificate</h4>
                <p style="font-size:0.85rem; color:#166534; margin:0;">Issued by the origin country's Department of Agriculture. It legally declares that the shipment was inspected prior to export and found to be free from quarantine pests and practically free from other injurious pests.</p>
              </div>
              <div style="flex:1; min-width:200px; background:#F0FDF4; border:1px solid #86EFAC; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#14532D;">🪵 ISPM-15 Wood Packing (The Bug Rule)</h4>
                <p style="font-size:0.85rem; color:#166534; margin:0;">Even if your cargo isn't agricultural (like importing car parts), if they are packed on wooden pallets, the wood must be heat-treated or fumigated. It must bear the IPPC "wheat stamp" to prove beetles/termites aren't hiding inside.</p>
              </div>
            </div>
            
            <h3>Additional Requirements:</h3>
            <ul>
              <li><strong>Health Certificates (Sanitary):</strong> Required for products intended for human or animal consumption, ensuring the manufacturing facility meets sanitary processing standards.</li>
              <li><strong>Prior Notice Registration (FDA):</strong> Before food is shipped to the USA, the exporter must file a "Prior Notice" with the FDA to allow them to assess the shipment for bioterrorism risks.</li>
            </ul>

            <p><strong>Action at Destination:</strong> Upon arrival, quarantine officers will physically inspect agricultural cargo. If live insects or soil are found, the importer will be forced to pay for expensive chemical fumigation at the port, or the entire container will be rejected and sent back to origin.</p>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "country-specific-compliance-guides",
          title: "Country-Specific Compliance Guides",
          summary: "Navigating US FMC, European ICS2, and local Sri Lankan rules.",
          content: `
            <p>Customs laws are not universal. While the World Trade Organization sets baselines, different regions have established incredibly strict pre-arrival notification systems primarily designed for national anti-terrorism security:</p>
            
            <div style="margin:25px 0; background:#F8FAFC; border:1px solid #CBD5E1; padding:20px; border-radius:12px; font-family:'Outfit', sans-serif;">
              <ul style="margin:0; padding-left:20px; line-height:1.8;">
                <li><strong style="color:#0A2540; font-size:1.05rem;">🇺🇸 USA (ISF 10+2 / AMS):</strong> The Importer Security Filing MUST be submitted to US Customs and Border Protection at least <strong>24 hours before</strong> the cargo is physically loaded onto the vessel at the foreign origin port. If you miss this deadline by even one minute, US Customs issues an automatic <strong>$5,000 fine</strong>.</li>
                <li><strong style="color:#0A2540; font-size:1.05rem;">🇪🇺 European Union (ICS2):</strong> The Import Control System 2 mandates advanced cargo manifest data declarations for all air and sea freight prior to loading. This system is designed to screen for bomb threats and illicit cargo before it enters European airspace or waters.</li>
                <li><strong style="color:#0A2540; font-size:1.05rem;">🇨🇳 China (CCAM):</strong> China Customs Advanced Manifest requires cargo data to be submitted electronically 24 hours prior to loading at the port of origin for all shipments destined for, or transshipping through, mainland China ports.</li>
                <li><strong style="color:#0A2540; font-size:1.05rem;">🔹 Australia/New Zealand (BMSB):</strong> Strict seasonal measures are enforced against the Brown Marmorated Stink Bug. During risk season (Sept-April), high-risk cargo from target risk countries MUST be chemically treated (fumigated) offshore before arriving in Oceania.</li>
                <li><strong style="color:#0A2540; font-size:1.05rem;">🔹 Sri Lanka (ASYCUDA World):</strong> Sri Lanka Customs utilizes the UN-developed ASYCUDA World platform. All commercial imports require electronic CUSDEC filing by a registered broker, with duty payments integrated directly through recognized banking gateways before release can be authorized.</li>
              </ul>
            </div>
            
            <p><strong>Note on Documentation:</strong> It is crucial for shippers to verify the exact document formatting requirements of the destination country. For instance, Middle Eastern countries often require the Commercial Invoice to be physically stamped and attested by the local Chamber of Commerce before shipping.</p>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        }
      ]
    },
    {
      id: "documentation",
      title: "6. Documentation",
      description: "B/L, Commercial Invoices, Packing Lists.",
      icon: "⚖️",
      subtopics: [
        {
          id: "commercial-invoice",
          title: "Commercial Invoice",
          summary: "Essential elements of the primary trade invoice.",
          content: `
            <p>The <strong>Commercial Invoice (CI)</strong> is the foundational document of international trade. It is the bill of sale issued by the exporter to the importer, and Sri Lanka Customs (SLC) uses it as the primary declaration of cargo value for taxation and statistical purposes.</p>
            
            <img src="images/srilankan_commercial_invoice.png" alt="Sri Lankan Commercial Invoice Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:1px solid #CBD5E1; padding:20px; border-radius:12px; font-family:'Outfit', sans-serif;">
              <strong style="color:#0F172A; font-size:1.1rem; display:block; margin-bottom:15px; border-bottom:2px solid #E2E8F0; padding-bottom:10px;">🔹 Mandatory Invoice Elements (Sri Lanka Customs)</strong>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
                <div style="background:#FFF; padding:12px; border-radius:8px; border-left:4px solid #3B82F6;">
                  <strong style="color:#1E3A8A; font-size:0.9rem;">TIN & VAT Numbers</strong>
                  <p style="font-size:0.8rem; margin:5px 0 0 0; color:#475569;">The exporter must prominently display their Tax Identification Number (TIN) as registered with the Inland Revenue Department (IRD).</p>
                </div>
                <div style="background:#FFF; padding:12px; border-radius:8px; border-left:4px solid #10B981;">
                  <strong style="color:#064E3B; font-size:0.9rem;">Cargo Details & Value</strong>
                  <p style="font-size:0.8rem; margin:5px 0 0 0; color:#475569;">Clear description of goods, quantity, unit price, and total value in major currencies (USD/EUR) or LKR.</p>
                </div>
                <div style="background:#FFF; padding:12px; border-radius:8px; border-left:4px solid #F59E0B;">
                  <strong style="color:#78350F; font-size:0.9rem;">Customs Data (CusDec)</strong>
                  <p style="font-size:0.8rem; margin:5px 0 0 0; color:#475569;">The 6 or 8-digit HS Codes, Country of Origin, and ASYCUDA World reference numbers if pre-filed.</p>
                </div>
                <div style="background:#FFF; padding:12px; border-radius:8px; border-left:4px solid #EF4444;">
                  <strong style="color:#7F1D1D; font-size:0.9rem;">Incoterm & Payment</strong>
                  <p style="font-size:0.8rem; margin:5px 0 0 0; color:#475569;">The agreed Incoterm (e.g., FOB Colombo) and payment terms authorized by the Central Bank (e.g., LC, DP, TT).</p>
                </div>
              </div>
            </div>
            
            <h3>Proforma vs. Commercial Invoice</h3>
            <p><strong>A common mistake:</strong> Exporters sometimes issue a "Proforma Invoice" for customs clearance. A Proforma is just a quote/estimate used to open a Letter of Credit or get an import license from the Import and Export Control Department. Sri Lanka Customs will reject it for final export clearance (CusDec processing). You must submit the final <strong>Commercial Invoice</strong>, which confirms the goods were actually sold and shipped.</p>
            
            <h3>Customs Valuation Risk & BOI Companies</h3>
            <p>Never artificially lower the value of goods on a CI to help the buyer pay less import duty. This is considered <em>valuation fraud</em>. If customs suspects the price is too low, the Valuation Directorate will hold the container and demand proof of bank wire transfers. For BOI (Board of Investment) companies in Sri Lanka, strict audits are in place to ensure export values match BOI declarations.</p>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        },
        {
          id: "packing-list",
          title: "Packing List",
          summary: "Declaring gross weight, net weight, dimensions, and packing units.",
          content: `
            <p>While the Commercial Invoice details the <em>value</em> of the goods, the <strong>Packing List (PL)</strong> details their <em>physical logistics attributes</em>. It acts as a map for warehouse staff, truck drivers, terminal operators (e.g., CICT, SAGT in Colombo), and Sri Lanka Customs inspectors.</p>
            
            <img src="images/srilankan_packing_list.png" alt="Sri Lankan Packing List Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <h3>What must be on a Packing List?</h3>
            <ul style="line-height:1.7;">
              <li><strong>Package Count & Type:</strong> Details exactly how the goods are packed (e.g., "10 Wooden Pallets containing 500 Cardboard Cartons of Ceylon Tea").</li>
              <li><strong>Dimensions (L x W x H):</strong> Essential for the forwarder to calculate the cubic volume (CBM) for ocean shipping or volumetric weight for air freight out of BIA.</li>
              <li><strong>Net Weight:</strong> The pure weight of the goods themselves (excluding packaging).</li>
              <li><strong>Gross Weight:</strong> The absolute total weight of the goods PLUS the boxes, wrapping, and wooden pallets. This is the weight the airline or shipping line cares about.</li>
              <li><strong>Shipping Marks:</strong> Symbols, letters, or numbers printed on the outside of the boxes to help workers quickly identify the cargo on a crowded dock (e.g., "DESTINATION: LONDON / LION LOGISTICS / CARTON 1 OF 500").</li>
            </ul>
            
            <div style="margin:25px 0; background:#FFF1F2; border-left:4px solid #E11D48; padding:15px; border-radius:0 12px 12px 0;">
              <h4 style="margin:0 0 10px 0; color:#9F1239;">📌 The Golden Rule of Documentation (VGM Compliance)</h4>
              <p style="margin:0; font-size:0.9rem; color:#4C1D95;">Under SOLAS regulations implemented by the Merchant Shipping Secretariat in Sri Lanka, the Verified Gross Mass (VGM) must be declared. The Gross Weight stated on the Packing List MUST exactly match the Gross Weight printed on the Bill of Lading, Commercial Invoice, and the Customs Entry (CusDec). A discrepancy will cause customs to freeze the shipment, and the terminal will not load the container onto the vessel.</p>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        },
        {
          id: "bill-of-lading",
          title: "Bill of Lading",
          summary: "Functions, negotiable types, and Telex releases.",
          content: `
            <p>The <strong>Bill of Lading (B/L)</strong> is the single most important document in ocean freight. It is a legally binding contract issued by the shipping carrier (or forwarder) to the shipper. In Sri Lanka, B/Ls are heavily regulated by the Merchant Shipping Secretariat.</p>
            
            <img src="images/srilankan_bill_of_lading.png" alt="Sri Lankan Bill of Lading Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <h3>The 3 Critical Functions of a B/L:</h3>
            <ol>
              <li><strong>Receipt of Cargo:</strong> Proves the carrier received the goods from the factory (e.g., an apparel factory in Katunayake EPZ) in good condition. Look for the "Clean on Board" stamp.</li>
              <li><strong>Contract of Carriage:</strong> Dictates the legal terms of transport between the shipper and the carrier, outlining liabilities under the Hague-Visby Rules.</li>
              <li><strong>Document of Title:</strong> (If negotiable) It acts as the actual legal ownership of the cargo. The person holding the original B/L owns the goods. You cannot claim the cargo at the destination without it!</li>
            </ol>
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%); border:2px solid #818CF8; padding:20px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <strong style="color:#3730A3; font-size:1.1rem; display:block; margin-bottom:15px; text-align:center;">🔹 Cargo Release Methods from Port of Colombo</strong>
              <table style="width:100%; border-collapse:collapse; font-size:0.9rem; text-align:left; background:#FFF; border-radius:8px; overflow:hidden;">
                <tr style="border-bottom:1px solid #E0E7FF;">
                  <td style="padding:12px;"><strong style="color:#4338CA; font-size:1.05rem;">Original B/L (OBL)</strong></td>
                  <td style="padding:12px; color:#312E81;">Three physical paper copies (usually blue or green) are couriered by DHL/Aramex to the buyer. The buyer must physically surrender one paper copy to the destination shipping agent to get the cargo. This is mandatory for LC trades executed through Sri Lankan banks.</td>
                </tr>
                <tr style="border-bottom:1px solid #E0E7FF;">
                  <td style="padding:12px;"><strong style="color:#4338CA; font-size:1.05rem;">Telex Release</strong></td>
                  <td style="padding:12px; color:#312E81;">A digital message from the Colombo port agent to the destination port agent authorizing release. The shipper surrenders the OBLs at origin. No physical paper needs to be mailed internationally. Very fast and common for TT payments.</td>
                </tr>
                <tr>
                  <td style="padding:12px;"><strong style="color:#4338CA; font-size:1.05rem;">Sea Waybill (SWB)</strong></td>
                  <td style="padding:12px; color:#312E81;">A non-negotiable receipt (Not a document of title). The cargo is automatically released to the named consignee upon arrival. Highly efficient for trusted corporate branches (e.g., MAS Holdings Sri Lanka shipping to their US warehouse).</td>
                </tr>
              </table>
            </div>
            
            <h3>House vs. Master Bill of Lading</h3>
            <ul>
              <li><strong>Master B/L (MBL):</strong> Issued by the actual shipping line (e.g., Maersk, MSC operating at CICT/SAGT) to the Freight Forwarder.</li>
              <li><strong>House B/L (HBL):</strong> Issued by the local Freight Forwarder (NVOCC) to the actual factory/importer.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/5tXJp0T_zT0"
        },
        {
          id: "air-waybill",
          title: "Air Waybill",
          summary: "MAWB vs HAWB, non-negotiable air transit document rules.",
          content: `
            <p>The <strong>Air Waybill (AWB)</strong> is the equivalent of the Bill of Lading, but used exclusively for air freight. The critical difference is that an AWB is <strong>non-negotiable</strong>. It acts only as a contract of carriage and receipt of goods, <em>not</em> as a document of title.</p>
            
            <img src="images/srilankan_air_waybill.png" alt="Sri Lankan Air Waybill Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; display:flex; flex-direction:column; gap:15px; font-family:'Outfit', sans-serif;">
              <div style="background:#F0F9FF; border-left:5px solid #0284C7; padding:15px; border-radius:8px;">
                <h4 style="margin:0 0 5px 0; color:#0369A1; font-size:1.1rem;">📌 Master Air Waybill (MAWB)</h4>
                <p style="margin:0; font-size:0.9rem; color:#0C4A6E;">Issued by the <strong>Airline</strong> (e.g., SriLankan Airlines, Emirates SkyCargo operating out of BIA) to the Freight Forwarder. It covers the consolidated bulk cargo placed on the aircraft. The shipper listed is the forwarder at origin, and the consignee is the forwarder's partner office at destination.</p>
              </div>
              <div style="background:#FDF4FF; border-left:5px solid #C026D3; padding:15px; border-radius:8px;">
                <h4 style="margin:0 0 5px 0; color:#A21CAF; font-size:1.1rem;">📌 House Air Waybill (HAWB)</h4>
                <p style="margin:0; font-size:0.9rem; color:#4A044E;">Issued by the <strong>Freight Forwarder</strong> to the actual Shipper (e.g., a local seafood exporter). It details the specific goods of that single client. The consignee is the actual buyer. There are usually multiple HAWBs packed under one MAWB.</p>
              </div>
            </div>
            
            <h3>Why is it Non-Negotiable?</h3>
            <p>Because airplanes travel so fast (e.g., a flight from Colombo to Dubai takes only 4.5 hours), there is no time to wait for courier services to mail original paper documents to banks or buyers. Since the AWB is non-negotiable, the airline terminal will release the cargo to the named consignee immediately upon arrival and identification. This aligns perfectly with the rapid, just-in-time nature of air freight exports like fresh tuna or high-fashion garments from Sri Lanka.</p>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "certificate-of-origin-doc",
          title: "Certificate of Origin",
          summary: "Chamber of Commerce authorization procedures.",
          content: `
            <p>The <strong>Certificate of Origin (COO)</strong> is the passport for your cargo. It legally declares the nationality of the product, which customs uses to determine tariff rates, embargoes, and trade quotas. In Sri Lanka, securing Preferential Tariff rates is critical for export competitiveness.</p>
            
            <img src="images/srilankan_coo.png" alt="Sri Lankan Certificate of Origin Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background:#F8FAFC; border-left:4px solid #F59E0B; padding:15px; border-radius:0 12px 12px 0;">
              <h4 style="margin:0 0 10px 0; color:#B45309;">Sri Lankan Free Trade Agreements (FTAs)</h4>
              <p style="margin:0; font-size:0.9rem; color:#334155;">Sri Lanka benefits from several FTAs, including ISFTA (India), PSFTA (Pakistan), and the GSP+ scheme for the European Union. By obtaining a GSP+ Certificate (Form A) from the Department of Commerce, Sri Lankan apparel and seafood exporters can export to the EU at 0% import duty, giving them a massive pricing advantage over competitors.</p>
            </div>
            
            <h3>Chamber of Commerce Legalization</h3>
            <p>A non-preferential COO is issued and officially stamped (legalized) by the <strong>Ceylon Chamber of Commerce (CCC)</strong> or the <strong>National Chamber of Exporters (NCE)</strong> in Sri Lanka. They will verify the manufacturer's invoices and factory locations before applying their official embossed seal. Without this seal, destination customs (e.g., in the Middle East) will reject it and charge full duty rates.</p>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        },
        {
          id: "phytosanitary-certificate",
          title: "Phytosanitary Certificate",
          summary: "Plant safety clearances for organic exports.",
          content: `
            <p>A <strong>Phytosanitary Certificate (Phyto)</strong> is an official document required when shipping regulated articles such as plants, plant products (like Ceylon tea, coffee, spices), or other regulated articles.</p>
            
            <img src="images/srilankan_phytosanitary_certificate.png" alt="Sri Lankan Phytosanitary Certificate Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; display:flex; flex-wrap:wrap; gap:15px;">
              <div style="flex:1; min-width:200px; background:#F0FDF4; border:1px solid #86EFAC; padding:15px; border-radius:12px;">
                <h4 style="margin:0 0 10px 0; color:#14532D;">National Plant Quarantine Service (NPQS)</h4>
                <p style="font-size:0.85rem; color:#166534; margin:0;">In Sri Lanka, this certificate is strictly issued by the NPQS (under the Department of Agriculture) located near the Katunayake Airport. It acts as proof to the importing country that the cargo is free from invasive pests and diseases.</p>
              </div>
            </div>
            
            <h3>The Inspection Process & Rejection Risks</h3>
            <p>An agricultural inspector from the NPQS must physically inspect the cargo (or take samples of the tea/spices), test for mold, soil, or live insects, and only then issue the Phyto. <strong>Critical Risk:</strong> If a container of Ceylon Cinnamon arrives in Europe without this document, customs will immediately quarantine it. The importer will be forced to pay for extremely expensive chemical fumigation at the port, or worse, the entire container will be ordered destroyed!</p>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "health-certificate",
          title: "Health Certificate",
          summary: "Clearances for processed food and beverages imports.",
          content: `
            <p>While a Phytosanitary Certificate is for raw plants, a <strong>Health Certificate</strong> (or Sanitary Certificate) is required for processed food, beverages, dairy, meat, and seafood intended for human or animal consumption.</p>
            
            <img src="images/srilankan_health_certificate.png" alt="Sri Lankan Health Certificate Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background:#FFFBEB; border:1px solid #FDE68A; padding:15px; border-radius:12px;">
              <h4 style="margin:0 0 10px 0; color:#B45309;">Ministry of Health (MoH) Sri Lanka</h4>
              <p style="margin:0; font-size:0.9rem; color:#78350F;">For Sri Lankan exporters (e.g., exporting processed coconut water or frozen yellowfin tuna), this is issued by the Food Control Administration Unit (FCAU) of the Ministry of Health, or the Department of Fisheries. It certifies that the food was processed in a sanitary facility and complies with international food safety standards (like HACCP or ISO 22000), proving it is fit for human consumption.</p>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "fumigation-certificate",
          title: "Fumigation Certificate",
          summary: "Wood packing pest treatment (ISPM 15) guidelines.",
          content: `
            <p>The <strong>Fumigation Certificate</strong> is a pest control document. It serves as proof that wooden packaging materials (like pallets, crates, and dunnage) have been chemically treated to kill wood-boring insects before the cargo was loaded into the container. In Sri Lanka, this is mandatory for exports using wooden packaging to major markets like Australia and the EU.</p>
            
            <img src="images/srilankan_fumigation_certificate.png" alt="Sri Lankan Fumigation Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #94A3B8; padding:20px; border-radius:16px; text-align:center; font-family:'Outfit', sans-serif;">
              <strong style="color:#334155; font-size:1.1rem; display:block; margin-bottom:15px;">🌱 ISPM-15 Standard (The Wheat Stamp)</strong>
              <svg width="100%" height="80" viewBox="0 0 300 80" style="display:block; margin:0 auto; max-width:250px; overflow:visible;">
                <rect x="10" y="10" width="280" height="60" fill="none" stroke="#475569" stroke-width="3"/>
                <line x1="100" y1="10" x2="100" y2="70" stroke="#475569" stroke-width="3"/>
                <text x="55" y="45" fill="#475569" font-size="28" text-anchor="middle" font-weight="900">IPPC</text>
                <text x="195" y="35" fill="#475569" font-size="14" text-anchor="middle" font-weight="900">XX - 000</text>
                <text x="195" y="55" fill="#475569" font-size="14" text-anchor="middle" font-weight="900">YY</text>
              </svg>
              <p style="font-size:0.8rem; margin:15px 0 0 0; color:#475569;">All solid wood packaging must bear this stamp globally. XX = Country Code, 000 = Treatment Provider, YY = Treatment Type (HT = Heat Treated, MB = Methyl Bromide).</p>
            </div>
            
            <h3>Why Plastic Pallets Avoid This:</h3>
            <p>Many modern exporters use plastic slip-sheets or plastic pallets instead of wood. Because plastic cannot harbor beetles or termites, ISPM-15 rules do not apply, meaning you can skip the costly fumigation process entirely.</p>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "insurance-certificate",
          title: "Insurance Certificate",
          summary: "Marine insurance clauses and value coverage rules.",
          content: `
            <p>Under international trade, carriers (airlines and shipping lines) have severely limited liability for cargo loss or damage (often capped at around $2 per kilo). An <strong>Insurance Certificate</strong> is critical to protect the true commercial value of your cargo during transit.</p>
            
            <img src="images/srilankan_insurance_certificate.png" alt="Sri Lankan Insurance Certificate Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); border:2px solid #93C5FD; padding:20px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <strong style="color:#1D4ED8; font-size:1.1rem; display:block; margin-bottom:15px; text-align:center;">🔹 Institute Cargo Clauses (ICC)</strong>
              <table style="width:100%; border-collapse:collapse; font-size:0.9rem; text-align:left; background:#FFF; border-radius:8px; overflow:hidden;">
                <tr style="border-bottom:1px solid #DBEAFE;">
                  <td style="padding:12px;"><strong style="color:#1E40AF; font-size:1.05rem;">Clause A (All Risks)</strong></td>
                  <td style="padding:12px; color:#1E3A8A;">The widest cover. Protects against almost all physical loss or damage (weather, theft, sinking, dropping), except for inherent vice (cargo spoiling naturally) or improper packing.</td>
                </tr>
                <tr style="border-bottom:1px solid #DBEAFE;">
                  <td style="padding:12px;"><strong style="color:#1E40AF; font-size:1.05rem;">Clause B</strong></td>
                  <td style="padding:12px; color:#1E3A8A;">Moderate cover. Specifically covers major named risks (fire, explosion, vessel sinking, washing overboard) but not theft or rough handling.</td>
                </tr>
                <tr>
                  <td style="padding:12px;"><strong style="color:#1E40AF; font-size:1.05rem;">Clause C</strong></td>
                  <td style="padding:12px; color:#1E3A8A;">Minimum cover. Only pays out in catastrophic events (vessel sinks, train derails). Highly restrictive and rarely used for high-value goods.</td>
                </tr>
              </table>
            </div>
            
            <h3>The 110% Rule & General Average</h3>
            <p>Most commercial insurance is taken out at <strong>110% of the CIF Value</strong> (Cost + Insurance + Freight). The extra 10% covers the anticipated profit lost if the goods are destroyed.</p>
            <p><strong>Important Note:</strong> A major reason to buy insurance is to protect against <em>General Average</em> declarations. If a ship catches fire, all shippers must mathematically share the cost of the damage. If you don't have insurance, you must pay this massive cash penalty out of pocket before they release your surviving cargo!</p>
          `,
          youtube: "https://www.youtube.com/embed/yQ5uIe-1pE8"
        },
        {
          id: "letter-of-credit-documentation",
          title: "Letter of Credit Documentation",
          summary: "Bank compliant documentation matching and presentation rules.",
          content: `
            <p>A <strong>Letter of Credit (L/C)</strong> is a financial mechanism where the buyer's bank guarantees payment to the seller's bank, <em>but only if</em> the seller presents a flawless set of shipping documents that exactly match the L/C terms. In Sri Lanka, L/Cs are processed through major commercial banks like BOC, Commercial Bank, and HNB, governed by ICC UCP 600 rules.</p>
            
            <img src="images/srilankan_letter_of_credit_documentation.png" alt="Sri Lankan Letter of Credit Example" style="width:100%; max-width:600px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15); background:#FFF; padding:15px;">
            
            <div style="margin:25px 0; background:#F8FAFC; border-left:4px solid #6366F1; padding:15px; border-radius:0 12px 12px 0;">
              <h4 style="margin:0 0 10px 0; color:#4338CA;">The Doctrine of Strict Compliance</h4>
              <p style="margin:0; font-size:0.9rem; color:#334155;">Banks deal purely in documents, not physical goods. If the L/C requires the Packing List to state "100 blue widgets", and the Packing List says "100 widgets (blue)", the bank will flag it as a discrepancy and refuse to release the payment to the exporter! Spelling mistakes, mismatched dates, or missing stamps are fatal errors.</p>
            </div>
            
            <h3>Critical L/C Document Presentation Rules:</h3>
            <ul>
              <li><strong>Clean Bill of Lading:</strong> The B/L cannot have any notes from the carrier stating the boxes were damaged, crushed, or leaking when loaded. It must be "Clean on Board".</li>
              <li><strong>Latest Shipment Date:</strong> The B/L onboard date cannot be even one day later than the maximum shipment date specified in the L/C.</li>
              <li><strong>Negotiable Set Surrender:</strong> Usually requires 3 "Original" Bills of Lading to be presented to the bank. A Telex Release is almost never allowed under L/C terms.</li>
              <li><strong>Consistency across documents:</strong> The weights and piece counts on the B/L, Commercial Invoice, Packing List, and Certificate of Origin must align perfectly.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/5tXJp0T_zT0"
        },
        {
          id: "common-documentation-errors",
          title: "Common Documentation Errors",
          summary: "Gotchas to check: weights mismatch, spelling errors, incorrect HS codes.",
          content: `
            <p>Even minor administrative mistakes can cascade into massive financial losses due to port demurrage, customs fines, and delayed production. Always triple-check the following "Gotchas" before finalizing export documents:</p>
            
            <img src="images/doc_errors_infographic.png" alt="Documentation Errors Infographic" style="width:100%; max-width:800px; border-radius:12px; margin:25px auto; display:block; box-shadow:0 10px 25px rgba(0,0,0,0.15);">
            
            <h3>The Hidden Cost of Fixing Errors</h3>
            <p>Amending a Bill of Lading after the vessel has sailed typically incurs a "Manifest Amendment Fee" from the carrier (usually $50 - $150). However, the real danger is the time it takes. If an error forces a 4-day customs hold, the resulting port storage fees (demurrage) can easily exceed $1,500 per container.</p>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        }
      ]
    },
    {
      id: "pricing-rates",
      title: "7. Pricing and Rate Knowledge",
      description: "For internal commercial and procurement training.",
      icon: "💰",
      subtopics: [
        {
          id: "how-freight-rates-are-built",
          title: "How Freight Rates Are Built",
          image: "images/freight_rates_built.png",
          summary: "Base rates, fuel factors, security surcharges, and local port charges.",
          content: `
            <p>A massive mistake rookie shippers make is assuming the "freight rate" they see on a quotation is the <em>total</em> cost they will pay. In reality, modern logistics pricing is a complex stack of base rates, floating fuel indices, and fixed local terminal charges.</p>
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); border:2px solid #86EFAC; padding:20px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <strong style="color:#166534; font-size:1.1rem; display:block; margin-bottom:15px; text-align:center;">🔹 The Total Landed Cost Equation</strong>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #3B82F6;">
                  <strong style="color:#1E3A8A;">1. Origin Locals (FOB Charges)</strong>
                  <p style="font-size:0.8rem; margin:5px 0 0 0; color:#475569;">Origin customs clearance, export terminal handling (OTHC), truck to port.</p>
                </div>
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #8B5CF6;">
                  <strong style="color:#5B21B6;">2. Main Freight (The Carrier Rate)</strong>
                  <p style="font-size:0.8rem; margin:5px 0 0 0; color:#475569;">The Base Ocean/Air rate + Fuel Surcharge (BAF/MYC) + Security Surcharges.</p>
                </div>
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #10B981;">
                  <strong style="color:#064E3B;">3. Destination Locals (Import Charges)</strong>
                  <p style="font-size:0.8rem; margin:5px 0 0 0; color:#475569;">Destination terminal handling (DTHC), import customs brokerage, delivery to door.</p>
                </div>
              </div>
            </div>
            
            <p><strong>The Incoterm Trap:</strong> If you buy goods <em>EXW (Ex-Works)</em>, you pay for blocks 1, 2, and 3. If you buy <em>FOB</em>, the seller pays block 1, and you only pay blocks 2 and 3.</p>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w"
        },
        {
          id: "ocean-freight-rate-components",
          title: "Ocean Freight Rate Components",
          image: "images/ocean_freight_components.png",
          summary: "BAF, CAF, THC, Port Dues, and documentation fee structures.",
          content: `
            <p>A massive mistake rookie shippers make is assuming the "freight rate" they see on a quotation is the <em>total</em> cost they will pay. In reality, modern logistics pricing is a complex stack of base rates, floating fuel indices, and fixed local terminal charges.</p>
            
            <!-- CSS INFOGRAPHIC: FREIGHT RATE STACK -->
            <div style="margin: 30px 0; background: linear-gradient(145deg, #0F172A, #1E293B); border-radius: 16px; padding: 25px; color: #FFF; font-family: 'Outfit', sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
              <h4 style="text-align: center; color: #38BDF8; font-size: 1.3rem; margin: 0 0 20px 0; letter-spacing: 1px;">THE OCEAN FREIGHT RATE STACK</h4>
              
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <!-- Base Rate -->
                <div style="background: #1E3A8A; padding: 15px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid #60A5FA;">
                  <div>
                    <strong style="font-size: 1.1rem; color: #EFF6FF; display: block;">Base Rate (O/F)</strong>
                    <span style="font-size: 0.85rem; color: #93C5FD;">The core cost of ocean transit</span>
                  </div>
                  <strong style="color: #60A5FA; font-size: 1.2rem;">60%</strong>
                </div>
                
                <!-- BAF -->
                <div style="background: #3F3F46; padding: 15px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid #F59E0B;">
                  <div>
                    <strong style="font-size: 1.1rem; color: #FAFAF9; display: block;">Bunker Adjustment Factor (BAF)</strong>
                    <span style="font-size: 0.85rem; color: #D4D4D8;">Floating fuel surcharge</span>
                  </div>
                  <strong style="color: #F59E0B; font-size: 1.2rem;">20%</strong>
                </div>
                
                <!-- THC -->
                <div style="background: #064E3B; padding: 15px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid #34D399;">
                  <div>
                    <strong style="font-size: 1.1rem; color: #ECFDF5; display: block;">Terminal Handling Charges (THC)</strong>
                    <span style="font-size: 0.85rem; color: #A7F3D0;">Port crane and yard operations</span>
                  </div>
                  <strong style="color: #34D399; font-size: 1.2rem;">15%</strong>
                </div>
                
                <!-- Security/Admin -->
                <div style="background: #4C1D95; padding: 15px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid #A78BFA;">
                  <div>
                    <strong style="font-size: 1.1rem; color: #F5F3FF; display: block;">ISPS & Doc Fees</strong>
                    <span style="font-size: 0.85rem; color: #C4B5FD;">Security and administrative costs</span>
                  </div>
                  <strong style="color: #A78BFA; font-size: 1.2rem;">5%</strong>
                </div>
              </div>
            </div>
            
            <h3>Core Ocean Surcharges Detailed:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>O/F (Ocean Freight):</strong> The base cost to move the steel box across the ocean. Subject to massive supply/demand swings.</li>
              <li><strong>BAF (Bunker Adjustment Factor):</strong> The fuel surcharge. If global crude oil prices spike, BAF spikes immediately. Sometimes broken down into LSS (Low Sulphur Surcharge) due to IMO 2020 green regulations.</li>
              <li><strong>CAF (Currency Adjustment Factor):</strong> Protects the carrier against currency exchange rate losses between the loading and discharge ports (e.g., USD vs EUR fluctuations).</li>
              <li><strong>THC (Terminal Handling Charge):</strong> The fee paid to the port authority for using massive gantry cranes to lift your container onto/off the vessel. This is fixed per port.</li>
              <li><strong>ISPS (Security Surcharge):</strong> Funds the port and vessel's anti-terrorism compliance measures (International Ship and Port Facility Security Code).</li>
              <li><strong>B/L Fee:</strong> The administrative fee the carrier charges to print and release the Bill of Lading.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "air-freight-rate-components",
          title: "Air Freight Rate Components",
          image: "images/air_freight_components.png",
          summary: "Fuel (MYC), Security (SCC), and terminal handling fees.",
          content: `
            <p>Air freight pricing is structured very differently from ocean freight. It is entirely weight-based rather than per-container, and it is highly susceptible to fuel price volatility.</p>
            
            <div style="margin:25px 0; background:#F8FAFC; border-left:4px solid #0284C7; padding:15px; border-radius:0 12px 12px 0;">
              <h4 style="margin:0 0 10px 0; color:#0369A1;">📌 The Chargeable Weight Rule</h4>
              <p style="margin:0; font-size:0.95rem; color:#334155; line-height: 1.6;">Airlines charge based on <strong>Chargeable Weight</strong>—which is the higher value between the <em>Actual Gross Weight (kg)</em> and the <em>Volumetric Weight (Volume in cbm × 167)</em>. Because aircraft have limited space, a massive box of light feathers will be billed for its massive volume (dimensional weight), not its physical weight on a scale.</p>
            </div>
            
            <!-- CSS INFOGRAPHIC: AIR FREIGHT -->
            <div style="margin: 30px 0; display: flex; gap: 20px; flex-wrap: wrap; font-family: 'Outfit', sans-serif;">
              <div style="flex: 1; min-width: 250px; background: #FFF; border: 2px solid #E2E8F0; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="font-size: 3rem; margin-bottom: 10px;">🧱</div>
                <h4 style="color: #0F172A; margin: 0 0 5px 0;">Heavy Cargo (e.g. Steel Parts)</h4>
                <p style="color: #64748B; font-size: 0.9rem; margin: 0 0 15px 0;">Actual Weight > Volumetric Weight</p>
                <div style="background: #EF4444; color: #FFF; padding: 5px 10px; border-radius: 6px; display: inline-block; font-weight: bold;">Billed by Actual KG</div>
              </div>
              <div style="flex: 1; min-width: 250px; background: #FFF; border: 2px solid #E2E8F0; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="font-size: 3rem; margin-bottom: 10px;">☁️</div>
                <h4 style="color: #0F172A; margin: 0 0 5px 0;">Bulky Cargo (e.g. Cushions)</h4>
                <p style="color: #64748B; font-size: 0.9rem; margin: 0 0 15px 0;">Volumetric Weight > Actual Weight</p>
                <div style="background: #3B82F6; color: #FFF; padding: 5px 10px; border-radius: 6px; display: inline-block; font-weight: bold;">Billed by Volume (CBM)</div>
              </div>
            </div>
            
            <h3>Core Aviation Surcharges (Billed Per Kg):</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Base Air Freight:</strong> The core transit cost per kg. Often tiered (e.g., cheaper rate per kg if shipping over +1000kg).</li>
              <li><strong>MYC (Fuel Surcharge):</strong> Aviation fuel is incredibly expensive. This surcharge often costs more than the base freight itself!</li>
              <li><strong>SCC (Security Surcharge):</strong> Covers mandatory X-ray screening and explosive trace detection before cargo is allowed near a passenger aircraft belly.</li>
              <li><strong>Screening Fee:</strong> Charged by the origin terminal operator (e.g., ground handling agents) to physically perform the scan.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "fuel-surcharge-explained",
          title: "Fuel Surcharge Explained",
          image: "images/fuel_surcharge_explained.png",
          summary: "Bunker factors and aviation fuel adjustment indices.",
          content: `
            <p>Fuel is the single largest operating expense for transport carriers. Because crude oil prices fluctuate wildly based on geopolitics, carriers cannot lock in a fixed fuel price for a whole year. Instead, they use a floating <strong>Fuel Surcharge</strong> that updates monthly (or even weekly).</p>
            
            <!-- CSS INFOGRAPHIC: FUEL -->
            <div style="margin: 30px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-family: 'Outfit', sans-serif;">
              <div style="background: linear-gradient(to bottom, #FFF, #FFF7ED); border: 1px solid #FED7AA; border-radius: 12px; padding: 25px; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 15px;">🛢️</div>
                <h4 style="color: #9A3412; font-size: 1.2rem; margin: 0 0 10px 0;">Ocean BAF (Bunker)</h4>
                <p style="color: #78350F; font-size: 0.9rem; margin: 0 0 15px 0; line-height: 1.6;">Ocean vessels burn heavy fuel oil (Bunker). BAF is usually charged as a <strong>flat fee per container</strong> (e.g., $150 per TEU). If oil prices drop, the BAF drops. Note: In Europe, it's sometimes called EBS (Emergency Bunker Surcharge).</p>
                <div style="background: #EA580C; color: white; display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">Billed per TEU/FEU</div>
              </div>
              
              <div style="background: linear-gradient(to bottom, #FFF, #F0F9FF); border: 1px solid #BAE6FD; border-radius: 12px; padding: 25px; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 15px;">✈️</div>
                <h4 style="color: #0369A1; font-size: 1.2rem; margin: 0 0 10px 0;">Aviation MYC (Jet Fuel)</h4>
                <p style="color: #0C4A6E; font-size: 0.9rem; margin: 0 0 15px 0; line-height: 1.6;">Airlines burn highly refined Jet-A fuel. MYC is charged <strong>per kilogram</strong> of cargo (e.g., $1.20/kg). It is highly volatile and is published via an index linked to the Rotterdam or US Gulf Coast jet fuel prices.</p>
                <div style="background: #0284C7; color: white; display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">Billed per KG</div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w"
        },
        {
          id: "origin-and-destination-charges",
          title: "Origin and Destination Charges",
          image: "images/origin_destination_charges.png",
          summary: "THC, customs brokerage, and local delivery fee breakdowns.",
          content: `
            <p>When calculating landed cost, many importers make the fatal error of only budgeting for the ocean freight rate. They forget that moving the cargo from the factory to the port (and vice versa at destination) costs significant money. These are known as "Locals".</p>
            
            <!-- CSS INFOGRAPHIC: LOCALS FLOWCHART -->
            <div style="margin: 30px 0; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 12px; padding: 25px; font-family: 'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #172554; font-size: 1.2rem; margin: 0 0 20px 0;">THE LOCAL CHARGES LIFECYCLE</h4>
              
              <div style="display: flex; justify-content: space-between; align-items: stretch; gap: 15px;">
                <!-- Origin -->
                <div style="flex: 1; background: #F0FDF4; border-top: 4px solid #166534; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 2rem; margin-bottom: 10px; text-align: center;">🏭 ➡️ 🏗️</div>
                  <h5 style="color: #14532D; font-size: 1.1rem; margin: 0 0 15px 0; text-align: center;">Origin Local Charges</h5>
                  <ul style="margin:0; padding-left:20px; font-size:0.9rem; color:#166534; line-height:1.6;">
                    <li><strong>Cartage/Drayage:</strong> Truck hauling empty container to factory, then full to port.</li>
                    <li><strong>Export Customs Brokerage:</strong> Fee to file export CusDec.</li>
                    <li><strong>Origin THC (OTHC):</strong> Port fee to lift box onto ship.</li>
                    <li><strong>VGM Weighing Fee:</strong> Solas compliance weighing.</li>
                  </ul>
                </div>
                
                <!-- Ocean -->
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 60px;">
                  <div style="color: #3B82F6; font-size: 1.5rem;">🚢</div>
                  <span style="font-size: 0.7rem; color: #64748B; text-align: center; margin-top: 5px;">OCEAN FREIGHT</span>
                </div>
                
                <!-- Destination -->
                <div style="flex: 1; background: #FEF2F2; border-top: 4px solid #991B1B; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 2rem; margin-bottom: 10px; text-align: center;">🚢 ➡️ 🏢</div>
                  <h5 style="color: #7F1D1D; font-size: 1.1rem; margin: 0 0 15px 0; text-align: center;">Destination Local Charges</h5>
                  <ul style="margin:0; padding-left:20px; font-size:0.9rem; color:#991B1B; line-height:1.6;">
                    <li><strong>Destination THC (DTHC):</strong> Port fee to lift box off ship to yard.</li>
                    <li><strong>DO Fee (Delivery Order):</strong> Admin fee carrier charges to release cargo.</li>
                    <li><strong>Import Customs Brokerage:</strong> Filing entry & calculating duties.</li>
                    <li><strong>Import Duties & VAT:</strong> Government taxes paid before release.</li>
                  </ul>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/yQ5uIe-1pE8"
        },
        {
          id: "gri-pss-emergency-surcharges",
          title: "GRI, PSS and Emergency Surcharges",
          image: "images/gri_pss_surcharges.png",
          summary: "Peak season adjustments and rate revisions.",
          content: `
            <p>Ocean freight rates operate in a highly volatile supply-and-demand market. When demand outstrips supply (i.e., there is more cargo sitting at the port than ships available), shipping lines implement aggressive surcharges to maximize their profit margins. Understanding these is key to accurate supply chain budgeting.</p>
            
            <!-- CSS INFOGRAPHIC: SURCHARGES -->
            <div style="margin:25px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:1px solid #CBD5E1; padding:20px; border-radius:12px; font-family:'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #0F172A; font-size: 1.2rem; margin: 0 0 15px 0;">THE 3 MAJOR RATE SHOCKS</h4>
              
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <!-- GRI -->
                <div style="background: #FFF; border-left: 5px solid #3B82F6; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #1D4ED8; font-size: 1.1rem; display: block; margin-bottom: 5px;">🔹 GRI (General Rate Increase)</strong>
                  <p style="color: #475569; font-size: 0.9rem; margin: 0; line-height: 1.5;">Usually implemented on the 1st or 15th of the month. Carriers use it to artificially raise base rates across all trade lanes when they feel market rates have dropped too low. If a GRI is announced, a $1,000 container can suddenly jump to $1,500.</p>
                </div>
                
                <!-- PSS -->
                <div style="background: #FFF; border-left: 5px solid #F59E0B; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #B45309; font-size: 1.1rem; display: block; margin-bottom: 5px;">🔹 PSS (Peak Season Surcharge)</strong>
                  <p style="color: #475569; font-size: 0.9rem; margin: 0; line-height: 1.5;">Applied during massive retail rushes. Common during the pre-Christmas rush (August to November) or just before the Chinese New Year (CNY) when Asian factories export massively before shutting down for weeks.</p>
                </div>
                
                <!-- EBS -->
                <div style="background: #FFF; border-left: 5px solid #EF4444; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #B91C1C; font-size: 1.1rem; display: block; margin-bottom: 5px;">🔹 Emergency Surcharges (War/Piracy)</strong>
                  <p style="color: #475569; font-size: 0.9rem; margin: 0; line-height: 1.5;">Applied completely unexpectedly due to geopolitical events. Example: The Red Sea Crisis forced ships to detour around Africa (Cape of Good Hope), triggering massive Emergency Risk Surcharges (ERS) overnight.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "spot-rates-vs-contract-rates",
          title: "Spot Rates vs Contract Rates",
          image: "images/spot_vs_contract.png",
          summary: "Comparing market rates to long-term cargo agreements.",
          content: `
            <p>Shippers must strategically decide how to procure their freight rates. The choice between Spot Rates and Contract Rates depends entirely on a company's annual cargo volume and their risk tolerance for market volatility.</p>
            
            <div style="margin:25px 0; display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; font-family:'Outfit', sans-serif;">
              <div style="background:#F0F9FF; border:2px solid #7DD3FC; padding:20px; border-radius:12px; position:relative; overflow:hidden;">
                <div style="position:absolute; top:-20px; right:-20px; font-size:5rem; opacity:0.1;">🏢</div>
                <h4 style="margin:0 0 10px 0; color:#0369A1; font-size: 1.2rem;">Spot Rates (FAK)</h4>
                <p style="font-size:0.9rem; color:#0C4A6E; margin:0 0 15px 0; line-height: 1.6;">"Freight All Kinds". These are floating market rates valid for only 15 to 30 days. You book whatever the current market price is on the day of sailing.</p>
                <div style="background: rgba(255,255,255,0.7); padding: 10px; border-radius: 8px;">
                  <p style="font-size:0.85rem; color:#0284C7; margin:0 0 5px 0;">✅ <strong>Best For:</strong> Small businesses shipping &lt; 50 containers a year.</p>
                  <p style="font-size:0.85rem; color:#B91C1C; margin:0;">⚠️ <strong>Risk:</strong> Terrible when demand spikes and prices double overnight.</p>
                </div>
              </div>
              
              <div style="background:#FDF4FF; border:2px solid #F0ABFC; padding:20px; border-radius:12px; position:relative; overflow:hidden;">
                <div style="position:absolute; top:-20px; right:-20px; font-size:5rem; opacity:0.1;">🚢</div>
                <h4 style="margin:0 0 10px 0; color:#A21CAF; font-size: 1.2rem;">Contract Rates (NAC)</h4>
                <p style="font-size:0.9rem; color:#4A044E; margin:0 0 15px 0; line-height: 1.6;">"Named Account Contracts". Fixed rates locked in directly with a shipping line (e.g., Maersk or MSC) for 6 to 12 months, shielding you from GRI/PSS spikes.</p>
                <div style="background: rgba(255,255,255,0.7); padding: 10px; border-radius: 8px;">
                  <p style="font-size:0.85rem; color:#C026D3; margin:0 0 5px 0;">✅ <strong>Best For:</strong> Mega-shippers (e.g., Walmart, Amazon) shipping thousands of TEUs.</p>
                  <p style="font-size:0.85rem; color:#B91C1C; margin:0;">⚠️ <strong>Risk:</strong> Requires an MQC (Minimum Quantity Commitment). If you don't ship the agreed volume, you pay heavy "dead freight" penalties.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w"
        },
        {
          id: "rate-validity-and-space-protection",
          title: "Rate Validity and Space Protection",
          image: "images/rate_validity_space.png",
          summary: "Managing rolling bookings and rate expiries.",
          content: `
            <p>In logistics, having a cheap freight rate is completely useless if your cargo never actually gets loaded onto the ship. This introduces the concept of Space Protection.</p>
            
            <div style="margin:25px 0; background:#FFF1F2; border: 2px solid #FDA4AF; padding:20px; border-radius:12px; display: flex; gap: 20px; align-items: center;">
              <div style="font-size: 3.5rem; flex-shrink: 0;">⚓</div>
              <div>
                <h4 style="margin:0 0 8px 0; color:#9F1239; font-size: 1.2rem;">Rolled Cargo (The Nightmare Scenario)</h4>
                <p style="margin:0; font-size:0.95rem; color:#881337; line-height: 1.6;">A vessel can physically only hold a certain number of containers. Carriers often overbook ships (just like airlines overbook passenger flights, expecting some cancellations). If 110% of the containers show up at the port, the carrier must decide who gets left behind.</p>
              </div>
            </div>
            
            <p><strong>Who gets rolled?</strong> If you are paying a heavily discounted, rock-bottom Spot Rate, your container is the very first to be "rolled" (left at the port to wait for the next ship a week later). The carrier prioritizes loading cargo from customers who are paying higher rates or premium surcharges.</p>
            
            <p><strong>Space Protection:</strong> During Peak Season, smart forwarders will actually pay "Premium Space Guarantee" surcharges just to ensure the carrier doesn't roll their containers. This is why the absolute <em>cheapest rate</em> almost never equals the <em>best service</em>.</p>
          `,
          youtube: "https://www.youtube.com/embed/4G1L5fBvM0w"
        },
        {
          id: "how-to-read-a-carrier-quotation",
          title: "How to Read a Carrier Quotation",
          image: "images/read_carrier_quotation.png",
          summary: "Analyzing freight inclusions, exclusions, and local fees.",
          content: `
            <p>A professional logistics quotation is more than just a price tag; it is a legally binding offer with strict conditions. You must read the fine print, otherwise, your $2,000 quote could turn into a $3,500 final invoice.</p>
            
            <!-- CSS INFOGRAPHIC: CHECKLIST -->
            <div style="margin:25px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:1px solid #CBD5E1; padding:25px; border-radius:12px; font-family:'Outfit', sans-serif;">
              <h4 style="color:#0F172A; font-size:1.2rem; margin:0 0 20px 0; border-bottom: 2px solid #CBD5E1; padding-bottom: 10px;">📌 The Forwarder's Quote Audit Checklist</h4>
              <ul style="margin:0; padding-left:0; list-style:none; color:#334155; line-height:1.7; font-size:0.95rem; display: flex; flex-direction: column; gap: 15px;">
                <li style="display: flex; gap: 15px; background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6;">
                  <span style="font-size: 1.5rem;">📄</span>
                  <div>
                    <strong style="color: #1E3A8A; display: block; font-size: 1.05rem;">Validity Date</strong>
                    When does this rate expire? If the ship's actual departure date (ETD) is even one day after the expiry date, you will be hit with the new, usually higher, rate.
                  </div>
                </li>
                <li style="display: flex; gap: 15px; background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #10B981;">
                  <span style="font-size: 1.5rem;">👤</span>
                  <div>
                    <strong style="color: #064E3B; display: block; font-size: 1.05rem;">Routing & Transits</strong>
                    Is it a Direct sailing (e.g., Colombo to Rotterdam in 20 days) or a Transshipment routing via Singapore (taking 45 days)? Time is money.
                  </div>
                </li>
                <li style="display: flex; gap: 15px; background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B;">
                  <span style="font-size: 1.5rem;">📍</span>
                  <div>
                    <strong style="color: #78350F; display: block; font-size: 1.05rem;">"Subject To" Clauses</strong>
                    Quotes often state: "Subject to GRI, BAF, and locals at time of shipment". This means the carrier has the legal right to increase the invoice if fuel spikes before sailing.
                  </div>
                </li>
                <li style="display: flex; gap: 15px; background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #EF4444;">
                  <span style="font-size: 1.5rem;">📦</span>
                  <div>
                    <strong style="color: #7F1D1D; display: block; font-size: 1.05rem;">Demurrage Free Time</strong>
                    How many days of free port storage at the destination are included? Standard is 5-7 days. If customs delays clearance, penalties can exceed $150/day!
                  </div>
                </li>
              </ul>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w"
        },
        {
          id: "margin-and-profitability-basics",
          title: "Margin and Profitability Basics",
          image: "images/margin_profitability.png",
          summary: "Buy rates vs sell rates and logistics margins.",
          content: `
            <p>Freight Forwarders (NVOCCs) generally do not own ships, airplanes, or trucks. They are logistics architects. They make money by buying space in massive bulk from asset-based carriers at wholesale rates (Buy Rates) and selling it to shippers at retail rates (Sell Rates).</p>
            
            <!-- CSS INFOGRAPHIC: PROFIT EQUATION -->
            <div style="margin:30px 0; display:flex; justify-content:center; align-items:center; gap:15px; background: linear-gradient(145deg, #1E293B, #0F172A); padding:25px; border-radius:16px; font-family:'Outfit', sans-serif; flex-wrap: wrap;">
              <div style="text-align:center; padding:20px; background:#1E3A8A; border:2px solid #3B82F6; border-radius:12px; flex:1; min-width: 150px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                <strong style="color:#93C5FD; font-size:1.1rem; display:block; text-transform: uppercase; letter-spacing: 1px;">Buy Rate</strong>
                <span style="color:#FFF; font-size:1.8rem; font-weight: bold; margin: 5px 0; display: block;">$2,000</span>
                <p style="font-size:0.8rem; color:#BFDBFE; margin:0;">Paid directly to Maersk Line for the container</p>
              </div>
              <div style="color:#94A3B8; font-size:2rem; font-weight:bold;">+</div>
              <div style="text-align:center; padding:20px; background:#064E3B; border:2px solid #10B981; border-radius:12px; flex:1; min-width: 150px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                <strong style="color:#6EE7B7; font-size:1.1rem; display:block; text-transform: uppercase; letter-spacing: 1px;">Margin</strong>
                <span style="color:#FFF; font-size:1.8rem; font-weight: bold; margin: 5px 0; display: block;">$300</span>
                <p style="font-size:0.8rem; color:#A7F3D0; margin:0;">Forwarder's Gross Profit (Markup)</p>
              </div>
              <div style="color:#94A3B8; font-size:2rem; font-weight:bold;">=</div>
              <div style="text-align:center; padding:20px; background:#7F1D1D; border:2px solid #EF4444; border-radius:12px; flex:1; min-width: 150px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                <strong style="color:#FCA5A5; font-size:1.1rem; display:block; text-transform: uppercase; letter-spacing: 1px;">Sell Rate</strong>
                <span style="color:#FFF; font-size:1.8rem; font-weight: bold; margin: 5px 0; display: block;">$2,300</span>
                <p style="font-size:0.8rem; color:#FECACA; margin:0;">Final price quoted to the Exporter</p>
              </div>
            </div>
            
            <h3>The Hidden Profit Centers</h3>
            <p>A smart forwarder's true profit is rarely just the $300 markup on the ocean freight. <strong>Yield Management</strong> is the secret to high profitability. Forwarders generate massive additional revenue by marking up the ancillary services:</p>
            <ul style="line-height: 1.7;">
              <li><strong>Inland Trucking:</strong> Buying a truck move for $200 and selling it for $280.</li>
              <li><strong>Customs Brokerage:</strong> In-house brokerage is almost pure profit after labor costs.</li>
              <li><strong>Document Fees:</strong> Charging a $50 "B/L Admin Fee" when the carrier only charges them $25.</li>
              <li><strong>Cargo Insurance:</strong> Taking a healthy commission on the insurance premium placed for the cargo.</li>
            </ul>
          `,
          youtube: "https://www.youtube.com/embed/yQ5uIe-1pE8"
        }
      ]
    },
    {
      id: "logistics-supply-chain",
      title: "8. Logistics and Supply Chain",
      description: "For broader operational knowledge.",
      icon: "🏭",
      subtopics: [
        {
          id: "types-of-logistics",
          title: "Types of Logistics",
          summary: "The key logistics channels driving supply chains.",
          content: `
            <img src="images/types_of_logistics.png" alt="types-of-logistics infographic" class="kb-infographic" />

            <p>Logistics is not just "moving boxes". It is a massive ecosystem of specialized supply chain segments. The most critical flows are Inbound, Outbound, and Reverse Logistics.</p>
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #CBD5E1; padding:20px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #0F172A; font-size: 1.2rem; margin: 0 0 15px 0;">THE 3 PHASES OF LOGISTICS</h4>
              <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:15px; flex-wrap: wrap;">
                <div style="flex:1; min-width: 120px; text-align:center; padding:15px; background:#FFF; border:2px dashed #94A3B8; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; display:block; font-size: 1.1rem;">1. Suppliers</strong>
                  <span style="font-size:0.8rem; color:#64748B;">Raw Materials</span>
                </div>
                <div style="color:#3B82F6; font-size:1.5rem; text-align: center; font-weight: bold;">➡️</div>
                <div style="flex:1; min-width: 120px; text-align:center; padding:15px; background:#DBEAFE; border:2px solid #3B82F6; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#1D4ED8; display:block; font-size: 1.1rem;">2. Factory</strong>
                  <span style="font-size:0.8rem; color:#2563EB;">Manufacturing</span>
                </div>
                <div style="color:#10B981; font-size:1.5rem; text-align: center; font-weight: bold;">➡️</div>
                <div style="flex:1; min-width: 120px; text-align:center; padding:15px; background:#D1FAE5; border:2px solid #10B981; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#047857; display:block; font-size: 1.1rem;">3. Customer</strong>
                  <span style="font-size:0.8rem; color:#059669;">End User</span>
                </div>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6;">
                  <strong style="color:#1D4ED8; font-size: 1.05rem;">Inbound Logistics (Phase 1 to 2)</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #334155;">Moving raw materials from Supplier to Factory. Requires strict Just-In-Time (JIT) coordination. If a single truck is late, a million-dollar automotive assembly line might shut down completely.</p>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #10B981;">
                  <strong style="color:#047857; font-size: 1.05rem;">Outbound Logistics (Phase 2 to 3)</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #334155;">Distributing finished goods from the Factory to the Customer via wholesale distribution centers and retail stores. This focuses heavily on cost optimization and volume.</p>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B;">
                  <strong style="color:#B45309; font-size: 1.05rem;">Reverse Logistics (Phase 3 to 1)</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #334155;">Moving goods backward for e-commerce returns, recycling, or warranty repairs. Highly complex because items return in unpredictable conditions.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/c0tW52b36Xg",
          linkToWidget: "logistics"
        },
        {
          id: "warehousing-basics",
          title: "Warehousing Basics",
          summary: "Receiving, sorting, storage, and order pick/pack systems.",
          content: `
            <img src="images/warehousing_basics.png" alt="warehousing-basics infographic" class="kb-infographic" />

            <p>A modern warehouse is far more than just a big empty building. It is a highly optimized node in the supply chain driven by advanced software called a Warehouse Management System (WMS).</p>
            
            <!-- CSS INFOGRAPHIC: 4 WAREHOUSE OPS -->
            <div style="margin:25px 0; display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; font-family:'Outfit', sans-serif;">
              <div style="background:#FFF; border:2px solid #E2E8F0; padding:20px; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">🛡️</div>
                <h4 style="color:#0F172A; margin:0 0 10px 0;">1. Receiving</h4>
                <p style="font-size:0.85rem; color:#64748B; margin:0; line-height: 1.5;">Inbound trucks dock. Workers unload, inspect for damages, and scan GS1 barcodes to officially log the inventory into the WMS database.</p>
              </div>
              <div style="background:#FFF; border:2px solid #E2E8F0; padding:20px; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">⚖️</div>
                <h4 style="color:#0F172A; margin:0 0 10px 0;">2. Put-Away</h4>
                <p style="font-size:0.85rem; color:#64748B; margin:0; line-height: 1.5;">Forklifts transport pallets from the receiving dock to assigned rack locations. The WMS determines the spot based on weight and temperature needs.</p>
              </div>
              <div style="background:#FFF; border:2px solid #E2E8F0; padding:20px; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">🏥</div>
                <h4 style="color:#0F172A; margin:0 0 10px 0;">3. Order Picking</h4>
                <p style="font-size:0.85rem; color:#64748B; margin:0; line-height: 1.5;">When an order drops, workers physically pick specific cartons from racks. This is the most labor-intensive and error-prone step in warehousing.</p>
              </div>
              <div style="background:#FFF; border:2px solid #E2E8F0; padding:20px; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">🌳</div>
                <h4 style="color:#0F172A; margin:0 0 10px 0;">4. Dispatch</h4>
                <p style="font-size:0.85rem; color:#64748B; margin:0; line-height: 1.5;">Picked goods are consolidated, shrink-wrapped onto pallets, labeled with carrier routing codes, and loaded onto outbound delivery trucks.</p>
              </div>
            </div>
            
            <div style="margin:25px 0; background:#FFFBEB; border-left:4px solid #F59E0B; padding:15px; border-radius:0 12px 12px 0;">
              <h4 style="margin:0 0 5px 0; color:#B45309;">📌 Optimization Strategy: Slotting</h4>
              <p style="margin:0; font-size:0.9rem; color:#78350F; line-height: 1.6;">Fast-moving consumer goods (FMCG) like daily essentials are "slotted" at the very front of the warehouse on lower racks. Slow-moving goods are stored high up and at the very back. This simple logic saves thousands of hours of forklift driving time annually.</p>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/j1uS1D_P2X8"
        },
        {
          id: "bonded-warehousing",
          title: "Bonded Warehousing",
          summary: "Deferring customs duties under regulatory bond.",
          content: `
            <img src="images/bonded_warehousing.png" alt="bonded-warehousing infographic" class="kb-infographic" />

            <p>A <strong>Bonded Warehouse</strong> is a highly secure facility strictly regulated by Customs authorities. It operates as a "duty-free zone" within a country and provides a massive cash-flow advantage to importers.</p>
            
            <!-- CSS INFOGRAPHIC: BONDED WAREHOUSE -->
            <div style="margin:25px 0; background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border:2px solid #7DD3FC; padding:25px; border-radius:12px; font-family:'Outfit', sans-serif;">
              <h4 style="color:#0369A1; font-size:1.2rem; margin:0 0 15px 0; text-align: center;">📌 The Duty Deferment Cashflow Trick</h4>
              <p style="margin:0 0 20px 0; font-size:0.95rem; color:#0C4A6E; line-height:1.6; text-align: center;">Normally, when goods arrive at a seaport, you must pay massive Import Duties upfront before customs releases them. However, if you move the goods directly into a Bonded Warehouse, <strong>no duties are paid yet</strong>.</p>
              
              <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px; background: #FFF; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color: #047857; font-size: 1.1rem; display: block; margin-bottom: 10px;">Scenario A: Local Sale</strong>
                  <p style="font-size: 0.9rem; color: #334155; margin: 0; line-height: 1.5;">You hold the goods in bond for 3 months. When you finally find a local buyer, you pay the duties <em>then</em>. You just saved 3 months of cash flow you would have otherwise given to the government upfront!</p>
                </div>
                <div style="flex: 1; min-width: 200px; background: #FFF; padding: 20px; border-radius: 8px; border-left: 4px solid #6366F1; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color: #4338CA; font-size: 1.1rem; display: block; margin-bottom: 10px;">Scenario B: Re-Export</strong>
                  <p style="font-size: 0.9rem; color: #334155; margin: 0; line-height: 1.5;">You hold the goods in bond for 3 months, then sell them to a buyer in a neighboring country. Because the goods never officially "entered" the local economy, <strong>you pay ZERO local duties!</strong></p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/j1uS1D_P2X8"
        },
        {
          id: "distribution-and-fulfilment",
          title: "Distribution and Fulfilment",
          summary: "B2B and B2C warehouse pick/pack logistics.",
          content: `
            <img src="images/distribution_fulfilment.png" alt="distribution-and-fulfilment infographic" class="kb-infographic" />

            <p>While a standard warehouse is designed to store bulk pallets for long periods (cheap storage), a <strong>Fulfilment Center</strong> is a high-octane facility designed for extreme high-speed throughput and rapid order processing. They are the engine behind modern e-commerce.</p>
            
            <!-- CSS INFOGRAPHIC: B2B vs B2C -->
            <div style="margin:25px 0; background:#FAFAFA; border:1px solid #E5E5E5; padding:25px; border-radius:16px; font-family: 'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0F172A; text-align:center; font-size: 1.3rem;">B2B vs B2C Fulfilment Architecture</h4>
              
              <div style="display:flex; gap:20px; flex-wrap:wrap;">
                <div style="flex:1; min-width:250px; background:#EFF6FF; border: 2px solid #BFDBFE; padding:20px; border-radius:12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 3rem; margin-bottom: 10px;">📦 ➡️ 🚢</div>
                  <strong style="color:#1D4ED8; font-size: 1.2rem; display: block; margin-bottom: 10px;">B2B (Business to Business)</strong>
                  <ul style="text-align: left; margin: 0; padding-left: 20px; font-size: 0.9rem; color: #1E3A8A; line-height: 1.6;">
                    <li><strong>Order Size:</strong> Massive (Full pallets or truckloads).</li>
                    <li><strong>Order Volume:</strong> Low (Maybe 50 orders a day).</li>
                    <li><strong>Customer:</strong> Retail stores (e.g., Walmart).</li>
                    <li><strong>Focus:</strong> Compliance with strict retail routing guides to avoid chargebacks.</li>
                  </ul>
                </div>
                
                <div style="flex:1; min-width:250px; background:#FDF4FF; border: 2px solid #F5D0FE; padding:20px; border-radius:12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 3rem; margin-bottom: 10px;">🚢 ➡️ 📦</div>
                  <strong style="color:#C026D3; font-size: 1.2rem; display: block; margin-bottom: 10px;">B2C (Business to Consumer)</strong>
                  <ul style="text-align: left; margin: 0; padding-left: 20px; font-size: 0.9rem; color: #4A044E; line-height: 1.6;">
                    <li><strong>Order Size:</strong> Tiny (1-2 individual items in a polybag).</li>
                    <li><strong>Order Volume:</strong> Extreme (50,000+ orders a day).</li>
                    <li><strong>Customer:</strong> You (buying on Amazon).</li>
                    <li><strong>Focus:</strong> Extreme speed. Orders must be picked, packed, and on a FedEx truck within 2 hours.</li>
                  </ul>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/j1uS1D_P2X8"
        },
        {
          id: "cross-docking",
          title: "Cross-Docking",
          summary: "Direct cargo transfers without intermediate warehousing.",
          content: `
            <img src="images/cross_docking.png" alt="cross-docking infographic" class="kb-infographic" />

            <p><strong>Cross-Docking</strong> is a high-speed logistics strategy that eliminates the "storage" phase of warehousing entirely. It is designed to keep goods moving constantly, drastically reducing inventory holding costs and eliminating the labor required for put-away and picking.</p>
            
            <div style="margin:25px 0; background: linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 100%); border:2px solid #E879F9; padding:25px; border-radius:16px; text-align:center; font-family:'Outfit', sans-serif;">
              <strong style="color:#86198F; font-size:1.3rem; display:block; margin-bottom:20px; letter-spacing: 1px;">🔹 THE CROSS-DOCK FLOW</strong>
              
              <!-- ENHANCED SVG DIAGRAM -->
              <svg width="100%" height="160" viewBox="0 0 500 160" style="display:block; margin:0 auto; max-width:450px; overflow:visible;">
                <!-- Inbound Side -->
                <rect x="0" y="20" width="70" height="40" fill="#CBD5E1" rx="6" stroke="#94A3B8" stroke-width="2"/>
                <rect x="0" y="100" width="70" height="40" fill="#CBD5E1" rx="6" stroke="#94A3B8" stroke-width="2"/>
                <text x="35" y="45" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle">Supplier A</text>
                <text x="35" y="125" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle">Supplier B</text>
                
                <!-- Arrows to Dock -->
                <line x1="80" y1="40" x2="130" y2="60" stroke="#C026D3" stroke-width="3" marker-end="url(#arrow)"/>
                <line x1="80" y1="120" x2="130" y2="100" stroke="#C026D3" stroke-width="3" marker-end="url(#arrow)"/>
                
                <!-- Cross Dock Terminal -->
                <rect x="140" y="20" width="220" height="120" fill="#FFF" stroke="#C026D3" stroke-width="3" stroke-dasharray="8,4" rx="12"/>
                <text x="250" y="55" fill="#86198F" font-size="16" font-weight="bold" text-anchor="middle">CROSS-DOCK FACILITY</text>
                <text x="250" y="80" fill="#C026D3" font-size="12" text-anchor="middle">Unload ➡️ Sort ➡️ Reload</text>
                <text x="250" y="110" fill="#F0ABFC" font-size="12" font-style="italic" text-anchor="middle">(Zero Storage Time)</text>
                
                <!-- Arrows to Outbound -->
                <line x1="370" y1="60" x2="420" y2="40" stroke="#C026D3" stroke-width="3" marker-end="url(#arrow)"/>
                <line x1="370" y1="100" x2="420" y2="120" stroke="#C026D3" stroke-width="3" marker-end="url(#arrow)"/>
                
                <!-- Outbound Side -->
                <rect x="430" y="20" width="70" height="40" fill="#93C5FD" rx="6" stroke="#3B82F6" stroke-width="2"/>
                <rect x="430" y="100" width="70" height="40" fill="#93C5FD" rx="6" stroke="#3B82F6" stroke-width="2"/>
                <text x="465" y="45" fill="#1E3A8A" font-size="14" font-weight="bold" text-anchor="middle">Store 1</text>
                <text x="465" y="125" fill="#1E3A8A" font-size="14" font-weight="bold" text-anchor="middle">Store 2</text>
              </svg>
              
              <div style="background: #FFF; padding: 15px; border-radius: 8px; text-align: left; margin-top: 25px;">
                <p style="font-size:0.95rem; margin:0; color:#4A044E; line-height: 1.6;"><strong>How it works:</strong> Inbound trailers from various suppliers arrive at the receiving dock. The cargo is instantly unloaded, sorted by final destination right on the dock floor, and immediately reloaded onto outbound delivery trucks heading to retail stores. Storage time is usually less than 24 hours.</p>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/j1uS1D_P2X8"
        },
        {
          id: "last-mile-delivery",
          title: "Last-Mile Delivery",
          summary: "Local courier, final home parcel drop challenges.",
          content: `
            <img src="images/last_mile_delivery.png" alt="last-mile-delivery infographic" class="kb-infographic" />

            <p>The <strong>Last-Mile</strong> is the final leg of the supply chain, where the package is transported from a local distribution hub directly to the customer's front door.</p>
            
            <div style="margin:25px 0; background:#FFF1F2; border: 2px solid #FDA4AF; padding:25px; border-radius:16px; font-family: 'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#9F1239; font-size: 1.2rem; text-align: center;">📌 The Most Expensive Leg of Logistics</h4>
              <p style="margin:0 0 20px 0; font-size:0.95rem; color:#881337; line-height: 1.6; text-align: center;">Ironically, shipping a 65" TV from a factory in China to a port in Los Angeles (6,000 miles) often costs <strong>less per unit</strong> than shipping that same TV from a Los Angeles warehouse to a house 5 miles away. Why?</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;">
                <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px;">
                  <span style="font-size: 1.8rem; display: block; margin-bottom: 5px;">⚠️</span>
                  <strong style="color:#9F1239; display: block; margin-bottom: 5px;">Urban Congestion</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #4C1D95;">Delivery vans burn fuel and time sitting in city traffic, drastically lowering deliveries per hour.</p>
                </div>
                <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px;">
                  <span style="font-size: 1.8rem; display: block; margin-bottom: 5px;">⏱️</span>
                  <strong style="color:#9F1239; display: block; margin-bottom: 5px;">Zero Economy of Scale</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #4C1D95;">A ship moves 20,000 containers at once. A last-mile van must make a unique, individual stop for every single package.</p>
                </div>
                <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px;">
                  <span style="font-size: 1.8rem; display: block; margin-bottom: 5px;">💸</span>
                  <strong style="color:#9F1239; display: block; margin-bottom: 5px;">Failed Deliveries</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #4C1D95;">If a customer isn't home to sign, the driver must return the next day, instantly doubling the delivery cost.</p>
                </div>
              </div>
            </div>
            
            <p>Innovations like AI route-optimization algorithms, Amazon delivery lockers, crowd-sourced delivery (like Uber for packages), and autonomous delivery drones are all intensely focused on driving down the massive costs of this final mile.</p>
          `,
          youtube: "https://www.youtube.com/embed/c0tW52b36Xg"
        },
        {
          id: "inventory-flow",
          title: "Inventory Flow",
          summary: "FIFO, LIFO, and Just-In-Time (JIT) stock control.",
          content: `
            <img src="images/inventory_flow.png" alt="inventory-flow infographic" class="kb-infographic" />

            <p>Managing inventory is a delicate financial balance. Too much stock ties up millions in cash and incurs high warehouse storage fees; too little stock causes manufacturing shutdowns or lost retail sales (stockouts). Companies use specific flow models to control their physical inventory.</p>
            
            <!-- CSS INFOGRAPHIC: INVENTORY FLOWS -->
            <div style="margin:25px 0; display:flex; flex-direction: column; gap:15px; font-family:'Outfit', sans-serif;">
              <div style="display: flex; gap: 20px; align-items: center; background:#F0FDF4; border-left:6px solid #16A34A; padding:20px; border-radius:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 3rem;">🚢</div>
                <div>
                  <strong style="color:#166534; font-size:1.2rem; display: block; margin-bottom: 5px;">FIFO (First In, First Out)</strong>
                  <p style="font-size:0.95rem; color:#14532D; margin:0; line-height: 1.5;">The oldest inventory received is the first inventory sold. <strong>Critical for:</strong> Perishables (food, medicine) to prevent expiration, and fashion retail to prevent styles from going out of season.</p>
                </div>
              </div>
              
              <div style="display: flex; gap: 20px; align-items: center; background:#EFF6FF; border-left:6px solid #2563EB; padding:20px; border-radius:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 3rem;">🔄</div>
                <div>
                  <strong style="color:#1E40AF; font-size:1.2rem; display: block; margin-bottom: 5px;">LIFO (Last In, First Out)</strong>
                  <p style="font-size:0.95rem; color:#1E3A8A; margin:0; line-height: 1.5;">The newest inventory received is the first inventory sold. <strong>Used for:</strong> Non-perishable bulk commodities (like gravel, coal, or lumber) where it is physically impractical to dig to the bottom of the pile to get the older stock.</p>
                </div>
              </div>
              
              <div style="display: flex; gap: 20px; align-items: center; background:#FEF2F2; border-left:6px solid #DC2626; padding:20px; border-radius:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 3rem;">🚆</div>
                <div>
                  <strong style="color:#991B1B; font-size:1.2rem; display: block; margin-bottom: 5px;">JIT (Just-In-Time)</strong>
                  <p style="font-size:0.95rem; color:#7F1D1D; margin:0; line-height: 1.5;">Invented by Toyota. Parts arrive at the factory exactly when they are needed for assembly on the line. <strong>Benefit:</strong> Minimizes warehouse storage costs to near zero. <strong>Risk:</strong> Highly vulnerable to supply chain disruptions (e.g., if a ship is late, the entire factory stops).</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/c0tW52b36Xg"
        },
        {
          id: "3pl-and-4pl-logistics",
          title: "3PL and 4PL Logistics",
          summary: "Asset-based services vs supply chain integrations.",
          content: `
            <img src="images/3pl_4pl_logistics.png" alt="3pl-and-4pl-logistics infographic" class="kb-infographic" />

            <p>Outsourcing logistics allows a company to focus on its core product (e.g., designing smartphones or marketing clothing) while letting dedicated experts handle the actual physical movement and storage of the goods.</p>
            
            <!-- CSS INFOGRAPHIC: PL LEVELS -->
            <div style="margin:25px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:1px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #0F172A; font-size: 1.2rem; margin: 0 0 20px 0; letter-spacing: 1px;">THE LOGISTICS EVOLUTION</h4>
              
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; background: #FFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <div style="background: #94A3B8; color: #FFF; padding: 15px; width: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">1PL</div>
                  <div style="padding: 15px; flex: 1;">
                    <strong style="color: #334155; display: block; margin-bottom: 5px;">First-Party Logistics</strong>
                    <p style="margin: 0; font-size: 0.9rem; color: #475569;">The manufacturer or the retailer themselves. The company owns its own trucks and warehouses to move its own goods. (Very rare for global supply chains today).</p>
                  </div>
                </div>
                
                <div style="display: flex; background: #FFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <div style="background: #3B82F6; color: #FFF; padding: 15px; width: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">2PL</div>
                  <div style="padding: 15px; flex: 1;">
                    <strong style="color: #1E3A8A; display: block; margin-bottom: 5px;">Second-Party Logistics</strong>
                    <p style="margin: 0; font-size: 0.9rem; color: #475569;">The asset owners. This is the shipping line (Maersk) or the airline (Emirates) that owns the physical ship or plane to move the cargo from Point A to Point B.</p>
                  </div>
                </div>
                
                <div style="display: flex; background: #FFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 2px solid #10B981;">
                  <div style="background: #10B981; color: #FFF; padding: 15px; width: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">3PL</div>
                  <div style="padding: 15px; flex: 1;">
                    <strong style="color: #064E3B; display: block; margin-bottom: 5px;">Third-Party Logistics (The Standard)</strong>
                    <p style="margin: 0; font-size: 0.9rem; color: #475569;">A company that provides outsourced, bundled logistics services. They manage the warehousing, picking, packing, and book the freight (Forwarding). Example: DHL Supply Chain.</p>
                  </div>
                </div>
                
                <div style="display: flex; background: #FFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid #8B5CF6;">
                  <div style="background: #8B5CF6; color: #FFF; padding: 15px; width: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">4PL</div>
                  <div style="padding: 15px; flex: 1;">
                    <strong style="color: #4C1D95; display: block; margin-bottom: 5px;">Fourth-Party Logistics (The Control Tower)</strong>
                    <p style="margin: 0; font-size: 0.9rem; color: #475569;">An integrator that usually owns NO physical assets (no trucks, no warehouses). They act as a strategic consultant and IT "Control Tower," managing multiple different 3PLs on behalf of the client to optimize the entire global supply chain.</p>
                  </div>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/c0tW52b36Xg"
        },
        {
          id: "reverse-logistics",
          title: "Reverse Logistics",
          summary: "Returns management, recycling, and refurbishing loops.",
          content: `
            <img src="images/reverse_logistics.png" alt="reverse-logistics infographic" class="kb-infographic" />

            <p><strong>Reverse Logistics</strong> is the process of moving goods from their typical final destination (the customer) backwards through the supply chain. In the age of massive, free e-commerce returns, Reverse Logistics has become a multi-billion dollar industry of its own.</p>
            
            <!-- CSS INFOGRAPHIC: REVERSE LOGISTICS -->
            <div style="margin:25px 0; background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); border:2px solid #86EFAC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="color:#14532D; font-size:1.2rem; margin:0 0 20px 0; text-align: center;">📌 The 4 Pillars of Reverse Flow</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #166534; display: block; margin-bottom: 5px; font-size: 1.05rem;">1. Returns & Refunds</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #14532D; line-height: 1.5;">The customer ships a wrong-sized shirt back to the warehouse for sorting and restocking.</p>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #166534; display: block; margin-bottom: 5px; font-size: 1.05rem;">2. Refurbishing</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #14532D; line-height: 1.5;">A defective laptop is sent back to the manufacturer, fixed, and resold on the secondary market.</p>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #166534; display: block; margin-bottom: 5px; font-size: 1.05rem;">3. End-of-Life Recycling</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #14532D; line-height: 1.5;">A dead car battery is sent to a specialized facility to safely extract lithium and lead.</p>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #166534; display: block; margin-bottom: 5px; font-size: 1.05rem;">4. Reusable Packaging</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #14532D; line-height: 1.5;">Empty wooden pallets and steel drums are shipped back to the supplier to be used for the next order.</p>
                </div>
              </div>
            </div>
            
            <p><strong>The Challenge:</strong> Reverse logistics is highly complex because goods come back in unpredictable conditions (damaged boxes, missing parts, worn clothing), making automated robotic sorting very difficult. It requires heavy human intervention.</p>
          `,
          youtube: "https://www.youtube.com/embed/c0tW52b36Xg"
        },
        {
          id: "e-commerce-logistics",
          title: "E-Commerce Logistics",
          summary: "Speed, high-volume shipping, and returns routing.",
          content: `
            <img src="images/ecommerce_logistics.png" alt="e-commerce-logistics infographic" class="kb-infographic" />

            <p>E-commerce logistics is characterized by extremely high volumes of very small orders (usually 1 or 2 items). The expectations set by giants like Amazon have forced the entire logistics industry to adapt to 2-day or even Next-Day delivery standards.</p>
            
            <div style="margin:25px 0; background:#FFFBEB; border: 2px solid #FDE68A; padding:25px; border-radius:16px; display: flex; flex-direction: column; gap: 15px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 10px 0; color:#92400E; font-size:1.1rem;">📌 Key E-Commerce Pillars</h4>
              <ul style="margin:0; padding-left:20px; color:#78350F; font-size:0.95rem; line-height:1.7;">
                <li><strong>Micro-Fulfillment Centers:</strong> Small urban warehouses located inside major cities for rapid 2-hour or same-day dispatch.</li>
                <li><strong>Real-time API Integration:</strong> Connecting shopping carts (Shopify, WooCommerce) directly to warehouse management systems (WMS).</li>
                <li><strong>Hassle-Free Returns:</strong> Providing pre-printed return labels to maintain customer satisfaction and loyalty.</li>
              </ul>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        }
      ]
    },
    {
      id: "special-cargo",
      title: "9. Special Cargo Handling",
      description: "Dangerous goods, heavy lift, and perishables.",
      icon: "\uD83C\uDFD7\uFE0F",
      subtopics: [
        {
          id: "perishable-cargo",
          title: "Perishable Cargo",
          summary: "Cold chain logistics, shelf life, and air prioritizations.",
          content: `
            <img src="images/perishable_cargo.png" alt="perishable-cargo infographic" class="kb-infographic" />

            <p>Perishable goods (such as fresh seafood, cut flowers, vaccines, pharmaceuticals, and fresh produce) have a strictly limited shelf life. Unlike shipping furniture, time is literally money. Any delay in transit destroys the physical integrity and commercial value of the cargo.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%); border:2px solid #67E8F9; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #0891B2; font-size: 1.3rem; margin: 0 0 20px 0; letter-spacing: 1px;">\uD83D\uDCCD THE COLD CHAIN DOCTRINE</h4>
              <p style="margin:0 0 20px 0; font-size:1rem; color:#164E63; line-height:1.7; text-align: center;">A "Cold Chain" is an uninterrupted, temperature-controlled supply chain. It encompasses refrigerated production, storage, and distribution activities. The golden rule is absolute: <strong>The chain must never break.</strong></p>
              
              <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px; background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #EF4444;">
                  <strong style="color: #B91C1C; font-size: 1.1rem; display: block; margin-bottom: 10px;">The Tarmac Danger Zone</strong>
                  <p style="font-size: 0.95rem; color: #334155; margin: 0; line-height: 1.6;">The highest risk of spoilage does not happen in the air. It happens on the ground. If a pallet of fresh Norwegian salmon is transshipping through Dubai, and sits on the 45Â°C airport tarmac for 2 hours waiting for the next plane, the cargo is ruinedâ€”even if both flights were perfectly temperature-controlled.</p>
                </div>
                
                <div style="flex: 1; min-width: 200px; background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #3B82F6;">
                  <strong style="color: #1D4ED8; font-size: 1.1rem; display: block; margin-bottom: 10px;">Premium "Must Ride" Status</strong>
                  <p style="font-size: 0.95rem; color: #334155; margin: 0; line-height: 1.6;">Because time is critical, perishables are booked under premium airline priority codes (like "Must Ride"). This means that if an aircraft is overweight, the airline will offload general cargo (like clothes or electronics) before they ever roll a perishable shipment.</p>
                </div>
              </div>
            </div>
            
            <h3>Specialized Handling and Packaging</h3>
            <p>Handling perishables requires highly specialized infrastructure. Warehouses must have distinct temperature zones (e.g., a 2Â°C to 8Â°C room for vaccines, and a -20Â°C room for frozen meats). Furthermore, packaging is crucial. Exporters use heavily insulated styrofoam boxes, layered with specialized gel packs or dry ice, and sealed meticulously to maintain the micro-climate inside the box for up to 72 hours of transit time.</p>
          `,
          youtube: "https://www.youtube.com/embed/4G1L5fBvM0w"
        },
        {
          id: "temperature-controlled-cargo",
          title: "Temperature-Controlled Cargo",
          summary: "Operating reefers, gel packs, and data loggers.",
          content: `
            <img src="images/temperature_controlled_cargo.png" alt="temperature-controlled-cargo infographic" class="kb-infographic" />

            <p>Depending on the required temperature range (ambient, chilled, or deep frozen), shippers use different active and passive cooling technologies. Choosing the wrong technology can result in total cargo loss.</p>
            
            <!-- CSS INFOGRAPHIC: ACTIVE VS PASSIVE -->
            <div style="margin:30px 0; font-family:'Outfit', sans-serif;">
              <div style="display:flex; flex-wrap:wrap; gap:20px;">
                <!-- ACTIVE COOLING -->
                <div style="flex:1; min-width:280px; background:#F0F9FF; border: 2px solid #7DD3FC; padding:25px; border-radius:16px; position: relative; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                  <div style="position: absolute; top: -15px; right: -15px; font-size: 6rem; opacity: 0.1;">â„ï¸</div>
                  <h4 style="margin:0 0 15px 0; color:#0284C7; font-size: 1.3rem;">Active Cooling (Reefers)</h4>
                  <p style="font-size:0.95rem; color:#0C4A6E; margin:0 0 15px 0; line-height: 1.6;">Active cooling systems rely on mechanical refrigeration units that require a constant power supply to generate cold air.</p>
                  <ul style="margin:0; padding-left:20px; color:#0369A1; font-size:0.9rem; line-height:1.7;">
                    <li><strong>Ocean Reefers:</strong> Specialized shipping containers with built-in AC units. They must be plugged into the ship's massive electrical grid during the voyage.</li>
                    <li><strong>Gensets:</strong> When the container is loaded onto a truck, a portable diesel generator (Genset) is attached to provide power on the highway.</li>
                    <li><strong>Risk:</strong> If the power cuts out (e.g., a blown fuse on the ship), the internal temperature will slowly rise.</li>
                  </ul>
                </div>
                
                <!-- PASSIVE COOLING -->
                <div style="flex:1; min-width:280px; background:#FDF4FF; border: 2px solid #F0ABFC; padding:25px; border-radius:16px; position: relative; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                  <div style="position: absolute; top: -15px; right: -15px; font-size: 6rem; opacity: 0.1;">ðŸ§Š</div>
                  <h4 style="margin:0 0 15px 0; color:#A21CAF; font-size: 1.3rem;">Passive Cooling (Envirotainers)</h4>
                  <p style="font-size:0.95rem; color:#4A044E; margin:0 0 15px 0; line-height: 1.6;">Passive systems do not generate cold air; they trap it. They rely on heavy insulation and internal cooling materials. No power required.</p>
                  <ul style="margin:0; padding-left:20px; color:#86198F; font-size:0.9rem; line-height:1.7;">
                    <li><strong>Coolants:</strong> Packed with Dry Ice (frozen carbon dioxide) or advanced Phase-Change Material (PCM) gel packs.</li>
                    <li><strong>Aviation Use:</strong> Because airplanes have limited electrical hookups in the cargo hold, high-value pharma is almost exclusively flown in passive Envirotainers.</li>
                    <li><strong>Risk:</strong> The coolant eventually melts. You only have a fixed window (e.g., 96 hours) before the temperature spikes.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div style="background:#F8FAFC; border-left:5px solid #334155; padding:20px; border-radius:8px;">
              <h4 style="margin:0 0 10px 0; color:#0F172A; font-size: 1.1rem;">ðŸ“ˆ The Role of Data Loggers</h4>
              <p style="margin:0; font-size:0.95rem; color:#475569; line-height: 1.6;">How does the buyer know the shipping line didn't unplug the container to save fuel? High-value shipments always contain USB or GPS-enabled temperature data loggers hidden inside the boxes. Upon arrival, the consignee downloads the data to prove the temperature never spiked. If the graph shows a spike, the consignee rejects the cargo and files a massive insurance claim against the carrier.</p>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/4G1L5fBvM0w"
        },
        {
          id: "dangerous-goods",
          title: "Dangerous Goods",
          summary: "UN hazard classes, declarations, safety labeling.",
          content: `
            <img src="images/dangerous_goods.png" alt="dangerous-goods infographic" class="kb-infographic" />

            <p>Dangerous Goods (DG), also known as Hazardous Materials (Hazmat), are substances capable of posing an extreme risk to health, safety, property, or the environment during transit. Handling DG requires intense regulatory compliance; a single mistake can cause catastrophic vessel fires or aircraft crashes.</p>
            
            <!-- CSS INFOGRAPHIC: DG CLASSIFICATION -->
            <div style="margin:30px 0; background:#FFF1F2; border: 2px solid #FECACA; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #9F1239; font-size: 1.3rem; margin: 0 0 20px 0;">ðŸ“Œ GLOBAL HAZMAT COMPLIANCE</h4>
              
              <div style="display:flex; flex-wrap:wrap; gap:20px;">
                <div style="flex:1; min-width:250px;">
                  <strong style="color:#B91C1C; font-size:1.15rem; display:block; margin-bottom:12px;">Regulatory Frameworks</strong>
                  <p style="font-size:0.95rem; color:#7F1D1D; margin:0 0 15px 0; line-height:1.6;">You cannot just put chemicals in a box and ship them. All DG shipments must strictly adhere to massive international rulebooks:</p>
                  <ul style="margin:0; padding-left:20px; font-size:0.9rem; color:#991B1B; line-height:1.7;">
                    <li><strong>IMDG Code:</strong> The International Maritime Dangerous Goods code for ocean freight.</li>
                    <li><strong>IATA DGR:</strong> The Dangerous Goods Regulations for air freight (the strictest regulations in the world).</li>
                    <li><strong>ADR:</strong> The European regulations for road transport.</li>
                  </ul>
                </div>
                
                <div style="flex:1; min-width:250px; background:#FFF; padding:20px; border-radius:12px; border:2px dashed #F87171; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#9F1239; font-size:1.1rem; display:block; margin-bottom:10px;">The Anatomy of a DG Shipment</strong>
                  <ul style="margin:0; padding-left:20px; font-size:0.9rem; color:#7F1D1D; line-height:1.7;">
                    <li><strong>UN Number:</strong> Every regulated chemical has a globally recognized 4-digit ID assigned by the United Nations (e.g., <em>UN 3480</em> for Lithium Ion Batteries).</li>
                    <li><strong>Class 1-9:</strong> Categorized by risk severity (e.g., Class 1 = Explosives, Class 3 = Flammable Liquids, Class 7 = Radioactive).</li>
                    <li><strong>Packing Group (PG):</strong> PG I (Great Danger), PG II (Medium Danger), PG III (Minor Danger). Dictates the thickness of the packaging required.</li>
                  </ul>
                </div>
              </div>
              
              <div style="margin-top: 20px; background: #FEF2F2; padding: 15px; border-radius: 8px; border-left: 5px solid #DC2626;">
                <strong style="color:#9F1239; display:block; font-size: 1.05rem;">The DGD (Shipper's Declaration)</strong>
                <p style="font-size:0.95rem; color:#7F1D1D; margin:5px 0 0 0; line-height:1.6;">The shipper (not the forwarder) is legally responsible for signing the Dangerous Goods Declaration. If a shipper misdeclares undeclared lithium batteries to save money, and they spontaneously combust causing an aircraft fire, the shipper faces massive international criminal liability and jail time.</p>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "oversized-cargo",
          title: "Oversized Cargo",
          summary: "Out of Gauge (OOG) shipping, open tops, flat racks.",
          content: `
            <img src="images/oversized_cargo.png" alt="oversized-cargo infographic" class="kb-infographic" />

            <p>Standard Dry Van containers have fixed steel roofs and side walls. But what happens when your cargo (like a massive bulldozer or a 40-foot yacht) is simply too tall or too wide to fit through the doors of a standard box? You must ship it <strong>Out of Gauge (OOG)</strong> using specialized equipment.</p>
            
            <!-- CSS INFOGRAPHIC: OOG EQUIPMENT -->
            <div style="margin:30px 0; display:flex; flex-wrap:wrap; gap:20px; background:#F8FAFC; padding:30px; border-radius:16px; border:2px solid #E2E8F0; font-family:'Outfit', sans-serif;">
              
              <!-- Open Top -->
              <div style="flex:1; min-width:250px; text-align:center; background:#FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="width:140px; height:80px; background:none; border:4px solid #1E293B; border-top:none; margin:0 auto 15px auto; position:relative; border-radius: 0 0 8px 8px;">
                  <div style="position:absolute; bottom:5px; left:10px; right:10px; height:110px; background: linear-gradient(180deg, #60A5FA 0%, #2563EB 100%); opacity:0.9; border-radius:4px;"></div>
                  <div style="position:absolute; top:-20px; left:0; right:0; text-align:center; font-size: 1.2rem;">ðŸ—ï¸</div>
                </div>
                <strong style="color:#0F172A; display:block; font-size: 1.2rem; margin-bottom: 5px;">Open Top (OT) Container</strong>
                <p style="font-size:0.9rem; color:#475569; margin:0; line-height: 1.5;">Designed for <strong>Over-Height</strong> cargo. The steel roof is replaced with a flexible, removable tarpaulin cover. Cranes can drop tall machinery directly into the container from above.</p>
              </div>
              
              <!-- Flat Rack -->
              <div style="flex:1; min-width:250px; text-align:center; background:#FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="width:140px; height:80px; background:none; border-bottom:6px solid #1E293B; border-left:4px solid #1E293B; border-right:4px solid #1E293B; margin:0 auto 15px auto; position:relative; border-radius: 4px;">
                   <div style="position:absolute; bottom:0; left:-30px; right:-30px; height:50px; background: linear-gradient(90deg, #34D399 0%, #059669 100%); opacity:0.9; border-radius:4px;"></div>
                   <div style="position:absolute; bottom:15px; left:-50px; font-size: 1.2rem;">â¬…ï¸</div>
                   <div style="position:absolute; bottom:15px; right:-50px; font-size: 1.2rem;">âž¡ï¸</div>
                </div>
                <strong style="color:#0F172A; display:block; font-size: 1.2rem; margin-bottom: 5px;">Flat Rack (FR) Container</strong>
                <p style="font-size:0.9rem; color:#475569; margin:0; line-height: 1.5;">Designed for <strong>Over-Width</strong> and Over-Length cargo. It has no side walls and no roof, just a heavy-duty floor and collapsible end-walls. Cargo can spill out over the sides.</p>
              </div>
            </div>
            
            <div style="background:#FFFBEB; border-left:5px solid #D97706; padding:20px; border-radius:8px;">
              <h4 style="margin:0 0 10px 0; color:#92400E; font-size: 1.1rem;">ðŸ“Œ The Lost Slot Surcharge</h4>
              <p style="margin:0; font-size:0.95rem; color:#78350F; line-height: 1.6;">If your cargo is too wide and spills over the edge of a Flat Rack, the ocean carrier physically cannot load another container next to yours on the ship. They are losing revenue-generating space. Therefore, the carrier will charge you a heavy penalty for the space you are blocking (Lost Slots). Shipping OOG is exponentially more expensive than shipping standard containers.</p>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/t-6Qx4_4G7k"
        },
        {
          id: "heavy-lift-cargo",
          title: "Heavy Lift Cargo",
          summary: "Handling heavy cargo with cranes and low-bed trailers.",
          content: `
            <img src="images/heavy_lift_cargo.png" alt="heavy-lift-cargo infographic" class="kb-infographic" />

            <p>Heavy Lift logistics refers to cargo that is far too heavy to be handled by standard port infrastructure or standard highway trucks. This includes massive industrial transformers, gas turbines, or railway locomotives weighing hundreds of tons.</p>
            
            <div style="margin:30px 0; background:#FFFBEB; border: 2px solid #FDE68A; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#92400E; font-size: 1.3rem; text-align: center;">ðŸ“Œ THE LOGISTICS OF EXTREME WEIGHT</h4>
              <p style="margin:0 0 20px 0; font-size:0.95rem; color:#78350F; line-height: 1.6; text-align: center;">Gravity is the ultimate enemy in Heavy Lift logistics. Moving 200 tons requires mathematical precision.</p>
              
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <div style="background: #FFF; padding: 20px; border-radius: 8px; border-left: 5px solid #D97706; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#B45309; font-size: 1.1rem; display: block; margin-bottom: 5px;">Port Operations & Cranes</strong>
                  <p style="margin:0; font-size:0.95rem; color:#78350F; line-height:1.6;">Standard port gantry cranes can usually lift a maximum of about 40-50 tons safely. If your cargo weighs 150 tons, the port cannot lift it. You must charter specialized <strong>Floating Crane Barges</strong> or book a <strong>Breakbulk Vessel</strong> equipped with its own heavy-lift hydraulic cranes on deck to load the cargo directly from the dock.</p>
                </div>
                
                <div style="background: #FFF; padding: 20px; border-radius: 8px; border-left: 5px solid #F59E0B; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#B45309; font-size: 1.1rem; display: block; margin-bottom: 5px;">Inland Highway Transport</strong>
                  <p style="margin:0; font-size:0.95rem; color:#78350F; line-height:1.6;">You cannot simply place 200 tons on a highway; it will crush the asphalt and collapse bridges. Logisticians must use <strong>SPMTs (Self-Propelled Modular Transporters)</strong>â€”vehicles with hundreds of individual wheels that distribute the extreme weight evenly across the road surface. Structural civil engineers must conduct route surveys months in advance to calculate bridge load capacities.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "food-and-beverage-cargo",
          title: "Food and Beverage Cargo",
          summary: "Customs hygiene regulations, FDA clearances.",
          content: `
            <img src="images/food_and_beverage_cargo.png" alt="food-and-beverage-cargo infographic" class="kb-infographic" />

            <p>Importing anything that humans consume (food, beverages, pharmaceuticals, cosmetics) is heavily regulated by local governments to prevent contamination, the spread of disease, and bioterrorism.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); border:2px solid #86EFAC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #14532D; font-size: 1.3rem; margin: 0 0 20px 0;">ðŸ“Œ THE BORDER COMPLIANCE CHECKLIST</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #16A34A;">
                  <strong style="color: #15803D; display: block; margin-bottom: 5px;">Phytosanitary Certificates</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #166534; line-height: 1.5;">Required for plant-based products (fruits, vegetables, timber). It verifies the shipment has been inspected and is free from invasive pests and agricultural diseases.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #F59E0B;">
                  <strong style="color: #B45309; display: block; margin-bottom: 5px;">Health & Vet Certificates</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #92400E; line-height: 1.5;">Required for animal-based products (meat, dairy, seafood). Issued by a government veterinarian in the origin country certifying the meat is safe for human consumption.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #3B82F6;">
                  <strong style="color: #1D4ED8; display: block; margin-bottom: 5px;">FDA Prior Notice (US)</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #1E3A8A; line-height: 1.5;">The US FDA must be notified <em>before</em> the food arrives at the port. If a ship docks and Prior Notice was not filed, the FDA will instantly seize and destroy the cargo.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #8B5CF6;">
                  <strong style="color: #5B21B6; display: block; margin-bottom: 5px;">Labeling Laws</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #4C1D95; line-height: 1.5;">Nutritional facts, allergen warnings, and ingredient lists must be translated and formatted exactly according to the destination country's specific legal standards.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "tea-and-agricultural-products",
          title: "Tea and Agricultural Products",
          summary: "Ventilation settings and moisture control for tea.",
          content: `
            <img src="images/tea_and_agricultural_products.png" alt="tea-and-agricultural-products infographic" class="kb-infographic" />

            <p>Raw agricultural goods like tea, coffee beans, and cocoa are highly sensitive to moisture and humidity. Because ocean cargo containers travel through extreme climate zones (from freezing nights off the coast of Japan to baking equatorial sun in the Indian Ocean), they act like massive steel greenhouses.</p>
            
            <div style="margin:30px 0; background:#F8FAFC; border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#0F172A; font-size: 1.3rem; text-align: center;">ðŸ“Œ THE THREAT OF "CONTAINER RAIN"</h4>
              <p style="font-size:0.95rem; color:#475569; line-height:1.6; margin:0 0 20px 0; text-align: center;">As external temperatures fluctuate, the natural moisture trapped inside agricultural products evaporates into the hot air inside the container. When night falls, the steel roof gets cold. The humid air hits the cold steel ceiling, condenses into heavy water droplets, and literally "rains" back down onto the cargo, causing catastrophic mold and rot.</p>
              
              <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px; background: #FFF; padding: 20px; border-radius: 8px; border-top: 4px solid #3B82F6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #1E40AF; display: block; margin-bottom: 10px;">Desiccant Bags</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.5;">Shippers hang massive silica gel bags (desiccants) inside the container walls. These chemicals actively absorb ambient moisture from the air before it can condense.</p>
                </div>
                
                <div style="flex: 1; min-width: 200px; background: #FFF; padding: 20px; border-radius: 8px; border-top: 4px solid #10B981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #064E3B; display: block; margin-bottom: 10px;">Kraft Paper Lining</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.5;">The interior steel walls of the container are physically lined with thick, absorbent Kraft paper to prevent direct contact between the cargo and condensation.</p>
                </div>
                
                <div style="flex: 1; min-width: 200px; background: #FFF; padding: 20px; border-radius: 8px; border-top: 4px solid #F59E0B; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color: #92400E; display: block; margin-bottom: 10px;">Ventilation Settings</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.5;">Shippers must instruct the carrier to keep the container vents open at specific percentages (e.g., "Open 25%") to allow cross-ventilation during the sea voyage.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "garments-and-retail-cargo",
          title: "Garments and Retail Cargo",
          summary: "Garment on Hanger (GOH) sea containers.",
          content: `
            <img src="images/garments_and_retail_cargo.png" alt="garments-and-retail-cargo infographic" class="kb-infographic" />

            <p>The fast-fashion industry (brands like Zara or H&M) relies entirely on speed to market and retail presentation. When clothes are shipped internationally in standard cardboard boxes (flat-pack), they arrive heavily wrinkled. The destination warehouse must unpack, steam iron, and hang every single shirtðŸ’°costing immense time and labor.</p>
            
            <div style="margin:30px 0; background:#F8FAFC; border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#0F172A; text-align:center; font-size: 1.3rem;">ðŸ‘— THE GOH SOLUTION (Garment on Hanger)</h4>
              <p style="font-size:0.95rem; color:#475569; text-align:center; margin:0 0 25px 0; line-height: 1.6;">To eliminate ironing and repacking costs, specialized sea containers are outfitted with internal steel scaffolding. Clothes are hung directly on these bars at the factory in Asia. When the container arrives in New York, workers simply grab the hangers and roll them directly onto the retail store floor.</p>
              
              <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                <div style="background:#FFF; padding:20px; border-radius:12px; border:2px dashed #94A3B8; flex:1; min-width:250px; text-align:center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 3rem; margin-bottom: 10px;">ðŸ‘•</div>
                  <strong style="color:#3B82F6; display:block; font-size: 1.1rem; margin-bottom: 5px;">The String System</strong>
                  <p style="font-size:0.9rem; color:#64748B; margin: 0; line-height: 1.5;">Multiple knotted nylon strings drop vertically from the main roof bars. Hangers are hooked into the knots. Excellent for maximizing space when shipping lightweight garments like t-shirts, lingerie, and blouses.</p>
                </div>
                <div style="background:#FFF; padding:20px; border-radius:12px; border:2px dashed #94A3B8; flex:1; min-width:250px; text-align:center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 3rem; margin-bottom: 10px;">ðŸ§¥</div>
                  <strong style="color:#8B5CF6; display:block; font-size: 1.1rem; margin-bottom: 5px;">The Bar System</strong>
                  <p style="font-size:0.9rem; color:#64748B; margin: 0; line-height: 1.5;">Solid horizontal metal bars are bolted across the width of the container. Essential for handling extreme weight, such as shipping thousands of heavy winter coats, leather jackets, or denim jeans.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "electronics-and-high-value-cargo",
          title: "Electronics and High-Value Cargo",
          summary: "GPS tracking, security seals, and high-value transits.",
          content: `
            <img src="images/electronics_and_high_value_cargo.png" alt="electronics-and-high-value-cargo infographic" class="kb-infographic" />

            <p>High-Tech cargo (smartphones, microchips, laptops) represents the highest risk of theft in the global supply chain. A single 40-foot container packed with the latest iPhones can be worth tens of millions of dollars on the black market, making it a prime target for organized crime syndicates.</p>
            
            <div style="margin:30px 0; background:#FFF1F2; border: 2px solid #FDA4AF; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#9F1239; font-size: 1.3rem; text-align: center;">ðŸ“Œ HIGH-SECURITY PROTOCOLS</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border-left: 4px solid #E11D48;">
                  <strong style="color: #BE123C; font-size: 1.1rem; display: block; margin-bottom: 5px;">ISO High-Security Bolt Seals</strong>
                  <p style="margin:0; font-size:0.95rem; color:#881337; line-height: 1.6;">Standard plastic seals are easily cut. High-value cargo requires ISO-certified hardened steel bolt seals that physically lock the container doors and require heavy industrial bolt cutters (or grinders) to remove at the destination.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border-left: 4px solid #E11D48;">
                  <strong style="color: #BE123C; font-size: 1.1rem; display: block; margin-bottom: 5px;">Covert GPS Trackers</strong>
                  <p style="margin:0; font-size:0.95rem; color:#881337; line-height: 1.6;">Thieves often steal the entire truck and rip out the vehicle's GPS. Therefore, shippers secretly place covert, battery-powered GPS trackers inside the actual cargo cartons to track the exact coordinates of the goods.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border-left: 4px solid #E11D48;">
                  <strong style="color: #BE123C; font-size: 1.1rem; display: block; margin-bottom: 5px;">Tarmac Escorts & Convoys</strong>
                  <p style="margin:0; font-size:0.95rem; color:#881337; line-height: 1.6;">In air freight, armed guards or specialized security vehicles physically escort the pallets directly from the warehouse across the airport tarmac to the belly of the aircraft, ensuring no tampering occurs during loading.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "project-cargo",
          title: "Project Cargo",
          summary: "Industrial construction transport planning.",
          content: `
            <img src="images/project_cargo.png" alt="project-cargo infographic" class="kb-infographic" />

            <p><strong>Project Cargo</strong> is the highly specialized, zero-defect transport of massive, complex, and high-value industrial equipment (e.g., oil rig drills, 60-meter wind turbine blades, or entire power plant structures). It is widely considered the most complex and high-stakes form of logistics.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="text-align: center; color: #0F172A; font-size: 1.3rem; margin: 0 0 20px 0;">ðŸ“Œ PROJECT LOGISTICS PLANNING</h4>
              <p style="font-size:0.95rem; color:#475569; line-height:1.6; margin: 0 0 20px 0; text-align: center;">Moving a single 60-meter wind turbine blade from a factory in Germany to a mountain top in Chile requires months of intense civil engineering and logistical orchestration. It is not a shipment; it is a project.</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #334155;">
                  <strong style="color: #1E293B; display: block; margin-bottom: 5px;">Vessel Chartering</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.5;">You cannot use container ships. The team must charter entire specialized Breakbulk Vessels or charter Antonov heavy-lift cargo planes.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #334155;">
                  <strong style="color: #1E293B; display: block; margin-bottom: 5px;">Route Alteration</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.5;">To allow a 60-meter trailer to turn corners, crews must physically dismantle highway toll booths, street lights, and road signs along the route.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #334155;">
                  <strong style="color: #1E293B; display: block; margin-bottom: 5px;">Bridge Reinforcement</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.5;">Civil engineers must calculate the load capacity of every bridge on the route, often requiring steel plating reinforcements before the convoy can cross.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        }
      ]
    },
    {
      id: "trade-lanes",
      title: "10. Trade Lane Guides",
      description: "Useful for customers and sales teams.",
      icon: "🗺️",
      subtopics: [
        {
          id: "sri-lanka-to-usa",
          title: "Sri Lanka to USA",
          summary: "ISF compliance and ports routing.",
          content: `
            <p>The Sri Lanka to USA trade lane is one of the highest volume and most time-sensitive corridors, heavily dominated by the apparel, textile, and solid tire industries. Fast-fashion brands (like Victoria's Secret, Gap, and Nike) operate on strict seasonal timelines, meaning delays can result in entire collections being rejected by US buyers.</p>
            
            <div style="margin:30px 0; display:flex; flex-direction:column; gap:20px; background:#F8FAFC; border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0; color:#0F172A; text-align:center; font-size: 1.3rem;">🚢 OCEAN ROUTING & TRANSIT TIMES (COLOMBO TO USA)</h4>
              
              <div style="display:flex; justify-content:space-between; align-items:center; background:#EFF6FF; border:1px solid #93C5FD; padding:20px; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div>
                  <strong style="color:#1D4ED8; font-size: 1.2rem; display: block; margin-bottom: 5px;">🗽 East Coast (USEC)</strong>
                  <span style="color:#3B82F6; font-size:0.95rem;">Routing via Suez Canal & Atlantic Ocean</span>
                  <p style="font-size:0.85rem; color:#475569; margin: 10px 0 0 0;"><strong>Primary Ports:</strong> New York / New Jersey, Savannah, Norfolk, Charleston.</p>
                </div>
                <div style="text-align: right;">
                  <strong style="color:#1E40AF; background:#DBEAFE; padding:8px 15px; border-radius:20px; font-size: 1.1rem; display: inline-block; margin-bottom: 5px;">28 - 35 Days</strong>
                  <p style="margin:0; font-size: 0.8rem; color:#64748B;">Direct or transshipment via EU hubs.</p>
                </div>
              </div>
              
              <div style="display:flex; justify-content:space-between; align-items:center; background:#FDF4FF; border:1px solid #F0ABFC; padding:20px; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div>
                  <strong style="color:#C026D3; font-size: 1.2rem; display: block; margin-bottom: 5px;">🌉 West Coast (USWC)</strong>
                  <span style="color:#D946EF; font-size:0.95rem;">Routing via Singapore & Pacific Ocean</span>
                  <p style="font-size:0.85rem; color:#475569; margin: 10px 0 0 0;"><strong>Primary Ports:</strong> Los Angeles, Long Beach, Seattle, Oakland.</p>
                </div>
                <div style="text-align: right;">
                  <strong style="color:#86198F; background:#FAE8FF; padding:8px 15px; border-radius:20px; font-size: 1.1rem; display: inline-block; margin-bottom: 5px;">35 - 45 Days</strong>
                  <p style="margin:0; font-size: 0.8rem; color:#64748B;">Almost exclusively transshipment.</p>
                </div>
              </div>
            </div>
            
            <div style="margin:30px 0; background:#FFF1F2; border: 2px solid #FDA4AF; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#9F1239; font-size: 1.2rem;">📌 THE ISF 10+2 MANDATE (IMPORTER SECURITY FILING)</h4>
              <p style="font-size:0.95rem; color:#881337; line-height:1.6; margin:0 0 15px 0;">Post-9/11, U.S. Customs and Border Protection (CBP) enacted strict maritime security laws. The most critical for exporters from Sri Lanka is the <strong>ISF 10+2</strong> rule.</p>
              
              <ul style="margin:0; padding-left:20px; font-size:0.9rem; color:#9F1239; line-height:1.7;">
                <li><strong>The 24-Hour Rule:</strong> The electronic ISF data MUST be successfully transmitted and accepted by US Customs at least <strong>24 hours BEFORE</strong> the container is loaded onto the mother vessel at the Port of Colombo.</li>
                <li><strong>The Consequence:</strong> If a container is loaded without an accepted ISF on file, the US importer will be hit with a mandatory <strong>$5,000 fine per container</strong> upon arrival in the US.</li>
                <li><strong>Data Elements:</strong> Requires 10 data points from the importer (Manufacturer, Seller, Buyer, Ship-to party, etc.) and 2 from the carrier (Vessel Stow Plan, Container Status Messages).</li>
              </ul>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/tM1X7H5L108"
        },
        {
          id: "sri-lanka-to-canada",
          title: "Sri Lanka to Canada",
          summary: "Routing to Montreal and Vancouver gateways.",
          content: `
            <p>While the Sri Lanka to Canada routes heavily mirror the US trade lanes (often utilizing the same mother vessels across the Pacific or Atlantic), they are subject to Canada's unique geographic challenges, strict winter port operations, and Canada Border Services Agency (CBSA) regulations.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border:2px solid #7DD3FC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0369A1; text-align: center; font-size: 1.3rem;">📌 CANADIAN GATEWAY ROUTING & RAIL HUBS</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #0284C7;">
                  <strong style="color: #0369A1; font-size: 1.1rem; display: block; margin-bottom: 10px;">East Coast (Halifax / Montreal)</strong>
                  <p style="margin:0; font-size: 0.9rem; color: #0C4A6E; line-height: 1.6;"><strong>32-38 Days.</strong> Cargo routes through the Suez Canal, often transshipping in European hubs like Antwerp or London Gateway. <em>Critical Note:</em> The St. Lawrence River leading to Montreal freezes in deep winter, requiring specialized "Ice-Class" vessels and causing seasonal delays.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #0284C7;">
                  <strong style="color: #0369A1; font-size: 1.1rem; display: block; margin-bottom: 10px;">West Coast (Vancouver / Prince Rupert)</strong>
                  <p style="margin:0; font-size: 0.9rem; color: #0C4A6E; line-height: 1.6;"><strong>38-42 Days.</strong> Cargo from Colombo usually feeds into Singapore or Busan (South Korea), before crossing the massive Pacific Ocean. Prince Rupert is a highly preferred port as it offers the shortest ocean transit time from Asia to North America.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #0284C7;">
                  <strong style="color: #0369A1; font-size: 1.1rem; display: block; margin-bottom: 10px;">The Inland Rail Network (Toronto)</strong>
                  <p style="margin:0; font-size: 0.9rem; color: #0C4A6E; line-height: 1.6;">Very little cargo stays on the coast. Most containers arriving at Halifax or Vancouver are immediately discharged directly onto massive freight trains operated by <strong>CN (Canadian National)</strong> or <strong>CP (Canadian Pacific)</strong> railroads, traversing the country to interior ramps in Toronto or Calgary.</p>
                </div>
              </div>
            </div>
            
            <p><strong>Customs Critical (eManifest):</strong> Similar to the US ISF, Canada requires an Advance Commercial Information (ACI) filing via the eManifest system. Freight forwarders must transmit electronic house bill data to the CBSA 24 hours prior to loading at the port of origin.</p>
          `,
          youtube: "https://www.youtube.com/embed/tM1X7H5L108"
        },
        {
          id: "sri-lanka-to-europe",
          title: "Sri Lanka to Europe",
          summary: "Suez Canal routing and ICS2 customs guidelines.",
          content: `
            <p>The Asia-to-Europe trade lane is one of the highest volume corridors in the world. Sri Lanka is geographically positioned perfectly along this route. Historically, this lane relies entirely on the Suez Canal to avoid the massive, costly, and time-consuming detour around the Cape of Good Hope (tip of Africa).</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:2px solid #FDE68A; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#B45309; text-align: center; font-size: 1.3rem;">📌 THE EUROPEAN LOGISTICS FRAMEWORK</h4>
              
              <div style="display:flex; flex-direction:column; gap:15px;">
                <div style="background:#FFF; padding:20px; border-radius:12px; border-left:4px solid #D97706; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#92400E; font-size: 1.1rem; display:block; margin-bottom:8px;">ICS2 (Import Control System 2) Compliance</strong>
                  <p style="font-size:0.95rem; color:#78350F; line-height:1.6; margin:0;">The European Union operates a massive, interconnected security framework. Before any cargo is loaded onto a ship destined for or transiting through the EU, the forwarder must transmit a detailed <strong>ENS (Entry Summary Declaration)</strong>. This allows EU Customs to screen the cargo data for terrorism, weapons, or contraband risks while the ship is still sitting in the Port of Colombo.</p>
                </div>
                
                <div style="background:#FFF; padding:20px; border-radius:12px; border-left:4px solid #D97706; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#92400E; font-size: 1.1rem; display:block; margin-bottom:8px;">The "Northern Range" Hubs</strong>
                  <p style="font-size:0.95rem; color:#78350F; line-height:1.6; margin:0;">The vast majority of inbound ocean freight does not sail directly to every country. It is discharged at massive automated mega-ports known as the Northern Range: <strong>Rotterdam (Netherlands), Antwerp (Belgium), and Hamburg (Germany)</strong>. From there, it is loaded onto river barges (via the Rhine) or massive truck fleets to disperse across the continent.</p>
                </div>
                
                <div style="background:#FFF; padding:20px; border-radius:12px; border-left:4px solid #D97706; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#92400E; font-size: 1.1rem; display:block; margin-bottom:8px;">The Carbon Border Adjustment Mechanism (CBAM)</strong>
                  <p style="font-size:0.95rem; color:#78350F; line-height:1.6; margin:0;">A new EU regulation where importers must buy "carbon certificates" to cover the emissions generated during the manufacturing of imported goods (like steel, aluminum, fertilizer). Exporters in Sri Lanka must accurately calculate and declare their factory carbon footprint to maintain EU clients.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "sri-lanka-to-australia",
          title: "Sri Lanka to Australia",
          summary: "Biosecurity compliance and transshipment at Singapore.",
          content: `
            <p>The Sri Lanka to Australia lane primarily feeds into major coastal cities (Sydney, Melbourne, Brisbane, Fremantle/Perth). Because trade volumes from Colombo to Australia don't justify many direct ships, transit times average 18-25 days, usually relying on massive transshipment operations at the Port of Singapore (PSA) or Port Klang (Malaysia).</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%); border:2px solid #FCA5A5; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#991B1B; text-align: center; font-size: 1.3rem;">📌 DAFF BIOSECURITY: THE STRICTEST IN THE WORLD</h4>
              <p style="font-size:0.95rem; color:#7F1D1D; line-height:1.6; margin:0 0 20px 0; text-align: center;">Australia (an isolated island continent) enforces ruthless environmental protection laws through the Department of Agriculture, Fisheries and Forestry (DAFF) to prevent invasive pests, weed seeds, and diseases from devastating their unique ecosystem and agricultural industry.</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #DC2626;">
                  <strong style="color: #B91C1C; font-size: 1.05rem; display: block; margin-bottom: 8px;">Mandatory ISPM-15 Fumigation</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #7F1D1D; line-height: 1.5;">All raw timber packaging (wooden pallets, crates, dunnage) must be heavily fumigated with Methyl Bromide gas in Sri Lanka to kill wood-boring insects, and stamped with the internationally recognized ISPM-15 wheat logo.</p>
                </div>
                
                <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #DC2626;">
                  <strong style="color: #B91C1C; font-size: 1.05rem; display: block; margin-bottom: 8px;">The BMSB Season</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #7F1D1D; line-height: 1.5;">Between September 1 and April 30, it is <strong>Brown Marmorated Stink Bug (BMSB)</strong> risk season. Target high-risk goods (like vehicles, machinery, ceramics) must undergo mandatory offshore heat treatment or sulfuryl fluoride fumigation before arriving.</p>
                </div>
                
                <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #DC2626;">
                  <strong style="color: #B91C1C; font-size: 1.05rem; display: block; margin-bottom: 8px;">Zero-Tolerance Cleanliness</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #7F1D1D; line-height: 1.5;">Containers must be swept completely clean at the origin factory. Even a handful of foreign soil, dried leaves, or dead insects on the floor can trigger a mandatory deep-cleaning quarantine at the importer's massive expense.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "sri-lanka-to-india",
          title: "Sri Lanka to India",
          summary: "Feeder network links to Nhava Sheva and Chennai.",
          content: `
            <p>The trade lane between Sri Lanka and India is characterized by ultra-short transit times, immense volume, and high-frequency "Feeder" vessel schedules. Because many massive global mother vessels (e.g., from Europe) are too deep to dock at Indian ports, they drop thousands of containers in Colombo, acting as the primary transshipment hub for the entire Indian Subcontinent.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border:2px solid #FDBA74; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#C2410C; text-align: center; font-size: 1.3rem;">📌 THE REGIONAL FEEDER NETWORK</h4>
              <p style="font-size:0.95rem; color:#9A3412; margin:0 0 20px 0; text-align: center; line-height: 1.6;">Smaller, shallow-draft "Feeder" vessels constantly shuttle back and forth between Colombo and various Indian ports, distributing the cargo dropped off by the global mother vessels.</p>
              
              <div style="display:flex; justify-content:space-around; align-items:stretch; flex-wrap:wrap; gap:15px;">
                <div style="background:#FFF; border:2px solid #FDBA74; padding:20px; border-radius:12px; text-align:center; flex:1; min-width: 200px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 2.5rem; margin-bottom: 10px;">✈️</div>
                  <strong style="color:#C2410C; display:block; font-size: 1.1rem; margin-bottom: 5px;">West Coast India</strong>
                  <p style="font-size:0.9rem; color:#9A3412; margin: 0; line-height: 1.5;"><strong>Nhava Sheva (Mumbai) / Mundra / Pipavav</strong><br>Highly industrialized regions. Transit time from Colombo is roughly <strong>4-6 Days</strong>.</p>
                </div>
                <div style="background:#FFF; border:2px solid #FDBA74; padding:20px; border-radius:12px; text-align:center; flex:1; min-width: 200px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 2.5rem; margin-bottom: 10px;">🚛</div>
                  <strong style="color:#C2410C; display:block; font-size: 1.1rem; margin-bottom: 5px;">South & East Coast</strong>
                  <p style="font-size:0.9rem; color:#9A3412; margin: 0; line-height: 1.5;"><strong>Chennai / Tuticorin / Cochin / Visakhapatnam</strong><br>Automotive and textile hubs. Extremely fast transit times of <strong>1-3 Days</strong>.</p>
                </div>
              </div>
            </div>
            
            <div style="margin:25px 0; background:#F8FAFC; border-left:4px solid #3B82F6; padding:15px; border-radius:0 12px 12px 0; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 10px 0; color:#1E40AF;">The ISFTA Trade Agreement</h4>
              <p style="margin:0; font-size:0.95rem; color:#475569; line-height:1.6;">A cornerstone of this lane is the <strong>India-Sri Lanka Free Trade Agreement (ISFTA)</strong>. Exporters heavily utilize this agreement by obtaining a Certificate of Origin from the Department of Commerce, allowing their goods to enter India completely duty-free or at significant concessionary rates, giving Sri Lankan goods a massive price advantage in the Indian market.</p>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/tM1X7H5L108"
        },
        {
          id: "indonesia-to-usa",
          title: "Indonesia to USA",
          summary: "Jakarta and Surabaya exports via Singapore hubs.",
          content: `
            <p>Indonesia is an export powerhouse for furniture, footwear, rubber, and electronics heading to the United States. However, due to Indonesia's challenging archipelagic geography and port infrastructure, cargo heavily relies on a complex web of transshipment hubs.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 100%); border:2px solid #F0ABFC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#86198F; font-size: 1.3rem; text-align: center;">📌 THE SOUTHEAST ASIAN TRANSSHIPMENT PIPELINE</h4>
              <p style="font-size:0.95rem; color:#701A75; line-height:1.6; margin:0 0 20px 0; text-align: center;">Very few massive Trans-Pacific vessels call directly at Indonesian ports (like Jakarta or Surabaya) due to draft (water depth) restrictions and port congestion.</p>
              
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div style="display:flex; align-items:center; background:#FFF; border-left:4px solid #C026D3; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <div style="font-size:2rem; margin-right:15px;">1️⃣</div>
                  <div>
                    <strong style="color:#86198F; display:block; font-size:1.1rem;">Step 1: The Feeder Leg</strong>
                    <span style="font-size:0.9rem; color:#A21CAF;">Cargo is loaded onto smaller feeder vessels in Jakarta (Tanjung Priok) or Surabaya (Tanjung Perak).</span>
                  </div>
                </div>
                
                <div style="display:flex; align-items:center; background:#FFF; border-left:4px solid #C026D3; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <div style="font-size:2rem; margin-right:15px;">2️⃣</div>
                  <div>
                    <strong style="color:#86198F; display:block; font-size:1.1rem;">Step 2: The Hub Transfer</strong>
                    <span style="font-size:0.9rem; color:#A21CAF;">The feeder sails 2-4 days to the Port of Singapore or Port Klang (Malaysia), where containers are discharged and wait in the yard.</span>
                  </div>
                </div>
                
                <div style="display:flex; align-items:center; background:#FFF; border-left:4px solid #C026D3; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <div style="font-size:2rem; margin-right:15px;">3️⃣</div>
                  <div>
                    <strong style="color:#86198F; display:block; font-size:1.1rem;">Step 3: The Mother Vessel (Trans-Pacific)</strong>
                    <span style="font-size:0.9rem; color:#A21CAF;">Containers are loaded onto 15,000+ TEU Mother Vessels for the massive Pacific crossing to LA/Long Beach (total transit 30-40 Days).</span>
                  </div>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/tM1X7H5L108"
        },
        {
          id: "indonesia-to-europe",
          title: "Indonesia to Europe",
          summary: "Asia-Europe routes via Malacca Strait.",
          content: `
            <p>The Indonesia-to-Europe trade lane primarily exports palm oil, textiles, furniture, and electronics to Northern Europe (Rotterdam, Hamburg, Felixstowe) and Mediterranean ports (Genoa, Barcelona).</p>
            
            <div style="margin:30px 0; background:#F0FDF4; border:2px solid #86EFAC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#14532D; font-size: 1.3rem; text-align: center;">📌 THE MALACCA STRAIT BOTTLENECK</h4>
              
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
                <div style="flex:1; min-width: 250px;">
                  <p style="font-size:0.95rem; color:#166534; line-height:1.6; margin:0 0 15px 0;">Once cargo departs Indonesia (often transshipping via Singapore), it must sail through the <strong>Strait of Malacca</strong>, one of the most congested and critical maritime choke points in the world.</p>
                  <p style="font-size:0.95rem; color:#166534; line-height:1.6; margin:0;">From there, it crosses the vast Indian Ocean, sails up the Red Sea, navigates the Suez Canal, and enters the Mediterranean before heading to Northern Europe. Total transit is roughly <strong>25-32 Days</strong>.</p>
                </div>
                <div style="flex:1; min-width: 250px; background:#DCFCE7; padding:20px; border-radius:12px; border:2px dashed #4ADE80; text-align:center;">
                  <strong style="color:#15803D; display:block; font-size: 1.2rem; margin-bottom: 10px;">Piracy & Security Risks</strong>
                  <span style="font-size:0.9rem; color:#166534;">The Malacca Strait has historically been a hotspot for piracy, requiring vessels to maintain high speeds and strict watch protocols. Recent geopolitical tensions in the Red Sea have also forced many vessels to detour around Africa, adding 10-14 days to this transit.</span>
                </div>
              </div>
            </div>
            
            <p>Like all EU imports, these shipments require strict <strong>ICS2</strong> security filings prior to vessel departure, and must adhere to strict EU deforestation regulations (especially concerning palm oil and timber exports).</p>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "uae-to-gcc",
          title: "UAE to GCC",
          summary: "Cross-border road freight networks in the Middle East.",
          content: `
            <p>While Jebel Ali (Dubai) is a massive ocean transshipment hub, much of the cargo bound for neighboring Middle Eastern countries (Saudi Arabia, Oman, Bahrain, Kuwait) moves via extensive and highly efficient Cross-Border Road Freight networks.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:2px solid #FDE68A; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#B45309; text-align: center; font-size: 1.3rem;">📌 GCC TRUCKING CORRIDORS</h4>
              <p style="margin:0 0 20px 0; font-size:0.95rem; color:#92400E; text-align: center; line-height:1.6;">A standard 18-wheeler (or Curtain-Sider trailer) can reach Riyadh (Saudi Arabia) or Muscat (Oman) from Dubai in under 2-3 days, making it significantly faster and often more cost-effective than ocean feeder vessels.</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #D97706;">
                  <strong style="color: #B45309; font-size: 1.05rem; display: block; margin-bottom: 8px;">The Ghuwaifat Border</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #92400E; line-height: 1.5;">The primary land border crossing between the UAE and Saudi Arabia. It handles thousands of trucks daily. Delays here can stretch for miles if paperwork is incorrect.</p>
                </div>
                
                <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #D97706;">
                  <strong style="color: #B45309; font-size: 1.05rem; display: block; margin-bottom: 8px;">Makasa System (Customs)</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #92400E; line-height: 1.5;">Unlike ocean freight cleared at a port, road freight is cleared at the physical border crossing point. This requires highly synchronized paperwork (Makasa) to avoid massive truck detention delays.</p>
                </div>
                
                <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #D97706;">
                  <strong style="color: #B45309; font-size: 1.05rem; display: block; margin-bottom: 8px;">FMCG & Perishables</strong>
                  <p style="margin: 0; font-size: 0.9rem; color: #92400E; line-height: 1.5;">Because of the extreme desert heat, the vast majority of food and FMCG products are moved in specialized refrigerated trucks (Reefers) requiring constant temperature monitoring.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/tM1X7H5L108"
        },
        {
          id: "china-to-sri-lanka",
          title: "China to Sri Lanka",
          summary: "Inbound supply chains from Shanghai, Shenzhen to Colombo.",
          content: `
            <p>This is the absolute backbone of Sri Lanka's import economy. Almost all raw materials for the massive Sri Lankan apparel sector (fabric rolls, zippers, buttons), as well as consumer electronics, solar panels, and construction materials, flow exclusively through this lane.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%); border:2px solid #FCA5A5; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#991B1B; text-align: center; font-size: 1.3rem;">📌 MAJOR CHINESE HUBS TO COLOMBO</h4>
              
              <table style="width:100%; border-collapse:collapse; font-size:0.95rem; text-align:left; background:#FFF; border-radius:12px; overflow:hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <tr style="background:#EF4444; color: white;">
                  <th style="padding:15px;">Origin Port</th>
                  <th style="padding:15px;">Industrial Region</th>
                  <th style="padding:15px;">Est. Transit Time to CMB</th>
                </tr>
                <tr style="border-bottom:1px solid #FEE2E2; transition: background 0.3s; hover:background:#FEF2F2;">
                  <td style="padding:15px;"><strong style="color:#B91C1C;">Shanghai / Ningbo</strong></td>
                  <td style="padding:15px; color:#7F1D1D;">East China (Manufacturing Heart)</td>
                  <td style="padding:15px; color:#7F1D1D; font-weight: bold;">14 - 18 Days</td>
                </tr>
                <tr style="border-bottom:1px solid #FEE2E2; transition: background 0.3s; hover:background:#FEF2F2;">
                  <td style="padding:15px;"><strong style="color:#B91C1C;">Shenzhen / Guangzhou</strong></td>
                  <td style="padding:15px; color:#7F1D1D;">South China (Tech & Textiles)</td>
                  <td style="padding:15px; color:#7F1D1D; font-weight: bold;">10 - 12 Days</td>
                </tr>
                <tr style="transition: background 0.3s; hover:background:#FEF2F2;">
                  <td style="padding:15px;"><strong style="color:#B91C1C;">Qingdao / Tianjin</strong></td>
                  <td style="padding:15px; color:#7F1D1D;">North China (Heavy Industry)</td>
                  <td style="padding:15px; color:#7F1D1D; font-weight: bold;">18 - 22 Days</td>
                </tr>
              </table>
              
              <div style="margin-top: 20px; background: rgba(255,255,255,0.8); padding: 15px; border-radius: 8px; border-left: 4px solid #DC2626;">
                <strong style="color: #991B1B; display: block; margin-bottom: 5px;">The Chinese New Year (CNY) Effect</strong>
                <p style="margin: 0; font-size: 0.9rem; color: #7F1D1D; line-height: 1.5;">Every February, Chinese factories shut down entirely for 2-3 weeks for CNY. Supply chains panic in January, trying to push all cargo out before the shutdown. This causes massive space shortages, port congestion, and heavily inflated freight rates (Peak Season Surcharges) on this lane.</p>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "india-to-uae",
          title: "India to UAE",
          summary: "Trade routes linking Mumbai, Mundra to Jebel Ali.",
          content: `
            <p>The India-UAE corridor is one of the fastest, highest volume, and most lucrative trade lanes globally, driven by massive expatriate populations, food security needs, and recent geopolitical free trade agreements.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); border:2px solid #86EFAC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#14532D; text-align: center; font-size: 1.3rem;">📌 THE CEPA ADVANTAGE</h4>
              <p style="font-size:0.95rem; color:#166534; line-height:1.6; margin:0 0 20px 0; text-align: center;">The <strong>Comprehensive Economic Partnership Agreement (CEPA)</strong> signed between India and the UAE eliminated customs duties on nearly 80% of goods traded between the two countries.</p>
              
              <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                <div style="background:#FFF; padding:20px; border-radius:12px; border:2px dashed #4ADE80; flex:1; min-width:250px; text-align:center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 3rem; margin-bottom: 10px;">📦</div>
                  <strong style="color:#15803D; display:block; font-size: 1.1rem; margin-bottom: 5px;">Ultra-Fast Ocean Transit</strong>
                  <p style="font-size:0.9rem; color:#166534; margin: 0; line-height: 1.5;">Vessels departing from West Coast Indian ports (Nhava Sheva, Mundra) can arrive directly into Jebel Ali (Dubai) with incredibly fast transit times of <strong>4-7 Days</strong>. It is almost as fast as air freight but at a fraction of the cost.</p>
                </div>
                
                <div style="background:#FFF; padding:20px; border-radius:12px; border:2px dashed #4ADE80; flex:1; min-width:250px; text-align:center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 3rem; margin-bottom: 10px;">✈️</div>
                  <strong style="color:#15803D; display:block; font-size: 1.1rem; margin-bottom: 5px;">Primary Commodities</strong>
                  <p style="font-size:0.9rem; color:#166534; margin: 0; line-height: 1.5;">This lane is dominated by agricultural exports (rice, spices, fresh produce) ensuring food security for the UAE, alongside massive volumes of textiles, jewelry, and machinery.</p>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/tM1X7H5L108"
        }
      ]
    },
    {
      id: "process-flows",
      title: "11. Process Flows and SOPs",
      description: "Very useful for internal training.",
      icon: "⚙️",
      subtopics: [
        {
          id: "export-shipment-process-flow",
          title: "Export Shipment Process Flow",
          summary: "Timeline from booking request to loading confirmation.",
          content: `
            <p>Exporting cargo involves highly synchronized steps between the shipper, forwarder, customs broker, and ocean carrier. A failure at any single point in this pipeline can cause the cargo to miss the vessel—a disastrous event known as a <strong>Roll-Over</strong>.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0F172A; text-align:center; font-size: 1.3rem;">📌 END-TO-END EXPORT STANDARD OPERATING PROCEDURE</h4>
              
              <div style="position: relative; padding-left: 40px;">
                <!-- Vertical Line -->
                <div style="position: absolute; left: 15px; top: 0; bottom: 0; width: 4px; background: #CBD5E1; border-radius: 2px;"></div>
                
                <div style="position: relative; margin-bottom: 25px;">
                  <div style="position: absolute; left: -50px; top: 0; background: #3B82F6; color: white; font-weight: bold; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px #F8FAFC;">1</div>
                  <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #3B82F6;">
                    <strong style="color: #1E40AF; display: block; font-size: 1.1rem; margin-bottom: 8px;">Booking & Space Allocation</strong>
                    <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.5;">The Shipper sends an SI (Shipping Instruction) to the Forwarder. The Forwarder logs into the Carrier's portal (e.g., INTTRA) and secures space on a specific vessel voyage. The Carrier issues a <strong>Booking Confirmation</strong> and a <strong>Container Release Order (CRO)</strong> to authorize empty container pickup.</p>
                  </div>
                </div>
                
                <div style="position: relative; margin-bottom: 25px;">
                  <div style="position: absolute; left: -50px; top: 0; background: #10B981; color: white; font-weight: bold; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px #F8FAFC;">2</div>
                  <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #10B981;">
                    <strong style="color: #047857; display: block; font-size: 1.1rem; margin-bottom: 8px;">Empty Placement & Stuffing</strong>
                    <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.5;">A transporter uses the CRO to pick up an empty, clean container from the shipping line's depot. The truck drives to the Shipper's factory where the cargo is loaded (stuffed) inside. The container doors are closed, and a high-security steel <strong>Bottle Seal</strong> is affixed.</p>
                  </div>
                </div>
                
                <div style="position: relative; margin-bottom: 25px;">
                  <div style="position: absolute; left: -50px; top: 0; background: #F59E0B; color: white; font-weight: bold; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px #F8FAFC;">3</div>
                  <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #F59E0B;">
                    <strong style="color: #B45309; display: block; font-size: 1.1rem; margin-bottom: 8px;">Customs Clearance & Gate-In</strong>
                    <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.5;">The Customs Broker files the Export Declaration (CUSDEC) via the ASYCUDA system. Once cleared, the loaded container is driven to the port and must pass through the terminal gates <em>before</em> the strict CY Cut-Off deadline. The terminal issues a Gate-In receipt.</p>
                  </div>
                </div>
                
                <div style="position: relative;">
                  <div style="position: absolute; left: -50px; top: 0; background: #8B5CF6; color: white; font-weight: bold; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px #F8FAFC;">4</div>
                  <div style="background: #FFF; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #8B5CF6;">
                    <strong style="color: #6D28D9; display: block; font-size: 1.1rem; margin-bottom: 8px;">Vessel Loading (On-Board)</strong>
                    <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.5;">Massive STS (Ship-to-Shore) gantry cranes lift the container onto the vessel according to the stowage plan. Once physically on the ship, the Carrier issues the <strong>Original Master Bill of Lading (MBL)</strong> with a "Shipped on Board" stamp and date.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "import-shipment-process-flow",
          title: "Import Shipment Process Flow",
          summary: "Managing arrivals, clearances, and destination deliveries.",
          content: `
            <p>Import operations revolve around an extreme sense of urgency. The primary goal is to release the cargo from the port jurisdiction as quickly as possible to avoid devastating Demurrage and Detention (D&D) penalties, which can quickly wipe out the entire profit margin of the goods.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FDF4FF 0%, #F5D0FE 100%); border:2px solid #F0ABFC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#86198F; font-size: 1.3rem; text-align: center;">📌 THE INBOUND RELEASE SEQUENCE</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: #FFF; padding: 15px; border-radius: 10px; border-top: 4px solid #C026D3; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color: #86198F; font-size: 1.05rem; display: block; margin-bottom: 5px;">1. Pre-Alert & Arrival Notice</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #4A044E; line-height: 1.5;">The Forwarder receives Pre-Alert documents from origin. 3 days before the ship docks, the Carrier issues the <strong>Arrival Notice (AN)</strong> outlining local charges.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 10px; border-top: 4px solid #C026D3; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color: #86198F; font-size: 1.05rem; display: block; margin-bottom: 5px;">2. D/O Collection</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #4A044E; line-height: 1.5;">The importer surrenders the Original Bill of Lading and pays the local port charges. The Carrier then issues the golden ticket: the <strong>Delivery Order (D/O)</strong>.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 10px; border-top: 4px solid #C026D3; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color: #86198F; font-size: 1.05rem; display: block; margin-bottom: 5px;">3. Customs Clearance</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #4A044E; line-height: 1.5;">The importer pays all import duties and taxes via the customs portal. Customs reviews the CUSDEC and electronically transmits a "Release" message to the port.</p>
                </div>
                
                <div style="background: #FFF; padding: 15px; border-radius: 10px; border-top: 4px solid #C026D3; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color: #86198F; font-size: 1.05rem; display: block; margin-bottom: 5px;">4. Gate-Out & Empty Return</strong>
                  <p style="margin: 0; font-size: 0.85rem; color: #4A044E; line-height: 1.5;">A truck presents the D/O at the terminal, loads the full container, and drives to the consignee's warehouse. After unloading, the empty, swept-clean container must be returned to the Carrier's depot before the free-time clock expires.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "air-freight-process-flow",
          title: "Air Freight Process Flow",
          summary: "Airport terminal operations and airway bill controls.",
          content: `
            <p>Unlike ocean freight, air freight moves in hours, not days. The standard operating procedure at an airport terminal is a high-speed environment built entirely around two non-negotiable pillars: <strong>Security</strong> and <strong>Weight Audits</strong>.</p>
            
            <div style="margin:30px 0; background:#F0F9FF; border:2px solid #7DD3FC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0369A1; text-align: center; font-size: 1.3rem;">📌 TERMINAL HANDLING STEPS (EXPORT)</h4>
              
              <div style="display:flex; flex-direction:column; gap:15px;">
                <div style="display:flex; align-items:center; background:#FFF; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.05); border-left:4px solid #0EA5E9;">
                  <strong style="color:#0284C7; font-size:1.1rem; min-width: 140px;">1. RCS (Received)</strong>
                  <span style="font-size:0.9rem; color:#0C4A6E;">Cargo arrives at the Ground Handling Agent (GHA) warehouse at the airport. A physical tally confirms box count against the Air Waybill.</span>
                </div>
                
                <div style="display:flex; align-items:center; background:#FFF; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.05); border-left:4px solid #0EA5E9;">
                  <strong style="color:#0284C7; font-size:1.1rem; min-width: 140px;">2. Weight & Vol.</strong>
                  <span style="font-size:0.9rem; color:#0C4A6E;">The GHA places the cargo on a calibrated scale and uses a laser scanner (Cubiscan) to calculate the exact dimensions. The higher of Actual vs. Volumetric Weight dictates the final airline cost.</span>
                </div>
                
                <div style="display:flex; align-items:center; background:#FFF; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.05); border-left:4px solid #EF4444;">
                  <strong style="color:#DC2626; font-size:1.1rem; min-width: 140px;">3. Security X-Ray</strong>
                  <span style="font-size:0.9rem; color:#0C4A6E;"><strong>CRITICAL STEP:</strong> Mandatory X-Ray or Explosive Trace Detection (ETD). Cargo cannot fly if it fails screening or if it contains undeclared Dangerous Goods (batteries, flammables). It gets held as "Unknown Cargo."</span>
                </div>
                
                <div style="display:flex; align-items:center; background:#FFF; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.05); border-left:4px solid #0EA5E9;">
                  <strong style="color:#0284C7; font-size:1.1rem; min-width: 140px;">4. ULD Build-Up</strong>
                  <span style="font-size:0.9rem; color:#0C4A6E;">Loose cartons are meticulously stacked by warehouse staff onto aluminum aircraft pallets (ULDs), contour-shaped to fit the curve of the airplane belly, and tightly secured with cargo nets.</span>
                </div>
                
                <div style="display:flex; align-items:center; background:#FFF; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.05); border-left:4px solid #0EA5E9;">
                  <strong style="color:#0284C7; font-size:1.1rem; min-width: 140px;">5. DEP (Departed)</strong>
                  <span style="font-size:0.9rem; color:#0C4A6E;">Tug tractors pull the ULDs onto the tarmac, where high-loaders push them into the aircraft hold. Flight departs.</span>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "ocean-freight-process-flow",
          title: "Ocean Freight Process Flow",
          summary: "Port container yard gates and shipping line manifests.",
          content: `
            <p>The Ocean Freight process is entirely dictated by strict carrier cutoff deadlines. These are hard stops—if you miss a cutoff by even 5 minutes, your container will not be loaded onto the ship, and you will wait another week for the next vessel, incurring port storage charges in the meantime.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0F172A; text-align: center; font-size: 1.3rem;">⏳ THE THREE GOLDEN CUT-OFFS</h4>
              
              <div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">
                <div style="flex:1; min-width:250px; background:#FFF; border-top:5px solid #1D4ED8; padding:20px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.05); text-align:center;">
                  <div style="font-size:2.5rem; margin-bottom:10px;">⚖️</div>
                  <strong style="color:#1E40AF; display:block; font-size:1.15rem; margin-bottom:10px;">VGM Cut-Off</strong>
                  <p style="font-size:0.9rem; color:#475569; margin:0; line-height:1.5;"><strong>Verified Gross Mass.</strong> The exact certified weight of the packed container must be electronically submitted to the carrier. By maritime law (SOLAS), a ship cannot load a container without a VGM on file, as it affects the vessel's balance.</p>
                </div>
                
                <div style="display:flex; flex-direction:column; gap:15px; flex:1; min-width:250px;">
                  <div style="background:#FFF; border-left:5px solid #15803D; padding:20px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                    <strong style="color:#166534; display:flex; align-items:center; font-size:1.1rem; margin-bottom:8px;"><span style="font-size:1.5rem; margin-right:8px;">🏗️</span> CY Gate-In Cut-Off</strong>
                    <p style="font-size:0.9rem; color:#475569; margin:0; line-height:1.5;">The absolute physical deadline for the loaded, customs-cleared container to enter the port gates. The terminal needs time to stack containers in the yard before the ship arrives.</p>
                  </div>
                  
                  <div style="background:#FFF; border-left:5px solid #B91C1C; padding:20px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                    <strong style="color:#991B1B; display:flex; align-items:center; font-size:1.1rem; margin-bottom:8px;"><span style="font-size:1.5rem; margin-right:8px;">📄</span> SI (Docs) Cut-Off</strong>
                    <p style="font-size:0.9rem; color:#475569; margin:0; line-height:1.5;"><strong>Shipping Instructions.</strong> The final deadline to submit the exact shipper, consignee, and cargo description data to the carrier so they can draft the Bill of Lading and submit Advanced Manifest filings to customs.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "documentation-flow",
          title: "Documentation Flow",
          summary: "Managing certificates and switch bills of lading.",
          content: `
            <p>Cargo doesn't move on ships; it moves on paper. The documentation flow runs parallel to the physical cargo flow. A delay in the document pipeline can cause the physical cargo to be held hostage at the destination port, racking up thousands of dollars in Demurrage penalties.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:2px solid #FDE68A; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#B45309; text-align: center; font-size: 1.3rem;">📑 THE DOCUMENT PIPELINE</h4>
              
              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #D97706; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:center;">
                  <span style="font-size:2rem; margin-right:15px;">1️⃣</span>
                  <div>
                    <strong style="color:#B45309; display:block; margin-bottom:4px;">Commercial Documents (Day 1)</strong>
                    <span style="font-size:0.9rem; color:#92400E;">The Exporter generates the Commercial Invoice (CI) detailing the cargo value, and the Packing List (PL) detailing dimensions and weight.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #D97706; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:center;">
                  <span style="font-size:2rem; margin-right:15px;">2️⃣</span>
                  <div>
                    <strong style="color:#B45309; display:block; margin-bottom:4px;">Draft B/L & Certificates (Day 2-3)</strong>
                    <span style="font-size:0.9rem; color:#92400E;">Forwarder drafts the Bill of Lading for approval. Simultaneously, the Exporter applies for the Certificate of Origin (COO) and any necessary Phytosanitary/Fumigation certificates.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #D97706; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:center;">
                  <span style="font-size:2rem; margin-right:15px;">3️⃣</span>
                  <div>
                    <strong style="color:#B45309; display:block; margin-bottom:4px;">Original Issue (Vessel Sails)</strong>
                    <span style="font-size:0.9rem; color:#92400E;">Once the vessel departs, the Carrier issues the <strong>Original Bill of Lading (OBL)</strong>. The OBL is the legal title to the goods.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #D97706; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:center;">
                  <span style="font-size:2rem; margin-right:15px;">4️⃣</span>
                  <div>
                    <strong style="color:#B45309; display:block; margin-bottom:4px;">Bank Negotiation / Courier</strong>
                    <span style="font-size:0.9rem; color:#92400E;">The Exporter takes the complete "Clearance Pack" (OBL, CI, PL, COO) and submits it to their bank (if using an LC) or couriers it via DHL/FedEx directly to the Importer.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #D97706; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:center;">
                  <span style="font-size:2rem; margin-right:15px;">5️⃣</span>
                  <div>
                    <strong style="color:#B45309; display:block; margin-bottom:4px;">Surrender & Release</strong>
                    <span style="font-size:0.9rem; color:#92400E;">The Importer receives the physical OBL, endorses the back of it, and surrenders it to the destination Carrier office to secure the Delivery Order.</span>
                  </div>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        },
        {
          id: "physical-cargo-flow",
          title: "Physical Cargo Flow",
          summary: "Tracking the physical cargo movements across modes.",
          content: `
            <p>While the forwarder sits at a desk managing data and tracking milestones, the actual physical cargo is handed off multiple times between different heavy-machinery operators across the globe. Each handoff is a liability transfer point.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 15px 0; color:#0F172A; text-align: center; font-size: 1.3rem;">📌 CHAIN OF CUSTODY & LIABILITY</h4>
              <p style="font-size:0.95rem; color:#475569; line-height:1.6; margin:0 0 20px 0; text-align: center;">Whenever cargo physically changes hands, an <strong>Equipment Interchange Receipt (EIR)</strong> is signed. If the cargo is damaged, the last party to sign a "clean" EIR (without noting the damage) is held legally liable for the insurance claim.</p>
              
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; position: relative;">
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border:2px solid #94A3B8; text-align:center; width:22%; min-width: 120px; z-index: 2;">
                  <div style="font-size:2rem; margin-bottom:5px;">🏭</div>
                  <strong style="color:#1E293B; font-size: 0.9rem; display: block;">Shipper Factory</strong>
                </div>
                
                <div style="font-size: 1.5rem; color: #94A3B8;">➡️</div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border:2px solid #94A3B8; text-align:center; width:22%; min-width: 120px; z-index: 2;">
                  <div style="font-size:2rem; margin-bottom:5px;">🚛</div>
                  <strong style="color:#1E293B; font-size: 0.9rem; display: block;">Origin Trucker</strong>
                </div>
                
                <div style="font-size: 1.5rem; color: #94A3B8;">➡️</div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border:2px solid #94A3B8; text-align:center; width:22%; min-width: 120px; z-index: 2;">
                  <div style="font-size:2rem; margin-bottom:5px;">🏗️</div>
                  <strong style="color:#1E293B; font-size: 0.9rem; display: block;">Port Terminal</strong>
                </div>
                
                <div style="font-size: 1.5rem; color: #94A3B8;">➡️</div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border:2px solid #94A3B8; text-align:center; width:22%; min-width: 120px; z-index: 2;">
                  <div style="font-size:2rem; margin-bottom:5px;">🚢</div>
                  <strong style="color:#1E293B; font-size: 0.9rem; display: block;">Vessel Master</strong>
                </div>
                
              </div>
              
              <div style="margin-top: 15px; text-align: center; font-size: 0.85rem; color: #64748B;">* The process repeats in reverse at the destination port until final delivery to the Consignee.</div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/Pj8E8XyY11Y"
        },
        {
          id: "customer-inquiry-to-quotation",
          title: "Customer Inquiry to Quotation",
          summary: "Analyzing pricing requests and preparing commercial quotes.",
          content: `
            <p>The Sales SOP (Standard Operating Procedure) dictates how quickly, accurately, and profitably a forwarder can respond to a customer's Request for Quotation (RFQ). A bad quote can result in massive financial losses for the forwarder.</p>
            
            <div style="margin:30px 0; background:#FFF1F2; border:2px solid #FECACA; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#9F1239; text-align: center; font-size: 1.3rem;">📌 THE QUOTATION PROCESS</h4>
              
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #E11D48; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#BE123C; display:block; margin-bottom:5px;">1. Qualify the Cargo</strong>
                  <span style="font-size:0.85rem; color:#9F1239; line-height: 1.5; display:block;">Ask the customer for exact details: Origin/Destination, Commodity (Is it Hazardous?), Weight, Dimensions, and the Incoterm.</span>
                </div>
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #E11D48; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#BE123C; display:block; margin-bottom:5px;">2. Source Buy Rates</strong>
                  <span style="font-size:0.85rem; color:#9F1239; line-height: 1.5; display:block;">Look up current Ocean/Air buy rates from carriers, checking validity dates (rates change mid-month) and space availability.</span>
                </div>
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #E11D48; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#BE123C; display:block; margin-bottom:5px;">3. Calculate Margin</strong>
                  <span style="font-size:0.85rem; color:#9F1239; line-height: 1.5; display:block;">Add the company's profit margin (markup) to the buy rate while remaining competitive in the market.</span>
                </div>
              </div>
              
              <div style="margin-top: 20px; background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; border: 1px dashed #F43F5E;">
                <strong style="color:#9F1239; display:flex; align-items:center; font-size:1.05rem; margin-bottom:5px;"><span style="font-size:1.2rem; margin-right:8px;">🚫</span> The Golden Rule: Exclusions</strong>
                <p style="font-size:0.9rem; color:#7F1D1D; margin:0; line-height: 1.5;">Never send a quote without listing strict exclusions. Always state: <em>"Quote excludes Customs Duties, Taxes, Port Demurrage, Detention, Storage, and Customs Physical Inspection fees."</em> If these are not excluded, the customer will legally force the forwarder to pay them.</p>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w"
        },
        {
          id: "booking-to-final-delivery",
          title: "Booking to Final Delivery",
          summary: "End-to-end milestone timeline checklist.",
          content: `
            <p>This is the high-level operational milestone checklist used by forwarders globally to ensure a shipment is moving without delays and data is transmitted accurately to all parties.</p>
            
            <div style="margin:30px 0; background:#F8FAFC; border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0F172A; text-align: center; font-size: 1.3rem;">📅 END-TO-END MILESTONE CHECKLIST</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">📝</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Booking Confirmed</strong><br>Space secured on vessel.</span>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">🚛</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Empty Out</strong><br>Trucker picked up empty.</span>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">🏗️</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Gate-In Full</strong><br>Container delivered to port.</span>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">🛂</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Customs Released</strong><br>Origin customs cleared.</span>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">🚢</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>SOB (Shipped On Board)</strong><br>Vessel departed origin.</span>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">✅</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Arrival Notice</strong><br>Issued 3 days prior ETA.</span>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">✅</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Vessel Discharged</strong><br>Unloaded at destination.</span>
                </div>
                <div style="background: #FFF; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #10B981; display:flex; align-items:center;">
                  <span style="font-size:1.5rem; margin-right:10px;">✅</span>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Final Delivery</strong><br>Consignee received cargo.</span>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "claims-and-escalation-process",
          title: "Claims and Escalation Process",
          summary: "Handling cargo damage, losses, and insurance claims.",
          content: `
            <p>When cargo arrives damaged (water damage, crushed cartons, temperature spikes in reefers), or is completely lost at sea, the consignee must act immediately to protect their legal right to file a claim against the carrier or their marine insurance provider.</p>
            
            <div style="margin:30px 0; background:#FFF1F2; border:2px solid #FECACA; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#9F1239; text-align: center; font-size: 1.3rem;">📌 CLAIMS & ESCALATION PROTOCOL</h4>
              
              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #E11D48; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#BE123C; display:block; margin-bottom:5px;">1. Stop & Photograph</strong>
                  <span style="font-size:0.9rem; color:#9F1239;">If the container doors are opened at the warehouse and damage is visible, <strong>stop unloading immediately</strong>. Take timestamped photographs of the cargo exactly as it sits in the container before moving anything.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #E11D48; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#BE123C; display:block; margin-bottom:5px;">2. Note the Delivery Receipt (EIR)</strong>
                  <span style="font-size:0.9rem; color:#9F1239;">The receiving manager must explicitly mark "Cargo Damaged" or "Subject to Inspection" on the trucker's delivery receipt. <strong>Never sign a clean receipt</strong> if damage is suspected, as it legally absolves the trucker and carrier of liability.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #E11D48; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#BE123C; display:block; margin-bottom:5px;">3. Issue Letter of Protest</strong>
                  <span style="font-size:0.9rem; color:#9F1239;">Draft and email a formal "Letter of Protest" / "Notice of Intent to Claim" to the Shipping Line and Forwarder within 72 hours of delivery.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #E11D48; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#BE123C; display:block; margin-bottom:5px;">4. Appoint Marine Surveyor</strong>
                  <span style="font-size:0.9rem; color:#9F1239;">Hire an independent, licensed Marine Surveyor to physically inspect the cargo, assess the cause of damage, and issue an official Damage Report. This report is the primary evidence required by the insurance underwriter to approve a payout.</span>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "shipment-milestone-tracking",
          title: "Shipment Milestone Tracking",
          summary: "Using EDI and track-and-trace links for visibility.",
          content: `
            <p>In modern logistics, information visibility is just as important as the physical movement of the cargo. Shippers demand to know exactly where their million-dollar inventories are at all times to plan their manufacturing or retail schedules.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border:2px solid #7DD3FC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0369A1; text-align: center; font-size: 1.3rem;">📌 TRACKING TECHNOLOGIES</h4>
              
              <div style="display:flex; flex-wrap:wrap; gap:15px;">
                <div style="flex:1; min-width:250px; background:#FFF; border-top:4px solid #0EA5E9; padding:20px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#0284C7; display:flex; align-items:center; font-size:1.1rem; margin-bottom:8px;"><span style="font-size:1.5rem; margin-right:8px;">💻</span> EDI (Electronic Data Interchange)</strong>
                  <p style="font-size:0.9rem; color:#0C4A6E; margin:0; line-height:1.5;">The backbone of logistics tech. Terminals, carriers, and forwarders use EDI (specifically EDI 315 messages) to automatically transmit milestone updates system-to-system without human intervention.</p>
                </div>
                
                <div style="flex:1; min-width:250px; background:#FFF; border-top:4px solid #0EA5E9; padding:20px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#0284C7; display:flex; align-items:center; font-size:1.1rem; margin-bottom:8px;"><span style="font-size:1.5rem; margin-right:8px;">📡</span> AIS / GPS Tracking</strong>
                  <p style="font-size:0.9rem; color:#0C4A6E; margin:0; line-height:1.5;">Vessels broadcast their location via the Automatic Identification System (AIS). Modern track-and-trace portals (like Project44 or FourKites) aggregate this data to show the exact GPS dot of the ship on a live map.</p>
                </div>
              </div>
              
              <div style="margin-top: 15px; background: #FFF; padding: 15px; border-radius: 8px; border-left: 4px solid #38BDF8; font-size: 0.9rem; color: #0C4A6E;">
                <strong>Tracking Queries:</strong> A user simply enters the 11-digit Container Number (e.g., HLXU1234567) or the Master Bill of Lading number into the carrier's portal to pull the latest EDI milestone scan.
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "glossary",
      title: "12. Glossary and Quick Reference",
      description: "Best for search and indexing.",
      icon: "📖",
      subtopics: [
        {
          id: "shipping-glossary-a-z",
          title: "Shipping Glossary A-Z",
          summary: "Comprehensive index of common shipping terms.",
          content: `
            <p>A comprehensive, quick-reference dictionary for the most critical supply chain terminology used by global forwarders. Understanding this vocabulary is the first step to mastering international trade.</p>
            
            <div style="margin:30px 0; background:#F8FAFC; border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0F172A; text-align: center; font-size: 1.3rem;">📌 GENERAL SHIPPING GLOSSARY</h4>
              
              <div style="display:flex; flex-direction:column; gap:15px;">
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #3B82F6; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#1D4ED8; font-size:1.05rem; display:block; margin-bottom:5px;">BAF (Bunker Adjustment Factor)</strong>
                  <span style="font-size:0.9rem; color:#334155;">A floating surcharge applied by carriers to offset fluctuating fuel costs. It changes monthly based on global oil prices.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #3B82F6; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#1D4ED8; font-size:1.05rem; display:block; margin-bottom:5px;">CAF (Currency Adjustment Factor)</strong>
                  <span style="font-size:0.9rem; color:#334155;">A surcharge designed to cover currency exchange rate fluctuations between the carrier's base currency (usually USD) and the local payment currency.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #3B82F6; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#1D4ED8; font-size:1.05rem; display:block; margin-bottom:5px;">CFS (Container Freight Station)</strong>
                  <span style="font-size:0.9rem; color:#334155;">A specialized warehouse where LCL (Less than Container Load) cargo is received and consolidated into a single container before export, or de-consolidated and sorted for delivery after import.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #3B82F6; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#1D4ED8; font-size:1.05rem; display:block; margin-bottom:5px;">CY (Container Yard)</strong>
                  <span style="font-size:0.9rem; color:#334155;">The highly secured, physical paved area inside the port terminal where loaded full containers are stacked before vessel loading or immediately after discharge.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #3B82F6; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#1D4ED8; font-size:1.05rem; display:block; margin-bottom:5px;">ETA / ETD</strong>
                  <span style="font-size:0.9rem; color:#334155;"><strong>Estimated Time of Arrival</strong> (when the ship hits the destination port) / <strong>Estimated Time of Departure</strong> (when the ship leaves the origin port). These dates frequently change due to weather or port congestion.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #3B82F6; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#1D4ED8; font-size:1.05rem; display:block; margin-bottom:5px;">GRI (General Rate Increase)</strong>
                  <span style="font-size:0.9rem; color:#334155;">An across-the-board tariff increase applied by ocean carriers on specific trade lanes, usually implemented at the beginning of the month when demand outstrips vessel supply.</span>
                </div>
                
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "air-freight-glossary",
          title: "Air Freight Glossary",
          summary: "Aviation cargo codes, airport codes, and airline terms.",
          content: `
            <p>Air cargo has its own distinct, high-speed vocabulary driven by IATA (International Air Transport Association) regulations. Every hour counts, so the terminology is precise and standardized globally.</p>
            
            <div style="margin:30px 0; background:#F0F9FF; border:2px solid #7DD3FC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0369A1; text-align: center; font-size: 1.3rem;">📌 AVIATION CARGO GLOSSARY</h4>
              
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:15px;">
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #0284C7; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0369A1; font-size:1.05rem; display:block; margin-bottom:5px;">AWB (Air Waybill)</strong>
                  <span style="font-size:0.85rem; color:#0C4A6E;">The non-negotiable transport document issued by the airline. It serves as a receipt of goods, evidence of the contract of carriage, and a customs declaration.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #0284C7; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0369A1; font-size:1.05rem; display:block; margin-bottom:5px;">Chargeable Weight</strong>
                  <span style="font-size:0.85rem; color:#0C4A6E;">The critical metric used to calculate airfreight costs. It is always the <em>higher</em> value between the Actual Gross Weight and the Volumetric Weight (Volume in CBM × 167).</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #0284C7; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0369A1; font-size:1.05rem; display:block; margin-bottom:5px;">GHA (Ground Handling Agent)</strong>
                  <span style="font-size:0.85rem; color:#0C4A6E;">The specialized airport company (e.g., dnata, Swissport, SriLankan Cargo) responsible for physically unloading trucks, building ULDs, and loading the aircraft.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #0284C7; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0369A1; font-size:1.05rem; display:block; margin-bottom:5px;">LAT (Latest Acceptance Time)</strong>
                  <span style="font-size:0.85rem; color:#0C4A6E;">The absolute final minute cargo can be handed over to the GHA warehouse to successfully make the booked flight. Missing the LAT means a rolled shipment.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #0284C7; box-shadow:0 2px 4px rgba(0,0,0,0.05); grid-column: 1 / -1;">
                  <strong style="color:#0369A1; font-size:1.05rem; display:block; margin-bottom:5px;">ULD (Unit Load Device)</strong>
                  <span style="font-size:0.85rem; color:#0C4A6E;">The specialized aluminum pallets (secured with nets) or fully enclosed lightweight containers used to safely load luggage and freight into the curved belly of an aircraft.</span>
                </div>
                
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/uG6-R2gUe_Y"
        },
        {
          id: "ocean-freight-glossary",
          title: "Ocean Freight Glossary",
          summary: "Maritime shipping line terms, container types, and vessel size terms.",
          content: `
            <p>Maritime shipping operations deal with massive volumes, immense weight, and strict port regulations. Understanding these terms is crucial to avoiding thousands of dollars in port penalties.</p>
            
            <div style="margin:30px 0; background:#EFF6FF; border:2px solid #93C5FD; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#1E3A8A; text-align: center; font-size: 1.3rem;">🚢 MARITIME & PORT GLOSSARY</h4>
              
              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #2563EB; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:flex-start;">
                  <span style="font-size:1.5rem; margin-right:15px; line-height: 1;">⚓</span>
                  <div>
                    <strong style="color:#1E40AF; display:block; margin-bottom:4px;">Demurrage (Port Storage Penalty)</strong>
                    <span style="font-size:0.9rem; color:#1E3A8A;">Punitive daily charges levied by the shipping line or terminal when a full, loaded container sits inside the port yard beyond its allotted "Free Days" (usually 3-7 days).</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #2563EB; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:flex-start;">
                  <span style="font-size:1.5rem; margin-right:15px; line-height: 1;">⚓</span>
                  <div>
                    <strong style="color:#1E40AF; display:block; margin-bottom:4px;">Detention (Equipment Rental Penalty)</strong>
                    <span style="font-size:0.9rem; color:#1E3A8A;">Punitive daily charges levied when the consignee has taken the full container out of the port to their factory, but fails to return the <em>empty</em> container back to the carrier's depot on time.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #2563EB; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:flex-start;">
                  <span style="font-size:1.5rem; margin-right:15px; line-height: 1;">⚓</span>
                  <div>
                    <strong style="color:#1E40AF; display:block; margin-bottom:4px;">OBL (Original Bill of Lading)</strong>
                    <span style="font-size:0.9rem; color:#1E3A8A;">The physical, printed, negotiable document of title to the cargo. Whoever holds the properly endorsed OBL legally owns the goods. It must be physically surrendered to the destination agent to release the cargo.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #2563EB; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:flex-start;">
                  <span style="font-size:1.5rem; margin-right:15px; line-height: 1;">⚓</span>
                  <div>
                    <strong style="color:#1E40AF; display:block; margin-bottom:4px;">TEU (Twenty-foot Equivalent Unit)</strong>
                    <span style="font-size:0.9rem; color:#1E3A8A;">The standard unit of measurement for container ship capacity and port throughput. One 20ft container = 1 TEU. One 40ft container = 2 TEUs. A mega-vessel holds 24,000 TEUs.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #2563EB; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:flex-start;">
                  <span style="font-size:1.5rem; margin-right:15px; line-height: 1;">⚓</span>
                  <div>
                    <strong style="color:#1E40AF; display:block; margin-bottom:4px;">VGM (Verified Gross Mass)</strong>
                    <span style="font-size:0.9rem; color:#1E3A8A;">Under the SOLAS maritime treaty, this is the strictly certified total weight of the packed container (Cargo + Pallets + Tare weight of the empty box). A ship physically cannot load a box without a VGM on file.</span>
                  </div>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/5tXJp0T_zT0"
        },
        {
          id: "customs-glossary",
          title: "Customs Glossary",
          summary: "ASYCUDA, customs classifications, tariffs, and duty codes.",
          content: `
            <p>Customs authorities operate as the ultimate gatekeepers of international borders. Their terminology focuses entirely on revenue collection (taxes) and border security.</p>
            
            <div style="margin:30px 0; background:#F0FDF4; border:2px solid #86EFAC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#14532D; text-align: center; font-size: 1.3rem;">🛂 CUSTOMS & BORDER GLOSSARY</h4>
              
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #16A34A; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#15803D; font-size:1.05rem; display:block; margin-bottom:5px;">ASYCUDA</strong>
                  <span style="font-size:0.85rem; color:#14532D; display:block;"><em>Automated System for Customs Data.</em> The UN-developed software system used by Customs in many developing nations (including Sri Lanka) to electronically process declarations and assess duties.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #16A34A; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#15803D; font-size:1.05rem; display:block; margin-bottom:5px;">CUSDEC (Customs Declaration)</strong>
                  <span style="font-size:0.85rem; color:#14532D; display:block;">The official, legally binding document submitted by a licensed customs broker detailing the cargo value, origin, duty owed, and exact HS code classification.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #16A34A; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#15803D; font-size:1.05rem; display:block; margin-bottom:5px;">HS Code (Harmonized System)</strong>
                  <span style="font-size:0.85rem; color:#14532D; display:block;">A standardized 6 to 10-digit numerical system used globally to classify traded products. The exact code legally dictates the import duty percentage rate for that item.</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #16A34A; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#15803D; font-size:1.05rem; display:block; margin-bottom:5px;">Green vs. Red Channel</strong>
                  <span style="font-size:0.85rem; color:#14532D; display:block;"><strong>Green Channel:</strong> System cleared; no physical inspection required.<br><br><strong>Red Channel:</strong> Cargo flagged by risk-management algorithms for intensive physical examination by customs officers (often causing delays).</span>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/L13x2aM9WpM"
        },
        {
          id: "incoterms-quick-guide",
          title: "Incoterms Quick Guide",
          summary: "Reference definitions for the 11 standard terms.",
          content: `
            <p>Incoterms® (International Commercial Terms) are published by the ICC. They are universally recognized three-letter acronyms that legally dictate exactly who pays for what part of the freight journey, and precisely where the risk of loss transfers from the seller to the buyer.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0F172A; text-align: center; font-size: 1.3rem;">🤝 THE 4 CRITICAL INCOTERMS</h4>
              
              <div style="display:flex; flex-direction:column; gap:15px;">
                
                <div style="background:#FFF; border:1px solid #FECACA; border-left:6px solid #E11D48; padding:15px; border-radius:8px; display:flex; align-items:center;">
                  <div style="min-width: 80px; text-align:center; padding-right:15px; border-right:1px solid #E2E8F0;">
                    <strong style="color:#9F1239; font-size:1.4rem; display:block;">EXW</strong>
                    <span style="font-size:0.7rem; color:#BE123C; text-transform:uppercase;">Ex Works</span>
                  </div>
                  <div style="padding-left:15px;">
                    <p style="margin:0 0 5px 0; font-size:0.95rem; color:#7F1D1D;"><strong>Buyer handles EVERYTHING.</strong></p>
                    <span style="font-size:0.85rem; color:#9F1239; line-height:1.4; display:block;">The Seller simply packs the goods and leaves them at their factory door. The Buyer is responsible for origin trucking, origin customs, ocean freight, and all destination charges. <em>Maximum risk for the Buyer.</em></span>
                  </div>
                </div>
                
                <div style="background:#FFF; border:1px solid #BFDBFE; border-left:6px solid #2563EB; padding:15px; border-radius:8px; display:flex; align-items:center;">
                  <div style="min-width: 80px; text-align:center; padding-right:15px; border-right:1px solid #E2E8F0;">
                    <strong style="color:#1D4ED8; font-size:1.4rem; display:block;">FOB</strong>
                    <span style="font-size:0.7rem; color:#2563EB; text-transform:uppercase;">Free On Board</span>
                  </div>
                  <div style="padding-left:15px;">
                    <p style="margin:0 0 5px 0; font-size:0.95rem; color:#1E3A8A;"><strong>Split responsibility at the origin port.</strong></p>
                    <span style="font-size:0.85rem; color:#1E40AF; line-height:1.4; display:block;">The Seller pays for local trucking and origin customs, and physically loads the cargo onto the ship. Once it passes the ship's rail, risk transfers. The Buyer pays the main ocean freight and all destination charges.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; border:1px solid #FBCFE8; border-left:6px solid #DB2777; padding:15px; border-radius:8px; display:flex; align-items:center;">
                  <div style="min-width: 80px; text-align:center; padding-right:15px; border-right:1px solid #E2E8F0;">
                    <strong style="color:#BE185D; font-size:1.4rem; display:block;">CIF</strong>
                    <span style="font-size:0.7rem; color:#DB2777; text-transform:uppercase;">Cost, Ins, Frt</span>
                  </div>
                  <div style="padding-left:15px;">
                    <p style="margin:0 0 5px 0; font-size:0.95rem; color:#831843;"><strong>Seller handles freight to destination port.</strong></p>
                    <span style="font-size:0.85rem; color:#9D174D; line-height:1.4; display:block;">The Seller pays origin costs, the main ocean freight, AND marine insurance up to the destination port. The Buyer pays for destination terminal handling (THC), import customs, and delivery to their door.</span>
                  </div>
                </div>
                
                <div style="background:#FFF; border:1px solid #BBF7D0; border-left:6px solid #16A34A; padding:15px; border-radius:8px; display:flex; align-items:center;">
                  <div style="min-width: 80px; text-align:center; padding-right:15px; border-right:1px solid #E2E8F0;">
                    <strong style="color:#15803D; font-size:1.4rem; display:block;">DDP</strong>
                    <span style="font-size:0.7rem; color:#16A34A; text-transform:uppercase;">Delivered Duty Paid</span>
                  </div>
                  <div style="padding-left:15px;">
                    <p style="margin:0 0 5px 0; font-size:0.95rem; color:#14532D;"><strong>Seller handles EVERYTHING.</strong></p>
                    <span style="font-size:0.85rem; color:#166534; line-height:1.4; display:block;">The exact opposite of EXW. The Seller pays for absolutely every step of the journey, including the destination import taxes and duties, delivering it straight to the Buyer's warehouse. <em>Maximum risk for the Seller.</em></span>
                  </div>
                </div>
                
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/5F_3pP3n-9c",
          linkToWidget: "incoterms"
        },
        {
          id: "container-quick-guide",
          title: "Container Quick Guide",
          summary: "Equipment volume capacities and gross weight capacities.",
          content: `
            <p>Standard ocean freight equipment dimensions and their maximum physical payloads. <em>Note: While a container can physically hold 28 tons, local road weight limits in the destination country often restrict the legal weight to much less (e.g., US road limits are often 19.9 tons for a 20').</em></p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0F172A; text-align: center; font-size: 1.3rem;">🚢 OCEAN CONTAINER CAPACITIES</h4>
              
              <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; font-size:0.9rem; text-align:left; background:#FFF; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                  <thead>
                    <tr style="background:#1E293B; color:#FFF;">
                      <th style="padding:15px;">Equipment Type</th>
                      <th style="padding:15px;">Volume (CBM)</th>
                      <th style="padding:15px;">Max Payload (Tons)</th>
                      <th style="padding:15px;">Best Used For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom:1px solid #E2E8F0; transition: background 0.3s; hover:background:#F1F5F9;">
                      <td style="padding:15px;"><strong style="color:#0F172A;">20' Standard Dry (20GP)</strong></td>
                      <td style="padding:15px; color:#475569;">~33.2 CBM</td>
                      <td style="padding:15px; color:#475569;">28.2 Tons</td>
                      <td style="padding:15px; color:#475569;">Heavy, dense cargo (e.g., machinery, steel, tile).</td>
                    </tr>
                    <tr style="border-bottom:1px solid #E2E8F0; transition: background 0.3s;">
                      <td style="padding:15px;"><strong style="color:#0F172A;">40' Standard Dry (40GP)</strong></td>
                      <td style="padding:15px; color:#475569;">~67.7 CBM</td>
                      <td style="padding:15px; color:#475569;">28.8 Tons</td>
                      <td style="padding:15px; color:#475569;">Voluminous, lighter cargo (e.g., apparel, toys).</td>
                    </tr>
                    <tr style="border-bottom:1px solid #E2E8F0; transition: background 0.3s;">
                      <td style="padding:15px;"><strong style="color:#0F172A;">40' High Cube (40HC)</strong></td>
                      <td style="padding:15px; color:#475569;">~76.4 CBM</td>
                      <td style="padding:15px; color:#475569;">28.6 Tons</td>
                      <td style="padding:15px; color:#475569;">Standard for most consumer goods. Extra 1ft height.</td>
                    </tr>
                    <tr style="transition: background 0.3s;">
                      <td style="padding:15px;"><strong style="color:#0F172A;">40' Reefer (40RF)</strong></td>
                      <td style="padding:15px; color:#475569;">~66.2 CBM</td>
                      <td style="padding:15px; color:#475569;">29.4 Tons</td>
                      <td style="padding:15px; color:#475569;">Temperature-controlled (e.g., food, pharmaceuticals).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/z1XoD9p6WlA",
          linkToWidget: "containers"
        },
        {
          id: "documentation-checklist",
          title: "Documentation Checklist",
          summary: "Core paperwork checklist required to clear global trades.",
          content: `
            <p>A single missing document can halt a million-dollar supply chain, resulting in customs holds and massive terminal storage fees. Here is the mandatory "Clearance Pack" checklist required for almost every international shipment.</p>
            
            <div style="margin:30px 0; background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:2px solid #FDE68A; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#B45309; text-align: center; font-size: 1.3rem;">📌 THE CLEARANCE PACK</h4>
              
              <div style="display:flex; flex-wrap:wrap; gap:15px; margin-bottom:20px;">
                <div style="flex:1; min-width:250px; background:#FFF; border-left:5px solid #F59E0B; padding:20px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#B45309; display:block; margin-bottom:5px; font-size:1.1rem;">1. Transport Document</strong>
                  <span style="font-size:0.9rem; color:#92400E;">The <strong>Bill of Lading</strong> (Ocean) or <strong>Air Waybill</strong> (Air). This proves the contract of carriage and acts as title to the goods.</span>
                </div>
                
                <div style="flex:1; min-width:250px; background:#FFF; border-left:5px solid #F59E0B; padding:20px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#B45309; display:block; margin-bottom:5px; font-size:1.1rem;">2. Commercial Invoice (CI)</strong>
                  <span style="font-size:0.9rem; color:#92400E;">Issued by the seller, declaring the exact transactional value of the goods, currency, and Incoterm. Customs uses this strictly to calculate import taxes.</span>
                </div>
                
                <div style="flex:1; min-width:250px; background:#FFF; border-left:5px solid #F59E0B; padding:20px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#B45309; display:block; margin-bottom:5px; font-size:1.1rem;">3. Packing List (PL)</strong>
                  <span style="font-size:0.9rem; color:#92400E;">Breaks down the physical cargo: exact number of cartons, dimensions, Net Weight (product only), and Gross Weight (product + packaging).</span>
                </div>
                
                <div style="flex:1; min-width:250px; background:#FFF; border-left:5px solid #F59E0B; padding:20px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#B45309; display:block; margin-bottom:5px; font-size:1.1rem;">4. Certificate of Origin (COO)</strong>
                  <span style="font-size:0.9rem; color:#92400E;">Authenticated by a local Chamber of Commerce. This proves where the goods were actually manufactured, which is critical for claiming duty exemptions under Free Trade Agreements.</span>
                </div>
              </div>
              
              <div style="background: rgba(255,255,255,0.6); padding: 15px; border-radius: 8px; border: 1px dashed #D97706;">
                <strong style="color:#B45309; display:block; margin-bottom:10px;">Conditional Documents (Required based on commodity):</strong>
                <div style="display:flex; flex-wrap:wrap; gap:10px; font-size:0.85rem;">
                  <span style="background:#FEF3C7; color:#92400E; padding:5px 10px; border-radius:4px; border:1px solid #FDE68A;"><strong>ISPM-15:</strong> For raw wood packaging</span>
                  <span style="background:#FEF3C7; color:#92400E; padding:5px 10px; border-radius:4px; border:1px solid #FDE68A;"><strong>MSDS:</strong> For chemicals/batteries</span>
                  <span style="background:#FEF3C7; color:#92400E; padding:5px 10px; border-radius:4px; border:1px solid #FDE68A;"><strong>Phytosanitary:</strong> For plants/agri</span>
                  <span style="background:#FEF3C7; color:#92400E; padding:5px 10px; border-radius:4px; border:1px solid #FDE68A;"><strong>Health Cert:</strong> For food/meat</span>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        },
        {
          id: "common-abbreviations-ref",
          title: "Common Abbreviations",
          summary: "Glossary lookup for standard shipping acronyms.",
          content: `
            <p>Global logistics is communicated almost entirely in three-letter acronyms (TLAs). Here are the absolute essentials every new operator must memorize to read a carrier email.</p>
            
            <div style="margin:30px 0; background:#F8FAFC; border:2px solid #CBD5E1; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; font-size:0.95rem;">
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">POL / POD</strong>
                  <span style="color:#475569; font-size:0.85rem;">Port of Loading / Port of Discharge</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">FCL / LCL</strong>
                  <span style="color:#475569; font-size:0.85rem;">Full Container Load / Less than Container Load</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">D&D</strong>
                  <span style="color:#475569; font-size:0.85rem;">Demurrage & Detention (Port storage penalties)</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">THC</strong>
                  <span style="color:#475569; font-size:0.85rem;">Terminal Handling Charge (The port's crane fee)</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">ROB</strong>
                  <span style="color:#475569; font-size:0.85rem;">Retained On Board (Cargo was rolled to the next ship)</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">NVOCC</strong>
                  <span style="color:#475569; font-size:0.85rem;">Non-Vessel Operating Common Carrier (A freight forwarder)</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">B/L or HBL/MBL</strong>
                  <span style="color:#475569; font-size:0.85rem;">Bill of Lading (House / Master)</span>
                </div>
                
                <div style="background:#FFF; padding:15px; border-radius:8px; border-left:4px solid #64748B; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                  <strong style="color:#0F172A; font-size:1.1rem; display:block;">SOB</strong>
                  <span style="color:#475569; font-size:0.85rem;">Shipped On Board (The exact date the vessel departed)</span>
                </div>
                
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/9w_vVw7o84k"
        },
        {
          id: "freight-calculation-formulas-ref",
          title: "Freight Calculation Formulas",
          summary: "CBM volume, chargeable weights, LCL calculations.",
          content: `
            <p>Carriers do not price shipments purely on physical weight; they price them based on the space the cargo takes up inside their plane or ship. Every forwarder must memorize these exact conversion formulas to calculate the final "Chargeable Weight."</p>
            
            <div style="margin:30px 0; background:#F0F9FF; border:2px solid #7DD3FC; padding:25px; border-radius:16px; font-family:'Outfit', sans-serif;">
              <h4 style="margin:0 0 20px 0; color:#0369A1; text-align: center; font-size: 1.3rem;">⚖️ CHARGEABLE WEIGHT FORMULAS</h4>
              
              <div style="display:flex; flex-direction:column; gap:15px;">
                <div style="background:#FFF; padding:20px; border-radius:12px; border-left:5px solid #0EA5E9; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#0284C7; font-size:1.1rem; display:block; margin-bottom:10px;">1. The Base: Calculate Volume (CBM)</strong>
                  <div style="background:#F1F5F9; padding:10px; border-radius:6px; font-family:monospace; color:#0F172A; font-size:1.1rem; margin-bottom:10px;">
                    Length (m) × Width (m) × Height (m) = CBM
                  </div>
                  <span style="font-size:0.85rem; color:#475569;">Always convert dimensions from cm to meters first. e.g., 120cm = 1.2m.</span>
                </div>
                
                <div style="background:#FFF; padding:20px; border-radius:12px; border-left:5px solid #0EA5E9; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#0284C7; font-size:1.1rem; display:block; margin-bottom:10px;">2. Air Freight (The 167 Rule)</strong>
                  <div style="background:#F1F5F9; padding:10px; border-radius:6px; font-family:monospace; color:#0F172A; font-size:1.1rem; margin-bottom:10px;">
                    Volume (CBM) × 167 = Volumetric Weight (kg)
                  </div>
                  <span style="font-size:0.85rem; color:#475569;">Compare the Actual Gross Weight to the Volumetric Weight. The airline will <strong>always</strong> bill you for whichever number is higher. (Based on IATA ratio: 1 CBM = 166.67 kg).</span>
                </div>
                
                <div style="background:#FFF; padding:20px; border-radius:12px; border-left:5px solid #0EA5E9; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                  <strong style="color:#0284C7; font-size:1.1rem; display:block; margin-bottom:10px;">3. Ocean LCL (Revenue Ton - W/M)</strong>
                  <div style="background:#F1F5F9; padding:10px; border-radius:6px; font-family:monospace; color:#0F172A; font-size:1.1rem; margin-bottom:10px;">
                    1 CBM = 1000 kg (1 Ton)
                  </div>
                  <span style="font-size:0.85rem; color:#475569;">Ocean carriers charge based on Weight or Measurement (W/M), whichever is higher. If cargo is 2 CBM but weighs 3 Tons (3000 kg), it is 3 "Revenue Tons," and you will pay for 3 units of freight.</span>
                </div>
              </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/zVpQ52bJp1w",
          linkToWidget: "containers"
        },
        {
          id: "downloadable-templates",
          title: "Downloadable Templates",
          summary: "Templates for Commercial Invoice, Packing List, DGD forms.",
          content: `
            <p>Ready-to-use, blank documentation templates for standardizing export shipments. Download and integrate these into your operations.</p>
            
            <div style="margin:30px 0; display:flex; flex-direction:column; gap:15px; font-family:'Outfit', sans-serif;">
              <a href="templates/commercial_invoice_template.csv" download="Commercial_Invoice_Template.csv" style="display:flex; align-items:center; background: linear-gradient(to right, #F8FAFC, #FFFFFF); border:2px solid #E2E8F0; padding:20px; border-radius:12px; text-decoration:none; color:#0F172A; transition:all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <span style="font-size:2rem; margin-right:20px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">🧾</span>
                <div style="flex: 1;">
                  <strong style="display:block; font-size:1.1rem; color:#1E293B; margin-bottom:5px;">Commercial Invoice Template (.csv)</strong>
                  <span style="font-size:0.85rem; color:#64748B;">Standardized global format. Includes legally required fields for exact HS codes, Incoterms, and harmonized currency declarations.</span>
                </div>
                <div style="background:#F1F5F9; color:#475569; padding:8px 15px; border-radius:20px; font-size:0.8rem; font-weight:bold;">DOWNLOAD ⬇️</div>
              </a>
              
              <a href="templates/packing_list_template.csv" download="Packing_List_Template.csv" style="display:flex; align-items:center; background: linear-gradient(to right, #F8FAFC, #FFFFFF); border:2px solid #E2E8F0; padding:20px; border-radius:12px; text-decoration:none; color:#0F172A; transition:all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <span style="font-size:2rem; margin-right:20px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">📦</span>
                <div style="flex: 1;">
                  <strong style="display:block; font-size:1.1rem; color:#1E293B; margin-bottom:5px;">Packing List Template (.csv)</strong>
                  <span style="font-size:0.85rem; color:#64748B;">Operations-ready. Includes built-in Excel formulas for automatically calculating total CBM and aggregating Net/Gross Weights per carton.</span>
                </div>
                <div style="background:#F1F5F9; color:#475569; padding:8px 15px; border-radius:20px; font-size:0.8rem; font-weight:bold;">DOWNLOAD ⬇️</div>
              </a>
              
              <a href="https://www.iata.org/contentassets/1d29c36dfc24458b975e533c39832810/shippers-declaration-column-format.pdf" target="_blank" style="display:flex; align-items:center; background: linear-gradient(to right, #FFF1F2, #FFFFFF); border:2px solid #FECACA; padding:20px; border-radius:12px; text-decoration:none; color:#9F1239; transition:all 0.3s ease; box-shadow: 0 4px 6px rgba(225,29,72,0.05);">
                <span style="font-size:2rem; margin-right:20px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">⚠️</span>
                <div style="flex: 1;">
                  <strong style="display:block; font-size:1.1rem; color:#BE123C; margin-bottom:5px;">Shipper's Declaration for Dangerous Goods (DGD) (.pdf)</strong>
                  <span style="font-size:0.85rem; color:#9F1239;">Strict IATA compliant format. Mandatory for any air freight shipment containing hazardous materials, chemicals, or lithium batteries.</span>
                </div>
            </div>
          `,
          youtube: "https://www.youtube.com/embed/WJ_p-iN3pC0"
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.NEXUS_KNOWLEDGE_BASE = NEXUS_KNOWLEDGE_BASE;
}
