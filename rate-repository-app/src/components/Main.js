// src/components/Main.jsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RepositoryList />
    </SafeAreaView>
  );
};

export default Main;
