import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePickerFormComponent } from './image-picker-form.component';

describe('ImagePickerFormComponent', () => {
  let component: ImagePickerFormComponent;
  let fixture: ComponentFixture<ImagePickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePickerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
