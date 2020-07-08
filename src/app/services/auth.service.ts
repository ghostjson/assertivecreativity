import { Injectable } from '@angular/core';
import { SignupFormInterface } from '../pages/signup/signup_form.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  host_name: string;

  constructor(private http: HttpClient) {
    this.host_name = environment.apiUrl;
  }

  public async authentication(email: string, password: string) {
    try {
      let res: any = await this.http
        .post(this.host("/login"), { email, password })
        .toPromise();
      localStorage.setItem("Token", await res.Token);
      console.log(localStorage.getItem("Token"));
    } catch (e) {
      console.log(e);
    }
  }

  public async register(form: SignupFormInterface) {
    let res: any = await this.http.post(this.host("/signup"), form).toPromise();
    localStorage.setItem("Token", await res.Token);
  }

  public isAuthenticated(): boolean {
    let Token = localStorage.getItem("Token");
    return Token != null ? true : false;
  }

  private host(endpoint: string): string {
    return this.host_name + endpoint;
  }
}
