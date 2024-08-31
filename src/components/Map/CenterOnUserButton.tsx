import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';   


interface CenterOnUserButtonProps {
  onPress: () => void;
}

const CenterOnUserButton: React.FC<CenterOnUserButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialIcons name="my-location" size={30} color="blue" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});

export default CenterOnUserButton;