const axios = require("axios");

class GoogleBookAPI {
  async getBooks(query) {
    try {
      const data = (
        await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
        )
      ).data;
      console.log(data.items);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = GoogleBookAPI