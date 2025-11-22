const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ msg: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ msg: "User already exists." });
    }
  }

  return res.status(404).json({ msg: "Unable to register." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = parseInt(req.params.isbn);
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ msg: "Book not found." });
  }
  return res.status(200).json(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const authorName = req.params.author.toLowerCase();
  const filtered_books = Object.entries(books)
    .filter(([id, book]) => book.author.toLowerCase().includes(authorName))
    .map(([id, book]) => ({ id, ...book }));

  if (filtered_books.length > 0) {
    return res.status(200).json(filtered_books);
  }

  return res.status(404).json({ msg: "Book not found." });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title.toLowerCase();
  const filtered_books = Object.entries(books)
    .filter(([id, book]) => book.title.toLowerCase().includes(title))
    .map(([id, book]) => ({ id, ...book }));

  if (filtered_books.length > 0) {
    return res.status(200).json(filtered_books);
  }

  return res.status(404).json({ msg: "Book not found" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = parseInt(req.params.isbn);
  const result = books[isbn];

  if (!result) {
    return res.status(404).json({ msg: "Book not found" });
  }

  return res.status(200).json(result.reviews);
});

module.exports.general = public_users;
