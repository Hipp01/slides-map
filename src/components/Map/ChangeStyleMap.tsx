import React from 'react';
import { View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';



interface ChangeStyleMapProps {
  onChangeMapType: () => void;
}

const ChangeStyleMap: React.FC<ChangeStyleMapProps> = ({ onChangeMapType }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onChangeMapType}>
                <MaterialIcons name="layers" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 0,
        position: "absolute" as "absolute",
        bottom: 25,
        left: 10,
    },
    button: {
        backgroundColor: 'white',
        padding: 5,
        elevation: 5,
        opacity: 0.8,
        borderRadius: 50,
    },
};

export default ChangeStyleMap;
