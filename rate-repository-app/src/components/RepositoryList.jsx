// src/components/RepositoryList.jsx
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
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Địa chỉ IP cục bộ của máy tính bạn, thay đổi theo IP thực tế của máy tính
    const ipAddress = 'http://192.168.1.33:5000'; // Thay thế IP đúng của bạn
    const fetchRepositories = async () => {
      try {
        // Lấy dữ liệu từ API
        const response = await fetch(`${ipAddress}/api/repositories`);
        if (response.ok) {
          const json = await response.json();
          setRepositories(json.edges); // Giả sử API trả về dạng này
        } else {
          throw new Error('Không thể lấy dữ liệu');
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
    return <Text>Đang tải...</Text>;
  }

  if (error) {
    return <Text style={styles.errorMessage}>{error}</Text>;
  }

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem repository={item.node} />}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
