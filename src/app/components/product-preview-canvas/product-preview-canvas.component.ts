import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fabric } from 'fabric';
import { NewProduct } from 'src/app/models/Product';

@Component({
  selector: 'app-product-preview-canvas',
  templateUrl: './product-preview-canvas.component.html',
  styleUrls: ['./product-preview-canvas.component.scss'],
})
export class ProductPreviewCanvasComponent implements OnInit, AfterViewInit {
  @Input() canvas: fabric.Canvas;
  @Output()
  canvasChange: EventEmitter<fabric.Canvas> = new EventEmitter<fabric.Canvas>();

  @Input() product: NewProduct;

  @ViewChild('wrapper', { static: true }) wrapper: ElementRef<HTMLElement>;

  canvasHeight: number;
  canvasWidth: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const computedStyle = window.getComputedStyle(this.wrapper.nativeElement);
    this.canvasHeight = Number(computedStyle.height.split('px')[0]);
    this.canvasWidth = Number(computedStyle.width.split('px')[0]);

    this.canvas = new fabric.Canvas('preview-canvas', {
      backgroundColor: 'white',
      preserveObjectStacking: true,
      width: this.canvasWidth,
      height: this.canvasHeight,
    });

    const rect = new fabric.Rect({
      left: this.canvasWidth - 20,
      top: this.canvasHeight - 20,
      fill: 'red',
      width: 20,
      height: 20,
    });

    // "add" rectangle onto canvas
    this.canvas.add(rect);

    console.log('canvas initialised', this.canvas);
  }
}
