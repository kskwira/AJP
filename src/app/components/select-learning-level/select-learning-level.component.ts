import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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

  hiraganaSelection: FormGroup;
  katakanaSelection: FormGroup;
  kanaSetList = new Set<number>();
  isDisabled = true;
  hiraganaLevel = 0;
  katakanaLevel = 0;

  constructor(private fb: FormBuilder, private kanaService: KanaService, private router: Router,
              public afAuth: AngularFireAuth, private userService: UserService) {
    this.hiraganaSelection = fb.group({
      a: new FormControl({value: false, disabled: this.checkDisableKana('a', 'hiragana')}),
      ka: new FormControl({value: false, disabled: this.checkDisableKana('ka', 'hiragana')}),
      sa: new FormControl({value: false, disabled: this.checkDisableKana('sa', 'hiragana')}),
      ta: new FormControl({value: false, disabled: this.checkDisableKana('ta', 'hiragana')}),
      na: new FormControl({value: false, disabled: this.checkDisableKana('na', 'hiragana')}),
      ha: new FormControl({value: false, disabled: this.checkDisableKana('ha', 'hiragana')}),
      ma: new FormControl({value: false, disabled: this.checkDisableKana('ma', 'hiragana')}),
      ya: new FormControl({value: false, disabled: this.checkDisableKana('ya', 'hiragana')}),
      ra: new FormControl({value: false, disabled: this.checkDisableKana('ra', 'hiragana')}),
      wa: new FormControl({value: false, disabled: this.checkDisableKana('wa', 'hiragana')}),
      ga: new FormControl({value: false, disabled: this.checkDisableKana('ga', 'hiragana')}),
      za: new FormControl({value: false, disabled: this.checkDisableKana('za', 'hiragana')}),
      da: new FormControl({value: false, disabled: this.checkDisableKana('da', 'hiragana')}),
      ba: new FormControl({value: false, disabled: this.checkDisableKana('ba', 'hiragana')}),
      pa: new FormControl({value: false, disabled: this.checkDisableKana('pa', 'hiragana')}),
      kya: new FormControl({value: false, disabled: this.checkDisableKana('kya', 'hiragana')}),
      sha: new FormControl({value: false, disabled: this.checkDisableKana('sha', 'hiragana')}),
      cha: new FormControl({value: false, disabled: this.checkDisableKana('cha', 'hiragana')}),
      nya: new FormControl({value: false, disabled: this.checkDisableKana('nya', 'hiragana')}),
      hya: new FormControl({value: false, disabled: this.checkDisableKana('hya', 'hiragana')}),
      mya: new FormControl({value: false, disabled: this.checkDisableKana('mya', 'hiragana')}),
      rya: new FormControl({value: false, disabled: this.checkDisableKana('rya', 'hiragana')}),
      gya: new FormControl({value: false, disabled: this.checkDisableKana('gya', 'hiragana')}),
      ja: new FormControl({value: false, disabled: this.checkDisableKana('ja', 'hiragana')}),
      dja: new FormControl({value: false, disabled: this.checkDisableKana('dja', 'hiragana')}),
      bya: new FormControl({value: false, disabled: this.checkDisableKana('bya', 'hiragana')}),
      pya: new FormControl({value: false, disabled: this.checkDisableKana('pya', 'hiragana')}),
    });
    this.katakanaSelection = fb.group({
      a: new FormControl({value: false, disabled: this.checkDisableKana('a', 'katakana')}),
      ka: new FormControl({value: false, disabled: this.checkDisableKana('ka', 'katakana')}),
      sa: new FormControl({value: false, disabled: this.checkDisableKana('sa', 'katakana')}),
      ta: new FormControl({value: false, disabled: this.checkDisableKana('ta', 'katakana')}),
      na: new FormControl({value: false, disabled: this.checkDisableKana('na', 'katakana')}),
      ha: new FormControl({value: false, disabled: this.checkDisableKana('ha', 'katakana')}),
      ma: new FormControl({value: false, disabled: this.checkDisableKana('ma', 'katakana')}),
      ya: new FormControl({value: false, disabled: this.checkDisableKana('ya', 'katakana')}),
      ra: new FormControl({value: false, disabled: this.checkDisableKana('ra', 'katakana')}),
      wa: new FormControl({value: false, disabled: this.checkDisableKana('wa', 'katakana')}),
      ga: new FormControl({value: false, disabled: this.checkDisableKana('ga', 'katakana')}),
      za: new FormControl({value: false, disabled: this.checkDisableKana('za', 'katakana')}),
      da: new FormControl({value: false, disabled: this.checkDisableKana('da', 'katakana')}),
      ba: new FormControl({value: false, disabled: this.checkDisableKana('ba', 'katakana')}),
      pa: new FormControl({value: false, disabled: this.checkDisableKana('pa', 'katakana')}),
      kya: new FormControl({value: false, disabled: this.checkDisableKana('kya', 'katakana')}),
      sha: new FormControl({value: false, disabled: this.checkDisableKana('sha', 'katakana')}),
      cha: new FormControl({value: false, disabled: this.checkDisableKana('cha', 'katakana')}),
      nya: new FormControl({value: false, disabled: this.checkDisableKana('nya', 'katakana')}),
      hya: new FormControl({value: false, disabled: this.checkDisableKana('hya', 'katakana')}),
      mya: new FormControl({value: false, disabled: this.checkDisableKana('mya', 'katakana')}),
      rya: new FormControl({value: false, disabled: this.checkDisableKana('rya', 'katakana')}),
      gya: new FormControl({value: false, disabled: this.checkDisableKana('gya', 'katakana')}),
      ja: new FormControl({value: false, disabled: this.checkDisableKana('ja', 'katakana')}),
      dja: new FormControl({value: false, disabled: this.checkDisableKana('dja', 'katakana')}),
      bya: new FormControl({value: false, disabled: this.checkDisableKana('bya', 'katakana')}),
      pya: new FormControl({value: false, disabled: this.checkDisableKana('pya', 'katakana')}),
    });
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      if(user) {
        this.userData = user;
        this.retrieveUserDocumentById(user.uid);
      }
    });
    console.log(this.hiraganaLevel)
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
        this.hiraganaLevel = this.currentUser.hiraganaProgressObject.level;
        console.log(this.hiraganaLevel)
      });
  }

  checkDisableKana(sign: string, type: string): boolean {
    if (type == "hiragana") {
      switch (sign) {
        case 'a':
          return this.hiraganaLevel < 1;

        case 'ka':
          return this.hiraganaLevel < 2;

        case 'sa':
          return this.hiraganaLevel < 3;

        case 'ta':
          return this.hiraganaLevel < 4;

        default:
          return true;
      }
    }
    else {
      switch (sign) {
        case 'a':
          return this.katakanaLevel < 1;

        case 'ka':
          return this.katakanaLevel < 2;

        case 'sa':
          return this.katakanaLevel < 3;

        case 'ta':
          return this.katakanaLevel < 4;

        default:
          return true;
      }
    }
  }

  onSubmit(type: string): void {
    if (type == "hiragana") {
      if (this.hiraganaSelection.value.a)
        this.kanaSetList.add(1).add(2).add(3).add(4).add(5)

      if (this.hiraganaSelection.value.ka)
        this.kanaSetList.add(6).add(7).add(8).add(9).add(10)

      if (this.hiraganaSelection.value.sa)
        this.kanaSetList.add(11).add(12).add(13).add(14).add(15)

      if (this.hiraganaSelection.value.ta)
        this.kanaSetList.add(16).add(17).add(18).add(19).add(20)

      if (this.hiraganaSelection.value.na)
        this.kanaSetList.add(21).add(22).add(23).add(24).add(25)

      if (this.hiraganaSelection.value.ha)
        this.kanaSetList.add(26).add(27).add(28).add(29).add(30)

      if (this.hiraganaSelection.value.ma)
        this.kanaSetList.add(31).add(32).add(33).add(34).add(35)

      if (this.hiraganaSelection.value.ya)
        this.kanaSetList.add(36).add(37).add(38)

      if (this.hiraganaSelection.value.ra)
        this.kanaSetList.add(39).add(40).add(41).add(42).add(43)

      if (this.hiraganaSelection.value.wa)
        this.kanaSetList.add(44).add(45).add(46)

      if (this.hiraganaSelection.value.ga)
        this.kanaSetList.add(47).add(48).add(49).add(50).add(51)

      if (this.hiraganaSelection.value.za)
        this.kanaSetList.add(52).add(53).add(54).add(55).add(56)

      if (this.hiraganaSelection.value.da)
        this.kanaSetList.add(57).add(58).add(59).add(60).add(61)

      if (this.hiraganaSelection.value.ba)
        this.kanaSetList.add(62).add(63).add(64).add(65).add(66)

      if (this.hiraganaSelection.value.pa)
        this.kanaSetList.add(67).add(68).add(69).add(70).add(71)

      if (this.hiraganaSelection.value.kya)
        this.kanaSetList.add(72).add(73).add(74)

      if (this.hiraganaSelection.value.sha)
        this.kanaSetList.add(75).add(76).add(77)

      if (this.hiraganaSelection.value.cha)
        this.kanaSetList.add(78).add(79).add(80)

      if (this.hiraganaSelection.value.nya)
        this.kanaSetList.add(81).add(82).add(83)

      if (this.hiraganaSelection.value.hya)
        this.kanaSetList.add(84).add(85).add(86)

      if (this.hiraganaSelection.value.mya)
        this.kanaSetList.add(87).add(88).add(89)

      if (this.hiraganaSelection.value.rya)
        this.kanaSetList.add(90).add(91).add(92)

      if (this.hiraganaSelection.value.gya)
        this.kanaSetList.add(93).add(94).add(95)

      if (this.hiraganaSelection.value.ja)
        this.kanaSetList.add(96).add(97).add(98)

      if (this.hiraganaSelection.value.dja)
        this.kanaSetList.add(99).add(100).add(101)

      if (this.hiraganaSelection.value.bya)
        this.kanaSetList.add(102).add(103).add(104)

      if (this.hiraganaSelection.value.pya)
        this.kanaSetList.add(105).add(106).add(107)
    }
    else if (type == "katakana") {
      if (this.katakanaSelection.value.a)
        this.kanaSetList.add(1).add(2).add(3).add(4).add(5)

      if (this.katakanaSelection.value.ka)
        this.kanaSetList.add(6).add(7).add(8).add(9).add(10)

      if (this.katakanaSelection.value.sa)
        this.kanaSetList.add(11).add(12).add(13).add(14).add(15)

      if (this.katakanaSelection.value.ta)
        this.kanaSetList.add(16).add(17).add(18).add(19).add(20)

      if (this.katakanaSelection.value.na)
        this.kanaSetList.add(21).add(22).add(23).add(24).add(25)

      if (this.katakanaSelection.value.ha)
        this.kanaSetList.add(26).add(27).add(28).add(29).add(30)

      if (this.katakanaSelection.value.ma)
        this.kanaSetList.add(31).add(32).add(33).add(34).add(35)

      if (this.katakanaSelection.value.ya)
        this.kanaSetList.add(36).add(37).add(38)

      if (this.katakanaSelection.value.ra)
        this.kanaSetList.add(39).add(40).add(41).add(42).add(43)

      if (this.katakanaSelection.value.wa)
        this.kanaSetList.add(44).add(45).add(46)

      if (this.katakanaSelection.value.ga)
        this.kanaSetList.add(47).add(48).add(49).add(50).add(51)

      if (this.katakanaSelection.value.za)
        this.kanaSetList.add(52).add(53).add(54).add(55).add(56)

      if (this.katakanaSelection.value.da)
        this.kanaSetList.add(57).add(58).add(59).add(60).add(61)

      if (this.katakanaSelection.value.ba)
        this.kanaSetList.add(62).add(63).add(64).add(65).add(66)

      if (this.katakanaSelection.value.pa)
        this.kanaSetList.add(67).add(68).add(69).add(70).add(71)

      if (this.katakanaSelection.value.kya)
        this.kanaSetList.add(72).add(73).add(74)

      if (this.katakanaSelection.value.sha)
        this.kanaSetList.add(75).add(76).add(77)

      if (this.katakanaSelection.value.cha)
        this.kanaSetList.add(78).add(79).add(80)

      if (this.katakanaSelection.value.nya)
        this.kanaSetList.add(81).add(82).add(83)

      if (this.katakanaSelection.value.hya)
        this.kanaSetList.add(84).add(85).add(86)

      if (this.katakanaSelection.value.mya)
        this.kanaSetList.add(87).add(88).add(89)

      if (this.katakanaSelection.value.rya)
        this.kanaSetList.add(90).add(91).add(92)

      if (this.katakanaSelection.value.gya)
        this.kanaSetList.add(93).add(94).add(95)

      if (this.katakanaSelection.value.ja)
        this.kanaSetList.add(96).add(97).add(98)

      if (this.katakanaSelection.value.dja)
        this.kanaSetList.add(99).add(100).add(101)

      if (this.katakanaSelection.value.bya)
        this.kanaSetList.add(102).add(103).add(104)

      if (this.katakanaSelection.value.pya)
        this.kanaSetList.add(105).add(106).add(107)
    }

    console.log(this.kanaSetList);
    this.kanaService.setLearningId(this.kanaSetList);

    if (type == "hiragana")
      this.router.navigate(['/learning/hiragana']);
    else
      this.router.navigate(['/learning/katakana']);
  }

}
