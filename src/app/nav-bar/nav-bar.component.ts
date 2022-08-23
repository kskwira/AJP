import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthGuard} from "../shared/guard/auth.guard";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userData: any; // Save logged in user data
  isVerified = false;

  constructor(public afAuth: AngularFireAuth, public authService: AuthService, public authGuard: AuthGuard) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        this.isVerified = user.emailVerified;
      }
      else {
        console.log("User failed to load");
      }
    });
  }

  ngOnInit(): void {
  }

}
