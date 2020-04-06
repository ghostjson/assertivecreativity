import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;

  constructor() { }


  authentication(username: string, password: string) : boolean{
    if(username == 'user123' && password == '1234'){
      this.isAuthenticated = true;
      return true;
    }else{
      return false;
    }
  } 

}
