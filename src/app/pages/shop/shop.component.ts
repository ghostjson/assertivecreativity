import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../common.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { Tag } from 'src/app/models/Tag';
import { Category } from 'src/app/models/Category';
import { take } from 'rxjs/operators';

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent implements OnInit {
  featured: any;
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  tags: Tag[] = [];
  selectedTags: string[] = [];

  constructor(
    private common: CommonService,
    private _productService: ProductService,
    private _pcService: ProductCategorisationService
  ) {}

  ngOnInit() {
    this.featured = this._productService.getFeaturedProducts();

    this.getProducts();

    this._pcService.getCategories()
      .pipe(take(1))
      .subscribe((categories: Tag[]) => {
        this.categories = categories;
      });
  }

  /**
   * Get products from the server after calculating the filter
   */
  getProducts(): void {
    console.log('update products');
    // start the loader 
    this.common.setLoader(true);
    
    let filter = {
      categories: [],
      tags: []
    };

    // add the selected categories 
    this.selectedCategories.forEach((category: Category) => {
      filter.categories.push(category.value);
    });

    // add the selected tags 
    this.selectedTags.forEach((selectedTag: string) => {
      filter.tags.push(selectedTag);
    });

    this._productService.getProducts(filter)
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.products = products;

        // hide the loader 
        setTimeout(() => {
          this.common.setLoader(false);
        }, 200);
      });
  }

  /**
   * update the products list
   */
  updateProducts(): void {
    // set the loader to true 
    this.common.setLoader(true);

    // empty the current tags list
    this.tags = [];

    if (this.selectedCategories.length > 0) {
      // update products list and tag list
      this.selectedCategories.forEach((category: Category) => {
        // get the tags of the selected categories and populate tags list
        this._pcService.getTagsOf(category.value)
          .pipe(take(1))
          .subscribe((tags) => {
            // insert each of the fetched tags into the tags list of the component
            tags.forEach((tag: Tag) => {
              this.tags.push(tag);
            });
  
            // filter selected tags 
            let newSelectedTags: string[] = [];
            this.tags.forEach((tag: Tag) => {
              if (this.selectedTags.includes(tag.value)) {
                newSelectedTags.push(tag.value);
              }
            });
            this.selectedTags = newSelectedTags;
  
            // update the products list 
            this.getProducts();
  
            console.log('updated=>  ', 'tags: ', this.tags, 'selected tags: ', this.selectedTags, 'categs: ', 
              this.categories, 'selected categs: ', this.selectedCategories);
          });
      });
    }
    else {
      this.getProducts();
    }
  }
}
