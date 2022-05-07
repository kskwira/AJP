import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public angularfireAuthentication: AngularFireAuth,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.angularfireAuthentication.authState.subscribe(user => {
        if (user) {
          if (user.emailVerified) {
            resolve(true);
          } else {
            resolve(false);
            this.router.navigate(['sign-in']);
          }
        } else {
          resolve(false);
          this.router.navigate(['sign-in']);
        }
      })
    })
  }
}
