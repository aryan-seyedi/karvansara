const fs = require('fs');
const https = require('https');

const GANJOOR_API = "https://api.ganjoor.net/api/ganjoor";

// MAPPING VERIFIED AGAINST API RESPONSES
// Note: Rudaki (1) often returns 404/Incomplete on the API but 
// we will keep trying or handle it gracefully.
const POET_IDS = {
    "Rudaki": 1,
    "Hafiz": 2,
    "Khayyam": 3,
    "Ferdowsi": 4,
    "Rumi": 5,
    "Nizami": 6,
    "Saadi": 7,
    "Parvin": 8,
    "Attar": 9,
    "Sanai": 10,
    "NasirKhusraw": 11,
    "Iraqi": 12,
    "Anvari": 13,
    "Ouhadi": 14,
    "Vahshi": 15,
    "Khajoo": 20,
    "Saeb": 22,
    "Hatef": 25,
    "Farghani": 31,
    "Zakani": 33,
    "Khalili": 48,
    "Shahriar": 35
};

function fetchPoetMetadata(poetId) {
    return new Promise((resolve, reject) => {
        https.get(`${GANJOOR_API}/poet/${poetId}`, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (e) {
                    reject(new Error(`Failed to parse ID ${poetId}: ${e.message}`));
                }
            });
        }).on('error', (e) => reject(e));
    });
}

async function main() {
    const metadata = {};
    const idsToFetch = Object.values(POET_IDS);
    
    for (const pid of idsToFetch) {
        console.log(`Fetching ID: ${pid}...`);
        try {
            const data = await fetchPoetMetadata(pid);
            if (data && data.poet) {
                const poet = data.poet;
                const key = poet.nickname || poet.name;
                metadata[key] = {
                    "ganjoor_id": poet.id,
                    "name": poet.name,
                    "nickname": poet.nickname,
                    "root_cat_id": poet.rootCatId,
                    "birth_place": poet.birthPlace || "Unknown",
                    "death_place": poet.deathPlace || "Unknown",
                    "description": poet.description ? poet.description.substring(0, 300) + "..." : ""
                };
            }
        } catch (e) {
            console.warn(`Skipping ID ${pid}: ${e.message}`);
        }
    }
    
    if (!fs.existsSync('data')) fs.mkdirSync('data');
    fs.writeFileSync('data/poets_manifest.json', JSON.stringify(metadata, null, 2), 'utf8');
    console.log("Manifest created in data/poets_manifest.json");
}

main();
