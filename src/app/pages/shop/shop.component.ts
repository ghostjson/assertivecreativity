import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { Tag } from 'src/app/models/Tag';
import { Category } from 'src/app/models/Category';

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
  selectedTags: Tag[] = [];

  constructor(
    private common: CommonService,
    private _productService: ProductService,
    private _pcService: ProductCategorisationService
  ) {}

  ngOnInit() {
    this.common.setLoader(true);

    this.featured = this._productService.getFeaturedProducts();
    // this._productService.getProducts().then((res) => {
    //   this.products = res["data"];

    //   this.common.setLoader(false);
    // });

    this.products = this._productService.getProducts();
    console.info(this.products);
    this.categories = this._pcService.getCategories();
    console.info('Categories received: ', this.categories);
    this.common.setLoader(false);
  }

  getTags(): void {
    // empty the current tags list 
    this.tags = [];

    // get the tags of the selected categories and populate tags list
    let tagsFetched: Tag[] = null;
    this.selectedCategories.forEach((category: Category) => {
      tagsFetched = this._pcService.getTagsOf(category.value);

      // insert each of the fetched tags into the tags list 
      tagsFetched.forEach((tag) => {
        this.tags.push(tag);
      })
    })
  }
}
