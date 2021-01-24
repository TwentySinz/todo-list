import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo): void {
    // delete in UI
    this.todos = this.todos.filter(todoToDelete => todoToDelete.id !== todo.id );
    // delete on server
    this.todoService.deleteTodo(todo).subscribe(deleted => { console.log('Deleted Todo from server'); });
  }

  addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe( todoNew => {
      this.todos.push(todoNew);
      console.log(todoNew);
    });
  }

}
