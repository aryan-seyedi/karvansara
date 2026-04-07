const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Exact connection string from credentials.md (verified in the other session)
const connectionString = "postgresql://postgres:tT%2Bw8rknp%235cN3N@db.ndgxwfaxdszkuhkuodez.supabase.co:5432/postgres";

async function run() {
    console.log("Applying Schema & Seeding Poets via direct connection (5432)...");
    const client = new Client({ connectionString });
    try {
        await client.connect();
        console.log("Connected to Supabase.");

        // 1. Initial Schema
        const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20260405000000_initial_schema.sql');
        const sql = fs.readFileSync(migrationPath, 'utf8');
        console.log("Applying schema...");
        await client.query(sql);
        console.log("Schema applied.");

        // 2. Initial Poets from manifest
        const manifestPath = path.join(__dirname, 'data', 'poets_manifest.json');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        console.log(`Seeding ${manifest.length} poets...`);
        for (const poet of manifest) {
            await client.query(
                `INSERT INTO poets (name, ganjoor_id, description, birthplace, era) 
                 VALUES ($1, $2, $3, $4, $5) 
                 ON CONFLICT (ganjoor_id) DO UPDATE SET 
                 name = EXCLUDED.name, 
                 description = EXCLUDED.description,
                 birthplace = EXCLUDED.birthplace,
                 era = EXCLUDED.era`,
                [poet.name, poet.ganjoor_id, poet.description, poet.birthplace, poet.era]
            );
        }
        console.log("Database fully initialized and seeded.");

    } catch (err) {
        console.error("Migration/Seed Failed:", err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

run();
