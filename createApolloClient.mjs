import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Apollo Client
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/', // Thay bằng URL GraphQL của bạn
});

const createApolloClient = () => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken'); // Đọc token từ AsyncStorage
      console.log("Access Token: ", accessToken);  // Log token ra console để kiểm tra
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      console.log("Error retrieving access token: ", error);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
