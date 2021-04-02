import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MediaFolder } from 'src/app/models/MediaManagement';
import { AdminMediaManagerService } from 'src/app/services/admin-media-manager/admin-media-manager.service';

@Component({
  selector: 'app-media-folder-list-item',
  templateUrl: './media-folder-list-item.component.html',
  styleUrls: ['./media-folder-list-item.component.scss'],
})
export class MediaFolderListItemComponent implements OnInit {
  @Input() folder: MediaFolder;

  menuItems: MenuItem[];

  constructor(private _mediaMgrService: AdminMediaManagerService) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Delete Folder',
        automationId: this.folder,
        command: (event: any) => {
          const deleteFolder: MediaFolder = event.item.automationId;
          // set the delete folder in the state
          this._mediaMgrService.setDeleteFolder(deleteFolder);
        },
      },
    ];
  }
}
