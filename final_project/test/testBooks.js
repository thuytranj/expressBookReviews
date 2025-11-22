const axios = require("axios");

async function getBooks() {
  try {
    const books = await axios.get("http://localhost:5001/");

    console.log("===================================");
    console.log(books.data);
  } catch (error) {
    console.log(error);
  }
}

async function getDetailByIsbn(isbn) {
  try {
    const detail = await axios.get(
      `http://localhost:5001/isbn/${isbn}`
    );

    console.log("===================================");
    console.log(detail.data);
  } catch (error) {
    console.log(error);
  }
}

async function getDetailByTitle(title) {
  try {
    const detail = await axios.get(
      `http://localhost:5001/title/${title}`
    );

    console.log("===================================");
    console.log(detail.data);
  } catch (error) {
    console.log(error);
  }
}

// getBooks()

// const isbn = 1
// getDetailByIsbn(isbn)

const title = "the"
getDetailByTitle(title)
