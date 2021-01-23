import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string;
  todosLimitParam: string;

  constructor(private http: HttpClient) {
    this.todosUrl = 'https://jsonplaceholder.typicode.com/todos';
    this.todosLimitParam = '?_limit=10';
   }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimitParam}`);
  }
}