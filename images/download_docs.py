import urllib.request
import urllib.parse
import json
import os

queries = {
    "commercial_invoice": "Commercial invoice",
    "packing_list": "Packing list",
    "bill_of_lading": "Bill of lading",
    "air_waybill": "Air waybill",
    "certificate_of_origin": "Certificate of origin",
    "phytosanitary_certificate": "Phytosanitary certificate",
    "health_certificate": "Health certificate",
    "fumigation_certificate": "Fumigation certificate",
    "insurance_certificate": "Insurance certificate",
    "letter_of_credit": "Letter of credit"
}

def download_image(query, filename):
    try:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        data = json.loads(response.read())
        
        pages = data['query']['pages']
        page_id = list(pages.keys())[0]
        image_url = pages[page_id]['imageinfo'][0]['url']
        
        print(f"Downloading {filename} from {image_url}")
        urllib.request.urlretrieve(image_url, filename)
    except Exception as e:
        print(f"Failed for {query}: {e}")

for key, val in queries.items():
    download_image(val, f"{key}.jpg")
