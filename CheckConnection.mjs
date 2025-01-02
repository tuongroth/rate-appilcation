import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CheckConnection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://192.168.1.34:5000/api/repositories');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      setError('Connection failed or API not available');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check API Connection</Text>

      {loading && <Text>Loading...</Text>}

      {error && <Text style={styles.error}>{error}</Text>}

      {data && (
        <View style={styles.success}>
          <Text style={styles.successText}>Data fetched successfully!</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
      )}

      <Button title="Retry" onPress={fetchRepositories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  success: {
    marginTop: 20,
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  successText: {
    fontWeight: 'bold',
    color: 'green',
  },
});

export default CheckConnection;
