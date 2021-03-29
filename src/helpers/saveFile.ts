import fs from "fs";
import path from "path";
import { ITask } from "../interfaces/Tasks";

const filePath = path.join(__dirname, "../db/data.json");

export const saveDb = (data: ITask[]) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
};

export const readDb = () => {
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const info = fs.readFileSync(filePath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    return data;
};
