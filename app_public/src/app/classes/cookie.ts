import { Auth } from "../interfaces/auth";

export class Cookie {
    private user!: string;
    private password!: string;
    private dateExpired!: Date;

    constructor(auth: Auth) {
        this.user= auth.user[0].user;
        this.password = auth.user[0].password;
        this.setDateExpired();
    }

    public setCookie():void {
        document.cookie = 
            "user=" + this.user + "; expires=" + this.dateExpired.toUTCString() + "; ";
        document.cookie = 
            "password=" + this.password + "; expires=" + this.dateExpired.toUTCString() + "; ";
    }
    private setDateExpired(): void {
        let date = new Date();
        date.setDate(date.getDate() +3);
        this.dateExpired = date; 
    }
    static getCookie(cookieName: string): string {
        let name = cookieName+ "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieStrings = decodedCookie.split(';');
        for(let i = 0; i <cookieStrings.length; i++) {
            let cookie = cookieStrings[i];
            while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }
    static deleteCookies(): void{
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
}