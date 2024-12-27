// src/components/RepositoryItem.jsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailsContainer: {
    marginLeft: 10,
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  language: {
    fontSize: 14,
    color: '#0366d6',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  stat: {
    fontSize: 12,
    marginRight: 10,
  },
  rating: {
    fontWeight: 'bold',
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.detailsContainer}>
        <Text style={styles.fullName}>{repository.fullName}</Text>
        <Text style={styles.description}>{repository.description}</Text>
        <Text style={styles.language}>{repository.language}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stat}>Forks: {repository.forksCount}</Text>
          <Text style={styles.stat}>Stars: {repository.stargazersCount}</Text>
          <Text style={styles.stat}>
            Rating: <Text style={styles.rating}>{repository.ratingAverage}%</Text>
          </Text>
          <Text style={styles.stat}>Reviews: {repository.reviewCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
