// const express = require('express');
// const mongoose = require('mongoose');

import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// mongoose.connection.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const uri = 'mongodb://localhost:27017'; // Local MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB locally!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});