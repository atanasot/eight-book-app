const expect = require("chai").expect;
const Book = require("../src/Book");

describe("Book class", () => {
  const testBook = new Book(1, "My Book", ["Lina R."], "Publishing House");
  describe("constructor", () => {
    it("has an id, title, authors and publisher properties", () => {
      expect(testBook.hasOwnProperty("id")).to.be.equal(true);
      expect(testBook.hasOwnProperty("title")).to.be.equal(true);
      expect(testBook.hasOwnProperty("authors")).to.be.equal(true);
      expect(testBook.hasOwnProperty("publisher")).to.be.equal(true);
    });
  });

  const testBookNoTitle = new Book(
    1,
    undefined,
    ["Lina R."],
    "Publishing House"
  );
  describe("tesBookNoTitle.title", () => {
    it("if the title is unknown, it gets assigned a string value", () => {
      expect(testBookNoTitle.title).to.equal("title unknown");
    });
  });

  const testBookNoAuthors = new Book(
    1,
    "My Book",
    undefined,
    "Publishing House"
  );
  describe("tesBookNoAuthors.authors", () => {
    it("if the authors are unknown, they get assigned a string value", () => {
      expect(testBookNoAuthors.authors).to.deep.equal(["authors unknown"]);
    });
  });

  const testBookNoPublisher = new Book(1, "My Book", ["Lina R"], undefined);
  describe("tesBookNoAPublisher.publisher", () => {
    it("if the publisher is unknown, it gets assigned a string value", () => {
      expect(testBookNoPublisher.publisher).to.equal("publisher unknown");
    });
  });

  describe("print", () => {
    it("is a method on the Book class", () => {
      expect(typeof testBook.print === "function").to.be.equal(true);
    });
    it("prints the title, the authors and the publisher in a formatted string", () => {
      const output = testBook.print();
      expect(typeof output === "string").to.be.equal(true);
      expect(output.includes(testBook.title)).to.be.equal(true);
      expect(output.includes(testBook.authors)).to.be.equal(true);
      expect(output.includes(testBook.publisher)).to.be.equal(true);
    });
  });
});
