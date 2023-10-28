import requests
import json
API_KEY = 'AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU'

locations = {
    "New York": (40.7128, -74.0060),
    "Paris": (48.8566, 2.3522),
    "San Francisco": (37.7749, -122.4194)
}


def get_place_details(api_key, place_id):
    # Base URL for the Place Details request
    base_url = "https://maps.googleapis.com/maps/api/place/details/json"
    
    # Parameters for the API request
    params = {
        "place_id": place_id,
        "key": api_key
    }
    
    # Make the API request
    response = requests.get(base_url, params=params)
    
    # Convert the response to JSON
    place_details = response.json().get("result", {})
    
    # Extract the description or name if the description isn't available
    description = place_details['editorial_summary']['overview']
    
    return description


def get_places_nearby(api_key, lat, lang, place_type="restaurant", radius=1500, limit=20):
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    
    params = {
        "location": f"{lat},{lang}",
        "type": place_type,
        "radius": radius,
        "key": api_key
    }

    places = []
    while len(places) < limit:
        response = requests.get(base_url, params=params)
        results = response.json().get("results", [])
        places.extend(results)
        
        # Check if there's a "next_page_token" to fetch more results
        if "next_page_token" in response.json():
            params["pagetoken"] = response.json()["next_page_token"]
        else:
            break

    return places[:limit]

def extract_details(place, city, cat):
    name = place.get("name", "")
    latitude = place.get("geometry", {}).get("location", {}).get("lat", "")
    longitude = place.get("geometry", {}).get("location", {}).get("lng", "")
    price_point = place.get("price_level", -1)
    # Google Places API does not provide a direct "description", but user rating is available
    rating = place.get("rating", "N/A")

    return {
        "name": name,
        "latitude": latitude,
        "longitude": longitude,
        "price_point": price_point,
        "rating": rating,
        "city": city,
        "description":get_place_details(API_KEY,place.get('place_id')),
        "category": cat
    }

# Usage example:
lat, lang = 40.7128, -74.0060  # Example coordinates for New York City

places = get_places_nearby(API_KEY, lat, lang, place_type="restaurant", limit=20)
details_list = [extract_details(place, "New York", "restaurant") for place in places]

for details in details_list:
    print(details)

cities = []
data = []
for city in locations.keys():
    lat = locations[city][0]
    lang = locations[city][1]
    food_places = get_places_nearby(API_KEY, lat, lang, place_type="restaurant", limit=30)
    food_places_details = [extract_details(place, city, "restaurant") for place in places]

    attraction_places = get_places_nearby(API_KEY, lat, lang, place_type="tourist_attraction", limit=30)
    attraction_places_details = [extract_details(place, city, "tourist_attraction") for place in places]

    data += food_places_details
    data += attraction_places_details

# with open('starting_data.json', 'w') as file:
#     json.dump(data, file)

with open('seed_data.jsonl', 'w') as jsonl_file:
    for entry in data:
        jsonl_file.write(json.dumps(entry) + '\n')




