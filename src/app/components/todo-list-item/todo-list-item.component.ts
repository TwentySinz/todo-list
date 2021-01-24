import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: Todo;

  constructor() {
    this.todo = new Todo(0, 0, '', false);
  }

  ngOnInit(): void {
  }

  toggleCompleted(): void {
    this.todo.completed = !this.todo.completed;
  }

  setCssClasses(): any {
    const classes = {
      'is-completed': this.todo.completed
    };

    return classes;
  }

}
