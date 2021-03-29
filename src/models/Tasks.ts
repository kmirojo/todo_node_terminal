import { traceDeprecation } from "node:process";
import { ITask, ITasks, ITasksList } from "../interfaces/Tasks";
import Task from "./Task";

class Tasks implements ITasks {
    public _list: ITasksList;

    get listArr() {
        const list: Task[] = [];

        // Creates an array from the _list object
        Object.keys(this._list).forEach((key) => {
            const task = this._list[key];
            list.push(task);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    public loadTasksFromArray(tasks: ITask[]) {
        tasks.forEach((task) => {
            this._list[task.id] = task;
        });
    }

    public createTask(description: string) {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    public fullTaskList() {
        console.log("");
        this.listArr.forEach((task, index) => {
            const idx = `${index + 1}`.green;
            const { description, completedOn } = task;
            const status = completedOn ? "Completed".green : "Pending".red;

            console.log(`${idx} ${description} :: ${status}`);
        });
    }

    public listPendingCompletedTasks(completed: boolean) {
        console.log("");
        let counter = 0;

        this.listArr.forEach((task) => {
            const { description, completedOn } = task;
            const status = completedOn ? "Completed".green : "Pending".red;

            if (completed) {
                if (completedOn) {
                    counter += 1;
                    console.log(
                        `${
                            counter.toString().green
                        } ${description} :: ${status} :: ${completedOn}`
                    );
                }
            } else {
                if (!completedOn) {
                    counter += 1;
                    console.log(
                        `${
                            counter.toString().green
                        } ${description} :: ${status}`
                    );
                }
            }
        });
    }

    public deleteTask(taskId: string) {
        if (this._list[taskId]) {
            // If task exists
            delete this._list[taskId];
        }
    }

    public toggleCompleted(ids: string[]) {
        
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.completedOn) {
                task.completedOn = new Date().toISOString();
            }
        });

        
        this.listArr.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedOn = null;
            }
        });
    }
}

export default Tasks;
