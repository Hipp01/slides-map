import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import SearchBar from '../components/Map/SearchBar';
import SearchResults from '../components/Map/SearchResults';
import MapComponent from '../components/Map/MapComponent';
import PinSelectionMenu from '../components/Map/PinSelectionMenu';
import CenterOnUserButton from '../components/Map/CenterOnUserButton';

import pin1 from '../../assets/images/1.png';
import pin2 from '../../assets/images/2.png';
import pin3 from '../../assets/images/3.png';
import pin4 from '../../assets/images/4.png';
import MapView from 'react-native-maps';
import { SearchResult } from '../../types';

export default function MapScreen() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [markers, setMarkers] = useState<{ id: string; coordinate: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number; }; isConfirmed: boolean; pinImage: any; }[]>([]);
  const [selectedPin, setSelectedPin] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const searchLocations = async (query: string): Promise<void> => {
    setSearchQuery(query);
    if (query.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&countrycodes=fr`
      );
      const data = await response.json();
      const results = data.map((item: any) => ({
        lat: item.lat ?? '',
        lon: item.lon ?? '',
        display_name: item.display_name ?? '',
        isCurrentLocation: false,
      })) as SearchResult[];
      setSearchResults([{ lat: '', lon: '', display_name: 'Current Location', isCurrentLocation: true }, ...results]);
    } else {
      setSearchResults([{ lat: '', lon: '', display_name: 'Current Location', isCurrentLocation: true }]);
    }
  };

  const handleSearchLocations: (query: string) => Promise<void> = (query) => searchLocations(query);

  const handleLocationSelect = (item: SearchResult): void => {
    if (item.isCurrentLocation) {
      (async () => {
        let currentLocation = await Location.getCurrentPositionAsync({});
        const newRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setLocation(newRegion);
        setSearchQuery('Ma position');
        setSearchResults([]);
        mapRef.current?.animateToRegion(newRegion, 1000);
      })();
    } else {
      const { lat, lon, display_name } = item;
      const newRegion = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(newRegion);
      setSearchQuery(display_name);
      setSearchResults([]);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  const handleCenterOnUser = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(newRegion);   

      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([{ lat: '', lon: '', display_name: 'Current Location', isCurrentLocation: true }]);
  };

  const addMarker = () => {
    if (selectedPin && location) {
      const newMarker = {
        id: markers.length.toString(),
        coordinate: {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
        isConfirmed: false,
        pinImage: selectedPin
      };
      setMarkers([...markers, newMarker]);
      setSelectedPin(null);
      setIsMenuOpen(false);
    } else {
      alert('Veuillez sélectionner un pin.');
    }
  };

  const confirmMarker = (id: string) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id ? { ...marker, isConfirmed: true } : marker
      )
    );
  };

  const onMarkerDragEnd = (id: string, e: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id ? {
          ...marker,
          coordinate: {
            latitude,
            longitude,
            latitudeDelta: marker.coordinate.latitudeDelta,
            longitudeDelta: marker.coordinate.longitudeDelta,
          }
        } : marker
      )
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        searchLocations={handleSearchLocations}
        clearSearch={clearSearch}
      />
      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          handleLocationSelect={handleLocationSelect}
        />
      )}
      <MapComponent
        mapRef={mapRef}
        location={location}
        markers={markers}
        onMarkerDragEnd={onMarkerDragEnd}
        confirmMarker={confirmMarker}
      />
      <CenterOnUserButton onPress={handleCenterOnUser} />
      <PinSelectionMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        selectedPin={selectedPin}
        setSelectedPin={setSelectedPin}
        addMarker={addMarker}
        pins={[pin1, pin2, pin3, pin4]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
