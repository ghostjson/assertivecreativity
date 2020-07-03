// model describing a Product
export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public sales: number,
    public image: string,
    public features: Array<Object>
  ) { }
}


// model for defining product color
export class ProductColor {
  constructor(
    public id: string,
    public type: string,
    public colors: Color[]
  ) {}
}


// model for specifying color
export class Color {
  constructor(
    public id: number,
    public colorName: string,
    public colorHex: string
  ) {

  }
}


// model for product size
export class ProductSize {
  constructor(
    public title: string,
    public sizes: Size[]
  ) {}
}


// model for specifying size
export class Size {
  constructor(
    public name: string,
    public value: number
  ) {}
}
