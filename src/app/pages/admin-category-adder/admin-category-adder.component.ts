import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { ProductCategorisationService } from "../../services/product-categorisation.service";
import { Category } from "src/app/models/Category";
import { IdGeneratorService } from "src/app/services/id-generator.service";
import { take } from 'rxjs/operators';

@Component({
  selector: "app-admin-category-adder",
  templateUrl: "./admin-category-adder.component.html",
  styleUrls: ["./admin-category-adder.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class AdminCategoryAdderComponent implements OnInit {
  category: Category;
  categories: Category[];
  selectedCategories: Category[];
  categoryDialog: boolean;
  submitted: boolean;

  constructor(
    private _prodCategorisationService: ProductCategorisationService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._prodCategorisationService.getCategories()
      .pipe(take(1))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log('categories received: ', categories);
      });
  }

  /**
   * Open the input dialog
   */
  openNew(): void {
    this.category = new Category();
    this.submitted = false;
    this.categoryDialog = true;
  }

  /**
   * Delete all the selected categories
   */
  deleteSelectedCategories(): void {
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

  /**
   * Open the dialog for editing the selected category
   * @param category category to edit
   */
  editCategory(category: Category): void {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  /**
   * Delete category
   * @param category category to delete
   */
  deleteCategory(category: Category): void {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete " + category.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.categories = this.categories.filter(
          (val) => val.id !== category.id
        );
        this._prodCategorisationService.deleteCategory(category)
          .pipe(take(1))
          .subscribe();
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

  /**
   * Hide input dialog
   */
  hideDialog(): void {
    this.categoryDialog = false;
    this.submitted = false;
  }

  /**
   * Upload category to the server
   */
  saveCategory(): void {
    this.submitted = true;

    if (this.category.name.trim()) {
      if (this.category.id) {
        this.categories[this.findIndexById(this.category.id)] = this.category;
        this._prodCategorisationService.editCategory(this.category)
          .pipe(take(1))
          .subscribe((response: any) => {
            this.categories = [...this.categories];
            this.categoryDialog = false;
          });
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Category Updated",
          life: 3000,
        });
      } 
      else {
        this._prodCategorisationService.addCategory(this.category)
          .pipe(take(1))
          .subscribe((createdCategory: Category) => {
            /**
             * TODO: uncomment when backend fully implemented
             */
            // this.category = createdCategory;
            this.categories.push(this.category);
            this.categories = [...this.categories];
            this.categoryDialog = false;
          });
      }
    }
  }

  /**
   * Find the index by matching the id
   * @param id id of the object
   */
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

  /**
   * Return a short part from the beginning of the string
   * @param str string to make summary from
   */
  summary(str: string=''): string {
    return str.slice(0, 50);
  }
}
