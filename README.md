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

Start the application with `npm start` and follow the prompts on the command line.

When searching for books you will see `Please enter your Google Book query: *query goes here*`. Your `query` searches for books with that string contained anywere in the book information such as the title, author, publisher, content etc. A few special keywords can be used to search for specific parts of the book:

- `intitle:query` search for a query word that is contained in the title of the book
- `inauthor:query` search for a query word that is contained in the author of the book
- `inpublisher:query` search for a query word that is contained in the publisher of the book

For example, try `inauthor:pamuk` to search for books by Orhan Pamuk.

When viewing the reading list, you can select `View saved reading list`. This will display a list of all your books that are saved on your computer's disk. To add a book to the reading list, simply select the book while using the search option for books as described up above.

---

## Testing

Run `npm test` for testing.

---

## Approach

The app prompts the user to select an action. The user can either search for a book to add to their reading list, or view their saved reading list. Once the user types in their query for searching books, the Google Book API returns 5 results containing the query. The user can select one of the five books by using the up and down arrows and pressing enter. This will save the book on the user's computer hard disk by creating a file called "myBooks.json". The user can view the list of their saved books by selecting the second prompt when starting the program.

---

## Technologies

- JavaScript
- `inquirer` - Used to prompt user for actions or queries
- `fs` - Used to save and open reading list to disk
- `chai` - Used for testing
