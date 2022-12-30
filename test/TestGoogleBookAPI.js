const expect = require("chai").expect;
const axios = require("axios");
const sinon = require("sinon");
const GoogleBookAPI = require("../src/GoogleBookAPI");
const fakeResponse = require("./fakeAxiosResponse");

describe("Test GoogleBookApi", () => {
  describe("test valid response", () => {
    it("returns the expected books", async () => {
      sinon
        .stub(axios, "get")
        .resolves(Promise.resolve({ status: 200, data: fakeResponse }));
      const api = new GoogleBookAPI();
      const books = await api.getBooks("dog");
      expect(books[0].title).to.equal("The Dog Bible");
      expect(books[1].title).to.equal("Dog Is Love");
      expect(books[2].title).to.equal("My Dog Skip");
      expect(books[3].title).to.equal("How to Teach Relativity to Your Dog");
      expect(books[4].title).to.equal("Barron's Dog Training Bible");
      axios.get.restore();
    });
  });

  describe("test 500 error", () => {
    it("prints the error", async () => {
      sinon.stub(axios, "get").resolves(Promise.resolve({ status: 500 }));
      sinon.stub(console, "log");
      const api = new GoogleBookAPI();
      const books = await api.getBooks("query");
      expect(books).to.deep.equal([]);
      expect(console.log.getCall(0).args[0]).to.equal(
        "Error when getting books from google api code 500"
      );
      console.log.restore();
      axios.get.restore();
    });
  });

  describe("test timeout error", () => {
    it("prints the error", async () => {
      sinon.stub(axios, "get").throws({ code: "ECONNABORTED" });
      sinon.stub(console, "log");
      const api = new GoogleBookAPI();
      const books = await api.getBooks("query");
      expect(books).to.deep.equal([]);
      expect(console.log.getCall(0).args[0]).to.equal(
        "Connection error, are you connected to the internet?"
      );
      console.log.restore();
      axios.get.restore();
    });
  });

  describe("test other errors", () => {
    it("prints the error with the error code", async () => {
      sinon.stub(axios, "get").throws({ code: "test error" });
      sinon.stub(console, "log");
      const api = new GoogleBookAPI();
      const books = await api.getBooks("query");
      expect(books).to.deep.equal([]);
      expect(console.log.getCall(0).args[0]).to.equal(
        "Error when calling GoogleBooks api: test error"
      );
      console.log.restore();
      axios.get.restore();
    });
  });
});
