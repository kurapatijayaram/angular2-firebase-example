import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { Routes, RouterModule  } from '@angular/router';
import { LoginComponent } from "app/login.component";
import { HomeComponent } from "app/home.component";
import { UserService } from "app/user.service";
import { RequireUser } from "app/require_user.canactivate";

export const firebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent}
]

const routing = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [ 
              BrowserModule,
              AngularFireModule.initializeApp(firebaseConfig),
              routing
          ],
  declarations: [AppComponent, LoginComponent, HomeComponent],
  bootstrap: [ AppComponent ],
  providers: [UserService, RequireUser]
})
export class AppModule { 
  constructor(){}
}
