import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

type CustomHeaderProps = {
  navigation: StackNavigationProp<ParamListBase>;
  title: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ navigation, title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ea',
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});

export default CustomHeader;
