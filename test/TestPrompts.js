const expect = require("chai").expect;
const sinon = require("sinon");
const mockStdin = require("mock-stdin");
const Book = require("../src/Book");

const { getAction, getQuery, selectBookOrBooks } = require("../src/prompts");

describe("Test prompts", () => {
  let stdin;
  beforeEach(() => {
    sinon.stub(console, "log");
    stdin = mockStdin.stdin();
  });

  describe("getAction()", () => {
    it("prints error message with input out of range", async () => {
      let answer = getAction();
      stdin.send("4\n");
      setTimeout(() => {
        stdin.send("1\n");
      }, 100);

      expect(await answer).to.be.equal("1");
      expect(console.log.getCall(1).args[0]).to.equal(
        "Please select from options 1, 2, or 3."
      );
    });
  });

  describe("getQuery()", () => {
    it("if no query is provided, it prints a message", async () => {
      let answer = getQuery();
      stdin.send("\n");
      setTimeout(() => {
        stdin.send("cat\n");
      }, 100);

      expect(await answer).to.be.equal("cat");
      expect(console.log.getCall(0).args[0]).to.equal(
        "Please provide a query!"
      );
    });
  });

  const testBooks = [
    new Book(1, "Norwegian Wood", ["Haruki Murakami"], "Vintage"),
    new Book(
      2,
      "A Strangeness In My Mind",
      ["Orhan Pamuk"],
      "National Geographic Books"
    ),
  ];

  describe("selectBookOrBooks()", () => {
    it("prints a list of books formatted in a certain way", async () => {
      let answer = selectBookOrBooks(testBooks);
      stdin.send("1, 2\n");

      expect(await answer).to.be.deep.equal(new Set(["1", "2"]));
      expect(console.log.getCall(0).args[0]).to.equal(
        `1) ${testBooks[0].print()}`
      );
      expect(console.log.getCall(1).args[0]).to.equal(
        `2) ${testBooks[1].print()}`
      );
    });
  });

  afterEach(() => {
    console.log.restore();
    stdin.end();
  });
});
