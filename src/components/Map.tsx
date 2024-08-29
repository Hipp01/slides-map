import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Map: React.FC = () => (
  <View style={styles.container}>
    <Text>Map Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;