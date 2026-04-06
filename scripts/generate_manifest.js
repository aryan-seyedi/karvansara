const fs = require('fs');
const https = require('https');

const GANJOOR_API = "https://api.ganjoor.net/api/ganjoor";

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
    "Nizami": 10, // Nizami is 10
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
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => reject(e));
    });
}

async function main() {
    const metadata = {};
    for (const [name, pid] of Object.entries(POET_IDS)) {
        console.log(`Fetching ${name} (ID: ${pid})...`);
        try {
            const data = await fetchPoetMetadata(pid);
            if (data && data.poet) {
                metadata[name] = {
                    "ganjoor_id": data.poet.id,
                    "name": data.poet.name,
                    "nickname": data.poet.nickname,
                    "root_cat_id": data.poet.rootCatId,
                    "birth_place": data.poet.birthPlace || "Unknown",
                    "death_place": data.poet.deathPlace || "Unknown",
                    "description": data.poet.description ? data.poet.description.substring(0, 300) + "..." : ""
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
