import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KanBannerDataService } from 'src/app/kan-banner-data.service';
import { AuthService } from 'src/app/classes/authService';
import { Auth } from 'src/app/interfaces/auth';
import { Cookie } from 'src/app/classes/cookie';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private kanBannerDataService: KanBannerDataService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  public error: boolean = false;
  public errorMsg: string = "";

  private _username: string = "";
  get username(): string {
    return this._username;
  }
  set username(val: string) {
    this._username = val;
  }

  private _password: string = "";
  get password(): string {
    return this._password;
  }
  set password(val: string) {
    this._password= val;
  }


  public signIn(): void {
    if (this.username != "" && this.password != "") {
      this.getUser(this.username, this.password);
    } else {
      this.error = true;
      this.errorMsg = "Username and password must be provided."
    }
  }
  private getUser(user: string, password: string): void{
    this.kanBannerDataService
      .getUser(user, password) 
      .then(res => {
        if (res.error) {
          this.error = true;
          this.errorMsg = res.error
        } else {
          let authenticated: Auth = {
            auth: true,
            user: res 
          }
          let cookie = new Cookie(authenticated);
          cookie.setCookie();
          this.authService.setAuth(authenticated);
          this.router.navigate(['/myboard']);
        }
      })
  }
}
