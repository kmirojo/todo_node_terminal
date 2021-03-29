import readlinePkg from "readline";
import { TPause, TShowMenu } from "../interfaces/messages"

export const showMenu: TShowMenu = () => {
    return new Promise((resolve) => {
        console.clear();
        console.log("==============================".green);
        console.log("      Select an Option");
        console.log("==============================".green);

        console.log("\n"); // Console Break Line

        console.log(`${"1.".green} Create task`);
        console.log(`${"2.".green} List tasks`);
        console.log(`${"3.".green} List completed tasks`);
        console.log(`${"4.".green} List pending tasks`);
        console.log(`${"5.".green} Complete task(s)`);
        console.log(`${"6.".green} Delete task`);
        console.log(`${"0.".green} exit`);

        console.log("\n"); // Console Break Line

        // Readline allow the user to interact with the console
        const readLine = readlinePkg.createInterface({
            input: process.stdin, // User's input information
            output: process.stdout, // Output message or data for the user
        });

        readLine.question("Select an option:", (option) => {
            readLine.close();
            resolve(option);
        });
    });
};

export const pause: TPause = () => {
    return new Promise((resolve) => {
        // Readline allow the user to interact with the console
        const readLine = readlinePkg.createInterface({
            input: process.stdin, // User's input information
            output: process.stdout, // Output message or data for the user
        });

        readLine.question(`\nPress ${"ENTER".green}\n`, (option) => {
            readLine.close();
            resolve();
        });
    });
};
