const expect = require("chai").expect;

const { validateBookSelection } = require("../src/prompts");

describe("Test prompts", () => {
  describe("test validateBookSelection", () => {
    it("returns empty set with none input", () => {
      expect(validateBookSelection("none", 5)).to.deep.equal(new Set());
    });

    it("prints error message with bad input", () => {
      expect(() => validateBookSelection("asdf", 5)).to.throw(
        "Invalid input, one or more (separate by a comma) books to add to reading list (or enter 'none')."
      );
    });

    it("prints error message with a book index out of range", () => {
      expect(() => validateBookSelection("6", 5)).to.throw(
        "Invalid input, one or more (separate by a comma) books to add to reading list (or enter 'none')."
      );
    });

    it("prints error message with no input", () => {
      expect(() => validateBookSelection("", 5)).to.throw(
        "No response found, please enter a valid reponse"
      );
    });

    it("returns a set of book indices if input passes validation checks", () => {
      expect(validateBookSelection("1,     3, 4", 5)).to.deep.equal(
        new Set(["1", "3", "4"])
      );
    });
  });
});
