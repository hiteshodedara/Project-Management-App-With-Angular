import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardShowComponent } from './board-show.component';

describe('BoardShowComponent', () => {
  let component: BoardShowComponent;
  let fixture: ComponentFixture<BoardShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardShowComponent]
    });
    fixture = TestBed.createComponent(BoardShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
