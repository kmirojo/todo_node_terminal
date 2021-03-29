import { v4 as uuidV4 } from "uuid";
import { ITask } from "../interfaces/Tasks";

class Task implements ITask {
    public id: string;
    public description: string;
    public completedOn: string | null;

    constructor(description: string) {
        this.id = uuidV4();
        this.description = description;
        this.completedOn = null;
    }
}

export default Task;
