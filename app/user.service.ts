import { Injectable } from "@angular/core";
import { AngularFire } from 'angularfire2';

@Injectable()
export class UserService {
    public isLoggedIn: boolean = false;
    constructor(private _af: AngularFire){
        this._af.auth.subscribe(
            (auth) => {
                this.isLoggedIn = true;
            }
        );
    }
}