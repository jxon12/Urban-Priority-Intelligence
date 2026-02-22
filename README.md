# 🌟 Fix what matters first. Urban safety should not depend on who complains the loudest.
> Web: Visit https://upi-spatial-clarity.vercel.app/. Install as a PWA for native-like functionality!
> 
> **"Our mission is to ensure that urban safety isn't a privilege, but a right."** 
>  
> Most city-fix apps ignore the 15% of the population who struggle the most: the visually impaired and elderly. We leverage **Gemini AI** to transform these citizens from "passive victims" into "active city sentinels," bridging the gap between urban maintenance and social justice.

**[Explore Documentation](#) | [Watch Demo Video](#)**

## 🏗 Technical Architecture

UPI follows a modular web architecture:

Frontend:
- React + Vite (SPA)
- PWA-enabled deployment via Vercel
- Google Maps API for geospatial context

Backend:
- Serverless API layer
- Google Gemini API for AI-driven prioritization
- Secure API key management via environment variables

AI Layer:
- Context-aware prioritization engine
- Risk severity analysis
- Accessibility impact weighting

## ⚙️ Implementation Details

1. Citizen submits issue with location and description.
2. Google Maps API validates and enriches geospatial data.
3. Backend sends structured prompt to Gemini API.
4. Gemini evaluates:
   - Severity
   - Risk exposure
   - Accessibility impact
   - Long-term consequence potential
5. System generates a priority score and classification.

