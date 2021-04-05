import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MediaFolder } from 'src/app/models/MediaManagement';
import { MenuItemClickEvent } from 'src/app/models/PrimeNgEvents';
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
      {
        label: 'Rename Folder',
        automationId: this.folder,
        command: (event: MenuItemClickEvent) => {
          this._mediaMgrService.setRenameFolder({
            old_path: this.folder.path,
            new_path: null,
          });
        },
      },
    ];
  }

  /**
   * set the active folder as the current folder in the state store
   */
  setActiveFolder(): void {
    console.log('setting folder list item: ', this.folder);
    this._mediaMgrService.setActiveFolder(this.folder);
  }
}
