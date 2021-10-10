import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeConfiguratorComponent } from './attribute-configurator.component';

describe('AttributeConfiguratorComponent', () => {
  let component: AttributeConfiguratorComponent;
  let fixture: ComponentFixture<AttributeConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeConfiguratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
