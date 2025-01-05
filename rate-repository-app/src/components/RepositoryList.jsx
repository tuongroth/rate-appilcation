// RepositoryList.js

import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import useRepositories from '../hooks/useRepositories';  // Import the custom hook

// Define styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
  },
  fullName: {
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 5,
  },
  language: {
    fontSize: 12,
    color: 'gray',
  },
  separator: {
    height: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

// Separator between items in the list
const ItemSeparator = () => <View style={styles.separator} />;

// Main component to display the list of repositories
const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();  // Use the custom hook

  // If data is still loading
  if (loading) {
    return (
      <View>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If there was an error fetching the data
  if (error) {
    return (
      <View>
        <Text style={styles.loadingText}>Error: {error}</Text>
      </View>
    );
  }

  // Render the list of repositories
  return (
    <FlatList
      data={repositories}  // Use the fetched repositories
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.fullName}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.language}>{item.language}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
