import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
