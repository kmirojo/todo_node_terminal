import inquirer, { QuestionCollection } from "inquirer";
import Choices from "inquirer/lib/objects/choices";
import { ITask } from "../interfaces/Tasks";

const menuQuestions: QuestionCollection = [
    {
        type: "list",
        name: "option",
        message: "What do you want to do?",
        choices: [
            {
                value: "1",
                name: `${"1.".green} Create task`,
            },
            {
                value: "2",
                name: `${"2.".green} List tasks`,
            },
            {
                value: "3",
                name: `${"3.".green} List completed tasks`,
            },
            {
                value: "4",
                name: `${"4.".green} List pending tasks`,
            },
            {
                value: "5",
                name: `${"5.".green} Complete task(s)`,
            },
            {
                value: "6",
                name: `${"6.".green} Delete task`,
            },
            {
                value: "0",
                name: `${"0.".green} exit`,
            },
        ],
    },
];

export const inquirerMenu = async () => {
    // This function prints the menu in the console
    console.clear();

    console.log("==============================".green);
    console.log("      Select an Option");
    console.log("==============================".green);

    const { option } = await inquirer.prompt(menuQuestions);
    return option;
};

export const pause = async () => {
    const question: QuestionCollection = [
        {
            type: "input",
            name: "enter",
            message: `Press ${"ENTER".green} to continue`,
        },
    ];
    console.log("\n");
    await inquirer.prompt(question);
};

export const readInput = async (message: string) => {
    const question: QuestionCollection = [
        {
            type: "input",
            name: "description",
            message,
            validate(value: string) {
                if (value.length === 0) {
                    return "Please insert a value";
                }
                return true;
            },
        },
    ];

    const { description } = await inquirer.prompt(question);
    return description;
};

export const deleteTaskList = async (tasks: ITask[]) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${idx} ${task.description}`,
        };
    });

    choices.unshift({
        value: "0",
        name: "0.".green + "Cancelar",
    });

    const questions = [
        {
            type: "list",
            name: "id",
            message: "Delete",
            choices,
        },
    ];

    const { id } = await inquirer.prompt(questions);

    return id;
};

export const deleteConfirmation = async (message: string) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

export const tasksCheckList = async (tasks: ITask[]) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: task.completedOn ? true : false,
        };
    });

    const question = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selections",
            choices,
        },
    ];

    const { ids } = await inquirer.prompt(question);

    return ids;
};
