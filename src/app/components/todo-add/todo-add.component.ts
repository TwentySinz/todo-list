import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  @Output() addTodo: EventEmitter<any>;
  title: string;

  constructor() {
    this.title = '';
    this.addTodo = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const todoNew = {
      userId: 1,
      title: this.title,
      completed: false
    };
    this.addTodo.emit(todoNew);
    this.title = '';
  }

}
