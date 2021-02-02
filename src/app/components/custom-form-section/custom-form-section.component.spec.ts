import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormSectionComponent } from './custom-form-section.component';

describe('CustomFormSectionComponent', () => {
  let component: CustomFormSectionComponent;
  let fixture: ComponentFixture<CustomFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
