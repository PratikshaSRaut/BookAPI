// Main Backend File

// const db = require("./database");
const BookModel = require("./Database/books");

const express = require("express");
const app = express();
app.use(express.json());

var mongoose = require("mongoose");
//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://Pratiksha-1499:peru14@cluster0.ljhcb.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECTION ESTABLISHED"));

// async function main() {
//   const uri = "mongodb+srv://nikhil_agarwal:p5nfHZEoRnTA2VGb@cluster0.arwlh.mongodb.net/book-company?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//       await client.connect();
//       await listDatabases(client);
//   }
//   catch(err) {
//       console.log(err);
//   }
//   finally {
//       await client.close();
//   }
// }
// main();
// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://Pratiksha-1499:peru14@cluster0.ljhcb.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect((err) => {
//   // const bcollection = client.db("book-comapany").collection("books");
//   const bcollection = client
//     .db("book-company")
//     .collection("books")
//     .findOne({ ISBN: "12345Three" });
//   bcollection.then((data) => console.log(data)).catch((err) => console.log(err));
// });
// client.close();

// ----------------Book-------------------

// http://localhost:3000
app.get("/", (req, res) => {
  return res.json({ Welcome: `to my backend s/w for book company` });
});

// http://localhost:3000/books
app.get("/books", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

// http://localhost:3000/book
app.post("/book", (req, res) => {
  console.log(req.body);
  db.books.push(req.body);
  return res.json(db.books);
});

// http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { isbn } = req.params;
  db.books.forEach((book) => {
    if (book.ISBN === isbn) {
      console.log({ ...book, ...req.body });
      db.books.push({ ...book, ...req.body });
      return { ...book, ...req.body };
    }
    return book;
  });
  return res.json(db.books);
});

// http://localhost:3000/book-delete/12345Two
app.get("/book-delete/:isbn", (req, res) => {
  console.log(req.params);
  const { isbn } = req.params;
  const filteredBooks = db.books.filter((book) => book.ISBN !== isbn);
  console.log(filteredBooks);
  db.books = filteredBooks;
  return res.json(db.books);
});

// http://localhost:3000/book-author-delete/12345Two/1
app.delete("/book-author-delete/:isbn/:id", (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  let { isbn, id } = req.params;

  id = Number(id);
  db.books.forEach((book) => {
    if (book.ISBN === isbn) {
      if (!book.authors.includes(id)) {
        return;
      }
      book.authors = book.authors.filter((author) => author !== id);
      return book;
    }
    return book;
  });
  return res.json(db.books);
});

// http://localhost:3000/book/12345Two
app.get("/book-isbn/:isbn", (req, res) => {
  const isbn = req.params;
  const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
  if (getSpecificBook.length === 0) {
    return res.json("error", `No Book Found for ISBN of ${isbn}`);
  }
  return res.json(getSpecificBook[0]);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", (req, res) => {
  const { category } = req.params;
  const getSpecificBooks = db.books.filter((book) => book.Category.includes(category));

  if (getSpecificBooks.length === 0) {
    return res.json("error", `No Book Found for Category of ${category}`);
  }
  return res.json([getSpecificBooks]);
});

// ----------------Author-------------------

// http://localhost:3000/authors
app.get("/authors", (req, res) => {
  const getAllAuthors = db.authors;
  return res.json(getAllAuthors);
});

// http://localhost:3000/author
app.post("/author", (req, res) => {
  console.log(req.body);
  db.authors.push(req.body);
  return res.json(db.authors);
});

// http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { id } = req.params;
  db.authors.forEach((author) => {
    if (author.id === id) {
      console.log({ ...author, ...req.body });
      db.authors.push({ ...author, ...req.body });
      return { ...author, ...req.body };
    }
    return author;
  });
  return res.json(db.authors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const getSpecificAuthor = db.authors.filter((author) => author.id === id);
  if (getSpecificAuthor.length === 0) {
    return res.json({ error: `No Author found for the id of ${id}` });
  }
  return res.json(getSpecificAuthor[0]);
});

// http://localhost:3000/author-isbn/12345Two
app.get("/author-isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificAuthor = db.books.filter((book) => book.ISBN === isbn);
  if (getSpecificAuthor.length === 0) {
    return res.json({ error: `No Books found for isbn of ${isbn}` });
  }
  return res.json(getSpecificAuthor[0]);
});

// http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", (req, res) => {
  const { id } = req.params;
  const filteredAuthors = db.authors.filter((author) => author.id !== id);
  console.log(filteredAuthors);
  db.authors = filteredAuthors;
  return res.json(db.books);
});

// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  let { id, isbn } = req.params;
  db.authors.forEach((author) => {
    if (author.id === id) {
      if (!author.books.includes(isbn)) {
        return;
      }
      author.books = author.books.filter((author) => author !== id);
      return author;
    }
    return author;
  });
  return res.json(db.authors);
});

// ----------------Publication-----------------

// http://localhost:3000/publications
app.get("/publications", (req, res) => {
  const getAllPublications = db.publications;
  return res.json(getAllPublications);
});

// http://localhost:3000/publication
app.post("/publication", (req, res) => {
  db.publications.push(req.body);
  return res.json(db.publications);
});

// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { id } = req.params;
  db.publications.forEach((publication) => {
    if (publication.id === id) {
      console.log({ ...publication, ...req.body });
      db.publications.push({ ...publication, ...req.body });
      return { ...publication, ...req.body };
    }
    return publication;
  });
  return res.json(db.publications);
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificPublication = db.books.filter((book) => book.ISBN === isbn);
  if (getSpecificPublication.length === 0) {
    return res.json({ error: `No Books found for isbn of ${isbn}` });
  }
  return res.json(getSpecificPublication[0]);
});

app.listen(3000, () => {
  console.log("My express app is running on port 3000....");
});
