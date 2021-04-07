import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { pulseAnimation } from 'angular-animations';
import { MediaFile } from 'src/app/models/MediaManagement';

@Component({
  selector: 'app-media-file-preview',
  templateUrl: './media-file-preview.component.html',
  styleUrls: ['./media-file-preview.component.scss'],
  animations: [pulseAnimation({ duration: 250, scale: 1.1 })],
})
export class MediaFilePreviewComponent implements OnInit {
  @Input() file: MediaFile;
  @Input() visible: boolean;

  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  copySuccess: boolean = false;

  constructor(private _clipboard: Clipboard) {}

  ngOnInit(): void {}

  /**
   * emit hide event
   */
  emitHide(): void {
    this.onHide.emit();
  }

  /**
   * copy file link to the clipboard
   */
  copyLinkToClipboard(): void {
    if (this._clipboard.copy(this.file.file)) {
      this.copySuccess = true;
    }
  }
}
