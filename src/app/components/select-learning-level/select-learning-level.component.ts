import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {KanaService} from "../../services/kana.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {Vocabulary} from "../../models/vocabulary.model";

@Component({
  selector: 'app-select-learning-level',
  templateUrl: './select-learning-level.component.html',
  styleUrls: ['./select-learning-level.component.css']
})
export class SelectLearningLevelComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  idSetList = new Set<number>();
  hiraganaLearningLevel = 0;
  katakanaLearningLevel = 0;
  nounLearningLevel = 0;
  verbLearningLevel = 0;
  iAdjectiveLearningLevel = 0;
  naAdjectiveLearningLevel = 0;
  adverbLearningLevel = 0;
  kanjiLearningLevel = 0;

  hiraganaQuizLevel = 0
  katakanaQuizLevel = 0
  nounQuizLevel = 0
  verbQuizLevel = 0
  iAdjectiveQuizLevel = 0
  naAdjectiveQuizLevel = 0
  adverbQuizLevel = 0
  kanjiQuizLevel = 0

  nouns: Vocabulary[] = []

  hiraganaForm: FormGroup;
  katakanaForm: FormGroup;
  nounForm: FormGroup;
  verbForm: FormGroup;
  iAdjectiveForm: FormGroup;
  naAdjectiveForm: FormGroup;
  adverbForm: FormGroup;
  kanjiForm: FormGroup;

  kanaSingsData = [
    { id: 1, name: "a" , level: 0 },
    { id: 2, name: "ka", level: 0 },
    { id: 3, name: "sa", level: 0 },
    { id: 4, name: "ta", level: 0 },
    { id: 5, name: "na", level: 0 },
    { id: 6, name: "ha", level: 0 },
    { id: 7, name: "ma", level: 0 },
    { id: 8, name: "ya", level: 0 },
    { id: 9, name: "ra", level: 0 },
    { id: 10, name: "wa", level: 0 },
    { id: 11, name: "ga", level: 1 },
    { id: 12, name: "za", level: 1 },
    { id: 13, name: "da", level: 1 },
    { id: 14, name: "ba", level: 1 },
    { id: 15, name: "pa", level: 1 },
    { id: 16, name: "kya", level: 2 },
    { id: 17, name: "sha", level: 2 },
    { id: 18, name: "cha", level: 2 },
    { id: 19, name: "nya", level: 2 },
    { id: 20, name: "hya", level: 2 },
    { id: 21, name: "mya", level: 2 },
    { id: 22, name: "rya", level: 2 },
    { id: 23, name: "gya", level: 2 },
    { id: 24, name: "ja", level: 2 },
    { id: 25, name: "(ja)", level: 2 },
    { id: 26, name: "bya", level: 2 },
    { id: 27, name: "pya", level: 2 }
  ];

  nounSingsData = [
    { id: 1, name: "rzeczowniki 1", level: 0 },
    { id: 2, name: "rzeczowniki 2", level: 0 },
    { id: 3, name: "rzeczowniki 3", level: 0 },
    { id: 4, name: "rzeczowniki 4", level: 1 },
    { id: 5, name: "rzeczowniki 5", level: 1 },
    { id: 6, name: "rzeczowniki 6", level: 1 },
    { id: 7, name: "rzeczowniki 7", level: 2 },
    { id: 8, name: "rzeczowniki 8", level: 2 },
    { id: 9, name: "rzeczowniki 9", level: 2 },
    { id: 10, name: "rzeczowniki 10", level: 3 },
    { id: 11, name: "rzeczowniki 11", level: 3 },
    { id: 12, name: "rzeczowniki 12", level: 3 },
    { id: 13, name: "rzeczowniki 13", level: 3 },
    { id: 14, name: "rzeczowniki 14", level: 4 },
    { id: 15, name: "rzeczowniki 15", level: 4 },
    { id: 16, name: "rzeczowniki 16", level: 4 },
    { id: 17, name: "rzeczowniki 17", level: 5 },
    { id: 18, name: "rzeczowniki 18", level: 5 },
    { id: 19, name: "rzeczowniki 19", level: 5 },
    { id: 20, name: "rzeczowniki 20", level: 6 },
    { id: 21, name: "rzeczowniki 21", level: 6 },
    { id: 22, name: "rzeczowniki 22", level: 6 },
    { id: 23, name: "rzeczowniki 23", level: 6 },
    { id: 24, name: "rzeczowniki 24", level: 7 },
    { id: 25, name: "rzeczowniki 25", level: 7 },
    { id: 26, name: "rzeczowniki 26", level: 7 },
    { id: 27, name: "rzeczowniki 27", level: 7 },
    { id: 28, name: "rzeczowniki 28", level: 8 },
    { id: 29, name: "rzeczowniki 29", level: 8 },
    { id: 30, name: "rzeczowniki 30", level: 8 },
    { id: 31, name: "rzeczowniki 31", level: 9 },
    { id: 32, name: "rzeczowniki 32", level: 9 },
    { id: 33, name: "rzeczowniki 33", level: 9 }
  ];

  verbSingsData = [
    { id: 1, name: "czasowniki 1", level: 0 },
    { id: 2, name: "czasowniki 2", level: 0 },
    { id: 3, name: "czasowniki 3", level: 0 },
    { id: 4, name: "czasowniki 4", level: 1 },
    { id: 5, name: "czasowniki 5", level: 1 },
    { id: 6, name: "czasowniki 6", level: 1 },
    { id: 7, name: "czasowniki 7", level: 2 },
    { id: 8, name: "czasowniki 8", level: 2 },
    { id: 9, name: "czasowniki 9", level: 2 }
    ];

  iAdjectiveSingsData = [
    { id: 1, name: "przymiotniki \"-i\" 1", level: 0 },
    { id: 2, name: "przymiotniki \"-i\" 2", level: 0 },
    { id: 3, name: "przymiotniki \"-i\" 3", level: 0 },
    { id: 4, name: "przymiotniki \"-i\" 4", level: 1 },
    { id: 5, name: "przymiotniki \"-i\" 5", level: 1 },
    { id: 6, name: "przymiotniki \"-i\" 6", level: 1 }
    ];

  naAdjectiveSingsData = [
    { id: 1, name: "przymiotniki \"-na\" 1", level: 0 },
    { id: 2, name: "przymiotniki \"-na\" 2", level: 0 }
  ];

  adverbSingsData = [
    { id: 1, name: "przysłówki 1", level: 0 },
    { id: 2, name: "przysłówki 2", level: 0 },
    { id: 3, name: "przysłówki 3", level: 0 }
  ];

  kanjiSingsData = [
    { id: 1, name: "kanji 1-5", level: 0 },
    { id: 2, name: "kanji 6-10", level: 0 },
    { id: 3, name: "kanji 11-15", level: 1 },
    { id: 4, name: "kanji 16-20", level: 1 },
    { id: 5, name: "kanji 21-25", level: 2 },
    { id: 6, name: "kanji 26-30", level: 2 },
    { id: 7, name: "kanji 31-35", level: 3 },
    { id: 8, name: "kanji 36-40", level: 3 },
    { id: 9, name: "kanji 41-45", level: 4 },
    { id: 10, name: "kanji 46-50", level: 4 },
    { id: 11, name: "kanji 51-55", level: 5 },
    { id: 12, name: "kanji 56-60", level: 5 },
    { id: 13, name: "kanji 61-65", level: 6 },
    { id: 14, name: "kanji 66-70", level: 6 },
    { id: 15, name: "kanji 71-75", level: 7 },
    { id: 16, name: "kanji 76-80", level: 7 }
  ];

  get hiraganaSignsFormArray() {
    return this.hiraganaForm.controls['signs'] as FormArray;
  }

  get katakanaSignsFormArray() {
    return this.katakanaForm.controls['signs'] as FormArray;
  }

  get nounSignsFormArray() {
    return this.nounForm.controls['signs'] as FormArray;
  }

  get verbSignsFormArray() {
    return this.verbForm.controls['signs'] as FormArray;
  }

  get iAdjectiveSignsFormArray() {
    return this.iAdjectiveForm.controls['signs'] as FormArray;
  }

  get naAdjectiveSignsFormArray() {
    return this.naAdjectiveForm.controls['signs'] as FormArray;
  }

  get adverbSignsFormArray() {
    return this.adverbForm.controls['signs'] as FormArray;
  }

  get kanjiSignsFormArray() {
    return this.kanjiForm.controls['signs'] as FormArray;
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

    this.nounForm = this.fb.group({
      signs: new FormArray([])
    });

    this.verbForm = this.fb.group({
      signs: new FormArray([])
    });

    this.iAdjectiveForm = this.fb.group({
      signs: new FormArray([])
    });

    this.naAdjectiveForm = this.fb.group({
      signs: new FormArray([])
    });

    this.adverbForm = this.fb.group({
      signs: new FormArray([])
    });

    this.kanjiForm = this.fb.group({
      signs: new FormArray([])
    });

  }

  ngOnInit() {
    this.addCheckboxesToForm();
  }

  private addCheckboxesToForm() {
    this.kanaSingsData.forEach(() => this.hiraganaSignsFormArray.push(new FormControl(false)));
    this.kanaSingsData.forEach(() => this.katakanaSignsFormArray.push(new FormControl(false)));
    this.nounSingsData.forEach(() => this.nounSignsFormArray.push(new FormControl(false)));
    this.verbSingsData.forEach(() => this.verbSignsFormArray.push(new FormControl(false)));
    this.iAdjectiveSingsData.forEach(() => this.iAdjectiveSignsFormArray.push(new FormControl(false)));
    this.naAdjectiveSingsData.forEach(() => this.naAdjectiveSignsFormArray.push(new FormControl(false)));
    this.adverbSingsData.forEach(() => this.adverbSignsFormArray.push(new FormControl(false)));
    this.kanjiSingsData.forEach(() => this.kanjiSignsFormArray.push(new FormControl(false)));
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
        this.hiraganaLearningLevel = this.currentUser!.progressHiragana.learningLevel;
        this.katakanaLearningLevel = this.currentUser!.progressKatakana.learningLevel;
        this.nounLearningLevel = this.currentUser!.progressNoun.learningLevel;
        this.verbLearningLevel = this.currentUser!.progressVerb.learningLevel;
        this.iAdjectiveLearningLevel = this.currentUser!.progressIAdjective.learningLevel;
        this.naAdjectiveLearningLevel = this.currentUser!.progressNaAdjective.learningLevel;
        this.adverbLearningLevel = this.currentUser!.progressAdverb.learningLevel;
        this.kanjiLearningLevel = this.currentUser!.progressKanji.learningLevel;

        this.hiraganaQuizLevel = this.currentUser!.progressHiragana.quizLevel;
        this.katakanaQuizLevel = this.currentUser!.progressKatakana.quizLevel;
        this.nounQuizLevel = this.currentUser!.progressNoun.quizLevel;
        this.verbQuizLevel = this.currentUser!.progressVerb.quizLevel;
        this.iAdjectiveQuizLevel = this.currentUser!.progressIAdjective.quizLevel;
        this.naAdjectiveQuizLevel = this.currentUser!.progressNaAdjective.quizLevel;
        this.adverbQuizLevel = this.currentUser!.progressAdverb.quizLevel;
        this.kanjiQuizLevel = this.currentUser!.progressKanji.quizLevel;
      });
  }

  checkDisable(signId: number, level: number, type: string): boolean {
    if (type == "hiragana") {
      return ((signId > this.hiraganaLearningLevel) || (level > this.hiraganaQuizLevel));
    }
    else if (type == "katakana") {
      return ((signId > this.katakanaLearningLevel) || (level > this.katakanaQuizLevel));
    }
    else if (type == "noun") {
      return ((signId > this.nounLearningLevel) || (level > this.nounQuizLevel));
    }
    else if (type == "verb") {
      return ((signId > this.verbLearningLevel) || (level > this.verbQuizLevel));
    }
    else if (type == "iAdjective") {
      return ((signId > this.iAdjectiveLearningLevel) || (level > this.iAdjectiveQuizLevel));
    }
    else if (type == "naAdjective") {
      return ((signId > this.naAdjectiveLearningLevel) || (level > this.naAdjectiveQuizLevel));
    }
    else if (type == "adverb") {
      return ((signId > this.adverbLearningLevel) || (level > this.adverbQuizLevel));
    }
    else if (type == "kanji") {
      return ((signId > this.kanjiLearningLevel) || (level > this.kanjiQuizLevel));
    }
    return true;
  }

  onSubmit(type: string): void {
    const selectedHiraganaSignIds = this.hiraganaForm.value.signs
      .map((checked: any, i: number) => checked ? this.kanaSingsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedKatakanaSignIds = this.katakanaForm.value.signs
      .map((checked: any, i: number) => checked ? this.kanaSingsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedNounSignIds = this.nounForm.value.signs
      .map((checked: any, i: number) => checked ? this.nounSingsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedVerbSignIds = this.verbForm.value.signs
      .map((checked: any, i: number) => checked ? this.verbSingsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedIAdjectiveSignIds = this.iAdjectiveForm.value.signs
      .map((checked: any, i: number) => checked ? this.iAdjectiveSingsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedNaAdjectiveSignIds = this.naAdjectiveForm.value.signs
      .map((checked: any, i: number) => checked ? this.naAdjectiveSingsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedAdverbSignIds = this.adverbForm.value.signs
      .map((checked: any, i: number) => checked ? this.adverbSingsData[i].id : null)
      .filter((v: null) => v !== null);

    const selectedKanjiSignIds = this.kanjiForm.value.signs
      .map((checked: any, i: number) => checked ? this.kanjiSingsData[i].id : null)
      .filter((v: null) => v !== null);

    console.log("Hiragana: ", selectedHiraganaSignIds);
    console.log("Katakana: ", selectedKatakanaSignIds);
    console.log("Nouns: ", selectedNounSignIds);
    console.log("Verbs: ", selectedVerbSignIds);
    console.log("IAdjectives: ", selectedIAdjectiveSignIds);
    console.log("NaAdjectives: ", selectedNaAdjectiveSignIds);
    console.log("Adverbs: ", selectedAdverbSignIds);
    console.log("Kanji: ", selectedKanjiSignIds);

    if (type == "hiragana") {
      for (let i = 0; i < selectedHiraganaSignIds.length; i++) {
        if (selectedHiraganaSignIds[i] == 1)
          this.idSetList.add(1).add(2).add(3).add(4).add(5);

        if (selectedHiraganaSignIds[i] == 2)
          this.idSetList.add(6).add(7).add(8).add(9).add(10);

        if (selectedHiraganaSignIds[i] == 3)
          this.idSetList.add(11).add(12).add(13).add(14).add(15);

        if (selectedHiraganaSignIds[i] == 4)
          this.idSetList.add(16).add(17).add(18).add(19).add(20);

        if (selectedHiraganaSignIds[i] == 5)
          this.idSetList.add(21).add(22).add(23).add(24).add(25)

        if (selectedHiraganaSignIds[i] == 6)
          this.idSetList.add(26).add(27).add(28).add(29).add(30)

        if (selectedHiraganaSignIds[i] == 7)
          this.idSetList.add(31).add(32).add(33).add(34).add(35)

        if (selectedHiraganaSignIds[i] == 8)
          this.idSetList.add(36).add(37).add(38)

        if (selectedHiraganaSignIds[i] == 9)
          this.idSetList.add(39).add(40).add(41).add(42).add(43)

        if (selectedHiraganaSignIds[i] == 10)
          this.idSetList.add(44).add(45).add(46)

        if (selectedHiraganaSignIds[i] == 11)
          this.idSetList.add(47).add(48).add(49).add(50).add(51)

        if (selectedHiraganaSignIds[i] == 12)
          this.idSetList.add(52).add(53).add(54).add(55).add(56)

        if (selectedHiraganaSignIds[i] == 13)
          this.idSetList.add(57).add(58).add(59).add(60).add(61)

        if (selectedHiraganaSignIds[i] == 14)
          this.idSetList.add(62).add(63).add(64).add(65).add(66)

        if (selectedHiraganaSignIds[i] == 15)
          this.idSetList.add(67).add(68).add(69).add(70).add(71)

        if (selectedHiraganaSignIds[i] == 16)
          this.idSetList.add(72).add(73).add(74)

        if (selectedHiraganaSignIds[i] == 17)
          this.idSetList.add(75).add(76).add(77)

        if (selectedHiraganaSignIds[i] == 18)
          this.idSetList.add(78).add(79).add(80)

        if (selectedHiraganaSignIds[i] == 19)
          this.idSetList.add(81).add(82).add(83)

        if (selectedHiraganaSignIds[i] == 20)
          this.idSetList.add(84).add(85).add(86)

        if (selectedHiraganaSignIds[i] == 21)
          this.idSetList.add(87).add(88).add(89)

        if (selectedHiraganaSignIds[i] == 22)
          this.idSetList.add(90).add(91).add(92)

        if (selectedHiraganaSignIds[i] == 23)
          this.idSetList.add(93).add(94).add(95)

        if (selectedHiraganaSignIds[i] == 24)
          this.idSetList.add(96).add(97).add(98)

        if (selectedHiraganaSignIds[i] == 25)
          this.idSetList.add(99).add(100).add(101)

        if (selectedHiraganaSignIds[i] == 26)
          this.idSetList.add(102).add(103).add(104)

        if (selectedHiraganaSignIds[i] == 27)
          this.idSetList.add(105).add(106).add(107)
      }
      console.log("Set in Hiragana: ", this.idSetList);
      if (selectedHiraganaSignIds.includes(this.hiraganaLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);

    }
    else if (type == "katakana") {
      for (let i = 0; i < selectedKatakanaSignIds.length; i++) {
        if (selectedKatakanaSignIds[i] == 1)
          this.idSetList.add(1).add(2).add(3).add(4).add(5);

        if (selectedKatakanaSignIds[i] == 2)
          this.idSetList.add(6).add(7).add(8).add(9).add(10);

        if (selectedKatakanaSignIds[i] == 3)
          this.idSetList.add(11).add(12).add(13).add(14).add(15);

        if (selectedKatakanaSignIds[i] == 4)
          this.idSetList.add(16).add(17).add(18).add(19).add(20);

        if (selectedKatakanaSignIds[i] == 5)
          this.idSetList.add(21).add(22).add(23).add(24).add(25)

        if (selectedKatakanaSignIds[i] == 6)
          this.idSetList.add(26).add(27).add(28).add(29).add(30)

        if (selectedKatakanaSignIds[i] == 7)
          this.idSetList.add(31).add(32).add(33).add(34).add(35)

        if (selectedKatakanaSignIds[i] == 8)
          this.idSetList.add(36).add(37).add(38)

        if (selectedKatakanaSignIds[i] == 9)
          this.idSetList.add(39).add(40).add(41).add(42).add(43)

        if (selectedKatakanaSignIds[i] == 10)
          this.idSetList.add(44).add(45).add(46)

        if (selectedKatakanaSignIds[i] == 11)
          this.idSetList.add(47).add(48).add(49).add(50).add(51)

        if (selectedKatakanaSignIds[i] == 12)
          this.idSetList.add(52).add(53).add(54).add(55).add(56)

        if (selectedKatakanaSignIds[i] == 13)
          this.idSetList.add(57).add(58).add(59).add(60).add(61)

        if (selectedKatakanaSignIds[i] == 14)
          this.idSetList.add(62).add(63).add(64).add(65).add(66)

        if (selectedKatakanaSignIds[i] == 15)
          this.idSetList.add(67).add(68).add(69).add(70).add(71)

        if (selectedKatakanaSignIds[i] == 16)
          this.idSetList.add(72).add(73).add(74)

        if (selectedKatakanaSignIds[i] == 17)
          this.idSetList.add(75).add(76).add(77)

        if (selectedKatakanaSignIds[i] == 18)
          this.idSetList.add(78).add(79).add(80)

        if (selectedKatakanaSignIds[i] == 19)
          this.idSetList.add(81).add(82).add(83)

        if (selectedKatakanaSignIds[i] == 20)
          this.idSetList.add(84).add(85).add(86)

        if (selectedKatakanaSignIds[i] == 21)
          this.idSetList.add(87).add(88).add(89)

        if (selectedKatakanaSignIds[i] == 22)
          this.idSetList.add(90).add(91).add(92)

        if (selectedKatakanaSignIds[i] == 23)
          this.idSetList.add(93).add(94).add(95)

        if (selectedKatakanaSignIds[i] == 24)
          this.idSetList.add(96).add(97).add(98)

        if (selectedKatakanaSignIds[i] == 25)
          this.idSetList.add(99).add(100).add(101)

        if (selectedKatakanaSignIds[i] == 26)
          this.idSetList.add(102).add(103).add(104)

        if (selectedKatakanaSignIds[i] == 27)
          this.idSetList.add(105).add(106).add(107)
      }
      console.log("Set in Katakana: ", this.idSetList);
      if (selectedKatakanaSignIds.includes(this.katakanaLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }
    else if (type == "noun") {
      for (let i = 0; i < selectedNounSignIds.length; i++) {
        this.idSetList.add(selectedNounSignIds[i])
      }

      console.log("Set in Noun: ", this.idSetList);
      if (selectedNounSignIds.includes(this.nounLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }
    else if (type == "verb") {
      for (let i = 0; i < selectedVerbSignIds.length; i++) {
        this.idSetList.add(selectedVerbSignIds[i])
      }

      console.log("Set in Verb: ", this.idSetList);
      if (selectedVerbSignIds.includes(this.verbLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }
    else if (type == "iAdjective") {
      for (let i = 0; i < selectedIAdjectiveSignIds.length; i++) {
        this.idSetList.add(selectedIAdjectiveSignIds[i])
      }

      console.log("Set in iAdjective: ", this.idSetList);
      if (selectedIAdjectiveSignIds.includes(this.iAdjectiveLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }
    else if (type == "naAdjective") {
      for (let i = 0; i < selectedNaAdjectiveSignIds.length; i++) {
        this.idSetList.add(selectedNaAdjectiveSignIds[i])
      }

      console.log("Set in naAdjective: ", this.idSetList);
      if (selectedNaAdjectiveSignIds.includes(this.naAdjectiveLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }
    else if (type == "adverb") {
      for (let i = 0; i < selectedAdverbSignIds.length; i++) {
        this.idSetList.add(selectedAdverbSignIds[i])
      }

      console.log("Set in adverb: ", this.idSetList);
      if (selectedAdverbSignIds.includes(this.adverbLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }
    else if (type == "kanji") {
      for (let i = 0; i < selectedKanjiSignIds.length; i++) {
        this.idSetList.add((selectedKanjiSignIds[i] * 5) - 4)
          .add((selectedKanjiSignIds[i] * 5) - 3)
          .add((selectedKanjiSignIds[i] * 5) - 2)
          .add((selectedKanjiSignIds[i] * 5) - 1)
          .add((selectedKanjiSignIds[i] * 5))
      }

      console.log("Set in Kanji: ", this.idSetList);
      if (selectedKanjiSignIds.includes(this.kanjiLearningLevel))
        this.kanaService.changeLevelUpValue(true);
      else
        this.kanaService.changeLevelUpValue(false);
    }

    this.kanaService.setLearningId(this.idSetList);

    if (type == "hiragana")
      this.router.navigate(['/learning/hiragana']);
    else if (type == "katakana")
      this.router.navigate(['/learning/katakana']);
    else if (type == "noun")
      this.router.navigate(['/learning/noun']);
    else if (type == "verb")
      this.router.navigate(['/learning/verb']);
    else if (type == "iAdjective")
      this.router.navigate(['/learning/iAdjective']);
    else if (type == "naAdjective")
      this.router.navigate(['/learning/naAdjective']);
    else if (type == "adverb")
      this.router.navigate(['/learning/adverb']);
    else if (type == "kanji")
      this.router.navigate(['/learning/kanji']);
  }

}
