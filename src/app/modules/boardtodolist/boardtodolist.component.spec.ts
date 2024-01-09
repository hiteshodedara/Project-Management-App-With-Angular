import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardtodolistComponent } from './boardtodolist.component';

describe('BoardtodolistComponent', () => {
  let component: BoardtodolistComponent;
  let fixture: ComponentFixture<BoardtodolistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardtodolistComponent]
    });
    fixture = TestBed.createComponent(BoardtodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
