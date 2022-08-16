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

  updateUserDetails(userID: string, userData: UserModel): Promise<void> {
    return this.userRef.doc(userID).update({
      displayName: userData.firstName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      photoURL: userData.photoURL,
      answerType: userData.answerType
    })
  }

  updateUserProgressHiragana(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressHiragana: progressData
    });
  }

  updateUserProgressKatakana(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressKatakana: progressData
    });
  }

  updateUserProgressNoun(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressNoun: progressData
    });
  }

  updateUserProgressVerb(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressVerb: progressData
    });
  }
  updateUserProgressIAdjective(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressIAdjective: progressData
    });
  }
  updateUserProgressNaAdjective(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressNaAdjective: progressData
    });
  }
  updateUserProgressAdverb(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressAdverb: progressData
    });
  }
  updateUserProgressKanji(userID: string, progressData: any): Promise<void> {
    return this.userRef.doc(userID).update({
      progressKanji: progressData
    });
  }

}
