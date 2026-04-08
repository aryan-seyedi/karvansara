# Karvansara.org (کاروانسرا) - MVP Requirements & Tracking

This document serves as the official source of truth for the Phase 1 Minimum Viable Product (MVP). Progress is tracked by ASHA (@asha_da_bot).

## 1. Infrastructure & Core Setup
- [x] **Project Repository**: Initialized at `aryan-seyedi/karvansara`.
- [x] **Identity & Branding**: Define "Karvansara" (Parsi/Turkic focus) and Anar (Pomegranate) motif.
- [x] **Next.js Frontend**: Initialize a clean Next.js 14+ app (App Router) with Tailwind CSS.
- [x] **Vercel Deployment**: Link the GitHub repo to Vercel for automated CI/CD. (Framework set to Next.js)
- [x] **Supabase Integration**: Connected via `supabase-js` and tables seeded with 21 poets.
- [x] **Branding Update**: Set to "Journey On" (Tab title) and moto "Where the Path Rests and Ideas Journey On".
- [x] **Logo & Favicon**: Implemented using the provided Anar (Pomegranate) design.

## 2. Data Engine (The Library)
- [x] **Poet Manifest**: Curate list of 21 initial poets (Hafez, Ferdowsi, etc.).
- [x] **Database Schema**: Tables for `poets`, `works`, and `verses` applied.
- [x] **DB Mapping**: Fixed column mismatch (`name_fa`/`name_en`).
- [x] **Discovery Section**: Added to landing page with random verse fetch.
- [ ] **Ganjoor Ingestion**: Finalize script to fetch and push 1,000 top poems.
- [ ] **Contextual Meaning**: Add toggle next to each poem/phrase.

## 3. Architecture & Content
- [ ] **Dynamic Routing**: Implement `/poet/[slug]` pages.
- [ ] **Heritage Pages**: Norooz, Yalda, and Silk Road history sections.
- [ ] **Parsi-Turkic Geometric Synthesis**: Refine UI with geometric grid patterns.

## 4. Governance & Safety
- [ ] **RLS Policies**: Verify Row Level Security for public read-only access.
- [x] **Credential Management**: `credentials.md` configured in host environment.
