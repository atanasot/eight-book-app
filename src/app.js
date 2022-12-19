const inquirer = require('inquirer')

const main = async () => {
    console.log("Welcome to the BookSearchApp!")
    const action = await getAction()
    if (action === "search") {
        // make a call to Google Books API
    } else if (action === "view") {
        // print a list of all saved books
    }
}

// This function lets the user select an option
const getAction = async() => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: "What would you like to do?",
            choices: [
                {value: "search", name: "Search Google Books"},
                {value: "view", name: "View saved reading list"}
            ]
        }
    ])
    return answer.action
}

main()