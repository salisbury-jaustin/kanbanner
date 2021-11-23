import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KanBannerDataService } from 'src/app/kan-banner-data.service';
import { AuthService } from 'src/app/classes/authService';
import { Auth } from 'src/app/interfaces/auth';
import { Credentials } from 'src/app/interfaces/credentials';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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

  public createUser(): void {
    if (this.username != "" && this.password != "") {
      this.kanBannerDataService
        .createUser(this.username, this.password)
        .then(res => {
          if (res.error) {
            this.error = true;
            this.errorMsg = res.error;
          } else {
            let authenticated: Auth = {
              auth: true,
              user: res
            }
            this.username = "";
            this.password = "";
            this.authService.setAuth(authenticated);
            this.router.navigate(['/myboard']);
          }
        })
    }
    else {
      this.error = true;
      this.errorMsg = "Username and password must be provided."
    }
  }
}
