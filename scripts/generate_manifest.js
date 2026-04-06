const fs = require('fs');
const https = require('https');

const GANJOOR_API = "https://api.ganjoor.net/api/ganjoor";

// MAPPING VERIFIED AGAINST API RESPONSES
const POET_IDS = {
    "Rudaki": 1,
    "Hafiz": 2,
    "Ferdowsi": 3,
    "Khayyam": 4,
    "Rumi": 5,
    "Attar": 6,
    "Saadi": 7,
    "Sanai": 8,
    "NasirKhusraw": 9,
    "Nizami": 10,
    "KhajooKermani": 20,
    "Saeb": 22,
    "HatefIsfahani": 25,
    "SeyfFarghani": 31,
    "ObeydZakani": 33,
    "Khalili": 48
};

function fetchPoetMetadata(poetId) {
    return new Promise((resolve, reject) => {
        https.get(`${GANJOOR_API}/poet/${poetId}`, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    // Double check the ID in the response matches the one we requested
                    if (parsed && parsed.poet && parsed.poet.id !== poetId) {
                        console.warn(`Warning: Requested ID ${poetId} but got poet ${parsed.poet.name} with ID ${parsed.poet.id}`);
                    }
                    resolve(parsed);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => reject(e));
    });
}

async function main() {
    const metadata = {};
    // We'll iterate by ID directly to avoid naming confusion until we have the data
    const idsToFetch = Object.values(POET_IDS);
    
    for (const pid of idsToFetch) {
        console.log(`Fetching ID: ${pid}...`);
        try {
            const data = await fetchPoetMetadata(pid);
            if (data && data.poet) {
                const poet = data.poet;
                // Use the nickname or name as the key
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
            console.error(`Error fetching poet ${pid}: ${e.message}`);
        }
    }
    
    if (!fs.existsSync('data')) fs.mkdirSync('data');
    fs.writeFileSync('data/poets_manifest.json', JSON.stringify(metadata, null, 2), 'utf8');
    console.log("Manifest created in data/poets_manifest.json");
}

main();
