import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListSlidesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>List of slides</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListSlidesScreen;
