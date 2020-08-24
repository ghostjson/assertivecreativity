export class Category {
  id: number;
  label: string;
  description: string;
  value: string;
  productCount: number;

  constructor(initial: Category=null) {
    if (initial !== null) {
      this.id = initial.id;
      this.label = initial.label;
      this.description = initial.description;
      this.value = initial.value;
      this.productCount = initial.productCount;
    }
    else {
      this.id = null;
      this.label = null;
      this.description = null;
      this.value = null;
      this.productCount = null;
    }
  }
}