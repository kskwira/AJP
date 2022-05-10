import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserModel} from "../../models/user.model";
import {map} from "rxjs/operators";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any; // Save logged in user data
  users: UserModel[] | undefined;
  currentUser: any;
  currentIndex = -1;

  constructor(public authService: AuthService, public afAuth: AngularFireAuth, private userService: UserService) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      if(user) {
        this.userData = user;
        this.retrieveUserDocumentById(user.uid);
        // this.retrieveUsers();
        // this.retrieveUserById(user.uid);
      }
    });
  }

  retrieveUsers(): void {
    this.userService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

  retrieveUserById(userId: string): void {
    this.userService.getSingleUserById(userId).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.currentUser = data;
    });
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
      });
  }

  // setActiveUser(user: UserModel, index: number): void {
  //   this.currentUser = user;
  //   this.currentIndex = index;
  // }

  update(): void {
    this.currentUser.hiraganaProgressObject.level += 1;
    this.currentUser.hiraganaProgressObject[1].timesGuessed +=1;
    this.userService.updateUserProgress(this.currentUser.uid, this.currentUser.hiraganaProgressObject);
  }

}
