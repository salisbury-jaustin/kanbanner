import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { PortalComponent } from './components/portal/portal.component';
import { BoardComponent } from './components/board/board.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { ItemOptionsComponent } from './components/item-options/item-options.component';
import { ListOptionsComponent } from './components/list-options/list-options.component'


@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    BoardComponent,
    SigninComponent,
    SignupComponent,
    ListComponent,
    ItemComponent,
    ItemOptionsComponent,
    ListOptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: PortalComponent 
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'myboard',
        component: BoardComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
