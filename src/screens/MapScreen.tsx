import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Region, MarkerDragEvent, MarkerDragStartEndEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import pin1 from '../../assets/images/1.png';
import pin2 from '../../assets/images/2.png';
import pin3 from '../../assets/images/3.png';
import pin4 from '../../assets/images/4.png';

type LocationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type MarkerType = {
  id: string;
  coordinate: LocationType;
  isConfirmed: boolean;
  pinImage: any;
};

type SearchResult = {
  isCurrentLocation: boolean;
  lat?: string;
  lon?: string;
  display_name?: string;
};

export default function MapScreen() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selectedPin, setSelectedPin] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mapRef = useRef<MapView>(null);
  

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

  const searchLocations = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&countrycodes=fr`
      );
      const data = await response.json();
      setSearchResults([{ isCurrentLocation: true }, ...data]);
    } else {
      setSearchResults([{ isCurrentLocation: true }]);
    }
  };

  const handleLocationSelect = (item: SearchResult) => {
    if (item.isCurrentLocation) {
      (async () => {
        let currentLocation = await Location.getCurrentPositionAsync({});
        const newRegion: LocationType = {
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
      const newRegion: LocationType = {
        latitude: parseFloat(lat!),
        longitude: parseFloat(lon!),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(newRegion);
      setSearchQuery(display_name!);
      setSearchResults([]);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([{ isCurrentLocation: true }]);
  };

  const addMarker = () => {
    if (selectedPin && location) {
      const newMarker: MarkerType = {
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

  const onMarkerDragEnd = (id: string, e: MarkerDragStartEndEvent) => {
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

  const renderAddress = (address: SearchResult) => {
    if (address.isCurrentLocation) {
      return "Ma position";
    } else {
      const components = address.display_name?.split(',') ?? [];
      const shortAddress = components.slice(0, 3).join(', ');
      return shortAddress;
    }
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
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <MaterialIcons name="clear" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLocationSelect(item)}>
              <Text style={styles.searchResultItem}>{renderAddress(item)}</Text>
            </TouchableOpacity>
          )}
          style={styles.searchResultsList}
          keyboardShouldPersistTaps="handled"
        />
      )}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        region={location ?? {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        showsUserLocation={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            draggable
            onDragEnd={(e) => onMarkerDragEnd(marker.id, e)}
            title={`Marqueur ${marker.id}`}
            description={marker.isConfirmed ? "Position confirmée" : "Déplacer pour ajuster"}
          >
            <Image
              source={marker.pinImage}
              style={{ width: 60, height: 60}}
            />
          </Marker>
        ))}
      </MapView>

      
      <View style={styles.addButtonContainer}>
        {isMenuOpen && (
          <View style={styles.pinSelectionContainer}>
            {[pin1, pin2, pin3, pin4].map((pin, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.pinOption,
                  selectedPin === pin ? styles.selectedPinOption : null
                ]}
                onPress={() => setSelectedPin(pin)}
              >
                <Image source={pin} style={styles.pinImage} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.confirmButton} onPress={addMarker}>
              <MaterialIcons name="check" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.addButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
    paddingEnd: 35,
  },
  clearButton: {
    position: 'absolute',
    right: 20,
  },
  searchResultsList: {
    position: 'absolute',
    width: '95%',
    top: 60,
    backgroundColor: 'white',
    zIndex: 1,
    maxHeight: 200,
    marginHorizontal: 10,
  },
  searchResultItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  pinSelectionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    elevation: 5,
    width: 60,
  },
  pinOption: {
    margin: 5,
    padding: 2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPinOption: {
    borderColor: 'blue',
  },
  pinImage: {
    width: 50,
    height: 50,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
