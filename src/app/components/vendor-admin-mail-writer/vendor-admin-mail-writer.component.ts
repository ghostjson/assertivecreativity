import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-admin-mail-writer',
  templateUrl: './vendor-admin-mail-writer.component.html',
  styleUrls: ['./vendor-admin-mail-writer.component.scss']
})
export class VendorAdminMailWriterComponent implements OnInit {
  config: object;

  constructor() { }

  ngOnInit(): void {
    this.config = {
      placeholder: '',
      tabsize: 2,
      height: '200px',
      uploadImagePath: '/api/upload',
      toolbar: [
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']]
      ]
    };
  }

}
