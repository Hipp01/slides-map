import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface PinSelectionMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  selectedPin: any;
  setSelectedPin: (pin: any) => void;
  addMarker: () => void;
  pins: any[];
}

const PinSelectionMenu: React.FC<PinSelectionMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  selectedPin,
  setSelectedPin,
  addMarker,
  pins,
}) => {
  const renderImage = (pin: any) => {
    if (typeof pin === 'string' && pin.startsWith('http')) {
      return { uri: pin };
    } else {
      return pin;
    }
  };

  return (
    <View style={styles.addButtonContainer}>
      {isMenuOpen && (
        <View style={styles.pinSelectionContainer}>
          {pins.map((pin, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pinOption,
                selectedPin === pin ? styles.selectedPinOption : null
              ]}
              onPress={() => setSelectedPin(pin)}
            >
              <Image source={renderImage(pin)} style={styles.pinImage} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.confirmButton} onPress={addMarker}>
            <MaterialIcons name="check" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <MaterialIcons name="add-location" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#ff5722',
    padding: 12,
    borderRadius: 50,
  },
  pinSelectionContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    paddingBottom: 5,
  },
  pinOption: {
    padding: 10,
    borderRadius: 50,
  },
  selectedPinOption: {
    borderWidth: 2,
    borderColor: '#ff5722',
    padding: 0,
    margin: 5,
  },
  pinImage: {
    width: 50,
    height: 50,
  },
  confirmButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 50,
    marginTop: 5,
  },
});

export default PinSelectionMenu;
