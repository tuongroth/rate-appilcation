// src/hooks/useRepositories.js
import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mô phỏng việc lấy dữ liệu (ví dụ: API)
    setMessage('Hello World');
  }, []); // Hook này chỉ chạy một lần khi component mount

  return { message };
};

export default useRepositories;
