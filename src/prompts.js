const inquirer = require("inquirer");

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
  let answer = "";
  while (!answer.length) {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "query",
        message: "Please enter your Google Book query:",
      },
    ]);
    answer = response.query;
    if (!answer.length) console.log("Please provide a query");
  }
  return answer;
}

// format books for selection by inquirer
const selectBook = async (books) => {
  const choices = books.reduce((acc, book, idx) => {
    acc.push({ value: idx, name: book.print() });
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

module.exports = {
  getAction,
  getQuery,
  selectBook,
};
