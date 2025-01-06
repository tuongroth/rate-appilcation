import { useState } from 'react';

const useSignIn = () => {
  const [loginError, setLoginError] = useState(null);

  const signIn = async ({ username, password }) => {
    const query = `
      mutation {
        login(username: "${username}", password: "${password}") {
          token
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:4000/', {  // Update URL if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      });

      const data = await response.json();

      if (response.ok && data.data && data.data.login) {
        // Return token if login successful
        return { token: data.data.login.token };
      } else {
        // Set error message if login fails
        setLoginError(data.errors ? data.errors[0].message : 'Login failed');
        return null;
      }
    } catch (error) {
      setLoginError('An error occurred: ' + error.message);
      return null;
    }
  };

  return [signIn, loginError];
};

export default useSignIn;
