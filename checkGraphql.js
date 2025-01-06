// Import các thư viện cần thiết từ Apollo Server
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken'); // Thư viện để tạo token

const SECRET_KEY = 'your_secret_key'; // Khóa bí mật để ký token

// Định nghĩa schema GraphQL (typeDefs)
const typeDefs = `
  type Query {
    hello: String
    users: [User]
    repositories: [Repository]
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse
  }

  type User {
    id: ID
    username: String
  }

  type Repository {
    id: ID
    fullName: String
    description: String
    language: String
    stargazersCount: Int
    forksCount: Int
    ratingAverage: Int
    reviewCount: Int
    ownerAvatarUrl: String
  }

  type LoginResponse {
    token: String
  }
`;

// Mock dữ liệu người dùng
const users = [
  { id: '1', username: 'kalle', password: 'password123' },
  { id: '2', username: 'elina', password: 'password456' },
];

// Mock dữ liệu repository
const repositories = [
  {
    id: '1',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: '2',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: '3',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: '4',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

// Định nghĩa resolvers cho các truy vấn và mutation
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    users: () => users.map(({ password, ...user }) => user), // Không trả về password
    repositories: () => repositories, // Trả về danh sách repository
  },
  Mutation: {
    login: (_, { username, password }) => {
      // Kiểm tra thông tin đăng nhập
      const user = users.find((user) => user.username === username && user.password === password);
      if (!user) {
        throw new Error('Invalid username or password');
      }

      // Tạo token nếu thông tin đăng nhập hợp lệ
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      return { token };
    },
  },
};

// Khởi tạo Apollo Server với typeDefs và resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Khởi động server và lắng nghe yêu cầu tại cổng 4000
startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((error) => {
    console.error('Error starting Apollo Server:', error);
  });
