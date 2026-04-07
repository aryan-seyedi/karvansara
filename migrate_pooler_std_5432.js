const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Direct database connection via pooler port 5432 (ndgxwfaxdszkuhkuodez)
// Connection string verified and URI encoded.
const connectionString = "postgresql://postgres:tT%2Bw8rknp%235cN3N@aws-0-us-east-1.pooler.supabase.com:5432/postgres";

async function run() {
    console.log("Connecting via Pooler (IPv4) on port 5432 with standard user...");
    const client = new Client({ connectionString });
    try {
        await client.connect();
        console.log("Connected to Supabase.");
        
        const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20260405000000_initial_schema.sql');
        const sql = fs.readFileSync(migrationPath, 'utf8');
        
        console.log("Applying schema...");
        await client.query(sql);
        console.log("Schema applied.");

        const manifestPath = path.join(__dirname, 'data', 'poets_manifest.json');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        console.log(`Seeding ${manifest.length} poets...`);
        
        for (const poet of manifest) {
            await client.query(
                `INSERT INTO poets (name, ganjoor_id, description, birthplace, era) 
                 VALUES ($1, $2, $3, $4, $5) 
                 ON CONFLICT (ganjoor_id) DO UPDATE SET name = EXCLUDED.name`,
                [poet.name, poet.ganjoor_id, poet.description, poet.birthplace, poet.era]
            );
        }
        console.log("Database seeded successfully.");
        
    } catch (err) {
        console.error("Migration Failed:", err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

run();
