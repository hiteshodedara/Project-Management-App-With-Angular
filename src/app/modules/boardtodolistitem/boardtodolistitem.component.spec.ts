import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardtodolistitemComponent } from './boardtodolistitem.component';

describe('BoardtodolistitemComponent', () => {
  let component: BoardtodolistitemComponent;
  let fixture: ComponentFixture<BoardtodolistitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardtodolistitemComponent]
    });
    fixture = TestBed.createComponent(BoardtodolistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
