import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, of } from 'rxjs';
import { Component, Input } from '@angular/core';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  @Component({
    selector: 'app-todo-add',
    template: '<p>app-todo-add</p>'
  })
  class TodoAddComponent{}

  @Component({
    selector: 'app-todo-list-item',
    template: '<p>app-todo-list-item</p>'
  })
  class TodoListItemComponent{
    @Input() todo!: Todo;
  }

  class TodoServiceMock {
    getTodos(): Observable<Todo[]> {
      return of([new Todo(1, 1, 'title', false)]);
    }
    deleteTodo(todo: Todo): Observable<Todo> {
      return of(todo);
    }
    addTodo(todo: Todo): Observable<Todo> {
      return of(todo);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        TodoAddComponent,
        TodoListItemComponent
      ],
      providers: [{
        provide: TodoService,
        useClass: TodoServiceMock
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Todos onInit', () => {
    const todosExpected: Todo[] = [new Todo(1, 1, 'title', false)];
    component.ngOnInit();
    expect(component.todos).toEqual(todosExpected);
  });

  describe('Method deleteTodo', () => {

    it('should delete Todo in UI', () => {
      const todosMock: Todo[] = [
        new Todo(1, 1, 'title1', false),
        new Todo(1, 2, 'title2', false)
      ];
      const todosExpected: Todo[] = [new Todo(1, 1, 'title1', false)];
      component.todos = todosMock;
      component.deleteTodo(todosMock[1]);
      expect(component.todos).toEqual(todosExpected);
    });

    it('should call deleteTodo service', () => {
      const todoServiceMock: TodoServiceMock = TestBed.inject(TodoService);
      const todosMock: Todo[] = [
        new Todo(1, 1, 'title1', false),
        new Todo(1, 2, 'title2', false)
      ];
      spyOn(todoServiceMock, 'deleteTodo').and.callThrough();
      component.todos = todosMock;
      component.deleteTodo(todosMock[0]);
      expect(todoServiceMock.deleteTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe('Method addTodo', () => {

    it('should add Todo', () => {
      const todosMock: Todo[] = [new Todo(1, 1, 'title1', false)];
      const todoAddMock: Todo = new Todo(1, 2, 'title2', false);
      const todosExpected: Todo[] = [
        new Todo(1, 1, 'title1', false),
        new Todo(1, 2, 'title2', false)
      ];
      component.todos = todosMock;
      component.addTodo(todoAddMock);
      expect(component.todos).toEqual(todosExpected);
    });
  });
});



