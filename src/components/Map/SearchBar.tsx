import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  searchQuery: string;
  searchLocations: (query: string) => void;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, searchLocations, clearSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a place"
        value={searchQuery}
        onChangeText={searchLocations}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <MaterialIcons name="clear" size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    width: '100%',
    top: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
    paddingEnd: 35,
  },
  clearButton: {
    position: 'absolute',
    right: 20,
  },
});

export default SearchBar;
