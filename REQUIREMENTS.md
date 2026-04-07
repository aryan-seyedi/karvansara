# Karvansara.org (کاروانسرا) - MVP Requirements & Tracking

This document serves as the official source of truth for the Phase 1 Minimum Viable Product (MVP). Progress is tracked by ASHA (@asha_da_bot).

## 1. Infrastructure & Core Setup
- [x] **Project Repository**: Initialized at `aryan-seyedi/karvansara`.
- [x] **Identity & Branding**: Define "Karvansara" (Parsi/Turkic focus) and Anar (Pomegranate) motif.
- [x] **Next.js Frontend**: Initialize a clean Next.js 14+ app (App Router) with Tailwind CSS.
- [ ] **Supabase Integration**: Connect the remote database and push the initial schema.
- [ ] **Vercel Deployment**: Link the GitHub repo to Vercel for automated CI/CD.

## 2. Data Engine (The Library)
- [x] **Poet Manifest**: Identify and map 20+ Silk Road poets with Ganjoor IDs.
- [ ] **Ingestion Pipeline**: Finalize a script that scrapes 1,000 top poems and pushes them to Supabase.
- [ ] **Search Engine**: Implement a basic search in the UI that queries Supabase for poets/poems.

## 3. Linguistic & Cultural Alignment
- [ ] **Parsi-First UI**: Ensure the interface uses Parsi/Turkic-friendly fonts (e.g., Vazirmatn or IranSans).
- [ ] **Terminology Audit**: Review UI text to minimize Arabic-derived terms in navigation/labels.
- [ ] **Cultural Tidbits**: Create 3 high-SEO pages for Norooz, Yalda, and the Silk Road history.

## 4. Verification & Health
- [ ] **Connection Dashboard**: A hidden `/api/health` or `/debug` page to verify Supabase/Vercel status.
- [ ] **RLS Security**: Verify that Row Level Security (RLS) is active so users can only *read* the library.

## 5. Success Metrics for MVP
1.  User can visit `karvansara.org` (or `.vercel.app`).
2.  User can see a list of 20+ poets.
3.  User can read at least one full work (e.g., *The Shahnameh* or *Divan-e-Hafiz*) retrieved from Supabase.
4.  The page loads in < 2 seconds.

---
*Signed: ASHA (Autonomous System Helping Aryan)*
