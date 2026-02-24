# 🌆 Urban Priority Intelligence (UPI)
### *Advancing Data-Driven Urban Prioritization*

---

> **Urban Priority Intelligence (UPI)** is an AI-powered civic prioritization platform designed to transform how cities identify, evaluate, and resolve infrastructure issues — with equity and accessibility at its core.
>
> By integrating **Google Gemini** and **Google Maps**, UPI converts citizen-submitted reports into structured, impact-aware prioritization insights that support more transparent and equitable urban decision-making.

---

## 🎯 Problem Statement

Most urban maintenance systems rely on mechanisms that are inherently reactive and biased:

| Mechanism | Limitation |
|---|---|
| Manual inspections | Low coverage, high resource cost |
| Complaint-driven escalation | Favours vocal, digitally-literate citizens |
| Main-road visibility bias | Peripheral and low-traffic areas are neglected |
| Recency bias | Older but critical issues are deprioritized |

These systems **unintentionally deprioritize issues affecting vulnerable communities** — particularly persons with disabilities — whose reports are less frequent, less visible, and less likely to be escalated.

> Funding allocation alone does not guarantee equitable resolution.
> What is needed is **structured, system-level prioritization**.

---

## 💡 Proposed Solution

UPI introduces an **AI-assisted prioritization framework** that evaluates reported issues across multiple impact dimensions:

- 🔴 **Severity & Public Safety Risk** — How immediately dangerous is the issue?
- ♿ **Accessibility Impact** — Does it disproportionately affect persons with disabilities?
- 👥 **Population Exposure** — How many people are affected daily?
- 🏗️ **Long-Term Infrastructure Consequences** — Will it worsen if left unresolved?

Rather than responding to volume or visibility, UPI supports decisions informed by **contextual intelligence** — ensuring the most impactful issues receive the attention they deserve.

---

## ♿ Accessibility by Design

Urban reporting systems frequently overlook the lived experiences of persons with disabilities.

Individuals who rely on **tactile paving, accessible crossings, and unobstructed pathways** are often the *first* to encounter infrastructure failures — yet these issues remain chronically underreported and deprioritized.

UPI embeds **accessibility weighting directly into its prioritization logic**, ensuring such concerns are systematically surfaced and acted upon.

> Accessibility is not an optional feature.
> It is a **foundational parameter** in the decision model.

---

## 🏗️ Technical Architecture

### Frontend
- ⚛️ **React + Vite** — Single Page Application (SPA)
- 📱 **Progressive Web App (PWA)** support for mobile accessibility
- 🗺️ **Google Maps API** for geospatial context and location enrichment

### Backend
- ☁️ **Serverless API Layer** — Scalable, low-maintenance architecture
- 🔐 **Secure environment-based API key management**

### AI Layer
- 🤖 **Google Gemini API** powering:
  - Context-aware issue prioritization
  - Risk severity classification
  - Accessibility impact analysis

---

## ⚙️ Implementation Flow

```
1. Citizen submits an issue with location and description
        ↓
2. Google Maps API enriches geospatial context
        ↓
3. Backend structures the report into a prompt for Gemini
        ↓
4. Gemini evaluates multiple impact dimensions
        ↓
5. A structured priority score is generated and surfaced
```

---

## 🚧 Challenges Faced

- **Prompt Consistency** — Designing stable AI prompts to minimize variability in prioritization outcomes across different report types and contexts.
- **Cognitive Load Balance** — Building an accessibility-first interaction model without overwhelming users with complex UI or lengthy flows.
- **Secure API Integration** — Ensuring safe and reliable API key management within a prototype deployment environment.
- **Bias Mitigation** — Countering short-term and recency bias within AI-assisted decision logic to favour long-term impact over immediate visibility.

---

## 🔮 Future Roadmap

If deployed at scale, UPI is designed to evolve into a comprehensive urban intelligence platform:

| Phase | Feature |
|---|---|
| v2.0 | Elderly-friendly interaction layers |
| v2.5 | Predictive infrastructure degradation modelling |
| v3.0 | Municipal dashboard integration |
| v3.5 | Longitudinal urban safety analytics |

---

## 🎬 Demonstration

| Resource | Link |
|---|---|
| 🔗 Live Demo | [upi-spatial-clarity.vercel.app](https://upi-spatial-clarity.vercel.app) |
| 🎥 Demo Video | [UPI demo video](https://youtu.be/Hvi58_Lrong?si=Y3KfJKyXyPRRVe6Y) |

---

## 🛠️ Technology Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-34A853?style=for-the-badge&logo=googlemaps&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![Serverless](https://img.shields.io/badge/Serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white)

---

## 📌 Vision

UPI aims to support a fundamental shift in how cities operate:

**From** reactive maintenance driven by noise and visibility
**Toward** structured, equitable prioritization driven by impact.

> Urban safety should not depend on who complains the loudest.
> It should depend on **who needs it the most**.

---

*Developed for the 2026 KITAHACK Competition. For educational and non-commercial use only.*
