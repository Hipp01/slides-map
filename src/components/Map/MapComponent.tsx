import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, MapType } from 'react-native-maps';

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
  cotation: string;
}

interface MapComponentProps {
  mapRef: React.RefObject<MapView>;
  location: LocationType | null;
  markers: MarkerType[];
  onMarkerDragEnd: (id: string, e: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => void;
  confirmMarker: (id: string) => void;
  mapType: MapType;
}

const MapComponent: React.FC<MapComponentProps> = ({ mapRef, location, markers, onMarkerDragEnd, confirmMarker, mapType }) => {
  return (
    <View style={styles.container}>
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
        showsMyLocationButton={false}
        mapType={mapType}
        toolbarEnabled={false}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            draggable
            onDragEnd={(e) => onMarkerDragEnd(marker.id, e)}
            title={`${marker.cotation} ${Number(marker.id.split('-')[1]) + 1}`}
            description={marker.isConfirmed ? "Position confirmée" : "Déplacer pour ajuster"}
          >
            <Image
              source={marker.pinImage}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
});

export default MapComponent;
