import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns'; // For formatting dates

// Review Item Component
const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  
  return (
    <View style={styles.reviewItemContainer}>
      <Text style={styles.reviewUser}>{review.user.username} ({formattedDate})</Text>
      <Text style={styles.reviewText}>{review.text}</Text>
      <View style={[styles.ratingContainer, { backgroundColor: `rgba(0, 0, 0, ${review.rating / 100})` }]}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
    </View>
  );
};

// Review List Component
const ReviewList = ({ reviews }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

// Styles for ReviewItem and ReviewList
const styles = StyleSheet.create({
  reviewItemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
    backgroundColor: '#f4f4f9',
  },
});

export default ReviewList;
