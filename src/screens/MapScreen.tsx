import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const mapRef = useRef(null);

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

  const searchLocations = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`);
      const data = await response.json();
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (item) => {
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
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place"
          value={searchQuery}
          onChangeText={searchLocations}
        />
        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleLocationSelect(item)}>
                <Text style={styles.searchResultItem}>{item.display_name}</Text>
              </TouchableOpacity>
            )}
            style={styles.searchResultsList}
          />
        )}
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={location}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={location}
            title="Selected Location"
            description={searchQuery}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    top: 10,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  searchResultsList: {
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  searchResultItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
