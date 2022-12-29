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

const selectBook = async (books) => {
  const choices = books.reduce((acc, book, idx) => {
    acc.push({ value: idx, name: book.print() });
    return acc;
  }, []);

  choices.map((choice) => console.log(`${choice.value + 1}) ${choice.name}`));
  let answer = await readLineAsync(
    "Here are your books! Choose one to add to reading list: "
  );
  answer *= 1;
  while (answer - 1 >= choices.length || answer - 1 < 0 || isNaN(answer)) {
    answer = await readLineAsync(
      "Please enter a book with the correct index in front of it: "
    );
    answer *= 1;
  }

  return answer - 1;
};

module.exports = {
  getAction,
  getQuery,
  selectBook,
};
