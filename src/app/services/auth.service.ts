import { Injectable } from "@angular/core";
import { SignupFormInterface } from "../pages/signup/signup_form.interface";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { exception } from "console";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  host_name: string;
  username: string;

  constructor(private http: HttpClient) {
    this.host_name = environment.apiUrl;
  }

  public async authentication(email: string, password: string) {
    return this.http.post(this.host("/login"), { email, password }).toPromise();
  }

  public async register(form: SignupFormInterface) {
    let res: any = await this.http.post(this.host("/signup"), form).toPromise();
    localStorage.setItem("Token", await res.Token);
  }

  public isAuthenticated(): boolean {
    let Token = localStorage.getItem("Token");
    return Token != null ? true : false;
  }

  public async getUser() {
    if (this.isAuthenticated()) {
      let res: any = await this.http.get(this.host("/user")).toPromise();
      return res;
    }
  }

  private host(endpoint: string): string {
    return this.host_name + endpoint;
  }
}
