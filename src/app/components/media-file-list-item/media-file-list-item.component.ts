import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MediaFile } from 'src/app/models/MediaManagement';

@Component({
  selector: 'app-media-file-list-item',
  templateUrl: './media-file-list-item.component.html',
  styleUrls: ['./media-file-list-item.component.scss'],
})
export class MediaFileListItemComponent implements OnInit {
  @Input() file: MediaFile;
  @Output() onSelect: EventEmitter<MediaFile> = new EventEmitter<MediaFile>();

  menuItems: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Delete File',
      },
    ];
  }

  /**
   * emit file open event
   */
  emitFileOpen(): void {
    this.onSelect.emit(this.file);
  }
}
