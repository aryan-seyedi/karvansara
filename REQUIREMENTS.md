# Karvansara Development Roadmap

## Phase 1: Infrastructure & Data Foundation
1. **[X] Branding Update**: Update logo, favicon, and site metadata. (Completed)
2. **[X] SQL Schema Refinement**: Finalize tables for `poets`, `works`, `verses`, and `cultural_events`. (Completed)
3. **[X] GitHub Actions Sync**: Setup workflow to sync local `schema.sql` to Supabase. (Completed)
4. **Poet Priority List**: Manually curate metadata for Saadi, Hafiz, Rumi, Nizami, and Rudaki.
5. **Data Ingestion Script**: Implement a formatter/scraper to populate the database with works from the priority list (ensuring no source mentions in commits).

## Phase 2: Feature Implementation
6. **Hafiz Picker Logic**: Build the randomization engine and SEO-friendly verse display pages.
7. **Bilingual Toggle Logic**: Connect the existing UI toggle to the data layer to switch between English and Farsi content globally.
8. **Dynamic Poet Pages**: Build the `/poet/[id]` template to display lists of works and individual verses.

## Phase 3: Content & Aesthetics
9. **Foundational Articles**: Draft and implement pages for "Norooz" and "Yalda" exploring Parsi/Avestan roots.
10. **UI/UX Polish**: Deepen the CSS system using Anar (Pomegranate) motifs and Parsi-Turkic geometric synthesis (borders, patterns, and icons).

## Phase 4: Verification & SEO
11. **Final Stack Audit**: Comprehensive check of security, performance, and SEO tags across all pages.
