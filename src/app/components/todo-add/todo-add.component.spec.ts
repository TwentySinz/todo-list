import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { Todo } from 'src/app/models/Todo';
import { By } from '@angular/platform-browser';

import { TodoAddComponent } from './todo-add.component';

describe('TodoAddComponent', () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TodoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Output(s)', () => {

    it(`should be 'addTodo'`, () => {
      const addTodoMock: Todo = new Todo(1, 101, 'new title', false);
      spyOn(component.addTodo, 'emit');
      component.addTodo.emit(addTodoMock);
      expect(component.addTodo.emit).toHaveBeenCalledOnceWith(addTodoMock);
    });
  });

  describe('Form', () => {

    it('should exist', () => {
      const formExpected: HTMLFormElement = fixture.debugElement.query(By.css('form')).nativeElement;
      expect(formExpected).toBeTruthy();
    });

    it('should have text-input field', () => {
      const inputExpected: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputExpected).toBeTruthy();
      expect(inputExpected.type).toBe('text');
    });

    it('should have submit button', () => {
      const btnExpected: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(btnExpected).toBeTruthy();
      expect(btnExpected.type).toBe('submit');
    });

    it(`should save input text in class variable 'title'`, async () => {
      await fixture.whenStable();
      const inputExpected: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      inputExpected.value = 'new Todo';
      inputExpected.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.title).toEqual('new Todo');
    });

    it(`should emit 'addTodo' on click submit button`, () => {
      const todoNewExpected = {
        userId: 1,
        title: 'new Todo',
        completed: false
      };
      const btnExpected: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      spyOn(component.addTodo, 'emit');
      component.title = 'new Todo';
      btnExpected.click();
      expect(component.addTodo.emit).toHaveBeenCalledOnceWith(todoNewExpected);
    });
  });
});
