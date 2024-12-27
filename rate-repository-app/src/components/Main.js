import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native'; // Routing components
import AppBar from './AppBar'; // Import AppBar component
import RepositoryList from './RepositoryList'; // Import RepositoryList component
import SignIn from './SignIn'; // Import SignIn component
import SingleRepository from './SingleRepository'; // Import SingleRepository component

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <NativeRouter>
      <SafeAreaView style={styles.container}>
        <AppBar /> {/* Display the AppBar component */}

        <Routes>
          {/* Define the routes */}
          <Route path="/" element={<RepositoryList />} /> {/* Home view */}
          <Route path="/sign-in" element={<SignIn />} /> {/* Sign-in view */}
          <Route path="/repository/:id" element={<SingleRepository />} /> {/* Single repository view */}
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
};

export default Main;
