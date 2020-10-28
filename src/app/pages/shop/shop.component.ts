import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { ProductCategorisationService } from "src/app/services/product-categorisation.service";
import { Tag } from "src/app/models/Tag";
import { Category } from "src/app/models/Category";
import { map, tap } from "rxjs/operators";

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

    this._productService.getProducts().subscribe((products: Product[]) => {
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
  updateProducts(category: Category): void {
    let filteredProducts: Product[] = [];
    this.products = [];
    this._common.setLoader(true);

    this._productService
      .getProductsByCategoryId(category.id)
      .pipe(
        tap((res: Product[]) => {
          console.log("Filtered Products received: ", res);
          this.products = this.products.concat(res);
          // res.forEach((product: Product) => {
          //   console.log("product pushed: ", product);
          //   filteredProducts.push(product);
          // });
        })
      )
      .subscribe(() => {
        this._common.setLoader(false);
      });
  }

  /**
   * Update tags and products
   */
  update(): void {
    this._common.setLoader(true);
    // empty the current tags list
    this.tags = [];

    if (this.selectedCategories.length > 0) {
      // update products list and tag list
      this.selectedCategories.forEach((category: Category) => {
        this._pcService
          .getTagsOfCategory(category.id)
          .pipe(
            // get the tags of the selected categories and populate tags list
            tap((tags: Tag[]) => {
              this.tags.concat(tags);

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
            })
          )
          .subscribe(() => {
            this.updateProducts(category);
          });
      });
    } else {
      this.getProducts();
    }
  }

  /**
   * Get search results
   * @param searchString search string
   */
  getSearchResults(searchString: string): void {
    this._common.setLoader(true);

    if (searchString.length > 0) {
      this._productService
        .searchProducts(searchString)
        .subscribe((res: Product[]) => {
          this.products = res;

          this._common.setLoader(false);
        });
    } else {
      this.getProducts();
    }
  }
}
