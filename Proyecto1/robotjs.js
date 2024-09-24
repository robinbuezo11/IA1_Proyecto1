const robot = require('@hurdlegroup/robotjs')
const dotenv = require('dotenv')

dotenv.config()

const chatBot = (input) => {
    console.log(`Usuario: ${input}`);

    if(input.includes("buscar")) {
        const query = input.split("buscar ")[1];
        searchGoogle(query);
    } else if (input.includes("abrir")) {
        const app = input.split("abrir ")[1];
        openApplication(app);
    }
};

const searchGoogle = (query) => {
    robot.keyTap('command');
    robot.typeString(process.env.BROWSER);
    setTimeout(() => {
        robot.keyTap('enter');
        setTimeout(() => {
            robot.typeString(`${query}`);
            robot.keyTap('enter');
        }, process.env.ENTER_DELAY);
    }, process.env.ENTER_DELAY);
};

const openApplication = (appName) => {
    robot.keyTap('command');
    robot.typeString(appName);
    setTimeout(() => {
        robot.keyTap('enter')
    }, process.env.ENTER_DELAY);
}

module.exports = {
    chatBot,
    searchGoogle,
    openApplication,
}