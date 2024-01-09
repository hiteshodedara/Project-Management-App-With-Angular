import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacehomeComponent } from './workspacehome.component';

describe('WorkspacehomeComponent', () => {
  let component: WorkspacehomeComponent;
  let fixture: ComponentFixture<WorkspacehomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspacehomeComponent]
    });
    fixture = TestBed.createComponent(WorkspacehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
