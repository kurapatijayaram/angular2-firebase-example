import { Injectable } from "@angular/core";
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import {Subject, Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {
    public isLoggedIn: boolean = false;
    public loginObservable: Subject<FirebaseAuthState> = new Subject<FirebaseAuthState>();

    constructor(private _af: AngularFire){
        this._af.auth.subscribe(
            (auth) => {
                if(auth){
                    this.isLoggedIn = true;
                    this.loginObservable.next(auth);
                }
            }
        );
    }
}