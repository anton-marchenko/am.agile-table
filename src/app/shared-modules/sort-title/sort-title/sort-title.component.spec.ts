import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortTitleComponent } from './sort-title.component';

describe('SortTitleComponent', () => {
  let component: SortTitleComponent;
  let fixture: ComponentFixture<SortTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
