import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reviewText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

const MyReviews = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reviews</Text>
      <Text style={styles.reviewText}>Review 1: This is a great app!</Text>
      <Text style={styles.reviewText}>Review 2: Very helpful and easy to use.</Text>
    </View>
  );
};

export default MyReviews;
