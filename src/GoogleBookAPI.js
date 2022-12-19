const axios = require("axios");

class GoogleBookAPI {
  async getBooks(query) {
    try {
      const data = (
        await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
        )
      ).data;
      return this.parseBooks(data);
    } catch (err) {
      console.log(err);
    }
  }

  parseBooks(data) {
    return data.items.reduce((acc, item) => {
      acc.push({
        id: item.id,
        title: item.volumeInfo.title ? item.volumeInfo.title : "title uknown",
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors
          : ["authose uknown"],
        publisher: item.volumeInfo.publisher
          ? item.volumeInfo.publisher
          : "publisher uknown",
      });
      return acc;
    }, []);
  }
}

module.exports = GoogleBookAPI;
