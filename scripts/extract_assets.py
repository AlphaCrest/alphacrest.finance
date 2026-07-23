import os
import urllib.request
import urllib.error

# List of assets to extract
ASSETS = [
    "https://alphacrest.finance/wp-content/uploads/2025/09/Alpha-Crest-logo-Final.webp",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Alpha-Crest-logo-text-white.webp",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Alpha-Crest-Favicon.webp",
    "https://alphacrest.finance/wp-content/uploads/2025/09/header-pattern.webp",
    "https://alphacrest.finance/wp-content/uploads/2025/10/Slider-Vid.mp4",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Trading-laptop.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Opportunity.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Strategy.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Purpose.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Luno.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Saleem-Jaffer.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Fayaadh-Dhansay.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Dinesh-Makan-1.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Isa-Tippens.png",
    "https://alphacrest.finance/wp-content/uploads/2025/09/Imaad-Davies.png"
]

output_dir = "public/assets"
os.makedirs(output_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for url in ASSETS:
    filename = url.split('/')[-1]
    dest_path = os.path.join(output_dir, filename)
    print(f"Downloading {url} -> {dest_path}...")
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            with open(dest_path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"  Successfully saved to {dest_path}")
    except urllib.error.HTTPError as e:
        print(f"  HTTP Error {e.code} downloading {url}")
    except Exception as e:
        print(f"  Failed to download {url}: {e}")

print("Asset download completed.")
