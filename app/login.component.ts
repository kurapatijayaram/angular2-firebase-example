import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router"
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { UserService } from "app/user.service";

@Component({
    selector: "login",
    templateUrl: "app/login.component.html"
})
export class LoginComponent implements OnDestroy{
    constructor(private _af: AngularFire, private _router: Router, private _user: UserService){
        this._user.loginObservable.subscribe(
            (auth) => {
                this._createOrUpdateUser(auth).then(
                    (success) => {
                        this._router.navigate(["/home"]);
                    }
                )
            }
        )
    }

    private _createOrUpdateUser(authDetails: FirebaseAuthState): Promise<any>{
        return this._af.database.object("/users/" + authDetails.uid).set(
            {
                name: authDetails.google.displayName,
                providerId: authDetails.google.providerId,
                email: authDetails.google.email,
                providerUid: authDetails.google.uid,
                imageUrl: authDetails.google.photoURL
            }
        );
        
    }

    public login() {
        this._af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });
    }

    ngOnDestroy(){
        this._user.loginObservable.unsubscribe();
    }
}