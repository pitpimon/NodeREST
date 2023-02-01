// Description: REST API with MongoDB
// Date: 03/29/2020
// npm install express mongoose
// Run this file with node MongoDBREST.js
// Test with Postman

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const app = express();
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect('mongodb://admin:SBFsqa14913@node40731-noderest.proen.app.ruk-com.cloud:11344', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the book model
const bookSchema = new mongoose.Schema({
  id : Number,
  title: String,
  author: String
});

const Book = mongoose.model('Book', bookSchema);

// API routes

// Create a new book
app.post('/books', (req, res) => {
  Book.aggregate([{ $group: { _id: null, maxId: { $max: "$id" } } }], (err, maxId) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const book = new Book({
        id: maxId[0].maxId + 1,
        title: req.body.title,
        author: req.body.author
      });
      book.save((err, book) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(book);
        }
      });
    }
  });
});


// Get a list of all books
app.get('/books', (req, res) => {
  Book.find((err, books) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(books);
    }
  });
});

// Get a single book by id
app.get('/books/:id', (req, res) => {
//Book.findById(req.params.id, (err, book) => {
//    if (err) {
//      res.status(500).send(err);
//    } else {
//      res.send(book);
//    }
//  });
  Book.findOne({id: req.params.id}, (err, book) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(book);
    } 
  });
});

// Update a book
app.put('/books/:id', (req, res) => {
  //Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, book) => {
  //  if (err) {
  //    res.status(500).send(err);
  //  } else {
  //    res.send(book);
  //  }
  //});
  Book.findOneAndUpdate({id: req.params.id}, req.body, { new: true }, (err, book) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(book);
    }
});
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  //Book.findByIdAndRemove(req.params.id, (err, book) => {
  //  if (err) {
  //    res.status(500).send(err);
  //  } else {
  //    res.send(book);
  //  }
  //});
  Book.findOneAndRemove({id: req.params.id}, (err, book) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(book);
    }
  });
});


app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});