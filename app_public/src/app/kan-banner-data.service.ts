import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './classes/user';
import { Credentials } from './interfaces/credentials';
import { addItemBody } from './interfaces/addItem';
import { rmvItemBody } from './interfaces/rmvItem';
import { editItemBody } from './interfaces/editItem';
import { moveItemBody } from './interfaces/moveItem';

@Injectable({
  providedIn: 'root'
})
export class KanBannerDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl: string = 'http://localhost:3000/api';
  private header:{} = {'content-type': 'application/json; charset=utf-8'};

  public async getUser(username: string, password: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/user/${username}/${password}`;
    let userExists: any = await this.checkUser(username)
    if (userExists == true) {
      return this.http 
        .get(url)
        .pipe(
          map((data: any): User[] => {
            return data;
          })
        )
        .toPromise()
    }
    if (userExists == false) {
      let res = {error: 'Credentials are invalid.'}
      return res;
    }
  }
  public async createUser(username: string, password: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/user`;
    let obj: object = {
      user: username,
      password: password
    };
    let body: string = JSON.stringify(obj);
    let userExists: any = await this.checkUser(username)
    if (userExists == false) {
      return this.http  
        .post<any>(url, body, {'headers': this.header})
        .toPromise()
        .then(res => {
          return res;
        })
    } 
    if (userExists == true) {
      let res = {error: 'Username already exists.'}
      return res;
    } 
  }
  private async checkUser(username: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/checkUser/${username}`;
    let response = await this.http
      .get<any>(url)
      .toPromise();
    return response.userExists;
  }
  public createLists(createListsBody: {}) {
    const url: string = `${this.apiBaseUrl}/addList`;
    let obj: object = createListsBody;
    let body: string = JSON.stringify(obj);
    return this.http
      .post<any>(url, body, {'headers': this.header})
        .subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
  }
  public addItem(addItemBody: addItemBody) {
    const url: string = `${this.apiBaseUrl}/addItem`;
    let obj: object = addItemBody;
    let body: string = JSON.stringify(obj);
    return this.http
      .post<any>(url, body, {'headers': this.header})
        .subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
  }
  public rmvItem(rmvItemBody: rmvItemBody) {
    const url: string = `${this.apiBaseUrl}/removeItem`;
    let obj: object = rmvItemBody;
    let body: string = JSON.stringify(obj);
    return this.http
    .post<any>(url, body, {'headers': this.header})
    .subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
  public editItem(editItemBody: editItemBody) {
    const url: string = `${this.apiBaseUrl}/editItem`;
    let obj: object = editItemBody;
    let body: string = JSON.stringify(obj);
    return this.http
      .put(url, body, {'headers': this.header})
      .subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
  public moveItem(moveItemBody: moveItemBody) {
    const url: string = `${this.apiBaseUrl}/moveItem`;
    let obj: object = moveItemBody;
    let body: string = JSON.stringify(obj);
    return this.http
      .put(url, body, {'headers': this.header}) 
      .subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}