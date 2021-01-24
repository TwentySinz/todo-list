import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo>;

  constructor(private todoService: TodoService) {
    this.todo = new Todo(0, 0, '', false);
    this.deleteTodo = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onToggleCompleted(todo: Todo): void {
    // Toggle in UI
    this.todo.completed = !todo.completed;
    // Toggle on Server
    this.todoService.toggleCompleted(this.todo).subscribe(todoAnswer => console.log(todoAnswer));
  }

  onDeleteTodo(todo: Todo): void{
    this.deleteTodo.emit(todo);
  }

  setCssClasses(): any {
    const classes = {
      'is-completed': this.todo.completed
    };

    return classes;
  }

}
