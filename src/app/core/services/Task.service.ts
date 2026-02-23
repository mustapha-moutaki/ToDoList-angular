import { inject, Injectable } from "@angular/core";
import { TaskApi } from "../api/task.api";
import { Task } from "../model/Task";


@Injectable({providedIn: 'root'})
export class TaskService{


    private readonly taskApi = inject(TaskApi);

    createTask(task : Task){
        return this.taskApi.createTask(task);
    }

    getAllTasks(){
        return this.taskApi.getAll();
    }


}