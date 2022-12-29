const { createInterface } = require("readline");

const readLineAsync = async (msg) => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const response = new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes);
    });
  });
  await response;
  readline.close();
  return response;
};

const getAction = async () => {
  try {
    console.log(
      "\nWhat would you like to do?\n1) Search Google Books.\n2) View Reading List.\n3) Quit.\n"
    );
    let userRes = "";
    while (true) {
      userRes = await readLineAsync("Enter selection: ");
      if (userRes == 1 || userRes == 2 || userRes == 3) {
        return userRes;
      }
      console.log("Please select from options 1, 2, or 3.");
    }
  } catch (err) {
    console.log(err);
  }
};

async function getQuery() {
  let answer = "";
  while (!answer.length) {
    answer = await readLineAsync(
      '\nYou selected "Search Google Books". Please enter your query: '
    );

    if (!answer.length) console.log("Please provide a query!");
  }
  return answer;
}

const selectBookOrBooks = async (books) => {
  const choices = books.reduce((acc, book, idx) => {
    acc.push({ value: idx, name: book.print() });
    return acc;
  }, []);

  choices.map((choice) => console.log(`${choice.value + 1}) ${choice.name}`));
  console.log(
    "Here are your books! Choose one or more (separate by a comma) to add to reading list (or enter 'none')"
  );

  while (true) {
    let answer = await readLineAsync("Enter book selection: ");
    if (answer === "none") {
      return new Set();
    } else if (!answer.length) {
      console.log("No response found, please enter a valid reponse");
    } else {
      let selection = answer.split(",");
      let setSelection = new Set(selection);
      let valid = true;
      for (let entry of setSelection) {
        entry *= 1;
        if (entry - 1 >= choices.length || entry - 1 < 0 || isNaN(entry)) {
          console.log(
            "Invalid input, one or more (separate by a comma) books to add to reading list (or enter 'none')"
          );
          valid = false;
          break;
        }
      }
      if (valid) return setSelection;
    }
  }
};

module.exports = {
  getAction,
  getQuery,
  selectBookOrBooks,
};
