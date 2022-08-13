import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {KanaService} from "../../services/kana.service";
import {Kanji} from "../../models/kanji.model";
import kanji from "../../../assets/kanji_list.json";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  users: UserModel[] = [];
  kanjiList: Kanji[] = kanji;

  constructor(public authService: AuthService, public afAuth: AngularFireAuth, private userService: UserService,
              public dialog: MatDialog, private kanaService: KanaService) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        this.retrieveUserDocumentById(user.uid);
      }
      else {
        console.log("User failed to load");
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialog, {
      width: '300px',
      data: this.currentUser,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        console.log("dialog cancelled")
      } else {
        this.updateProfile(result)
      }
    })
  }

  ngOnInit(): void {

  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
      });
  }

  updateProfile(data: any): void {
    this.userService.updateUserDetails(this.currentUser!.uid, data).then(() => {
      window.location.reload();
    });
  }

  // update(): void {
  //   this.currentUser!.progressHiragana.level += 1;
  //   this.userService.updateUserProgressHiragana(this.currentUser!.uid, this.currentUser!.progressHiragana);
  // }
  //
  // uploadKanji(): void {
  //   this.kanjiList.forEach((value) => this.kanaService.createKanji(value))
  // }

}

@Component({
  selector: 'dashboard-dialog',
  templateUrl: 'dashboard-dialog.html',
})
export class DashboardDialog {

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    photoURL: new FormControl(''),
    answerType: new FormControl(''),
  });
  submitted = false;


  constructor(public dialogRef: MatDialogRef<DashboardDialog>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public currentUserData: UserModel) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [this.currentUserData.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [this.currentUserData.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      photoURL: [this.currentUserData.photoURL],
      phoneNumber: [this.currentUserData.phoneNumber],
      answerType: [this.currentUserData.answerType, [Validators.required]],
    })

    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.onCancel();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.onCancel();
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    this.dialogRef.close(this.form.value)

  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
    this.dialogRef.close(false);
  }

}
