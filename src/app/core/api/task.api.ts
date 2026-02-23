import { HttpClient } from "@angular/common/http";
import { Inject, inject, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Task } from "../model/Task";

@Injectable({providedIn: 'root'})

export class TaskApi{
     private readonly BASE_URL =  'http://localhost:3000';
    private readonly http = inject(HttpClient);

    createTask(task: Task): Observable<Task | null>{
        return this.http.post<Task>(`${this.BASE_URL}/tasks`, task).pipe(
            catchError((err)=>{
                console.log("this is the error", err);
                 return of (null)
            })
           
        )
    }

    getAll():Observable<Task []>{
        return this.http.get<Task[] | []>(`${this.BASE_URL}/tasks`)
    }
}