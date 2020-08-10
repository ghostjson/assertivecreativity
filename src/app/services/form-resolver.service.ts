import { Injectable, ViewContainerRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormComponent } from "./../library/FormComponents";

@Injectable({
  providedIn: "root"
})
export class FormResolverService {
  form_data: object;
  form_contents: string;

  formComponents: {
    type: string;
    className: string;
    label: string;
    required: string;
  }[] = [];

  constructor(
    private http: HttpClient,
    private formcompontents: FormComponent
  ) {}

  resolve(id: number, element: any): any {
    this.requestResolver(id).subscribe(data => {
      let form_data = JSON.parse(data.formData);

      element.insertAdjacentHTML("beforeend", `<h2>${data.name}</h2>`);

      form_data.forEach(form => {
        console.table(form);
        element.insertAdjacentHTML(
          "beforeend",
          this.formcompontents.getComponents(form)
        );
      });

      element.insertAdjacentHTML(
        "beforeend",
        '<button type="submit">Submit</button>'
      );
    });
  }

  requestResolver(id: number): any {
    return this.http.get(`http://3.22.164.157/form/${id}`);
  }
}
