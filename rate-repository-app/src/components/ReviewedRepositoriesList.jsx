import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Picker } from 'react-native';
import { useQuery } from '@apollo/client'; // Directly using useQuery
import { GET_REPOSITORIES } from '../graphql/queries'; // Your GraphQL query for repositories

const ReviewedRepositoriesList = () => {
  const [sortOrder, setSortOrder] = useState('CREATED_AT'); // Default to 'CREATED_AT'
  const [orderDirection, setOrderDirection] = useState('DESC'); // Default to 'DESC'

  // Fetch repositories using useQuery hook with sorting parameters
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: sortOrder, orderDirection },
  });

  // Handle the sorting selection change
  const handleSortOrderChange = (value) => {
    const [orderBy, direction] = value.split('_');
    setSortOrder(orderBy);
    setOrderDirection(direction);
  };

  const renderRepository = ({ item }) => (
    <View style={styles.repositoryItem}>
      <Text style={styles.repositoryName}>{item.name}</Text>
      <Text>Average Rating: {item.averageRating}</Text>
      <Text>First Review: {item.firstReviewDate}</Text>
    </View>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading repositories</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviewed Repositories</Text>

      {/* Sorting Picker */}
      <Picker
        selectedValue={`${sortOrder}_${orderDirection}`} // Value format: 'orderBy_orderDirection'
        style={styles.picker}
        onValueChange={handleSortOrderChange}
      >
        <Picker.Item label="Latest Repositories (Newest First)" value="CREATED_AT_DESC" />
        <Picker.Item label="Highest Rated Repositories" value="RATING_AVERAGE_DESC" />
        <Picker.Item label="Lowest Rated Repositories" value="RATING_AVERAGE_ASC" />
      </Picker>

      {/* Repositories List */}
      <FlatList
        data={data.repositories}
        keyExtractor={(item) => item.id}
        renderItem={renderRepository}
        ListHeaderComponent={<Text style={styles.header}>Sorted By: {sortOrder}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  repositoryItem: {
    marginBottom: 15,
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ReviewedRepositoriesList;
