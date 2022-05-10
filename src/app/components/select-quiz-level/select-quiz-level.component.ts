import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-select-quiz-level',
  templateUrl: './select-quiz-level.component.html',
  styleUrls: ['./select-quiz-level.component.css']
})
export class SelectQuizLevelComponent implements OnInit {

  userData: any; // Save logged in user data

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      if(user) {
        this.userData = user;
      }
    });
  }

}
