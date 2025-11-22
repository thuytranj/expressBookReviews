const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let userWithSameName = users.filter((u) => u.username === username);

  if (userWithSameName.length > 0) return false;
  return true;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  const res = users.filter(
    (u) => u.username === username && u.password === password
  );

  return res.length > 0;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  // Authenticate user
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );
    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization["username"];

  if (!username) {
    return res.status(401).json({ msg: "User not logged in." });
  }

  if (!review) {
    return res.status(400).json({ msg: "Review query is required." });
  }

  if (!books[isbn]) {
    return res.status(404).json({ msg: "Book not found." });
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({ msg: "Review added/updated successfully." });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization["username"];

  if (!username) {
    return res.status(401).json({ msg: "User not logged in." });
  }

  if (!books[isbn]) {
    return res.status(404).json({ msg: "Book not found." });
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: "You have no review to delete" });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({ msg: "Review deleted." });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
