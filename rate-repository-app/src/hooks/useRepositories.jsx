// useRepositories.js

import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);  // Reset error when fetching starts

    const query = `
      query GetRepositories {
        repositories {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      const json = await response.json();
      setRepositories(json.data.repositories);
    } catch (err) {
      setError('Failed to fetch repositories');
      console.error('Error fetching repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, error };
};

export default useRepositories;
