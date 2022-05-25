import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {UserModel} from "../models/user.model";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersDbPath = '/users';

  userRef: AngularFirestoreCollection<UserModel>;
  userRefDocument: AngularFirestoreDocument<UserModel> | undefined;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.usersDbPath);
  }

  getAllUsers(): AngularFirestoreCollection<UserModel> {
    return this.userRef;
  }

  getSingleUserById(id: string):AngularFirestoreCollection<UserModel>{
    this.userRef = this.db.collection(this.usersDbPath, ref => ref.where(firestore.FieldPath.documentId(), '==', id))
    return this.userRef
  }

  getSingleUserDocumentById(id: string):AngularFirestoreDocument<UserModel>{
    return this.userRefDocument = this.db.doc(`users/${id}`);
  }

  updateUserProgress(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressHiragana: progressData
    });
  }

}
