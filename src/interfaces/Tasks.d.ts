export interface ITask {
    id: string;
    description: string;
    completedOn: string | null;
}

export interface ITasksList {
    [key: string]: ITask;
}

export interface ITasks {
    _list: ITasksList;
    createTask: (description: string) => void;
}
