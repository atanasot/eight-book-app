const { readFileSync, writeFileSync } = require("fs");

class ReadingList {
  constructor(filelocation = "myBooks.json") {
    this.fileLocation = filelocation;
    this.readingList = [];
  }

  // read file to get the array of saved books
  openReadingList() {
    try {
      const data = readFileSync(this.fileLocation, "utf8");
      this.readingList = JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        this.readingList = [];
      }
      console.log(error);
      return;
    }
  }
  addBook(newBook) {
    for (let book of this.readingList) {
      if (book.id === newBook.id) {
        console.log("Book already added to reading list!");
        return false;
      }
    }
    this.readingList.push(newBook);
    return true;
  }

  // persists list to the disc
  saveReadingList() {
    try {
      writeFileSync(
        this.fileLocation,
        JSON.stringify(this.readingList, null, 2),
        { flag: "w" }
      );
    } catch (error) {
      console.log("Error when saving reading list ", error);
      return;
    }
    console.log("Reading list saved!");
  }

  printReadingList() {
    return this.readingList.reduce((acc, book, idx) => {
      if (idx !== this.readingList.length - 1) {
        acc += `"${book.title}" by ${book.authors.join(", ")}, published by ${
          book.publisher
        }\n`;
      } else
        acc += `"${book.title}" by ${book.authors.join(", ")}, published by ${
          book.publisher
        }`;
      return acc;
    }, "");
  }
}

module.exports = ReadingList;
