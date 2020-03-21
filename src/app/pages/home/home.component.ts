import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { WidgetManagerService } from '../../services/widget-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('main', { read: ViewContainerRef }) entry: ViewContainerRef;
  widgets: any;

  constructor(private _homeService : HomeService, private resolver: ComponentFactoryResolver,
    private _widgetManager: WidgetManagerService) { }

  ngOnInit(): void{

  }

  ngAfterViewInit() : void {
    this.widgets = this._homeService.fetchData();
    
    this._widgetManager.drawWidgets(this.entry, this.widgets);
  }
  

}
