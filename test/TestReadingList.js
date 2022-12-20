const expect = require("chai").expect;
const ReadingList = require("../src/ReadingList");
const { unlinkSync } = require("fs");

describe("ReadingList class", () => {
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
      const book = {
        id: 1,
        title: "My Book",
        author: "Lina R.",
        publisher: "Publishing House",
      };
      testReadingList.addBook(book);
      expect(testReadingList.readingList).to.be.deep.equal([book]);
    });
  });

  describe("openReadingList and saveReadingList", () => {
    it("open and save reading list", () => {
      const testReadingList = new ReadingList(
        (filelocation = "test-readinglist.json")
      );
      const book = {
        id: 1,
        title: "My Book",
        author: "Lina R.",
        publisher: "Publishing House",
      };
      testReadingList.addBook(book);
      testReadingList.saveReadingList(book);

      const newReadingList = new ReadingList(
        (fileLocation = "test-readinglist.json")
      );
      newReadingList.openReadingList();
      expect(newReadingList.readingList).to.be.deep.equal([book]);
      unlinkSync("test-readinglist.json"); // delete the file
    });
  });
});
