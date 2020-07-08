import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  user: any = null;

  constructor(private auth: AuthService) {
    this.auth.getUser().then(res => {
      this.user = res.data;
    });
  }

  public getRole(): string{
    return this.user.role;
  }

  public getName(): string{
    return this.user.name;
  }


}
