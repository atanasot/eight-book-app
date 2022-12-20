const { readFileSync, writeFileSync } = require("fs");

class ReadingList {
  constructor(filelocation = "myBooks.json") {
    this.fileLocation = filelocation;
    this.readingList = this.loadReadingList();
  }

  // read file to get the array of saved books
  loadReadingList() {
    try {
      const data = readFileSync(this.fileLocation, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      console.log(error);
      return;
    }
  }
  addBook(newBook) {
    for (let book of this.readingList) {
      if (book.id === newBook.id) {
        console.log("Book already added to reading list!");
        return;
      }
    }
    this.readingList.push(newBook);
  }
}

module.exports = ReadingList;
