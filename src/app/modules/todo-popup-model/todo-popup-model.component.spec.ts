import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPopupModelComponent } from './todo-popup-model.component';

describe('TodoPopupModelComponent', () => {
  let component: TodoPopupModelComponent;
  let fixture: ComponentFixture<TodoPopupModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoPopupModelComponent]
    });
    fixture = TestBed.createComponent(TodoPopupModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
