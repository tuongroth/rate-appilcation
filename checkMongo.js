const express = require('express');
const app = express();
const port = 5000;

// Mock data
const mockData = {
  edges: [
    {
      node: {
        id: '1',
        name: 'React Native',
        description: 'A framework for building native apps using React.'
      }
    },
    {
      node: {
        id: '2',
        name: 'React',
        description: 'A JavaScript library for building user interfaces.'
      }
    },
    {
      node: {
        id: '3',
        name: 'Node.js',
        description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.'
      }
    }
  ]
};

// Route for fetching repositories
app.get('/api/repositories', (req, res) => {
  res.status(200).json(mockData); // Send the mock data with a 200 OK status
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
