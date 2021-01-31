import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/common.service';
import { OrderFormResponse, OrderFormQuestionConfig, OrderFormConfig } from 'src/app/models/OrderForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.scss']
})
export class AdminFormsComponent implements OnInit {
  forms: OrderFormResponse[] = null;
  showFormMakerDialog: boolean = false;
  newForm: FormGroup;
  editMode: boolean = false;
  editIndex: number;
  prevForm: OrderFormResponse;
  draggedQuestion: OrderFormQuestionConfig;
  formItemMenuItems: MenuItem[];

  constructor(
    private _adminFormsService: AdminOrdersFormMakerService,
    private _commonService: CommonService,
    private _formMakerService: AdminOrdersFormMakerService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._commonService.setLoaderFor(
      this._adminFormsService
      .getAllForms()
      .subscribe((res: OrderFormResponse[]) => {
        this.forms = res;
        console.log('forms received: ', this.forms);
      })
    );

    this.newForm = this._formMakerService.createOrderForm();

    this.formItemMenuItems = [
      {
        label: 'Duplicate Form',
        title: 'Duplicate this form',
        icon: 'pi pi-clone'
      }
    ];
  }

  toggleFormMakerDialog(): void {
    this.showFormMakerDialog = !this.showFormMakerDialog;
  }

  hideFormMakerDialog(): void {
    this.showFormMakerDialog = false;
  }

  addForm(): void {
    this.hideFormMakerDialog();

    if(this.editMode) {
      this._commonService.setLoaderFor(
        this._formMakerService.editForm(this.prevForm.id, this.newForm.value)
        .subscribe(
          ((res: any) => {
            this.forms.splice(this.editIndex, 1, {
              id: res.data.id,
              name: String(this.newForm.value.title),
              data: {...this.newForm.value},
              created_at: res.data.created_at,
              updated_at: res.data.updated_at
            });

            this._messageService.add({
              severity: 'success',
              summary: 'Form updated',
              detail: `${this.newForm.value.title.slice(0, 50)} updated`,
            });
          }),
          ((e: any) =>{
            console.error(e);

            this._messageService.add({
              severity: 'error',
              summary: 'Form not updated',
              detail: 'Something went wrong. Kindly try again',
            });
          })
        )
      );
    }
    else {
      this._commonService.setLoaderFor(
        this._formMakerService.addForm(this.newForm.value).subscribe(
          (res: any) => {
            let resForm: OrderFormResponse = {
              id: res.data.id,
              name: res.data.name,
              data: this.newForm.value,
              created_at: res.data.created_at,
              updated_at: res.data.updated_at
            };

            this.forms.push(resForm);

            this._messageService.add({
              severity: 'success',
              summary: 'Form Added',
              detail: 'Form was added successfully',
            });
          },
          () => {
            this._messageService.add({
              severity: 'error',
              summary: 'Form not created',
              detail: 'Something went wrong. Kindly try again',
            });
          }
        )
      );
    }
  }

  createNewFormDialog(): void {
    this.editMode = false;
    this.newForm = this._formMakerService.createOrderForm();
    this.toggleFormMakerDialog();
  }

  openEditDialog(form: OrderFormResponse, index: number) {
    this.toggleFormMakerDialog();
    this.editMode = true;
    this.editIndex = index;
    this.prevForm = form;
    this.newForm = this._formMakerService.createOrderForm(form.data);
  }

  deleteForm(index: number): void {
    this._commonService.setLoaderFor(
      this._formMakerService.deleteForm(this.forms[index].id).subscribe(
        () => {
            this.forms.splice(index, 1);

            this._messageService.add({
              severity: 'success',
              summary: 'Form Deleted',
              detail: 'Form was deleted successfully',
            });
        },
        (e: any) => {
          console.error(e);

          this._messageService.add({
            severity: 'error',
            summary: 'Form Deletion Failed',
            detail: 'Something went wrong. Kindly try again',
          });
        }
      )
    );
  }

  /**
   * do an operation on form
   * @param event event object
   * @param form form config to do operation on
   * @param formIndex index of the form config
   */
  doFormOperation(event: any, form: OrderFormResponse, formIndex: number): void {
    switch(event.item.label) {
      case 'Duplicate Form':
        this.editMode = false;
        let duplicate = form;
        duplicate.data.id = null;

        this.newForm = this._formMakerService.createOrderForm(duplicate.data);
        this.addForm();
        break;
    }
  }

  /**
   * trackby function for ngfor
   * @param index index
   * @param obj object passed which has an id
   */
  trackById(index: number, obj: any): number {
    return obj.id;
  }
}