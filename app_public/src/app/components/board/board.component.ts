import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { KanBannerDataService } from 'src/app/kan-banner-data.service';
import { AuthService } from 'src/app/classes/authService';
import { User } from 'src/app/classes/user';
import { addItemPayload, addItemBody } from 'src/app/interfaces/addItem';
import { Auth } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  constructor(private kanBannerDataService: KanBannerDataService,
    private authService: AuthService,
    private router: Router) { }

  public users!: User[]; 
  private auth!: Auth;
  ngOnInit(): void {
    this.auth = this.authService.getAuth();
    if (this.auth.auth == false) {
      this.router.navigate(['/']);
    }
    if (this.auth.auth == true) {
      this.users = this.auth.user;
    }
  }

  public addItem(payload: addItemPayload): void {
    let body: addItemBody = {
      user: 'test',
      list: payload.list,
      item: payload.item 
    }

    this.kanBannerDataService
      .addItem(body) 
  }
}
