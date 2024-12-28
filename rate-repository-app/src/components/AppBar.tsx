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

  const handleCreateReview = () => {
    navigate('/create-review'); // Navigate to the ReviewForm route
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

        {/* Tab for Single Repository */}
        <Link to="/repository/jaredpalmer.formik">
          <Text style={styles.tab}>Single Repository</Text>
        </Link>

        {/* Button for Create a Review */}
        <Pressable onPress={handleCreateReview}>
          <Text style={styles.tab}>Create a Review</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
