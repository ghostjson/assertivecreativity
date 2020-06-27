export class Product {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public price: number,
    public stock: number,
    public sales: number,
    public link: string
  ) { }
}
