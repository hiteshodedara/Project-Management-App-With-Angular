import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopmenubarComponent } from './topmenubar.component';

describe('TopmenubarComponent', () => {
  let component: TopmenubarComponent;
  let fixture: ComponentFixture<TopmenubarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopmenubarComponent]
    });
    fixture = TestBed.createComponent(TopmenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
