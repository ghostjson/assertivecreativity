import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private auth: AuthService) {
  }

  public getUser() {
    return this.auth.getUser();
  }

  public async getRole() {
    let user = await this.auth.getUser();

    return new Promise((resolve, reject) => {
      resolve(user.data.role);
    })
  }

  // public async getName() {
  //   let user = await this.auth.getUser();

  //   return new Promise((resolve, reject) => {
  //     resolve(user.data.name);
  //   });
  // }

}
