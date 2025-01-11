import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Linking, Button } from 'react-native';
import { useParams } from 'react-router-native'; // To access the route parameters

// Simulated fetchRepositoryData function for fetching repository and review data
const fetchRepositoryData = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        fullName: "tuongroth/fullstackopen2024", // Update full name here
        description: "Fullstack Open 2024 repository",
        url: `https://github.com/tuongroth/fullstackopen2024`, // Direct URL to the specific GitHub repository
        owner: {
          login: "tuongroth",
          avatarUrl: "https://avatars.githubusercontent.com/u/78794?v=4",
        },
        stars: 10400,
        forks: 1200,
        language: "JavaScript",
        reviews: [
          {
            date: "2024-08-24",
            event: "Encouragement on IT Study",
            description: "I remember that you have told me your ideas about IT study. I encourage you because it is your internal desire!",
            notes: "Keep pushing forward!"
          },
          {
            date: "2024-09-10",
            event: "Recovery Progress",
            description: "You are really strong, signs of recovery are evident, and you're not late anymore. Better to keep boundaries.",
            notes: "You're on the right path."
          },
          {
            date: "2024-10-05",
            event: "Encouragement to Continue Coding",
            description: "I think you should continue to do this because you like it and are good at it. Do you like writing the code? Additional comment: Are you referring to your friends and family?",
            notes: "Keep it up!"
          },
          {
            date: "2024-10-31",
            event: "Recognition of Independence",
            description: "You are so independent. You have your own IP address to fetch correct output and not rely on other opinions.",
            notes: "You're becoming more self-sufficient."
          },
          {
            date: "2024-11-02",
            event: "Boss Appreciation",
            description: "You are number 1 at speed, still late at work but handle so quickly.",
            notes: "Fast and efficient!"
          },
          {
            date: "2024-11-06",
            event: "Mental Health Improvement",
            description: "You’re not a child anymore. You know what’s best for your mental health, and I’m proud of you.",
            notes: "Great progress!"
          },
          {
            date: "2024-11-12",
            event: "IT Education Completed",
            description: "Completed foundational IT education, preparing for professional application. You have your IP as a safe environment.",
            notes: "Well done!"
          }
        ]
      });
    }, 1000); // Simulate a delay
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
      <Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewEvent}>{review.event}</Text>
      <Text style={styles.reviewDescription}>{review.description || 'No description available'}</Text>
      <Text style={styles.reviewNotes}>{review.notes}</Text>
      <Text style={styles.reviewDate}>{review.date}</Text>
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

  // Trích xuất reviews
  const reviews = repository.reviews;

  return (
    <View style={styles.container}>
      <RepositoryInfo repository={repository} />
      
      {/* Render the reviews as a scrollable list */}
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item, index) => index.toString()} // Using index as the key
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
  reviewEvent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDescription: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
  },
  reviewNotes: {
    fontSize: 14,
    color: '#444',
    marginVertical: 5,
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

