# 🌾 CropSafe
> **Smarter Farms. Stronger Futures.**  
> *NASA International Space Apps Challenge 2026*  
> 🔗 **Live Platform:** [https://cropsafe.neonweb.xyz/](https://cropsafe.neonweb.xyz/)

**CropSafe** is an orbital-intelligence agricultural decision platform that bridges NASA Earth observation telemetry with local agronomy to protect farmers from climate drift, dry-season water exhaustion, and catastrophic heatwaves.

---

## 👨‍🌾 How a Farmer Uses CropSafe (Step-by-Step Workflow)

CropSafe is engineered so any farmer or extension officer can make data-backed, profitable crop decisions in under 2 minutes:

### 1. Step 1: Select Field on the Interactive Map
* Upon opening the app, the farmer selects their land on the **Interactive Global 3D/2D Satellite Map** by searching their village/upazila or simply zooming in and dropping a pin on their exact plot.
* The system instantly pulls live **NASA POWER & SMAP satellite telemetry** (temperature, root moisture, drought index) to show what crops thrive naturally in that region during the current season.

### 2. Step 2: Smart Farming Evaluation (Profit vs. Loss Check)
* What if the farmer already has a specific crop in mind that they plan to cultivate? They can test whether their choice will yield a profit or lead to a financial loss.
* The farmer inputs three simple parameters:
  1. **Field Location** *(Auto-filled if already pinned on the map)*
  2. **Intended Crop** *(e.g., Wheat - BARI Gom-33)*
  3. **Water Source** *(Deep Tubewell, Shallow Tubewell, or Canal)*
* Clicking **"Get Recommendations"** opens the dedicated **Crop Shift Assessment Page**.

### 3. Step 3: Realistic Risk Breakdown & High-Profit Alternatives
* **The Problem Identified:** The app shows why their planned crop is at risk. For example, cultivating *Wheat (BARI Gom-33)* during a severe dry season requires excessive pump waterings; astronomical diesel and electricity bills eat away all farmer profits, and late heatwaves risk floret sterility.
* **The Solution (Better Alternative):** CropSafe automatically compares their planned crop against climate-smart alternatives like **BARI Mustard-14**:
  - 💧 **77% Less Water Needed** *(cuts deep tubewell pumping rounds from 25–30 down to just 2–3)*.
  - 💰 **৳35,000 to ৳63,000+ Saved** in irrigation diesel and power expenses per farm parcel.
  - 📈 **+22% Higher Profit Stability** *(short 78-day harvest beats summer heat before March)*.
* Multiple ranked alternatives (such as Hybrid Maize and Lentils) are also presented with quantified ratings.

### 4. Step 4: Actionable Sowing Calendar ("See Planting Dates")
* When the farmer clicks **"See Planting Dates"**, CropSafe navigates to the **Dynamic Planting Calendar**:
  - **Optimal Planting Window:** NASA-adjusted safe sowing dates shifted to prevent pollination from colliding with lethal March 35°C heat spikes.
  - **Harvesting Window:** Clear timeline of when the crop will mature.
  - **Step-by-Step Field Instructions:** Clear, plain-language agronomic steps covering land preparation, seedbed treatment, and water management.

---

## 🛰️ NASA Earth Data Utilized

| NASA Dataset | Telemetry Parameters | Practical Application in CropSafe |
| :--- | :--- | :--- |
| **NASA POWER (Agroclimatology)** | T2M_MAX, T2M, PRECTOTCORR, RH2M, ALLSKY_SFC_SW_DWN, WS2M | Detects March pollination heatwaves (>34.5°C), rainfall anomalies, and evaporation rates. |
| **NASA SMAP** | Root-Zone Soil Moisture (0–100 cm), Surface Soil Moisture (0–5 cm) | Measures root-level water deficit to schedule AWD irrigation cycles and avoid dry pump runs. |
| **NASA GRACE** | Terrestrial Water Storage Anomaly | Tracks dry-season aquifer depletion (-0.8m to -1.1m/yr) to protect tubewell pump motors. |
| **15-Year Historical Baseline** | 2010–2025 Climatology Reference | Quantifies Climate Drift ($\Delta \text{Temp}$, delayed monsoons) for localized adaptation. |

---

## 🌟 Key Platform Features

- 🌍 **Global 3D & 2D Satellite Field Picker:** Fast MapLibre GL map with free satellite imagery and worldwide village geocoding.
- ⚡ **Dynamic Telemetry & EcoCrop Engine:** Real-time FAO EcoCrop multi-factor suitability scoring (thermal, moisture, salinity).
- 💧 **In-Season AWD Guidance:** For standing crops, delivers 3–4 day intermittent irrigation protocols to save 28% pumping fuel without yield loss.
- 🌐 **100% Bilingual Interface:** Full Bengali (বাংলা) and English localization tailored for everyday farmers.
- 📱 **Mobile & Tablet Optimized:** Fluid, responsive layout across phones, tablets, and desktop displays.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16.4 (App Router & Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Mapping:** MapLibre GL + CartoDB & ESRI World Imagery Satellite Tiles
- **Data APIs:** NASA POWER API, OpenStreetMap Nominatim
- **Live Deployment:** [https://cropsafe.neonweb.xyz/](https://cropsafe.neonweb.xyz/)

---

## 🏃 Local Setup & Development

`ash
# 1. Clone the repository
git clone https://github.com/FahadIslam09/fieldshift.git

# 2. Install dependencies
cd fieldshift
npm install

# 3. Start local development server
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) in your browser.