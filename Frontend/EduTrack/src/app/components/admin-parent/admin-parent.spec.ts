import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParent } from './admin-parent';

describe('AdminParent', () => {
  let component: AdminParent;
  let fixture: ComponentFixture<AdminParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminParent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminParent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
