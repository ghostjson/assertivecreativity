import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { WidgetManagerService } from '../../services/widget-manager.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('main', { read: ViewContainerRef }) entry: ViewContainerRef;
  widgets : any;


  constructor(private _contactService: ContactService, private _widgetManager: WidgetManagerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() : void {
    this.widgets = this._contactService.fetchData();
    
    this._widgetManager.drawWidgets(this.entry, this.widgets);
  }



}
