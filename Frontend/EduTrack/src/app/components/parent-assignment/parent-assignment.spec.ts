import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAssignment } from './parent-assignment';

describe('ParentAssignment', () => {
  let component: ParentAssignment;
  let fixture: ComponentFixture<ParentAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
