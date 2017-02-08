import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'app/user.service';

@Injectable()
export class RequireUser implements CanActivate {

  constructor(private _currentUser: UserService) {}

  canActivate() {
    return this._currentUser.isLoggedIn;
  }
}