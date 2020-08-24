import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { ProductCategorisationService } from "../../services/product-categorisation.service";
import { Category } from "src/app/models/Category";
import { IdGeneratorService } from "src/app/services/id-generator.service";

@Component({
  selector: "app-category-adder",
  templateUrl: "./category-adder.component.html",
  styleUrls: ["./category-adder.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class CategoryAdderComponent implements OnInit {
  category: Category;
  categories: Category[];
  selectedCategories: Category[];
  categoryDialog: boolean;
  submitted: boolean;

  constructor(
    private _idService: IdGeneratorService,
    private _prodCategorisationService: ProductCategorisationService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.categories = this._prodCategorisationService.getCategories();
  }

  openNew() {
    this.category = new Category();
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedCategories() {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete the selected categories?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.categories = this.categories.filter(
          (val) => !this.selectedCategories.includes(val)
        );
        this.selectedCategories = null;
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Categories Deleted",
          life: 3000,
        });
      },
    });
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete " + category.label + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.categories = this.categories.filter(
          (val) => val.id !== category.id
        );
        this.category = new Category();
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Category Deleted",
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;

    if (this.category.label.trim()) {
      if (this.category.id) {
        this.categories[this.findIndexById(this.category.id)] = this.category;
        this._prodCategorisationService.editCategory(this.category);
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Category Updated",
          life: 3000,
        });
      } 
      else {
        this.category.id = this._idService.getId();
        this.category.productCount = 0;
        this._prodCategorisationService.addCategory(this.category);
        console.info('Categories: ', this.categories);
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Category Created",
          life: 3000,
        });
      }

      this.categories = [...this._prodCategorisationService.getCategories()];
      this.categoryDialog = false;
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  generateSlug(): void {
    this.category.value = this.category.label.trim().toLowerCase().replace(/\s+/g, '-');
  }

  summary(str: string): string {
    return str.slice(0, 50);
  }
}
