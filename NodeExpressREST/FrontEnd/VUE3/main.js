<template>
  <div>
    <div v-for="book in books" :key="book.id">
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
      <button @click="editBook(book)">Edit</button>
      <button @click="deleteBook(book)">Delete</button>
    </div>
    <hr>
    <h3>Add new book</h3>
    <div>
      <label for="title">Title:</label>
      <input v-model="newBook.title" id="title" type="text">
    </div>
    <div>
      <label for="author">Author:</label>
      <input v-model="newBook.author" id="author" type="text">
    </div>
    <button @click="addBook()">Add</button>

    <hr>
    <h3>Edit book</h3>
    <div v-if="selectedBook">
      <label for="title">Title:</label>
      <input v-model="selectedBook.title" id="title" type="text">
    </div>
    <div v-if="selectedBook">
      <label for="author">Author:</label>
      <input v-model="selectedBook.author" id="author" type="text">
    </div>
    <button v-if="selectedBook" @click="updateBook()">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      newBook: {
        title: "",
        author: ""
      },
      selectedBook: null
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(data => {
          this.books = data;
        });
    },
    addBook() {
      fetch("http://localhost:3000/books", {
        method: "POST",
        body: JSON.stringify(this.newBook),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.books.push(data);
          this.newBook = {
            title: "",
            author: ""
          };
        });
    },
    editBook(book) {
      this.selectedBook = book;
    },
    updateBook() {
      fetch(`http://localhost:3000/books/${this.selectedBook.id}`, {
        method: "PUT",
        body: JSON.stringify(this.selectedBook),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          let index = this.books.findIndex(b => b.id === data.id);
          this.books.splice(index, 1, data);
          this.selectedBook = null;
        });
    },
    deleteBook(book) {
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "DELETE"
      })
        .then(response => {
          let index = this.books.findIndex(b => b.id === book.id);
          this.books.splice(index, 1);
        });
    }
  }
};
</script>
