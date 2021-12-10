import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { KanBannerDataService } from 'src/app/kan-banner-data.service';
import { AuthService } from 'src/app/classes/authService';
import { User } from 'src/app/classes/user';
import { addItemPayload, addItemBody } from 'src/app/interfaces/addItem';
import { Auth } from 'src/app/interfaces/auth';
import { moveItemBody, moveItemPayload } from 'src/app/interfaces/moveItem';
import { windowWhen } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  public users!: User[]; 
  public newList: string = ""
  public isAdding: Boolean = false;
  private auth!: Auth;

  constructor(private kanBannerDataService: KanBannerDataService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.auth = this.authService.getAuth();
    if (this.auth.auth == false) {
      this.router.navigate(['/']);
    }
    if (this.auth.auth == true) {
      this.users = this.auth.user;
    }
  }

  public setIsAdding(val: Boolean): void {
    this.isAdding = val;
  }

  public addList(): void {
    let body: {} = {
      user: this.auth.user[0].user,
      lists: [
        {
          list: this.newList,
          items: []
        }
      ]
    }
    this.kanBannerDataService 
      .createLists(body);
    window.location.reload();
  }

  public addItem(payload: addItemPayload): void {
    let body: addItemBody = {
      user: this.auth.user[0].user,
      list: payload.list,
      item: payload.item 
    };
    this.kanBannerDataService
      .addItem(body)
    window.location.reload();
  } 
}
