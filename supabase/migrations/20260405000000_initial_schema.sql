-- Initial Schema for Karvansara.org
-- Parsi-First Silk Road Cultural Library

-- 1. Poets (Mashahir)
CREATE TABLE IF NOT EXISTS poets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_fa TEXT NOT NULL,
    bio_en TEXT,
    bio_fa TEXT,
    era TEXT, -- e.g., "Samanid", "Timurid"
    region TEXT, -- e.g., "Balkh", "Shiraz", "Khujand"
    slug TEXT UNIQUE NOT NULL,
    ganjoor_id INTEGER UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Works (Asar)
CREATE TABLE IF NOT EXISTS works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poet_id UUID REFERENCES poets(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_fa TEXT NOT NULL,
    description_en TEXT,
    description_fa TEXT,
    slug TEXT UNIQUE NOT NULL,
    ganjoor_id INTEGER UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Verses (Abyat)
CREATE TABLE IF NOT EXISTS verses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_id UUID REFERENCES works(id) ON DELETE CASCADE,
    mesra1 TEXT NOT NULL,
    mesra2 TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    section_title TEXT, -- e.g., "Bab 1"
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Cultural Events (Ruyidadha)
CREATE TABLE IF NOT EXISTS cultural_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_fa TEXT NOT NULL,
    description_en TEXT,
    description_fa TEXT,
    solar_date_month INTEGER, -- 1-12
    solar_date_day INTEGER, -- 1-31
    tags TEXT[], -- e.g., ['Zoroastrian', 'Nowruz', 'Spring']
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE poets ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_events ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Public Read Access" ON poets FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON works FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON verses FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON cultural_events FOR SELECT USING (true);
