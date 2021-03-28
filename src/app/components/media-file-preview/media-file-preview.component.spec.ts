import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFilePreviewComponent } from './media-file-preview.component';

describe('MediaFilePreviewComponent', () => {
  let component: MediaFilePreviewComponent;
  let fixture: ComponentFixture<MediaFilePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaFilePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
