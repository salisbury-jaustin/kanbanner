import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './classes/user';
import { Credentials } from './interfaces/credentials';
import { addItemBody } from './interfaces/addItem';

@Injectable({
  providedIn: 'root'
})
export class KanBannerDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl: string = 'http://localhost:3000/api';
  private header:{} = {'content-type': 'application/json'};

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
  public addItem(addItembody: addItemBody) {
    const url: string = `${this.apiBaseUrl}/addItem`;
    let obj: object = addItembody;
    let body: string = JSON.stringify(obj);
    return this.http
      .post(url, body, {'headers': this.header});
  }
}