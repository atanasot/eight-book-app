const inquirer = require("inquirer");
const GoogleBookAPI = require("./GoogleBookAPI");
const ReadingList = require("./ReadingList");

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
  }
};

// This function lets the user select an option
const getAction = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { value: "search", name: "Search Google Books" },
        { value: "view", name: "View saved reading list" },
      ],
    },
  ]);
  return answer.action;
};

async function getQuery() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "query",
      message: "Please enter your Google Book query:",
    },
  ]);
  return answer.query;
}

// format books for selection by inquirer
const selectBook = async (books) => {
  const choices = books.reduce((acc, book, idx) => {
    acc.push({ value: idx, name: bookAPI.printBook(book) });
    return acc;
  }, []);

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "bookSelection",
      message: "Here are your books! Choose one to add to reading list:",
      choices,
    },
  ]);
  return answer.bookSelection;
};

main();
