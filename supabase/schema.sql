-- Karvansara SQL Schema Refinement
-- Supports bilingual content and relational mapping for Silk Road poets and works.

-- 1. Poets Table
CREATE TABLE IF NOT EXISTS poets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_fa TEXT NOT NULL,
    name_en TEXT NOT NULL,
    bio_fa TEXT,
    bio_en TEXT,
    era TEXT, -- e.g., "13th Century"
    region TEXT, -- e.g., "Shiraz", "Khorasan"
    slug TEXT UNIQUE, -- for SEO-friendly URLs
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Works Table (Collections/Books)
CREATE TABLE IF NOT EXISTS works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poet_id UUID REFERENCES poets(id) ON DELETE CASCADE,
    title_fa TEXT NOT NULL,
    title_en TEXT NOT NULL,
    slug TEXT UNIQUE,
    description_fa TEXT,
    description_en TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Verses Table
CREATE TABLE IF NOT EXISTS verses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_id UUID REFERENCES works(id) ON DELETE CASCADE,
    text_fa TEXT NOT NULL, -- Full Persian verse (usually two hemistichs)
    text_en TEXT, -- Full English translation
    meaning_fa TEXT,
    meaning_en TEXT,
    order_index INTEGER, -- To maintain sequence in a poem
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Cultural Events Table
CREATE TABLE IF NOT EXISTS cultural_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_fa TEXT NOT NULL,
    title_en TEXT NOT NULL,
    slug TEXT UNIQUE,
    content_fa TEXT,
    content_en TEXT,
    event_date TEXT, -- Descriptive date (e.g., "Winter Solstice")
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) - Basic Public Read Access
ALTER TABLE poets ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON poets FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON works FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON verses FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON cultural_events FOR SELECT USING (true);
