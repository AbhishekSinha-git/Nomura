from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable
import time

class GeocodingService:
    def __init__(self):
        self.geocoder = Nominatim(user_agent="cleanwave_app")
        self.cache = {}  # Simple cache to avoid repeated lookups

    def get_coordinates(self, address):
        """
        Get latitude and longitude for an address.
        Returns (latitude, longitude) tuple or None if geocoding fails.
        """
        # Check cache first
        if address in self.cache:
            return self.cache[address]

        try:
            # Add delay to respect Nominatim's usage policy
            time.sleep(1)
            
            location = self.geocoder.geocode(address)
            if location:
                coordinates = (location.latitude, location.longitude)
                self.cache[address] = coordinates
                return coordinates
            return None
        except (GeocoderTimedOut, GeocoderUnavailable) as e:
            print(f"Geocoding error for {address}: {str(e)}")
            return None

    def get_address_components(self, address):
        """
        Get detailed address components (city, state, etc.) from an address.
        Returns a dictionary with address components or None if geocoding fails.
        """
        try:
            # Add delay to respect Nominatim's usage policy
            time.sleep(1)
            
            location = self.geocoder.geocode(address, addressdetails=True)
            if location and location.raw.get('address'):
                return location.raw['address']
            return None
        except (GeocoderTimedOut, GeocoderUnavailable) as e:
            print(f"Geocoding error for {address}: {str(e)}")
            return None

# Create a singleton instance
geocoding_service = GeocodingService() 