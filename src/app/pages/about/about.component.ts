import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { WidgetManagerService } from '../../services/widget-manager.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @ViewChild('main', { read: ViewContainerRef }) entry: ViewContainerRef;
  widgets: any;

  constructor(private _aboutService: AboutService, private _widgetManager: WidgetManagerService) { }

  ngOnInit(): void {



  }


  ngAfterViewInit() : void {
    this.widgets = this._aboutService.fetchData();
    
    this._widgetManager.drawWidgets(this.entry, this.widgets);
  }

}
