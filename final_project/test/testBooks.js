const axios = require("axios");

async function getBooks() {
  try {
    const books = await axios.get(
      "https://tranthuy0511-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/"
    );

    console.log("===================================");
    console.log(books.data);
  } catch (error) {
    console.log(error);
  }
}

async function getDetailByIsbn(isbn) {
  try {
    const detail = await axios.get(
      `https://tranthuy0511-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`
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
      `https://tranthuy0511-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${title}`
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
