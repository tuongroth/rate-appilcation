import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native'; // Import Link and useNavigate
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e', // App bar background color
    paddingHorizontal: 10,
  },
  tab: {
    padding: 10,
    marginRight: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Navigation handlers for different routes
  const handleCreateReview = () => {
    navigate('/create-review'); // Navigate to the ReviewForm route
  };

  const handleMyReviews = () => {
    navigate('/my-reviews'); // Navigate to the MyReviews route
  };

  const handlePhonebook = () => {
    navigate('/phonebook'); // Navigate to the Phonebook route
  };

  const handleGiveFeedback = () => {
    navigate('/give-feedback'); // Navigate to the Give Feedback route (You can define the '/give-feedback' route in your app)
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        {/* Tab for Repositories */}
        <Link to="/">
          <Text style={styles.tab}>Repositories</Text>
        </Link>

        {/* Tab for Sign In */}
        <Link to="/sign-in">
          <Text style={styles.tab}>Sign In</Text>
        </Link>

        {/* Tab for Sign Up */}
        <Link to="/sign-up">
          <Text style={styles.tab}>Anecdote</Text>
        </Link>

        {/* Tab for My Reviews */}
        <Pressable onPress={handleMyReviews}>
          <Text style={styles.tab}>My Reviews</Text>
        </Pressable>

        {/* Tab for Single Repository */}
        <Link to="/repository/jaredpalmer.formik">
          <Text style={styles.tab}>Single Repository</Text>
        </Link>

        {/* Button for Create a Review */}
        <Pressable onPress={handleCreateReview}>
          <Text style={styles.tab}>Create a Review</Text>
        </Pressable>

        {/* Button for Phonebook */}
        <Pressable onPress={handlePhonebook}>
          <Text style={styles.tab}>Phonebook</Text> {/* Phonebook tab */}
        </Pressable>

        {/* Button for Give Feedback */}
        <Pressable onPress={handleGiveFeedback}>
          <Text style={styles.tab}>Give Feedback</Text> {/* Give Feedback tab */}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;

