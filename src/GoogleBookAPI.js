const axios = require("axios");
const Book = require("./Book");

class GoogleBookAPI {
  async getBooks(query) {
    try {
      const data = (
        await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
        )
      ).data;
      if (!data.totalItems) {
        return []
      }
      return this.parseBooks(data);
    } catch (err) {
      console.log(err);
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
