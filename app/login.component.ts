import { Component } from "@angular/core";
import { Router } from "@angular/router"
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
    selector: "login",
    templateUrl: "app/login.component.html"
})
export class LoginComponent {
    constructor(private _af: AngularFire, private _router: Router){
        this._af.auth.subscribe(
            (auth) => {
                console.log(auth);
                this._createOrUpdateUser(
                    {
                        providerId: auth.google.providerId,
                        providerUid: auth.google.uid,
                        email: auth.google.email,
                        name: auth.google.displayName,
                        imageUrl: auth.google.photoURL,
                        uid: auth.uid
                    }
                ).then((success) => {
                    this._router.navigate(["/home"]);
                })
            }
        );
    }

    private _createOrUpdateUser(userDetails: {providerId: string, providerUid: string, email: string, name: string, uid: string, imageUrl: string}): Promise<any>{
        return this._af.database.object("/users/" + userDetails.uid).set(
            {
                name: userDetails.name,
                providerId: userDetails.providerId,
                email: userDetails.email,
                providerUid: userDetails.providerUid,
                imageUrl: userDetails.imageUrl
            }
        );
        
    }

    public login() {
        this._af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });
    }
}