import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native'; // To access the route parameters

// Placeholder function to fetch repository and reviews data (Replace with actual GraphQL query)
const fetchRepositoryData = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        fullName: "jaredpalmer.formik",
        description: "Form management for React",
        url: `https://github.com/${id}`,
        owner: {
          login: "jaredpalmer",
          avatarUrl: "https://avatars.githubusercontent.com/u/78794?v=4",
        },
        stars: 10400,
        forks: 1200,
        language: "TypeScript",
        reviews: {
          edges: [
            {
              node: {
                id: '1',
                text: 'Great library for handling forms in React!',
                rating: 90,
                createdAt: '2023-10-01T12:00:00Z',
                user: { id: 'u1', username: 'john_doe' },
              },
            },
            {
              node: {
                id: '2',
                text: 'Very useful and easy to integrate.',
                rating: 85,
                createdAt: '2023-09-15T14:00:00Z',
                user: { id: 'u2', username: 'jane_doe' },
              },
            },
          ],
        },
      });
    }, 1000);
  });
};

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.repoInfoContainer}>
      <Image source={{ uri: repository.owner.avatarUrl }} style={styles.avatar} />
      <Text style={styles.repoTitle}>{repository.fullName}</Text>
      <Text style={styles.repoDescription}>{repository.description}</Text>
      <Text style={styles.repoLanguage}>Language: {repository.language}</Text>
      <Text style={styles.repoStats}>⭐ {repository.stars.toLocaleString()} Stars 🍴 {repository.forks.toLocaleString()} Forks</Text>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewUser}>{review.user.username}</Text>
      <Text style={styles.reviewText}>{review.text}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <Text style={styles.reviewDate}>{review.createdAt}</Text>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams(); // Get the repository ID from the URL
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    // Fetch repository and review data
    fetchRepositoryData(id).then((data) => {
      setRepository(data);
    });
  }, [id]);

  if (!repository) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading repository...</Text>
      </View>
    );
  }

  // Map reviews to extract node data
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <View style={styles.container}>
      <RepositoryInfo repository={repository} />
      
      {/* Render the reviews as a scrollable list */}
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => <Text style={styles.reviewsHeader}>Reviews</Text>}
      />
    </View>
  );
};

// Styles for SingleRepository component
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  repoInfoContainer: {
    padding: 20,
    backgroundColor: '#f4f4f9',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  repoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  repoDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  repoLanguage: {
    fontSize: 14,
    color: '#888',
  },
  repoStats: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  reviewItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  reviewsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SingleRepository;
