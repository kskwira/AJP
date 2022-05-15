import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public authService: AuthService) {
    this.authService.SignOut()
  }

  ngOnInit(): void {
  }

}
