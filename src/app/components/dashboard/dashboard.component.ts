import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Progress, UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {KanaService} from "../../services/kana.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import funFacts from "../../../assets/funFacts.json";
import {FunFact} from "../../models/funFact.model";

// // Used to upload json assets to Firebase
import {Kana} from "../../models/kana.model";
import {Vocabulary} from "../../models/vocabulary.model";
import {Kanji} from "../../models/kanji.model";
import hiragana from "../../../assets/hiragana_list.json";
import katakana from "../../../assets/katakana_list.json";
import nouns from "../../../assets/nouns_list.json";
import verbs from "../../../assets/verbs_list.json";
import iAdjectives from "../../../assets/i-adjectives_list.json";
import naAdjectives from "../../../assets/na-adjectives_list.json";
import adverbs from "../../../assets/adverbs_list.json";
import kanji from "../../../assets/kanji_list.json";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // // Used to upload json assets to Firebase
  hiraganaList: Kana[] = hiragana;
  katakanaList: Kana[] = katakana;
  nounList: Vocabulary[] = nouns;
  verbList: Vocabulary[] = verbs;
  iAdjectiveList: Vocabulary[] = iAdjectives;
  naAdjectiveList: Vocabulary[] = naAdjectives;
  adverbList: Vocabulary[] = adverbs;
  kanjiList: Kanji[] = kanji;
  funFactList: FunFact[] = funFacts;

  userData: any; // Save logged in user data
  currentUser?: UserModel;
  isAdmin = false;
  isVerified = false;

  hiraganaProgressArray: Array<[id: string, sign: string, reading: string, correctSum: number, answered: number]> = [];
  katakanaProgressArray: Array<[id: string, sign: string, reading: string, correctSum: number, answered: number]> = [];
  nounProgressArray: Array<[id: string, sign: string, reading: string, meaning: string, correctSum: number, answered: number]> = [];
  verbProgressArray: Array<[id: string, sign: string, reading: string, meaning: string, correctSum: number, answered: number]> = [];
  iAdjectiveProgressArray: Array<[id: string, sign: string, reading: string, meaning: string, correctSum: number, answered: number]> = [];
  naAdjectiveProgressArray: Array<[id: string, sign: string, reading: string, meaning: string, correctSum: number, answered: number]> = [];
  adverbProgressArray: Array<[id: string, sign: string, reading: string, meaning: string, correctSum: number, answered: number]> = [];
  kanjiProgressArray: Array<[id: string, sign: string, meaning: string, correctSum: number, answered: number]> = [];


  constructor(public authService: AuthService, public afAuth: AngularFireAuth, private userService: UserService,
              public dialog: MatDialog, private kanaService: KanaService) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        this.isVerified = user.emailVerified;
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
        this.isAdmin = this.currentUser!.isAdmin
        this.progressUpdate(this.currentUser!.progressHiragana, "hiragana");
        this.progressUpdate(this.currentUser!.progressKatakana, "katakana");
        this.progressUpdate(this.currentUser!.progressNoun, "noun");
        this.progressUpdate(this.currentUser!.progressVerb, "verb");
        this.progressUpdate(this.currentUser!.progressIAdjective, "iAdjective");
        this.progressUpdate(this.currentUser!.progressNaAdjective, "naAdjective");
        this.progressUpdate(this.currentUser!.progressAdverb, "adverb");
        this.progressUpdate(this.currentUser!.progressKanji, "kanji");
      });
  }

  updateProfile(data: any): void {
    this.userService.updateUserDetails(this.currentUser!.uid, data).then(() => {
      window.location.reload();
    });
  }

  progressUpdate(progress: Progress, type: string) {
    for (let pKey in progress) {

      if ((pKey == 'quizLevel') || (pKey == 'learningLevel'))
        continue

      let id = pKey;
      let sign = progress[pKey as unknown as number].sign;
      let reading = ""
      let meaning = ""
      let timesCorrect = progress[pKey as unknown as number].timesCorrect
      let length = progress[pKey as unknown as number].timesCorrect.length
      let sum = 0

      if (type == "hiragana" || type == "katakana")
        reading = progress[pKey as unknown as number].reading!
      else if (type == "kanji")
        meaning = progress[pKey as unknown as number].meaning![0]
      else {
        reading = progress[pKey as unknown as number].reading!
        meaning = progress[pKey as unknown as number].meaning![0]
      }

      timesCorrect.forEach((element: number) => {
        sum += element
      })

      switch (type) {
        case "hiragana": {
          this.hiraganaProgressArray.push([id, sign, reading, sum, length])
          break
        }
        case "katakana": {
          this.katakanaProgressArray.push([id, sign, reading, sum, length])
          break
        }
        case "noun": {
          this.nounProgressArray.push([id, sign, reading, meaning, sum, length])
          break
        }
        case "verb": {
          this.verbProgressArray.push([id, sign, reading, meaning, sum, length])
          break
        }
        case "iAdjective": {
          this.iAdjectiveProgressArray.push([id, sign, reading, meaning, sum, length])
          break
        }
        case "naAdjective": {
          this.naAdjectiveProgressArray.push([id, sign, reading, meaning, sum, length])
          break
        }
        case "adverb": {
          this.adverbProgressArray.push([id, sign, reading, meaning, sum, length])
          break
        }
        case "kanji": {
          this.kanjiProgressArray.push([id, sign, meaning, sum, length])
          break
        }
      }
    }
    console.log("hiragana: ", this.hiraganaProgressArray)
    console.log("katakana: ", this.katakanaProgressArray)
    console.log("noun: ", this.nounProgressArray)
    console.log("verb: ", this.verbProgressArray)
    console.log("iAdjective: ", this.iAdjectiveProgressArray)
    console.log("naAdjective: ", this.naAdjectiveProgressArray)
    console.log("adverb: ", this.adverbProgressArray)
    console.log("kanji: ", this.kanjiProgressArray)
  }

  // // Used to upload json assets to Firebase
  uploadHiragana(): void {
    this.hiraganaList.forEach((value) => this.kanaService.createHiragana(value))
  }

  uploadKatakana(): void {
    this.katakanaList.forEach((value) => this.kanaService.createKatakana(value))
  }

  uploadNouns(): void {
    this.nounList.forEach((value) => this.kanaService.createNoun(value))
  }

  uploadVerbs(): void {
    this.verbList.forEach((value) => this.kanaService.createVerb(value))
  }

  uploadIAdjectives(): void {
    this.iAdjectiveList.forEach((value) => this.kanaService.createIAdjective(value))
  }

  uploadNaAdjectives(): void {
    this.naAdjectiveList.forEach((value) => this.kanaService.createNaAdjective(value))
  }

  uploadAdverbs(): void {
    this.adverbList.forEach((value) => this.kanaService.createAdverb(value))
  }

  uploadKanji(): void {
    this.kanjiList.forEach((value) => this.kanaService.createKanji(value))
  }
  uploadFunFact(): void {
    this.funFactList.forEach((value) => this.kanaService.createFunFact(value))
  }

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

    this.dialogRef.backdropClick().subscribe(() => {
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
