import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { fabric } from 'fabric';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { compareById } from 'src/app/library/CompareFunctions';
import { MenuItemClickEvent } from 'src/app/models/PrimeNgEvents';
import { ImageObj, NewProduct, ProductImage } from 'src/app/models/Product';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

type CanvasGroups = {
  [key: string]: {
    obj: fabric.Group;
    img: ImageObj;
  };
};

type CanvasDB = {
  [key: string]: {
    label: string;
    canvasId: string;
    canvas: fabric.Canvas;
    groups: CanvasGroups;
  };
};
@Component({
  selector: 'app-product-preview-canvas',
  templateUrl: './product-preview-canvas.component.html',
  styleUrls: ['./product-preview-canvas.component.scss'],
})
export class ProductPreviewCanvasComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() canvas: fabric.Canvas;
  @Output()
  canvasChange: EventEmitter<fabric.Canvas> = new EventEmitter<fabric.Canvas>();

  @Input() styleClass: string;
  @Input() canvasHeight: number;
  @Input() canvasHeightChange: number;
  @Input() canvasWidth: number;
  @Input() canvasWidthChange: number;

  @Input() product: NewProduct;
  @Input() adminMode: boolean;
  @Input() productForm: FormGroup;

  @ViewChild('canvasWrapper')
  canvasWrapper: ElementRef<HTMLDivElement>;

  set activeCanvas(value: MenuItem) {
    this._activeCanvas = value;
  }
  get activeCanvas() {
    return this._activeCanvas;
  }
  private _activeCanvas: MenuItem;

  componentDestroy$: Subject<void>;

  canvasGroups: CanvasGroups;
  base: fabric.Group;
  views: MenuItem[];
  canvases: CanvasDB;
  private _imageForm: FormGroup;

  constructor(private _idGenService: IdGeneratorService) {
    this.componentDestroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.canvases = {
      front_view: {
        label: 'Front View',
        canvasId: 'preview-canvas-' + this._idGenService.getId(),
        canvas: null,
        groups: null,
      },
      back_view: {
        label: 'Front View',
        canvasId: 'preview-canvas-' + this._idGenService.getId(),
        canvas: null,
        groups: null,
      },
    };

    this.views = [
      {
        label: 'Front View',
        automationId: {
          view_name: 'front_view',
          canvasId: this.canvases.front_view.canvasId,
        },
        command: (event: MenuItemClickEvent) => {
          this.activeCanvas = event.item;
        },
      },
      {
        label: 'Back View',
        automationId: {
          view_name: 'back_view',
          canvasId: this.canvases.back_view.canvasId,
        },
        command: (event: MenuItemClickEvent) => {
          this.activeCanvas = event.item;
        },
      },
    ];
    this.activeCanvas = this.views[0];

    this._imageForm = <FormGroup>(
      (<FormArray>this.productForm.get('images')).at(0)
    );
  }

  ngAfterViewInit(): void {
    if (!(this.canvasWidth && this.canvasHeight)) {
      this.canvasHeight = this.canvasWrapper.nativeElement.clientHeight;
      this.canvasWidth = this.canvasWrapper.nativeElement.clientWidth;
    }
    const colors = ['red', 'green'];
    Object.keys(this.canvases).forEach((key, index) => {
      const canvas = this.canvases[key];
      canvas.canvas = new fabric.Canvas(this.canvases[key].canvasId, {
        backgroundColor: 'white',
        preserveObjectStacking: true,
        width: this.canvasWidth,
        height: this.canvasHeight,
        selection: false,
      });

      canvas.groups = {
        base: {
          obj: new fabric.Group(
            [
              new fabric.Rect({
                left: 0,
                top: 0,
                fill: 'transparent',
                height: 0,
                width: 0,
              }),
            ],
            {
              left: 0,
              top: 0,
              selectable: false,
              evented: false,
            }
          ),
          img: null,
        },
      };

      // add the groups to the canvas so that they are
      // available for later use
      const groupNameList = Object.keys(canvas.groups);
      for (let i = 0; i < groupNameList.length; i += 1) {
        canvas.canvas.add(canvas.groups[groupNameList[i]].obj);
      }
    });

    if (this.adminMode) {
      // listen for changes in the base image update it as it changes
      const baseImageChanges = this._imageForm.valueChanges;
      baseImageChanges
        .pipe(takeUntil(this.componentDestroy$))
        .subscribe((changes: ProductImage) => {
          // make a list of view names in the changes
          const viewNames = Object.keys(changes);

          // for each view with a view name update the base image
          for (const viewName of viewNames) {
            const canvas = this.canvases[viewName];
            const newImg: ImageObj = changes[viewName];
            if (!(newImg && newImg.id && newImg.src)) {
              const activeObjs = canvas.groups.base.obj.getObjects();
              canvas.groups.base.obj.remove(...activeObjs);
            } else if (this.imgChanged(canvas.groups.base.img, newImg)) {
              // update the current image
              canvas.groups.base.img = newImg;

              const imgEl = document.createElement('img');
              imgEl.src = <string>newImg.src;
              canvas.groups.base.obj.addWithUpdate(
                new fabric.Image(imgEl, {
                  left: 0,
                  top: 0,
                })
                  .scaleToWidth(this.canvasWidth)
                  .scaleToHeight(this.canvasHeight)
              );
            } else {
            }
          }

          // the canvases must be manually re-rendered.
          // refer https://github.com/fabricjs/fabric.js/issues/3070
          for (const view of this.views) {
            // render all the canvas of product views that are available for switching
            this.canvases[view.automationId.view_name].canvas.renderAll();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
    this.canvas.dispose();
  }

  /**
   * checks if two image objects are different by comparing their ids
   * @param oldImg old image to compare
   * @param newImg new image to compare
   * @returns true if different and false if not
   */
  imgChanged(oldImg: ImageObj, newImg: ImageObj): boolean {
    return oldImg ? oldImg.id !== newImg.id : true;
  }
}
