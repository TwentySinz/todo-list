import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponent } from './todo-list-item.component';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, of } from 'rxjs';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'app-host-component',
    template: '<app-todo-list-item></app-todo-list-item>'
  })
  class TestHostComponent{
    @ViewChild(TodoListItemComponent)
    public todoListItemComponent!: TodoListItemComponent;
  }
  class TodoServiceMock {
    getTodos(): Observable<Todo[]> {
      return of([new Todo(1, 1, 'title', false)]);
    }
    toggleCompleted(todo: Todo): Observable<any> {
      return of('has been called');
    }
  }

  const todoMock = new Todo(1, 1, 'title', true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListItemComponent,
        TestHostComponent
      ],
      providers: [{
        provide: TodoService,
        useClass: TodoServiceMock
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input(s)', () => {

    it('should be Todo from parent component', () => {
      testHostComponent.todoListItemComponent.todo = todoMock;
      expect(testHostComponent.todoListItemComponent.todo).toEqual(todoMock);
    });
  });

  describe('Output(s)', () => {

    it('should emit Todo to delete', () => {
      spyOn(component.deleteTodo, 'emit');
      component.onDeleteTodo(todoMock);
      expect(component.deleteTodo.emit).toHaveBeenCalledWith(todoMock);
    });
  });

  describe('Todo title', () => {

    it('should be rendered', () => {
      component.todo = todoMock;
      fixture.detectChanges();
      const todoTitle: HTMLSpanElement = fixture.debugElement.query(By.css('span[class = todo-title]')).nativeElement;
      expect(todoTitle.textContent).toEqual(todoMock.title);
    });
  });

  describe('Todo checkbox', () => {

    it('should be input element rendered as checkbox', () => {
      const checkboxExpected: HTMLInputElement = fixture.debugElement.query(By.css('input[class = checkbox]')).nativeElement;
      expect(checkboxExpected.type).toEqual('checkbox');
    });

    it(`should be checked if 'todo.completed' is true`, () => {
      component.todo.completed = true;
      fixture.detectChanges();
      const checkboxExpected: HTMLInputElement = fixture.debugElement.query(By.css('input[class = checkbox]')).nativeElement;
      expect(checkboxExpected.checked).toBeTruthy();
    });

    it(`should be unchecked if 'todo.completed' is false`, () => {
      component.todo.completed = false;
      fixture.detectChanges();
      const checkboxExpected: HTMLInputElement = fixture.debugElement.query(By.css('input[class = checkbox]')).nativeElement;
      expect(checkboxExpected.checked).toBeFalsy();
    });

    it(`should call 'onToggleCompleted' on change if 'todo.completed' is false`, () => {
      spyOn(component, 'onToggleCompleted');
      component.todo.completed = false;
      fixture.detectChanges();
      const checkboxExpected: DebugElement = fixture.debugElement.query(By.css('input[class = checkbox]'));
      checkboxExpected.triggerEventHandler('change', {});
      fixture.detectChanges();
      expect(component.onToggleCompleted).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onToggleCompleted' on change if 'todo.completed' is true`, () => {
      spyOn(component, 'onToggleCompleted');
      component.todo.completed = true;
      fixture.detectChanges();
      const checkboxExpected: DebugElement = fixture.debugElement.query(By.css('input[class = checkbox]'));
      checkboxExpected.triggerEventHandler('change', {});
      fixture.detectChanges();
      expect(component.onToggleCompleted).toHaveBeenCalledTimes(1);
    });

  });

  describe('Todo delete button', () => {

    it('should be rendered', () => {
      const btnExpected: HTMLButtonElement = fixture.debugElement.query(By.css('button[class = delete-button]')).nativeElement;
      expect(btnExpected).toBeTruthy();
    });

    it('should emit Todo to delete on click', () => {
      spyOn(component.deleteTodo, 'emit');
      fixture.debugElement.query(By.css('button[class = delete-button]')).nativeElement.click(component.onDeleteTodo(todoMock));
      expect(component.deleteTodo.emit).toHaveBeenCalledWith(todoMock);
    });
  });

  describe('Method onToggleCompleted', () => {

    it(`should toggle 'todo.completed'`, () => {
      component.todo.completed = true;
      component.onToggleCompleted(new Todo(1, 1, 'title', true));
      fixture.detectChanges();
      expect(component.todo.completed).toEqual(false);
    });

    it('should call toggle service', () => {
      const todoServiceMock: TodoServiceMock = TestBed.inject(TodoService);
      spyOn(todoServiceMock, 'toggleCompleted').and.callThrough();
      component.onToggleCompleted(new Todo(1, 1, 'title', true));
      fixture.detectChanges();
      expect(todoServiceMock.toggleCompleted).toHaveBeenCalledTimes(1);
    });
  });

  describe('Method setCssClasses', () => {

    it(`should set css class 'is-completed' depending on 'todo.completed'`, () => {
      component.todo.completed = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('div')).classes['is-completed']).toBeTruthy();
      component.todo.completed = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('div')).classes['is-completed']).toBeFalsy();
    });
  });

});
