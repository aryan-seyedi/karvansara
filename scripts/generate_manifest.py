import requests
import json
import sys

GANJOOR_API = "https://api.ganjoor.net/api/ganjoor"

# Initial priority poets for the Silk Road Synthesis
POET_IDS = {
    "Rudaki": 1,
    "Saadi": 7,
    "Nizami": 22,
    "Rumi": 5,
    "Hafiz": 2
}

def fetch_poet_metadata(poet_id):
    try:
        response = requests.get(f"{GANJOOR_API}/poet/{poet_id}")
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching poet {poet_id}: {e}")
        return None

def main():
    metadata = {}
    for name, pid in POET_IDS.items():
        print(f"Fetching {name}...")
        data = fetch_poet_metadata(pid)
        if data:
            # We only need the core poet info for the manifest
            metadata[name] = {
                "ganjoor_id": data["poet"]["id"],
                "name": data["poet"]["name"],
                "nickname": data["poet"]["nickname"],
                "root_cat_id": data["poet"]["rootCatId"],
                "birth_place": data["poet"].get("birthPlace", "Unknown"),
                "death_place": data["poet"].get("deathPlace", "Unknown")
            }
    
    with open("data/poets_manifest.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)
    print("Manifest created in data/poets_manifest.json")

if __name__ == "__main__":
    main()
