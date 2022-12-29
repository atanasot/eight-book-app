const GoogleBookAPI = require("./GoogleBookAPI");
const ReadingList = require("./ReadingList");
const { getAction, getQuery, selectBook } = require("./prompts");

const bookAPI = new GoogleBookAPI();
const readingList = new ReadingList();

const main = async () => {
  console.log("Welcome to the BookSearchApp!");
  while (true) {
    const action = await getAction();
    if (action == 1) {
      // make a call to Google Books API
      const query = await getQuery();
      const books = await bookAPI.getBooks(query);
      if (!books.length) {
        console.log("No books found, please try again with a different query.");
        continue;
      }
      const newBookIndex = await selectBook(books);
      readingList.openReadingList();
      if (readingList.addBook(books[newBookIndex]))
        readingList.saveReadingList();
    } else if (action == 2) {
      //print a list of all saved books
      readingList.openReadingList();
      if (!readingList.readingList.length) {
        console.log("You have no books added to your reading list!");
        continue;
      }
      console.log("\nHere is your list of saved books:");
      console.log(readingList.printReadingList());
    } else if (action == 3) {
      // quit the program
      console.log("Bye!");
      return;
    }
  }
};

main();
