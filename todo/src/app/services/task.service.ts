import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from '../task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: Task[] = [];
  todayTasks: Task[] = [];
  upcomingTasks: Task[] = [];

  // private url = 'http://localhost:81/api/v1/ToDo';
  // private url = 'http://localhost:5050/api/v1/Todo';
  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned a code: ${
        err.status
      }, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.origin).pipe(
      tap(data => (this.taskList = data)),
      catchError(this.handleError)
    );
  }

  getTodayTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.origin + '/todayTasks').pipe(
      tap(data => (this.todayTasks = data)),
      catchError(this.handleError)
    );
  }

  getUpcomingTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.origin + '/upcomingTasks').pipe(
      tap(data => (this.upcomingTasks = data)),
      catchError(this.handleError)
    );
  }

  newTask(task) {
    return this.http.post<Task>(environment.origin + '/create', task).pipe(
      tap(data => console.log('New Task' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editTask(task) {
    return this.http.post<Task>(environment.origin + '/edit', task).pipe(
      tap(data => console.log('Edit Task' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteTask(taskId) {
    return this.http.get(environment.origin + '/delete/' + taskId).pipe(
      tap(data => console.log('Delete Task' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
}
