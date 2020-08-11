import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent implements OnInit {


  @Input('data') data: object;

  constructor() { }

  ngOnInit(): void {

    

  }

  ngAfterViewInit(): void {
  }

}
