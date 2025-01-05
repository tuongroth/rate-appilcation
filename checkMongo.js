const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Kết nối MongoDB Atlas
const mongoURI = 'mongodb://federateddatabaseinstance0-ladv0.a.query.mongodb.net/airbnb?ssl=true&authSource=admin';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    // Khi MongoDB kết nối thành công, server sẽ bắt đầu lắng nghe
    app.listen(5000, () => {
      console.log('Server is up and waiting for requests on port 5000...');
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Tạo schema cho dữ liệu repository
const repositorySchema = new mongoose.Schema({
  name: String,
  description: String,
  language: String,
});

const Repository = mongoose.model('Repository', repositorySchema);

// Endpoint API để lấy dữ liệu repositories
app.get('/api/repositories', async (req, res) => {
  try {
    const repositories = await Repository.find(); // Lấy dữ liệu từ MongoDB
    res.json(repositories); // Trả dữ liệu dưới dạng JSON
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
