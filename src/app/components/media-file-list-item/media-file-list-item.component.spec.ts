import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFileListItemComponent } from './media-file-list-item.component';

describe('MediaFileListItemComponent', () => {
  let component: MediaFileListItemComponent;
  let fixture: ComponentFixture<MediaFileListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaFileListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFileListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
