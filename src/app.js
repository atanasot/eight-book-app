const GoogleBookAPI = require("./GoogleBookAPI");
const ReadingList = require("./ReadingList");
const { getAction, getQuery, selectBook } = require("./prompts");

const bookAPI = new GoogleBookAPI();
const readingList = new ReadingList();

const main = async () => {
  console.log("Welcome to the BookSearchApp!");
  const action = await getAction();
  if (action === "search") {
    // make a call to Google Books API
    const query = await getQuery();
    const books = await bookAPI.getBooks(query);
    const newBookIndex = await selectBook(books);
    readingList.openReadingList();
    if (readingList.addBook(books[newBookIndex])) readingList.saveReadingList();
  } else if (action === "view") {
    // print a list of all saved books
    readingList.openReadingList();
    console.log(readingList.printReadingList());
  }
};

main();
