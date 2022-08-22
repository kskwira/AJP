import {Injectable, NgZone} from '@angular/core';
import {UserModel} from "../models/user.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)


    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  // Sign in with email/password
  SignIn(email: any, password: any  ) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(formData: any ) {
    return this.afAuth.createUserWithEmailAndPassword(formData.email, formData.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.UpdateProfile(formData);
        this.SendVerificationMail();
        this.SetUserDataSignUp(result.user, formData);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      return user?.sendEmailVerification();
    }).then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // update displayName and photoURL when new user sign up
  UpdateProfile(userData: any) {
    return this.afAuth.currentUser.then((user) => {
      return user?.updateProfile({
        displayName: userData.firstName,
        photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoMva5-CUwFU3POWm6uJbysmC86IdtGE4Gqg&usqp=CAU"});
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false);
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password,
sign up with username/password and sign in with social auth
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserDataSignUp(user: any, formData: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const userData: UserModel = {
      uid: user.uid,
      email: user.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.firstName,
      photoURL: user.photoURL,
      phoneNumber: "",
      answerType: "select",
      providerId: "",
      isAdmin: false,
      progressHiragana: { learningLevel: 1, quizLevel: 0 },
      progressKatakana: { learningLevel: 1, quizLevel: 0 },
      progressKanji: { learningLevel: 0, quizLevel: 0 },
      progressNoun: { learningLevel: 0, quizLevel: 0 },
      progressVerb: { learningLevel: 0, quizLevel: 0 },
      progressAdverb: { learningLevel: 0, quizLevel: 0 },
      progressNaAdjective: { learningLevel: 0, quizLevel: 0 },
      progressIAdjective: { learningLevel: 0, quizLevel: 0 },
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: UserModel = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName='aaa',
      lastName: user.lastName='bbb',
      displayName: "aaa bbb",
      photoURL: user.photoURL,
      phoneNumber: "",
      answerType: "select",
      providerId: "",
      isAdmin: false,
      progressHiragana: { learningLevel: 1, quizLevel: 0 },
      progressKatakana: { learningLevel: 1, quizLevel: 0 },
      progressKanji: { learningLevel: 0, quizLevel: 0 },
      progressNoun: { learningLevel: 0, quizLevel: 0 },
      progressVerb: { learningLevel: 0, quizLevel: 0 },
      progressAdverb: { learningLevel: 0, quizLevel: 0 },
      progressNaAdjective: { learningLevel: 0, quizLevel: 0 },
      progressIAdjective: { learningLevel: 0, quizLevel: 0 },
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}
