import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacemembersComponent } from './workspacemembers.component';

describe('WorkspacemembersComponent', () => {
  let component: WorkspacemembersComponent;
  let fixture: ComponentFixture<WorkspacemembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspacemembersComponent]
    });
    fixture = TestBed.createComponent(WorkspacemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
