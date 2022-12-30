const axios = require("axios");
const Book = require("./Book");

class GoogleBookAPI {
  async getBooks(query) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`,
        { timeout: 5000 }
      );
      if (response.status == 200) {
        const data = response.data;
        if (!data.totalItems) {
          return [];
        }
        return this.parseBooks(data);
      } else {
        console.log(
          `Error when getting books from google api code ${response.status}`
        );
        return [];
      }
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        console.log("Connection error, are you connected to the internet?");
        return [];
      }
      console.log(`Error when calling GoogleBooks api: ${err.code}`);
      return [];
    }
  }

  parseBooks(data) {
    return data.items.reduce((acc, item) => {
      acc.push(
        new Book(
          item.id,
          item.volumeInfo.title,
          item.volumeInfo.authors,
          item.volumeInfo.publisher
        )
      );
      return acc;
    }, []);
  }
}

module.exports = GoogleBookAPI;
