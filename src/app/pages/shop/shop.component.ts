import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { ProductCategorisationService } from "src/app/services/product-categorisation.service";
import { Tag } from "src/app/models/Tag";
import { Category } from "src/app/models/Category";

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
  selectedTags: number[] = [];

  constructor(
    private common: CommonService,
    private _productService: ProductService,
    private _pcService: ProductCategorisationService
  ) {}

  ngOnInit() {
    this.featured = this._productService.getFeaturedProducts();

    this.getProducts();

    this._pcService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  /**
   * Get products from the server after calculating the filter
   */
  getProducts(): void {
    console.log("update products");
    // start the loader
    this.common.setLoader(true);

    let filter = {
      categories: [],
      tags: [],
    };

    // add the selected categories
    this.selectedCategories.forEach((category: Category) => {
      filter.categories.push(category.id);
    });

    // add the selected tags
    this.selectedTags.forEach((selectedTag: number) => {
      filter.tags.push(selectedTag);
    });

    this._productService
      .getProducts(filter)
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
        if (category) {
          // get the tags of the selected categories and populate tags list
          this._pcService.getTagsOfCategory(category.id).subscribe((tags) => {
            // insert each of the fetched tags into the tags list of the component
            tags.forEach((tag: Tag) => {
              this.tags.push(tag);
            });

            // filter selected tags
            let newSelectedTags: number[] = [];
            this.tags.forEach((tag: Tag) => {
              if (this.selectedTags.includes(tag.id)) {
                newSelectedTags.push(tag.id);
              }
            });
            this.selectedTags = newSelectedTags;

            // update the products list
            this.getProducts();

            console.log(
              "updated=>  ",
              "tags: ",
              this.tags,
              "selected tags: ",
              this.selectedTags,
              "categs: ",
              this.categories,
              "selected categs: ",
              this.selectedCategories
            );
          });
        }
      });
    } else {
      this.getProducts();
    }
  }
}
