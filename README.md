# BookSearchApp

This is a command line application that prompts the user to search for books using the Google Book API and constructs a reading list based on user's selections.

---

## Geting Started

### Installation

You must have Git and Node installed prior to running the app.

1. Clone the project:

   `git clone https://github.com/atanasot/eight-book-app.git`

2. Navigate to the repo folder and run `npm install`

---

### Run the app

Start the application with `npm start` and follow the prompts on the command line. You can either search google books for new books, view your reading list, or exit the program.

When searching for books you will see `You selected "Search Google Books". Please enter your query: *query goes here*`. Your `query` searches for books with that string contained anywere in the book information such as the title, author, publisher, content etc. A few special keywords can be used to search for specific parts of the book:

- `intitle:query` search for a query word that is contained in the title of the book
- `inauthor:query` search for a query word that is contained in the author of the book
- `inpublisher:query` search for a query word that is contained in the publisher of the book

For example, try `inauthor:pamuk` to search for books by Orhan Pamuk. The first 5 results will be displayed and you can select one or multiple books by typing the book indices separted by a comma, or enter `none` to not select any.

To view the reading list you can select `View Reading List`. This will display a list of all your books that are saved on your computer's disk. To add a book to the reading list, simply select the book while using the search option for books as described up above.

To quit the program select option 3) Quit.

---

## Testing

Run `npm test` for testing.

---

## Approach

The app prompts the user to select an action. The user can either search for a book to add to their reading list, view their saved reading list, or exit the app. Once the user types in their query for searching books, the Google Book API returns 5 results containing the query. The user can select one or multiple of the five books by typing in the book indices, or no books by entering `none`. This will save the books on the user's computer hard disk by creating a file called "myBooks.json". The user can view the list of their saved books by selecting the second option on the main menu. The program will always return to the main menu but can be terminated by selecting option 3) Quit.

---

## Technologies

- JavaScript
- `readline` - Node built-in module for reading user input
- `fs` - Node package used to save and open reading list to disk
- `mocha` - Testing framework
- `chai` - Used for testing
- `sinon` - Used to stub functions for testing
- `mock-stdin` - Used to fake user input for testing
