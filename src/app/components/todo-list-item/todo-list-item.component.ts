import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private todoService: TodoService) {
    this.todo = new Todo(0, 0, '', false);
  }

  ngOnInit(): void {
  }

  toggleCompleted(todo: Todo): void {
    // Toggle in UI
    this.todo.completed = !todo.completed;
    // Toggle on Server
    this.todoService.toggleCompleted(this.todo).subscribe(todoAnswer => console.log(todoAnswer));
  }

  setCssClasses(): any {
    const classes = {
      'is-completed': this.todo.completed
    };

    return classes;
  }

}
