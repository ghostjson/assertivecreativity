import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MediaFile } from 'src/app/models/MediaManagement';
import { AdminMediaManagerService } from 'src/app/services/admin-media-manager/admin-media-manager.service';

@Component({
  selector: 'app-media-file-list-item',
  templateUrl: './media-file-list-item.component.html',
  styleUrls: ['./media-file-list-item.component.scss'],
})
export class MediaFileListItemComponent implements OnInit {
  @Input() file: MediaFile;
  @Output() onSelect: EventEmitter<MediaFile> = new EventEmitter<MediaFile>();

  menuItems: MenuItem[];

  constructor(private _mediaMgrService: AdminMediaManagerService) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Delete File',
        command: (event: any) => {
          let deleteFile: MediaFile = event.item.automationId;
          // set the delete file in the state
          this._mediaMgrService.setDeleteFile(deleteFile);
        },
        automationId: this.file,
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
