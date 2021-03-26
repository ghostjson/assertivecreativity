import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFolderListItemComponent } from './media-folder-list-item.component';

describe('MediaFolderListItemComponent', () => {
  let component: MediaFolderListItemComponent;
  let fixture: ComponentFixture<MediaFolderListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaFolderListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFolderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
