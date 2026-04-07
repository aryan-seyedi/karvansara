# Karvansara.org (کاروانسرا) - MVP Requirements & Tracking

This document serves as the official source of truth for the Phase 1 Minimum Viable Product (MVP). Progress is tracked by ASHA (@asha_da_bot).

## 1. Infrastructure & Core Setup
- [x] **Project Repository**: Initialized at `aryan-seyedi/karvansara`.
- [x] **Identity & Branding**: Define "Karvansara" (Parsi/Turkic focus) and Anar (Pomegranate) motif.
- [x] **Next.js Frontend**: Initialize a clean Next.js 14+ app (App Router) with Tailwind CSS.
- [x] **Vercel Deployment**: Link the GitHub repo to Vercel for automated CI/CD. (Framework set to Next.js)
- [x] **Supabase Integration**: Connected via `supabase-js` and tables seeded with 21 poets.

## 2. Data Engine (The Library)
- [x] **Poet Manifest**: Curate list of 21 initial poets (Hafez, Ferdowsi, etc.).
- [x] **Database Schema**: Tables for `poets`, `works`, and `verses` applied.
- [ ] **Ganjoor Ingestion**: Finalize script to fetch and push 1,000 top poems.
- [ ] **Search Engine**: Basic list implemented; needs full-text search.

## 3. Cultural Content
- [ ] **Heritage Pages**: Norooz, Yalda, and Silk Road history sections.
- [ ] **Branding Assets**: Integrate Anar (Pomegranate) icons and Parsi typography.

## 4. Governance & Safety
- [ ] **RLS Policies**: Verify Row Level Security for public read-only access.
- [x] **Credential Management**: `credentials.md` configured in host environment.
