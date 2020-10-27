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
    private _common: CommonService,
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
    this._common.setLoader(true);

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
          this._common.setLoader(false);
        }, 200);
      });
  }

  /**
   * update the products list
   */
  updateProducts(): void {
    // this.products = [];
    this._common.setLoader(true);

    this.selectedCategories.forEach((selectedCategory: Category) => {
      this._productService
        .getProductsByCategoryId(selectedCategory.id)
        .subscribe((res: Product[]) => {
          console.log("Filtered Products received: ", res);
        });
    });
    this._common.setLoader(false);
  }

  update(): void {
    this._common.setLoader(true);
    // empty the current tags list
    this.tags = [];

    if (this.selectedCategories.length > 0) {
      // update products list and tag list
      this.selectedCategories.forEach((category: Category) => {
        // get the tags of the selected categories and populate tags list
        this._pcService.getTagsOfCategory(category.id).subscribe((tags) => {
          // insert each of the fetched tags into the tags list of the component
          tags.forEach((tag: Tag) => {
            this.tags.push(tag);
          });

          // filter selected tags
          let newSelectedTags: number[] = [];
          this.tags.forEach((tag: Tag) => {
            let tagIsSelected: number = this.selectedTags.find(
              (selectedTagId: number) => {
                return selectedTagId === tag.id;
              }
            );

            if (tagIsSelected) {
              newSelectedTags.push(tag.id);
            }
          });
          this.selectedTags = newSelectedTags;

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

          this.updateProducts();

          /**
           * TODO: Remove when category filter is fixed
           */
          setTimeout(() => {
            this._common.setLoader(false);
          }, 200);
        });
      });
    } else {
      /**
       * TODO: Remove when category filter is fixed
       */
      this.updateProducts();
      setTimeout(() => {
        this._common.setLoader(false);
      }, 200);
    }
  }

  getSearchResults(searchString: string): void {
    this._common.setLoader(true);

    if(searchString.length > 0) {
      this._productService
      .searchProducts(searchString)
      .subscribe((res: Product[]) => {
        this.products = res;

        this._common.setLoader(false);
      });
    }
    else {
      this.getProducts();
    }
  }
}
