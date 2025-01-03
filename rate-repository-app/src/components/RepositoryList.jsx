import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repositories, setRepositories] = useState([]);

  // Fetch repositories from the API
  useEffect(() => {
    const ipAddress = 'http://192.168.1.34:5000'; // Use the public IP address
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`${ipAddress}/api/repositories`);
        if (response.ok) {
          const json = await response.json();
          setRepositories(json.edges); // Assuming the API returns the repositories in 'edges'
        } else {
          throw new Error('Unable to fetch repositories');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorMessage}>{error}</Text>;
  }

  return (
    <FlatList
      data={repositories} // Use the repositories fetched from the API
      renderItem={({ item }) => <RepositoryItem repository={item.node} />}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
