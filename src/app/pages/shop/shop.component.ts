import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { ProductCategorisationService } from "src/app/services/product-categorisation.service";
import { Tag } from "src/app/models/Tag";
import { Category } from "src/app/models/Category";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { filter, take } from "rxjs/operators";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent implements OnInit {
  featured: Product[];
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  tags: Tag[] = [];
  selectedTags: number[] = [];
  productsLoading: boolean;
  is_stock: boolean = false;

  constructor(
    private _productService: ProductService,
    private _pcService: ProductCategorisationService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // start the loader
    this.productsLoading = true;
    this._activatedRoute.data.pipe(take(1)).subscribe((data: any) => {
      this.is_stock = data.is_stock;
    });
    if (this.is_stock) {
      this.getStockProducts();
      this._pcService
        .getStockCategories()
        .subscribe((categories: Category[]) => {
          this.categories = categories;
        });
    } else {
      this.getCustomProducts();
      this._pcService
        .getCustomCategories()
        .subscribe((categories: Category[]) => {
          this.categories = categories;
        });
    }

    this.featured = this._productService.getFeaturedProducts();
  }

  /**
   * Get custom products
   */
  getCustomProducts(): void {
    this.productsLoading = true;
    console.log("update custom products");

    this._productService
      .getCustomProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log("custom products received: ", products);

        // hide the loader
        setTimeout(() => {
          this.productsLoading = false;
        }, 200);
      });
  }

  /**
   * Get stock products
   */
  getStockProducts(): void {
    this.productsLoading = true;
    console.log("update stock products");

    this._productService.getStockProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log("stock products received: ", products);

      // hide the loader
      setTimeout(() => {
        this.productsLoading = false;
      }, 200);
    });
  }

  /**
   * update the products list
   */
  updateProducts(): void {
    this.products = [];
    this.productsLoading = true;

    if (this.is_stock) {
      this._productService.getStockProductsByCategoryList(this.selectedCategories)
        .subscribe((filteredProducts: Product[]) => {
          this.products = [...filteredProducts];
          this.productsLoading = false;
        });
    } else {
      let categoryIds: number[] = this.selectedCategories.map((category: Category) => {
        return category.id;
      });

      this._productService
        .getCustomProductsByCategoryIdList(categoryIds)
        .subscribe((res: Product[]) => {
          this.products = [...res];
          this.productsLoading = false;
        });
    }
  }

  /**
   * Update tags and products
   */
  update(): void {
    // empty the current tags list
    this.tags = [];

    if (this.selectedCategories.length > 0) {
      // update products list and tag list
      /**
       * TODO: Fix after too many attempts issue is fixed for tags
       */
      // this.selectedCategories.forEach((category: Category) => {
      //   this._pcService
      //     .getTagsOfCategory(category.id)
      //     .pipe(
      //       // get the tags of the selected categories and populate tags list
      //       tap((tags: Tag[]) => {
      //         this.tags.concat(tags);

      //         // filter selected tags
      //         let newSelectedTags: number[] = [];
      //         this.tags.forEach((tag: Tag) => {
      //           let tagIsSelected: number = this.selectedTags.find(
      //             (selectedTagId: number) => {
      //               return selectedTagId === tag.id;
      //             }
      //           );

      //           if (tagIsSelected) {
      //             newSelectedTags.push(tag.id);
      //           }
      //         });
      //         this.selectedTags = newSelectedTags;

      //         console.log(
      //           "updated=>  ",
      //           "tags: ",
      //           this.tags,
      //           "selected tags: ",
      //           this.selectedTags,
      //           "categs: ",
      //           this.categories,
      //           "selected categs: ",
      //           this.selectedCategories
      //         );
      //       })
      //     )
      //     .subscribe();
      // });
      this.updateProducts();
    } else {
      this.is_stock ? this.getStockProducts() : this.getCustomProducts();
    }
  }

  /**
   * Get search results
   * @param searchString search string
   */
  getSearchResults(searchString: string): void {
    this.productsLoading = true;

    if (this.is_stock) {
      this.productsLoading = false;
    } else {
      if (searchString.length > 0) {
        this._productService
          .searchProducts(searchString)
          .subscribe((res: Product[]) => {
            this.products = res;

            this.productsLoading = false;
          });
      } else {
        this.getCustomProducts();
      }
    }
  }
}
