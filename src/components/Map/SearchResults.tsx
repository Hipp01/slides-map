import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SearchResult } from '../../../types';

interface SearchResultsProps {
  searchResults: SearchResult[];
  handleLocationSelect: (item: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, handleLocationSelect }) => {
  const renderAddress = (address: SearchResult) => {
    if (address.isCurrentLocation) {
      return "Ma position";
    } else {
      const components = address.display_name?.split(',') ?? [];
      const shortAddress = components.slice(0, 3).join(', ');
      return shortAddress;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationSelect(item)}>
            <Text style={styles.item}>{renderAddress(item)}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    top: 60,
    backgroundColor: 'white',
    zIndex: 1,
    maxHeight: 200,
    marginHorizontal: 10,
    borderRadius: 5,
    position: 'absolute',
  },
  list: {
    maxHeight: 200,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default SearchResults;
