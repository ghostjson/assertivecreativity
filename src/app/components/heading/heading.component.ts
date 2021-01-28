import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit, AfterViewInit {

  @ViewChild('heading') heading : ElementRef;

  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.heading.nativeElement.style.margin = this.data.margin;
    this.heading.nativeElement.style.fontSize = this.data.fontSize;
    this.heading.nativeElement.style.padding = this.data.padding;

  }

}
