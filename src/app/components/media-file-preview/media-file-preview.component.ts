import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MediaFile } from 'src/app/models/MediaManagement';

@Component({
  selector: 'app-media-file-preview',
  templateUrl: './media-file-preview.component.html',
  styleUrls: ['./media-file-preview.component.scss'],
})
export class MediaFilePreviewComponent implements OnInit {
  @Input() file: MediaFile;
  @Input() visible: boolean;

  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * emit hide event
   */
  emitHide(): void {
    this.onHide.emit();
  }
}
