import "colors";
import {
    deleteConfirmation,
    deleteTaskList,
    inquirerMenu,
    pause,
    readInput,
    tasksCheckList,
} from "./helpers/inquirer";
import { readDb, saveDb } from "./helpers/saveFile";
import Task from "./models/Task";
import Tasks from "./models/Tasks";

async function main() {
    let option: string = "";
    const tasks = new Tasks();
    const tasksDb = readDb();

    if (tasksDb) {
        // Load tasks
        tasks.loadTasksFromArray(tasksDb);
    }

    do {
        // This functions prints the menu in the console
        option = await inquirerMenu();

        switch (option) {
            case "1":
                // Create Option
                const description = await readInput("Task's Description: ");
                tasks.createTask(description);
                break;

            case "2":
                tasks.fullTaskList();
                break;

            case "3":
                // List completed tasks
                tasks.listPendingCompletedTasks(true);
                break;

            case "4":
                // List pending tasks
                tasks.listPendingCompletedTasks(false);
                break;

            case "5":
                // Completed | Pending
                const ids = await tasksCheckList(tasks.listArr);
                tasks.toggleCompleted(ids);

                break;

            case "6":
                // Delete tasks
                const id = await deleteTaskList(tasks.listArr);
                if (id !== "0") {
                    const confirmation = await deleteConfirmation(
                        "Are you sure you want to delete this task?"
                    );
                    if (confirmation) {
                        tasks.deleteTask(id);
                        console.log("Task deleted");
                    }
                }
                break;
        }

        saveDb(tasks.listArr);

        if (option !== "0") await pause();
    } while (option !== "0");
}

main();
