import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/classes/authService';
import { Auth } from 'src/app/interfaces/auth';
import { Cookie } from 'src/app/classes/cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  public signOut() {
    let voidAuth: Auth = {
      auth: false,
      user: [{
        _id: '',
        user: '',
        password: '',
        lists: [
        ]
      }]
    }
    this.authService.setAuth(voidAuth);
    Cookie.deleteCookies();
    this.router.navigate(['/']);
  }
}
