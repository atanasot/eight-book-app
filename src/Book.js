class Book {
  constructor(id, title = "", authors = "", publisher = "") {
    this.id = id;
    this.title = title ? title : "title unknown";
    this.authors = authors ? authors : "authors unknown";
    this.publisher = publisher ? publisher : "publisher unknown";
  }

  print() {
    return `${this.title}" by ${this.authors.join(", ")}, published by ${
      this.publisher
    }`;
  }
}

module.exports = Book;
