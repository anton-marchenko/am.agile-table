import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowEditFormComponent } from './row-edit-form.component';

describe('RowEditFormComponent', () => {
  let component: RowEditFormComponent;
  let fixture: ComponentFixture<RowEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
