import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-app',
  templateUrl: "app/app.component.html" 
})
export class AppComponent{
  //public users: FirebaseListObservable<any[]>;
  constructor(private _af: AngularFire){
    //this.users = this._af.database.list("/users");
  }
}
