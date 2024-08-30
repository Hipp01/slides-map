import React from 'react';
import { Image, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

interface LocationType {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MarkerType {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  isConfirmed: boolean;
  pinImage: any;
}

interface MapComponentProps {
  mapRef: React.RefObject<MapView>;
  location: LocationType | null;
  markers: MarkerType[];
  onMarkerDragEnd: (id: string, e: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => void;
  confirmMarker: (id: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ mapRef, location, markers, onMarkerDragEnd, confirmMarker }) => {
  return (
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
            style={{ width: 60, height: 60 }}
          />
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
