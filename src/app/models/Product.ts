export class Product {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public price: number,
    public stock: number,
    public sales: number
  ) { }
}
