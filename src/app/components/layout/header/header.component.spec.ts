import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'app-host-component',
    template: '<app-header></app-header>'
  })
  class TestHostComponent{
    @ViewChild(HeaderComponent)
    public headerComponent!: HeaderComponent;
  }

  @Component({
    template: ''
  })
  class HomeComponentMock{}

  @Component({
    template: ''
  })
  class AboutComponentMock{}

  const titleMock = 'testTitle';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TestHostComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: '', component: HomeComponentMock},
            {path: 'about', component: AboutComponentMock}
          ]
        )
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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

    it(`should be 'title' from parent component`, () => {
      testHostComponent.headerComponent.title = titleMock;
      expect(testHostComponent.headerComponent.title).toEqual(titleMock);
    });
  });

  describe('Title', () => {

    it('should be rendered in h1 tag', () => {
      component.title = titleMock;
      const titleExpected: HTMLHeadingElement = fixture.debugElement.query(By.css('h1')).nativeElement;
      fixture.detectChanges();
      expect(titleExpected.textContent).toEqual(titleMock);
    });
  });

  describe('Navigation', () => {

    it(`should have first link 'Home'`, () => {
      const navLinks: DebugElement[] = fixture.debugElement.query(By.css('nav')).queryAll(By.css('a'));
      expect(navLinks[0].nativeElement.textContent).toEqual('Home');
    });

    it(`should have second link 'About'`, () => {
      const navLinks: DebugElement[] = fixture.debugElement.query(By.css('nav')).queryAll(By.css('a'));
      expect(navLinks[1].nativeElement.textContent).toEqual('About');
    });

    it(`should navigate from 'Home' to 'About' on click about-link`, () => {
      const location: Location = TestBed.inject(Location);
      const aboutLink: HTMLLinkElement = fixture.debugElement.query(By.css('nav')).queryAll(By.css('a'))[1].nativeElement;
      expect(location.path()).toEqual('');
      aboutLink.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/about');
      });
    });

    it(`should navigate from 'About' to 'Home' on click home-link`, fakeAsync( () => {
      const location: Location = TestBed.inject(Location);
      const aboutLink: HTMLLinkElement = fixture.debugElement.query(By.css('nav')).queryAll(By.css('a'))[1].nativeElement;
      const homeLink: HTMLLinkElement = fixture.debugElement.query(By.css('nav')).queryAll(By.css('a'))[0].nativeElement;
      aboutLink.click();
      tick();
      fixture.detectChanges();
      expect(location.path()).toEqual('/about');
      homeLink.click();
      tick();
      fixture.detectChanges();
      expect(location.path()).toEqual('/');
    }));
  });
});
