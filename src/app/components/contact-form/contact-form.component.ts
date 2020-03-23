import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
