import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL của server Apollo
const apolloUri = 'http://localhost:4000';  // Hoặc URL của server bạn

const httpLink = createHttpLink({
  uri: apolloUri,
});

const authLink = setContext(async (_, { headers }) => {
  // Lấy token từ AsyncStorage
  const token = await AsyncStorage.getItem('accessToken');
  
  // Trả về các headers với token Authorization nếu có
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Nếu token có, thêm vào Authorization
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),  // Apollo Client sử dụng authLink trước khi gọi httpLink
  cache: new InMemoryCache(),
});

export default client;
