import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {KanaService} from "../../services/kana.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-select-learning-level',
  templateUrl: './select-learning-level.component.html',
  styleUrls: ['./select-learning-level.component.css']
})
export class SelectLearningLevelComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser: any;

  kanaSetList = new Set<number>();
  hiraganaLevel = 0;
  katakanaLevel = 0;
  kanjiLevel = 0;
  vocabularyLevel = 0;

  hiraganaForm: FormGroup;
  katakanaForm: FormGroup;

  singsData = [
    { id: 1, name: "a" },
    { id: 2, name: "ka" },
    { id: 3, name: "sa" },
    { id: 4, name: "ta" },
    { id: 5, name: "na" },
    { id: 6, name: "ha" },
    { id: 7, name: "ma" },
    { id: 8, name: "ya" },
    { id: 9, name: "ra" },
    { id: 10, name: "wa" },
    { id: 11, name: "ga" },
    { id: 12, name: "za" },
    { id: 13, name: "da" },
    { id: 14, name: "ba" },
    { id: 15, name: "pa" },
    { id: 16, name: "kya" },
    { id: 17, name: "sha" },
    { id: 18, name: "cha" },
    { id: 19, name: "nya" },
    { id: 20, name: "hya" },
    { id: 21, name: "mya" },
    { id: 22, name: "rya" },
    { id: 23, name: "gya" },
    { id: 24, name: "ja" },
    { id: 25, name: "dja" },
    { id: 26, name: "bya" },
    { id: 27, name: "pya" }
  ];

  get hiraganaSignsFormArray() {
    return this.hiraganaForm.controls['signs'] as FormArray;
  }

  get katakanaSignsFormArray() {
    return this.katakanaForm.controls['signs'] as FormArray;
  }

  constructor(private fb: FormBuilder, private kanaService: KanaService, private router: Router,
              public afAuth: AngularFireAuth, private userService: UserService) {

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        this.retrieveUserDocumentById(user.uid);
      }
      else {
        console.log("User failed to load");
      }
    });

    this.hiraganaForm = this.fb.group({
      signs: new FormArray([])
    });

    this.katakanaForm = this.fb.group({
      signs: new FormArray([])
    });

  }

  ngOnInit() {
    this.addCheckboxesToForm();
  }

  private addCheckboxesToForm() {
    this.singsData.forEach(() => this.hiraganaSignsFormArray.push(new FormControl(false)));
    this.singsData.forEach(() => this.katakanaSignsFormArray.push(new FormControl(false)));
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
        this.hiraganaLevel = this.currentUser.progressHiragana.level;
        this.katakanaLevel = this.currentUser.progressKatakana.level;
        this.kanjiLevel = this.currentUser.progressKanji.level;
        this.vocabularyLevel = this.currentUser.progressVocabulary.level;
        console.log("In retrieveDoc " + this.hiraganaLevel)
      });
  }

  checkDisableKana(signId: number, type: string): boolean {
    if (type == "hiragana") {
      return (signId > this.hiraganaLevel);
    }
    else if (type == "katakana") {
      return (signId > this.katakanaLevel);
    }
    return true;
  }

  onSubmit(type: string): void {
    const selectedHiraganaSignIds = this.hiraganaForm.value.signs
      .map((checked: any, i: number) => checked ? this.singsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedKatakanaSignIds = this.katakanaForm.value.signs
      .map((checked: any, i: number) => checked ? this.singsData[i].id : null)
      .filter((v: null) => v !== null);

    console.log("Hiragana: ", selectedHiraganaSignIds);
    console.log("Katakana: ", selectedKatakanaSignIds);

    if (type == "hiragana") {
      for (let i = 0; i < selectedHiraganaSignIds.length; i++) {
        if (selectedHiraganaSignIds[i] == 1)
          this.kanaSetList.add(1).add(2).add(3).add(4).add(5);

        if (selectedHiraganaSignIds[i] == 2)
          this.kanaSetList.add(6).add(7).add(8).add(9).add(10);

        if (selectedHiraganaSignIds[i] == 3)
          this.kanaSetList.add(11).add(12).add(13).add(14).add(15);

        if (selectedHiraganaSignIds[i] == 4)
          this.kanaSetList.add(16).add(17).add(18).add(19).add(20);

        if (selectedHiraganaSignIds[i] == 5)
          this.kanaSetList.add(21).add(22).add(23).add(24).add(25)

        if (selectedHiraganaSignIds[i] == 6)
          this.kanaSetList.add(26).add(27).add(28).add(29).add(30)

        if (selectedHiraganaSignIds[i] == 7)
          this.kanaSetList.add(31).add(32).add(33).add(34).add(35)

        if (selectedHiraganaSignIds[i] == 8)
          this.kanaSetList.add(36).add(37).add(38)

        if (selectedHiraganaSignIds[i] == 9)
          this.kanaSetList.add(39).add(40).add(41).add(42).add(43)

        if (selectedHiraganaSignIds[i] == 10)
          this.kanaSetList.add(44).add(45).add(46)

        if (selectedHiraganaSignIds[i] == 11)
          this.kanaSetList.add(47).add(48).add(49).add(50).add(51)

        if (selectedHiraganaSignIds[i] == 12)
          this.kanaSetList.add(52).add(53).add(54).add(55).add(56)

        if (selectedHiraganaSignIds[i] == 13)
          this.kanaSetList.add(57).add(58).add(59).add(60).add(61)

        if (selectedHiraganaSignIds[i] == 14)
          this.kanaSetList.add(62).add(63).add(64).add(65).add(66)

        if (selectedHiraganaSignIds[i] == 15)
          this.kanaSetList.add(67).add(68).add(69).add(70).add(71)

        if (selectedHiraganaSignIds[i] == 16)
          this.kanaSetList.add(72).add(73).add(74)

        if (selectedHiraganaSignIds[i] == 17)
          this.kanaSetList.add(75).add(76).add(77)

        if (selectedHiraganaSignIds[i] == 18)
          this.kanaSetList.add(78).add(79).add(80)

        if (selectedHiraganaSignIds[i] == 19)
          this.kanaSetList.add(81).add(82).add(83)

        if (selectedHiraganaSignIds[i] == 20)
          this.kanaSetList.add(84).add(85).add(86)

        if (selectedHiraganaSignIds[i] == 21)
          this.kanaSetList.add(87).add(88).add(89)

        if (selectedHiraganaSignIds[i] == 22)
          this.kanaSetList.add(90).add(91).add(92)

        if (selectedHiraganaSignIds[i] == 23)
          this.kanaSetList.add(93).add(94).add(95)

        if (selectedHiraganaSignIds[i] == 24)
          this.kanaSetList.add(96).add(97).add(98)

        if (selectedHiraganaSignIds[i] == 25)
          this.kanaSetList.add(99).add(100).add(101)

        if (selectedHiraganaSignIds[i] == 26)
          this.kanaSetList.add(102).add(103).add(104)

        if (selectedHiraganaSignIds[i] == 27)
          this.kanaSetList.add(105).add(106).add(107)
      }
      console.log("Set in Hiragana: ", this.kanaSetList);
      if (selectedHiraganaSignIds.includes(this.hiraganaLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);

    }
    else if (type == "katakana") {
      for (let i = 0; i < selectedKatakanaSignIds.length; i++) {
        if (selectedKatakanaSignIds[i] == 1)
          this.kanaSetList.add(1).add(2).add(3).add(4).add(5);

        if (selectedKatakanaSignIds[i] == 2)
          this.kanaSetList.add(6).add(7).add(8).add(9).add(10);

        if (selectedKatakanaSignIds[i] == 3)
          this.kanaSetList.add(11).add(12).add(13).add(14).add(15);

        if (selectedKatakanaSignIds[i] == 4)
          this.kanaSetList.add(16).add(17).add(18).add(19).add(20);

        if (selectedKatakanaSignIds[i] == 5)
          this.kanaSetList.add(21).add(22).add(23).add(24).add(25)

        if (selectedKatakanaSignIds[i] == 6)
          this.kanaSetList.add(26).add(27).add(28).add(29).add(30)

        if (selectedKatakanaSignIds[i] == 7)
          this.kanaSetList.add(31).add(32).add(33).add(34).add(35)

        if (selectedKatakanaSignIds[i] == 8)
          this.kanaSetList.add(36).add(37).add(38)

        if (selectedKatakanaSignIds[i] == 9)
          this.kanaSetList.add(39).add(40).add(41).add(42).add(43)

        if (selectedKatakanaSignIds[i] == 10)
          this.kanaSetList.add(44).add(45).add(46)

        if (selectedKatakanaSignIds[i] == 11)
          this.kanaSetList.add(47).add(48).add(49).add(50).add(51)

        if (selectedKatakanaSignIds[i] == 12)
          this.kanaSetList.add(52).add(53).add(54).add(55).add(56)

        if (selectedKatakanaSignIds[i] == 13)
          this.kanaSetList.add(57).add(58).add(59).add(60).add(61)

        if (selectedKatakanaSignIds[i] == 14)
          this.kanaSetList.add(62).add(63).add(64).add(65).add(66)

        if (selectedKatakanaSignIds[i] == 15)
          this.kanaSetList.add(67).add(68).add(69).add(70).add(71)

        if (selectedKatakanaSignIds[i] == 16)
          this.kanaSetList.add(72).add(73).add(74)

        if (selectedKatakanaSignIds[i] == 17)
          this.kanaSetList.add(75).add(76).add(77)

        if (selectedKatakanaSignIds[i] == 18)
          this.kanaSetList.add(78).add(79).add(80)

        if (selectedKatakanaSignIds[i] == 19)
          this.kanaSetList.add(81).add(82).add(83)

        if (selectedKatakanaSignIds[i] == 20)
          this.kanaSetList.add(84).add(85).add(86)

        if (selectedKatakanaSignIds[i] == 21)
          this.kanaSetList.add(87).add(88).add(89)

        if (selectedKatakanaSignIds[i] == 22)
          this.kanaSetList.add(90).add(91).add(92)

        if (selectedKatakanaSignIds[i] == 23)
          this.kanaSetList.add(93).add(94).add(95)

        if (selectedKatakanaSignIds[i] == 24)
          this.kanaSetList.add(96).add(97).add(98)

        if (selectedKatakanaSignIds[i] == 25)
          this.kanaSetList.add(99).add(100).add(101)

        if (selectedKatakanaSignIds[i] == 26)
          this.kanaSetList.add(102).add(103).add(104)

        if (selectedKatakanaSignIds[i] == 27)
          this.kanaSetList.add(105).add(106).add(107)
      }
      console.log("Set in Katakana: ", this.kanaSetList);
      if (selectedKatakanaSignIds.includes(this.katakanaLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }

    this.kanaService.setLearningId(this.kanaSetList);

    if (type == "hiragana")
      this.router.navigate(['/learning/hiragana']);
    else
      this.router.navigate(['/learning/katakana']);

  }

}
