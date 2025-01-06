import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { gql } from '@apollo/client';
import AuthStorage from '../utils/authStorage';

// GraphQL mutation để xác thực
const AUTHENTICATE_USER = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, { loading, error, data }] = useMutation(AUTHENTICATE_USER);
  const [signInError, setSignInError] = useState(null);
  const authStorage = new AuthStorage();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      if (data && data.authenticate && data.authenticate.accessToken) {
        // Lưu token vào AsyncStorage
        await authStorage.setAccessToken(data.authenticate.accessToken);
      }
      return data;
    } catch (e) {
      setSignInError(e.message);
      console.error("Sign-in Error: ", e);
    }
  };

  return { signIn, loading, error: signInError || error, data };
};

export default useSignIn;
