import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have at least one headline h2', () => {
    const headlnExpected: DebugElement[] = fixture.debugElement.queryAll(By.css('h2'));
    expect(headlnExpected.length >= 1).toBeTruthy();
  });

  it('should have at least one paragraph', () => {
    const prghExpected: DebugElement[] = fixture.debugElement.queryAll(By.css('p'));
    expect(prghExpected.length >= 1).toBeTruthy();
  });

  describe('First headline', () => {

    it(`should be 'About'`, () => {
      const headlnExpected: DebugElement[] = fixture.debugElement.queryAll(By.css('h2'));
      expect(headlnExpected[0].nativeElement.textContent).toEqual('About');
    });
  });
});
