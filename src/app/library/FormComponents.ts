export interface FormInputInterface {
  type?: string;
  required?: string;
  label?: string;
  className?: string;
  name?: string;
  access?: boolean;
  values?: any;
  description?: string;
  subtype?: string;
  placeholder?: string;
  value?: string;
  min?: string;
  max?: string;
  selected?: string;
  maxlength?: string;
  rows?: string;
}

export class FormComponent {
  // input resolver core
  public getComponents(form: FormInputInterface): string {
    switch (form.type) {
      case "autocomplete":
        return `
          <div class='form-group'>
            <label>${form.label}</label>
            <input type="text" list='${form.name}' value="${this.isDefined(
          form.value
        )}" placeholder='${this.isDefined(form.placeholder)}' name='${
          form.name
        }' class='${this.isDefined(form.className)}' ${this.getReq(
          form.required
        )}>
            <datalist id='${form.name}'>
              ${this.retrieveVaules(form.values)}
            </datalist>
          </div>
            `;

      case "date":
        return `
            <div class='form-group'>
              <label>${form.label}</label>
              <small>${this.isDefined(form.description)}</label>
              <input type="date" placeholder='${this.isDefined(
                form.placeholder
              )}' value="${this.isDefined(form.value)}" name='${
          form.name
        }' class='${this.isDefined(form.className)}' ${this.getReq(
          form.required
        )}>
            </div>
          `;
      case "file":
        return `
          <div class='form-group'>
            <label>${form.label}</label>
            <small>${this.isDefined(form.description)}</small>
            <input type="file" name='${form.name}' class='${this.isDefined(
          form.className
        )}' ${this.getReq(form.required)}>
          </div>
        `;

      case "header":
        return `
          <${form.subtype}>${form.label}</${form.subtype}>
        `;
      case "number":
        return ` 
        <div class='form-group'>
        <label>${form.label}</label>
        <small>${this.isDefined(form.description)}</small>
        <input type="number" name='${form.name}' value="${this.isDefined(
          form.value
        )}" min="${this.isDefined(form.min)}" max="${this.isDefined(
          form.max
        )}" placeholder='${this.isDefined(
          form.placeholder
        )}' class='${this.isDefined(form.className)}' ${this.getReq(
          form.required
        )}>
      </div>
    `;

      case "paragraph":
        return `<${form.subtype} class="${this.isDefined(form.className)}">${
          form.label
        }</${form.subtype}>`;

      case "select":
        return `
        <div class='form-group'>
          <label>${form.label}</label>
          <small>${this.isDefined(form.description)}</small>
          <select class='${this.isDefined(form.className)}' name='${form.name}'>
            ${this.retrieveVaules(form.values)}
          </select>
      `;

      case "radio-group":
        return `
          <div class='form-group'>
            <label>${form.label}</label>
            <small>${this.isDefined(form.description)}</small>
            ${this.retrieveRadios(form)}
        `;

      case "text":
        return ` 
            <div class='form-group'>
            <label>${form.label}</label>
            <small>${this.isDefined(form.description)}</small>
            <input type="${form.subtype}" name='${
          form.name
        }' value="${this.isDefined(form.value)}" min="${this.isDefined(
          form.min
        )}" maxlength="${this.isDefined(
          form.maxlength
        )}" placeholder='${this.isDefined(
          form.placeholder
        )}' class='${this.isDefined(form.className)}' ${this.getReq(
          form.required
        )}>
          </div>
        `;

      case "textarea":
        return ` 
            <div class='form-group'>
            <label>${form.label}</label>
            <small>${this.isDefined(form.description)}</small>
            <textarea name="${form.name}" placeholder="${this.isDefined(
          form.placeholder
        )}" class="${this.isDefined(
          form.className
        )}" maxlength="${this.isDefined(
          form.maxlength
        )}" rows="${this.isDefined(form.rows)}">${this.isDefined(
          form.value
        )}</textarea>
          </div>
        `;

      case "checkbox-group":
        return `
          <div class='form-group'>
            <label>${form.label}</label>
            <small>${this.isDefined(form.description)}</small>
            ${this.retrieveChecks(form)}
          </div>
        `;
    }
  }

  private getReq(re): string {
    return re ? "required" : "";
  }

  private retrieveVaules(values): string {
    let options = "";
    values.forEach(element => {
      options += `<option value='${element.value}'>${element.label}</option>`;
    });
    return options;
  }

  private retrieveRadios(form): string {
    let values = form.values;
    let options = "";
    values.forEach(element => {
      options += `<input type="radio" name=${form.name} class="${this.isDefined(
        form.className
      )}" value='${this.isDefined(element.value)}' ${element.selected}>${
        element.label
      }</option>`;
    });
    return options;
  }

  private isDefined(value): string {
    if (value == undefined || value == null) {
      return "";
    } else {
      return value;
    }
  }

  private retrieveChecks(form): string {
    let values = form.values;
    let options = "";
    values.forEach(element => {
      options += `
      <div class="form-group">
      <input type="checkbox" name=${form.name} class="${this.isDefined(
        form.className
      )}" value='${this.isDefined(element.value)}' ${element.selected}>
      <label>${element.label}</label>
      </div>`;
    });
    return options;
  }
}
