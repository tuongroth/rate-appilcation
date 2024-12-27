import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Link } from 'react-router-native'; // Import Link for navigation
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
      </ScrollView>
    </View>
  );
};

export default AppBar;
