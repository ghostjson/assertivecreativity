import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-content',
  templateUrl: './graphic-content.component.html',
  styleUrls: ['./graphic-content.component.scss']
})
export class GraphicContentComponent implements OnInit {


  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
