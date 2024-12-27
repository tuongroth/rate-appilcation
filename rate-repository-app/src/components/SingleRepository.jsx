import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { useParams } from 'react-router-native'; // To access the route parameters
import { Linking } from 'expo'; // To open URL in browser

// Placeholder for the repository data, ideally you'd fetch this from a GraphQL API
const fetchRepositoryData = (id) => {
  // For simplicity, we are returning static data here. Replace with actual data fetching logic.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        fullName: "jaredpalmer.formik",
        description: "Form management for React",
        url: `https://github.com/${id}`,
        owner: {
          login: "jaredpalmer",
          avatarUrl: "https://avatars.githubusercontent.com/u/78794?v=4", // Example avatar image
        },
        stars: 10400,
        forks: 1200,
        language: "TypeScript",
      });
    }, 1000);
  });
};

const SingleRepository = () => {
  const { id } = useParams(); // Access the repository ID from the route params
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    // Fetch repository data based on the ID
    fetchRepositoryData(id).then((data) => setRepository(data));
  }, [id]);

  if (!repository) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading repository...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Repository Owner */}
      <View style={styles.ownerContainer}>
        <Image source={{ uri: repository.owner.avatarUrl }} style={styles.avatar} />
        <Text style={styles.ownerName}>{repository.owner.login}</Text>
      </View>

      {/* Repository Info */}
      <Text style={styles.title}>{repository.fullName}</Text>
      <Text style={styles.description}>{repository.description}</Text>
      <Text style={styles.language}>Language: {repository.language}</Text>

      {/* Repository Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>⭐ {repository.stars.toLocaleString()} Stars</Text>
        <Text style={styles.stat}>🍴 {repository.forks.toLocaleString()} Forks</Text>
      </View>

      {/* Button to open the repository in GitHub */}
      <Button
        title="Open in GitHub"
        onPress={() => Linking.openURL(repository.url)} // Open the URL in the browser
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  ownerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  language: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stat: {
    fontSize: 16,
    color: '#555',
  },
});

export default SingleRepository;
