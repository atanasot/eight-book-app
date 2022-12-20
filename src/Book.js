class Book {
  constructor(id, title = "", authors = "", publisher = "") {
    this.id = id;
    this.title = title ? title : "title uknown";
    this.authors = authors ? authors : "authors uknown";
    this.publisher = publisher ? publisher : "publisher uknown";
  }

  print() {
    return `${this.title}" by ${this.authors.join(", ")}, published by ${
      this.publisher
    }`;
  }
}

module.exports = Book;
