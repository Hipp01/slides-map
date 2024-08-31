import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageSourcePropType } from 'react-native';

const pin1: ImageSourcePropType = require('../../assets/images/1.png');
const pin2: ImageSourcePropType = require('../../assets/images/2.png');
const pin3: ImageSourcePropType = require('../../assets/images/3.png');
const pin4: ImageSourcePropType = require('../../assets/images/4.png');

const pins: { name: string, description: string, image: ImageSourcePropType }[] = [
    {
        name: 'No Fun',
        description: 'Celui qui même avec du savon ne glisse pas !',
        image: pin1,
    },
    {
        name: 'Tout Doux',
        description: 'Celui qui dit à la fin “Smooooooth”',
        image: pin2,
    },
    {
        name: 'Barbare',
        description: 'Celui qui te fait crier "Aïe !" mais que tu refais quand même',
        image: pin3,
    },
    {
        name: 'Furieux',
        description: 'Celui qui brûle le cul quand t’y vas',
        image: pin4,
    },
];

const InfoScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Découvrez les cotations de toboggans</Text>
            <Text style={styles.text}>Les différents Tags représentent les niveaux d'amusements</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {pins.map((pin, index) => (
                    <View key={index} style={styles.pinContainer}>
                        <Image source={pin.image} style={styles.pinImage} />
                        <View style={styles.pinDetails}>
                            <Text style={styles.pinName}>{pin.name}</Text>
                            <Text style={styles.pinDescription}>{pin.description}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    pinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        elevation: 3,
    },
    pinImage: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    pinDetails: {
        flex: 1,
    },
    pinName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pinDescription: {
        fontSize: 16,
        color: '#555',
    },
});

export default InfoScreen;
