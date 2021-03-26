import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaFile, MediaFolder } from 'src/app/models/MediaManagement';
import { AdminMediaManagerService } from 'src/app/services/admin-media-manager/admin-media-manager.service';

@Component({
  selector: 'app-admin-media-manager',
  templateUrl: './admin-media-manager.component.html',
  styleUrls: ['./admin-media-manager.component.scss'],
})
export class AdminMediaManagerComponent implements OnInit {
  folders: Observable<MediaFolder[]>;
  files: Observable<MediaFile[]>;

  constructor(private _mediaMgrService: AdminMediaManagerService) {}

  ngOnInit(): void {
    this.folders = this._mediaMgrService.getRootFolderList();
    this.files = this._mediaMgrService.getFilesInFolder('/');
  }
}
