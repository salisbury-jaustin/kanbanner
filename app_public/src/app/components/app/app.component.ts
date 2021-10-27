import { Component, OnInit } from '@angular/core';
import { KanBannerDataService } from 'src/app/kan-banner-data.service';

export class User{
  name: string;
  items: [string];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {

  constructor(private kanBannerDataService: KanBannerDataService) { }

  public user: User; 

  ngOnInit(): {
    this.getUser();
  }

  private getUser(): void {
    this.kanBannerDataService
      .getUser('test') 
        .then(foundUser=> this.user= foundUser);
  }
}
