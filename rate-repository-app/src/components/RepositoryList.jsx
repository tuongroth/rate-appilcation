import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm fetch để lấy dữ liệu từ API
    const fetchRepositories = async () => {
      try {
        // Gửi yêu cầu đến API với URL chính xác
        const response = await fetch('http://10.32.9.199:5000/api/repositories');
        
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ server');
        }

        // Chuyển đổi phản hồi từ server sang định dạng JSON
        const data = await response.json();
        setRepositories(data.edges); // Lấy dữ liệu repository từ `edges`
      } catch (err) {
        setError(err.message); // Xử lý lỗi nếu có
      } finally {
        setLoading(false); // Đánh dấu hoàn thành việc lấy dữ liệu
      }
    };

    fetchRepositories();
  }, []); // Chỉ gọi một lần khi component được render

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Lỗi: {error}</Text>;
  }

  return (
    <View>
      {repositories.map((repo) => (
        <View key={repo.node.id}>
          <Text>{repo.node.name}</Text>
          <Text>{repo.node.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default RepositoryList;
