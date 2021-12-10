import { Component, OnInit } from '@angular/core';
import { Cookie } from 'src/app/classes/cookie';
import { KanBannerDataService } from 'src/app/kan-banner-data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/classes/authService';
import { Auth } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private kanBannerDataService: KanBannerDataService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    let user = Cookie.getCookie('user');
    let password = Cookie.getCookie('password');
    if (user != "" && password != "") {
      this.username = user;
      this.password = password;
      this.signIn(); 
    }
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
      this.errorMsg = "There was an issue with the previous credentials. Please sign in."
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
