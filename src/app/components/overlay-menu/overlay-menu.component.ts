import { EventEmitter, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

type emitEventObj = {
  event: Event,
  menu: ViewContainerRef,
  item: MenuItem
};

@Component({
  selector: 'app-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss']
})
export class OverlayMenuComponent {
  @Input() menuItems: MenuItem[];
  @Input() visible: boolean;
  @Output() onSelect: EventEmitter<emitEventObj> = new EventEmitter<emitEventObj>();

  @ViewChild('menu') menu: any;

  /**
   * toggle the overlay menu
   * @param event event object emitted by the primeng component
   */
  toggle(event: any): void {
    this.menu.toggle(event);
  }

  /**
   * execute when a menuitem is clicked
   * @param e DOM event to emit
   * @param item menuitem clicked
   */
  itemClick(e: Event, item: MenuItem): void {
    this.menu.hide();
    let emitObj: emitEventObj = {
      event: e,
      menu: this.menu,
      item: item
    };

    this.onSelect.emit(emitObj);
  }
}
