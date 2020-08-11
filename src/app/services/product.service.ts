import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host: string;

  constructor(private http: HttpClient) {
    this.host = environment.apiUrl;
  }

  async getProducts() {
    return this.http.get(this.host + '/products').toPromise();
  }

  async getProduct(id: number){
    let res = await this.http.get(this.host + `/products/${id}`).toPromise();

    return new Promise((resolve, reject) => {
      res['data']['features'] = JSON.parse(res['data']['features']);
      console.log(res)
      resolve(res);
    });
  }
}
