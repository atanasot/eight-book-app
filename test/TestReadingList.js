const expect = require("chai").expect;
const ReadingList = require("../src/ReadingList");
const Book = require("../src/Book");
const { unlinkSync } = require("fs");

describe("ReadingList class", () => {
  const testBook = new Book(1, "My Book", "Lina R.", "Publishing House");
  describe("constructor", () => {
    it("starts with an empty array", () => {
      const testReadingList = new ReadingList(
        (fileLocation = "non-existent-file.json")
      );
      expect(testReadingList.readingList).to.deep.equal([]);
    });
  });

  describe("addBook", () => {
    it("can add book to reading list", () => {
      const testReadingList = new ReadingList(
        (filelocation = "test-readinglist.json")
      );
      testReadingList.addBook(testBook);
      expect(testReadingList.readingList).to.be.deep.equal([testBook]);
    });
  });

  describe("openReadingList and saveReadingList", () => {
    it("open and save reading list", () => {
      const testReadingList = new ReadingList(
        (filelocation = "test-readinglist.json")
      );
      testReadingList.addBook(testBook);
      testReadingList.saveReadingList(testBook);

      const newReadingList = new ReadingList(
        (fileLocation = "test-readinglist.json")
      );
      newReadingList.openReadingList();
      expect(newReadingList.readingList).to.be.deep.equal([testBook]);
      unlinkSync("test-readinglist.json"); // delete the file
    });
  });
});
