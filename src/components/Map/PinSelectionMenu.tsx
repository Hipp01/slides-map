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
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
});

export default PinSelectionMenu;
