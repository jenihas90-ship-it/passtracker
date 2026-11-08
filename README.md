# PassTrack - Next-Generation Passport Tracking for Ethiopian ICS
**Proof of Concept (PoC) for Ethiopian Immigration and Citizenship Service (ICS)**  
*Prepared by:* **Jenihas Getachew | Jeni High Technology**  
*Target Pitch:* **Cursor Hackathon South West Ethiopia / Innobiz-K**

---

## 🇪🇹 Executive Summary
The existing Ethiopian Immigration and Citizenship Service (ICS) passport tracking workflow frequently encounters citizen data discrepancies—such as erroneous applicant names appearing for valid application reference numbers—and suffers from an opaque, text-only status interface that forces citizens to physically wait in congested branch lines.

**PassTrack** resolves these administrative and citizen-experience bottlenecks through:
1. **Multi-Factor Verification (Application # + Registered Phone #):** Eliminates false-positive applicant match exposures and stops unauthorized lookups, ensuring citizen data privacy.
2. **Visual Progression Pipeline:** Transparent 5-stage visual timeline (`Submitted` → `Biometrics Pending` → `Processing` → `Printed` → `Ready for Pickup`) with exact event audit timestamps.
3. **Instant Discrepancy Reporting:** Allows citizens to flag name spelling errors, wrong pickup offices, or data mismatches directly from the results interface, generating an official ICS administrative ticket (`ICS-TKT-XXXXXX`) rather than requiring an in-person branch visit.
4. **Trilingual Localization:** Instant real-time toggle between **English**, **Amharic (አማርኛ)**, and **Afaan Oromoo**.
5. **Low-Bandwidth Mobile Optimization:** Hyper-minimalist, fast-loading responsive architecture optimized for 2G/3G mobile networks common across Ethiopian regions.
6. **Automation & Alerts Integration:** Webhook triggers for **Make.com** and **Telegram Mini-App API** simulating instant SMS and Telegram push notifications when a passport transitions to *"Ready for Pickup"*.
7. **Dual-Mode System:** Toggle seamlessly between the **Citizen Tracker** and the **ICS Officer Administrative Desk** to update lifecycle stages in real time during hackathon pitches.

---

## 🛠️ Technology Stack
- **Frontend:** React.js 19 + Tailwind CSS + Lucide Icons (mobile-first, low-bandwidth optimized).
- **Backend API:** Node.js + Express.js RESTful routing (`/api/search`, `/api/discrepancy`, `/api/applications`, `/api/samples`).
- **Database Schema:** MongoDB Mongoose schema matching the exact architectural specification:
  ```javascript
  const passportApplicationSchema = new mongoose.Schema({
    applicationNumber: { type: String, required: true, unique: true },
    applicantName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    currentStatus: { 
      type: String, 
      enum: [
        'Submitted', 'Biometrics Pending', 'Processing', 
        'Printed', 'Ready for Pickup', 'Discrepancy Flagged'
      ], 
      default: 'Submitted' 
    },
    statusHistory: [{
      status: String,
      updatedAt: { type: Date, default: Date.now }
    }],
    officeLocation: { type: String }, // e.g., 'Addis Ababa Main', 'Jimma'
    discrepancyNotes: { type: String, default: null } 
  });
  ```
- **Zero-Friction Fallback:** Built-in hybrid Data Access Layer (DAL) that connects to MongoDB (`MONGODB_URI`) when available, while providing zero-setup in-memory fallback pre-seeded with realistic Ethiopian ICS records so the application runs immediately anywhere without dependencies.
- **Alerts & Automation:** Make.com webhook dispatcher + Telegram notification simulation modal.

---

## 🚀 Unified Full-Stack Architecture (Frontend + Backend on One)

PassTrack is packaged as a **single unified service** where the Express backend serves both the RESTful API / webhooks AND the production React client from a single port (`5000` or `process.env.PORT`).

### 1. Requirements
- Node.js (v18+)
- npm

### 2. Run Full Application on One Single Port (Zero Setup)
From the root directory:
```bash
npm start
```
Open your browser to:
👉 **[http://localhost:5000](http://localhost:5000)**

Both the frontend React client and the backend APIs run simultaneously on port 5000 with pre-seeded ICS data!

### 3. Development Mode (Unified Concurrent Runner)
Run frontend with Vite HMR and backend with Node watcher concurrently in a single terminal:
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Webhook Receiver: `http://localhost:5000/api/webhook/ics-status-update`

---

## 🎯 Hackathon Showcase Demo Cases

PassTrack includes pre-configured sample cases accessible via 1-click test chips directly under the search form:

| Case | Application # | Phone # | Branch | Status / Focus |
|---|---|---|---|---|
| **Case 1** | `EP-2024-89211` | `0911223344` | Addis Ababa Main (Kirkos) | **Ready for Pickup** (triggers celebratory banner & Telegram notification preview) |
| **Case 2** | `EP-2024-45192` | `0922334455` | Jimma Branch | **Processing** (demonstrates mid-pipeline progression) |
| **Case 3** | `EP-2024-73819` | `0933445566` | Hawassa Branch | **Biometrics Pending** (waiting for fingerprint appointment) |
| **Case 4** | `EP-2024-19283` | `0944556677` | Dire Dawa Branch | **Printed** (awaiting regional pouch transit) |
| **Case 5** | `EP-2024-38102` | `0966778899` | Jimma Branch | **Discrepancy Flagged** (illustrates administrative error flag & notes) |
| **Security Test** | `EP-2024-89211` | `0911000000` | Any | **MFA Security Mismatch** (demonstrates privacy protection stopping unauthorized access) |

---

## 📱 Features Walkthrough

### 1. Multi-Factor Search & Privacy Guard
Entering an application number alone is insufficient; applicant phone numbers (formatted as `09...`, `07...`, or `+251...`) must correlate with records. This stops the widespread privacy leaks where citizens inadvertently view others' passport files.

### 2. Instant Discrepancy Reporting
Clicking **"Report Discrepancy or Name Error"** prompts a modal to specify the issue (spelling error, wrong branch, phone change). Submitting generates an official ticket (e.g., `ICS-TKT-327940`) and updates the record status to `Discrepancy Flagged` for officer remediation.

### 3. ICS Officer Portal
Switching to the **"ICS Officer Portal"** from the top header allows administrative staff or judges to:
- Review all applications across regional offices (Jimma, Addis Ababa, Hawassa, Bahir Dar, Dire Dawa).
- Advance lifecycle stages.
- Changing a status to `Ready for Pickup` automatically fires the Make.com / Telegram alert mechanism.
- One-click reset to restore default test datasets.

---

## 📄 License
MIT License. Created by **Jenihas Getachew | Jeni High Technology** for the Cursor Hackathon South West Ethiopia / Innobiz-K.
