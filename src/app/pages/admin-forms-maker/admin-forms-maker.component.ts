import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { CommonService } from "src/app/common.service";
import { OrderMailFormResponse} from "src/app/models/OrderMailForm";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";

@Component({
  selector: "app-admin-forms-maker",
  templateUrl: "./admin-forms-maker.component.html",
  styleUrls: ["./admin-forms-maker.component.scss"],
})
export class AdminFormsMakerComponent implements OnInit {
  forms: OrderMailFormResponse[] = null;
  showFormMakerDialog: boolean = false;
  newForm: FormGroup;
  editMode: boolean = false;
  editIndex: number;
  prevForm: OrderMailFormResponse;

  constructor(
    private _adminFormsService: AdminOrdersFormMakerService,
    private _commonService: CommonService,
    private _formMakerService: AdminOrdersFormMakerService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._adminFormsService
      .getAllForms()
      .subscribe((res: OrderMailFormResponse[]) => {
        this.forms = res;
        this._commonService.setLoader(false);
        console.log("forms received: ", this.forms);
      });

    this.newForm = this._formMakerService.createOrderMailForm();
  }

  toggleFormMakerDialog(): void {
    this.showFormMakerDialog = !this.showFormMakerDialog;
  }

  addForm(): void {
    this._commonService.setLoader(true);
    console.log('add form called');
    console.log(this.editMode);
    console.log(this.prevForm);
    
    this.toggleFormMakerDialog();

    if(this.editMode) {
      this._formMakerService.editForm(this.prevForm.id, this.newForm.value)
        .subscribe(
          ((res: any) => {
            
            console.log(res);
            this._commonService.setLoader(false);
            this.forms.splice(this.editIndex, 1, {
              id: res.data.id,
              name: String(this.newForm.value.title),
              data: {...this.newForm.value},
              created_at: new Date().toISOString()
            });
            // this.forms = [...this.forms];

            console.log('after edit: ', this.newForm.value);
            this._messageService.add({
              severity: "success",
              summary: `${this.newForm.value.title.slice(0, 50)} edited`,
              detail: "Form was edited successfully",
            });
          }),
          ((e: any) =>{
            console.error(e);
            this._commonService.setLoader(false);

            this._messageService.add({
              severity: "error",
              summary: "Form Edit Failed",
              detail: "Something went wrong. Kindly try again",
            });
          })
        )
    }
    else {
      this._formMakerService.addForm(this.newForm.value).subscribe(
        (res: any) => {
          let resForm = {
            id: res.data.id,
            name: res.data.name,
            data: this.newForm.value,
            created_at: res.data.created_at
          };

          this.forms.push(resForm);
          console.log('adding: ', resForm);
          // this.forms = [...this.forms];
  
          this._commonService.setLoader(false);
  
          this._messageService.add({
            severity: "success",
            summary: "Form Added",
            detail: "Form was added successfully",
          });
        },
        () => {
          this._commonService.setLoader(false);
          this._messageService.add({
            severity: "error",
            summary: "Form Creation Failed",
            detail: "Something went wrong. Kindly try again",
          });
        }
      );
    }
  }

  createNewFormDialog(): void {
    this.editMode = false;
    this.newForm.reset();
    this.toggleFormMakerDialog();
  }

  openEditDialog(form: OrderMailFormResponse, index: number) {
    this.toggleFormMakerDialog();
    this.editMode = true;
    this.editIndex = index;
    this.prevForm = form;
    console.log(form, index);
    this.newForm.setValue(form.data);
  }

  deleteForm(index: number): void {
    this._commonService.setLoader(true);
    console.log('deleteing; ', this.forms[index]);
    this._formMakerService.deleteForm(this.forms[index].id).subscribe(
      () => {
          this.forms.splice(index, 1);
          // this.forms = [...this.forms];

          this._commonService.setLoader(false);
          this._messageService.add({
            severity: "success",
            summary: "Form Deleted",
            detail: "Form was deleted successfully",
          });
      },
      (e: any) => {
        console.error(e);
        this._commonService.setLoader(false);

        this._messageService.add({
          severity: "error",
          summary: "Form Deletion Failed",
          detail: "Something went wrong. Kindly try again",
        });
      }
    )
  }
}
