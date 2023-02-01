//React Program Working with CRUDBookSQLIte.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch books from the API
    axios.get('/api/books')
      .then(res => res.data)
      .then(books => {
        setBooks(books);
        setLoading(false);
      });
  }, []); // the empty array ensures that this effect only runs once

  // delete a book
  const deleteBook = id => {
    axios.delete(`/api/books/${id}`).then(() => {
      setBooks(books.filter(b => b.id !== id));
    });
  };

  // render the books list
  return loading ? (
    <p>Loading...</p>
  ) : (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          {book.title} by {book.author}
          <button onClick={() => setEditingBook(book)}>Edit</button>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    // send a POST request to the API to create a new book
    axios.post('/api/books', { title, author })
      .then(res => res.data)
      .then(book => {
        // update the books list
        setBooks([...books, book]);
        setTitle('');
        setAuthor('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Author:
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
}

function EditBookForm({ book }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleSubmit = event => {
    event.preventDefault();
    // send a PUT request to the API to update the book
    axios.put(`/api/books/${book.id}`, { title, author })
    .then(() => {
        // update the books list
        setBooks(books.map(b => (b.id === book.id ? { ...book, title, author } : b)));
        setEditingBook(null);
      });
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update Book</button>
        <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>
      </form>
    );
    }

function App() {
      const [editingBook, setEditingBook] = useState(null);
    
      return (
        <div>
          <BookList setEditingBook={setEditingBook} />
          {!editingBook && <AddBookForm />}
          {editingBook && <EditBookForm book={editingBook} />}
        </div>
      );
}

export default App;