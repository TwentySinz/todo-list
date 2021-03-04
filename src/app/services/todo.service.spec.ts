import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Todo } from '../models/Todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestCtrl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Todos', () => {
    const todosMock = [
      new Todo(1, 1, 'title1', true),
      new Todo(1, 2, 'title2', false)
    ];

    service.getTodos().subscribe(result => {
      expect(todosMock).toBe(result);
    });
    const req = httpTestCtrl.expectOne(`${service.todosUrl}${service.todosLimitParam}`);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');
    req.flush(todosMock);
  });

  it('should toggle Todo completed', () => {
    const todoMock = new Todo(1, 1, 'title', true);
    service.toggleCompleted(todoMock).subscribe(result => {
      expect(todoMock).toBe(result);
    });
    const req = httpTestCtrl.expectOne(`${service.todosUrl}/${todoMock.id}`);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('PUT');
    expect(req.request.responseType).toEqual('json');
    req.flush(todoMock);
  });

  it('should delete Todo', () => {
    const todoMock = new Todo(1, 1, 'title', true);
    service.deleteTodo(todoMock).subscribe(result => {
      expect(todoMock).toBe(result);
    });
    const req = httpTestCtrl.expectOne(`${service.todosUrl}/${todoMock.id}`);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('DELETE');
    expect(req.request.responseType).toEqual('json');
    req.flush(todoMock);
  });

  it('should add Todo', () => {
    const todoMock = new Todo(1, 101, 'new todo', true);
    service.addTodo(todoMock).subscribe(result => {
      expect(todoMock).toBe(result);
    });
    const req = httpTestCtrl.expectOne(service.todosUrl);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(todoMock);
  });
});
