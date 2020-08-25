import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Tag } from 'src/app/models/Tag';

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
    this.tags = this._prodCategorisationService.getTags();
    this.categories = this._prodCategorisationService.getCategories();
  }

  openNew() {
    this.tag = new Tag();
    this.submitted = false;
    this.tagDialog = true;
  }

  deleteSelectedTags() {
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

  editTag(tag: Tag) {
    this.tag = { ...tag };
    this.tagDialog = true;
  }

  deleteTag(tag: Tag) {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete " + tag.label + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.tags = this.tags.filter(
          (val) => val.id !== tag.id
        );
        this._prodCategorisationService.deleteTag(tag);
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

  hideDialog() {
    this.tagDialog = false;
    this.submitted = false;
  }

  saveTag() {
    this.submitted = true;

    if (this.tag.label.trim()) {
      if (this.tag.id) {
        this.tag[this.findIndexById(this.tag.id)] = this.tag;
        this._prodCategorisationService.editTag(this.tag);
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Tag Updated",
          life: 3000
        });
      } 
      else {
        this.tag.id = this._idService.getId();
        this.tag.productCount = 0;
        this._prodCategorisationService.addTag(this.tag);
        console.info('Tags: ', this._prodCategorisationService.getTags());
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Tag Created",
          life: 3000
        });
      }

      this.tags = [...this._prodCategorisationService.getTags()];
      this.tagDialog = false;
    }
  }

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

  generateSlug(): void {
    this.tag.value = this.tag.label.trim().toLowerCase().replace(/\s+/g, '-');
  }

  summary(str: string): string {
    return str.slice(0, 50);
  }
}
