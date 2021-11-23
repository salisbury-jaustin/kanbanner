import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { Auth } from "../interfaces/auth";
import { User } from "./user";

@Injectable({ providedIn: 'root'})
export class AuthService {
    private readonly auth: Auth = {
        auth: false,
        user: [{
                _id: '',
                user: '',
                password: '',
                lists: [

                ]
            }]
    }

    private readonly _auth = new BehaviorSubject<Auth>(this.auth);
    readonly auth$ = this._auth.asObservable();

    constructor() {}

    setAuth(auth: Auth): void {
        /*
        const authUser: Auth = {
            auth: auth,
            user: user
        }
        */
        this._auth.next(auth);
    }
    getAuth(): Auth {
       return this._auth.getValue(); 
    }
}