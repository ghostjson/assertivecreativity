import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MediaFolder } from 'src/app/models/MediaManagement';

@Component({
  selector: 'app-media-folder-list-item',
  templateUrl: './media-folder-list-item.component.html',
  styleUrls: ['./media-folder-list-item.component.scss'],
})
export class MediaFolderListItemComponent implements OnInit {
  @Input() folder: MediaFolder;

  menuItems: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Delete Folder',
      },
    ];
  }
}
