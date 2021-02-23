import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss'],
})
export class CategoryDropdownComponent implements OnInit {
  dropdownList: MenuItem[];
  dropdownMenuWidth: number;
  dropdownMenuHeight: number;

  @ViewChild('dropdownSlideMenu', { static: true })
  dropdownSlideMenu: ElementRef<HTMLElement>;
  @ViewChild('dropdownHeader', { static: true })
  dropdownHeader: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {
    this.dropdownList = [
      {
        label: 'Ties',
        items: [
          {
            label: 'Bow Tie',
          },
          {
            label: 'Long Tie',
          },
        ],
      },
      {
        label: 'Scarves',
        items: [
          {
            label: 'Small Scarves',
          },
          {
            label: 'Medium Scarves',
          },
          {
            label: 'Large Scarves',
          },
        ],
      },
      {
        label: 'Shirts',
        items: [
          {
            label: 'Checkered'
          },
          {
            label: 'Plain'
          },
          {
            label: 'Formal',
            items: [
              {
                label: 'Single Color',
                items: [
                  {
                    label: 'Silk'
                  },
                  {
                    label: 'Cotton'
                  },
                ],
              },
              {
                label: 'Multi Colored',
              },
            ],
          },
        ],
      },
      {
        label: 'Pants',
        items: [
          {
            label: 'Jeans',
            items: [
              {
                label: 'Striped'
              },
              {
                label: 'Modern'
              },
            ],
          },
          {
            label: 'Formal',
            items: [
              {
                label: 'Soft Cloth'
              },
            ],
          },
        ],
      },
      {
        label: 'Shorts'
      },
    ];

    this.getDropdownMenuWidth();
  }

  getDropdownMenuWidth(): void {
    this.dropdownMenuWidth =
      this.dropdownSlideMenu.nativeElement.getBoundingClientRect().width -
      Number(
        window
          .getComputedStyle(this.dropdownSlideMenu.nativeElement)
          .getPropertyValue('padding-right')
          .split('px')[0]
      );

    this.dropdownMenuHeight =
      this.dropdownSlideMenu.nativeElement.getBoundingClientRect().height;

    console.log(
      'hiegt: ',
      this.dropdownMenuHeight,
      this.dropdownHeader.nativeElement.getBoundingClientRect().height
    );
  }
}
