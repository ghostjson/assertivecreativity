import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Input() searchString: string;
  @Input() tooltip: string;
  @Input() placeholder: string;
  @Output()
  searchStringChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchString = '';
  }

  /**
   * emit search click event
   */
  emitSearchEvent(): void {
    if (this.searchString.length) {
      this.onSearch.emit(this.searchString);
    }
  }
}
