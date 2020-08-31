import { Component, OnInit, OnDestroy } from "@angular/core";
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
export class ShopComponent implements OnInit, OnDestroy {
  featured: any;
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  tags: Tag[] = [];
  selectedTags: Tag[] = [];
  subscriptions: any[] = [];

  constructor(
    private common: CommonService,
    private _productService: ProductService,
    private _pcService: ProductCategorisationService
  ) {}

  ngOnInit() {
    this.common.setLoader(true);

    this.featured = this._productService.getFeaturedProducts();

    this.subscriptions.push(
      this._productService.getProducts().subscribe((products) => {
        this.products = products;
        console.log("products received in shop: ", this.products);
        this.common.setLoader(false);
      })
    );
    console.info(this.products);
    this.categories = this._pcService.getCategories();
    console.info("Categories received: ", this.categories);
    this.common.setLoader(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getTags(): void {
    // empty the current tags list
    this.tags = [];

    // get the tags of the selected categories and populate tags list
    this.selectedCategories.forEach((category: Category) => {
      this.subscriptions.push(
        this._pcService.getTagsOf(category.value).subscribe((tags) => {
          // insert each of the fetched tags into the tags list of the component
          tags.forEach((tag) => {
            this.tags.push(tag);
          });
          console.log(`tags found in shop of ${category.value} :`, tags);
        })
      );
    });
  }
}
