import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Tag } from 'src/app/models/Tag';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-tag-adder',
  templateUrl: './admin-tag-adder.component.html',
  styleUrls: ['./admin-tag-adder.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdminTagAdderComponent implements OnInit {
  tag: Tag;
  tags: Tag[];
  categories: Category[];
  selectedTags: Tag[];
  tagDialog: boolean;
  submitted: boolean;

  constructor(
    private _idService: IdGeneratorService,
    private _prodCategorisationService: ProductCategorisationService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._prodCategorisationService.getTags()
      .pipe(take(1))
      .subscribe((tags: Tag[]) => {
        this.tags = tags;
      });
    this._prodCategorisationService.getCategories()
      .pipe(take(1))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  /**
   * Open the tag creator dialog
   */
  openNew(): void {
    this.tag = new Tag();
    this.submitted = false;
    this.tagDialog = true;
  }

  /**
   * Delete the selected tags
   */
  deleteSelectedTags(): void {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete the selected Tags ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.tags = this.tags.filter(
          (val) => !this.selectedTags.includes(val)
        );
        this.selectedTags = null;
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Tags Deleted",
          life: 3000,
        });
      },
    });
  }

  /**
   * Edit tag
   * @param tag tag object to edit
   */
  editTag(tag: Tag) {
    this.tag = { ...tag };
    this.tagDialog = true;
  }

  /**
   * Delete tag
   * @param tag tag object to delete
   */
  deleteTag(tag: Tag) {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete " + tag.label + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.tags = this.tags.filter(
          (val) => val.id !== tag.id
        );
        this._prodCategorisationService.deleteTag(tag)
          .pipe(take(1))
          .subscribe();
        this.tag = new Tag();
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Tag Deleted",
          life: 3000,
        });
      },
    });
  }

  /**
   * Hide the tag creator dialog
   */
  hideDialog() {
    this.tagDialog = false;
    this.submitted = false;
  }

  /**
   * Create or update tag
   */
  saveTag() {
    this.submitted = true;

    if (this.tag.label.trim()) {
      if (this.tag.id) {
        this.tags[this.findIndexById(this.tag.id)] = this.tag;
        this._prodCategorisationService.editTag(this.tag)
          .pipe(take(1))
          .subscribe();
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Tag Updated",
          life: 3000
        });
      } 
      else {
        this.tag.productCount = 0;
        this.tags.push(this.tag);
        this._prodCategorisationService.addTag(this.tag)
          .pipe(take(1))
          .subscribe();
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Tag Created",
          life: 3000
        });
      }
      
      this.tags = [...this.tags];
      this.tagDialog = false;
    }
  }

  /**
   * Find an object by its id
   * @param id id of the object to search
   */
  findIndexById(id: string | number): number {
    let index = -1;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  /**
   * Convert tag label into a slug
   */
  generateSlug(): void {
    this.tag.value = this.tag.label.trim().toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Return a short first part of a string 
   * @param str string to generate the summary of
   */
  summary(str: string): string {
    return str.slice(0, 50);
  }
}
