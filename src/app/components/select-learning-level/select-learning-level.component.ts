import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {KanaService} from "../../services/kana.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-select-learning-level',
  templateUrl: './select-learning-level.component.html',
  styleUrls: ['./select-learning-level.component.css']
})
export class SelectLearningLevelComponent implements OnInit {

  kanaSelection: FormGroup;
  kanaSetList = new Set<number>();

  constructor(fb: FormBuilder, private kanaService: KanaService, private router: Router, public authService: AuthService) {
    this.kanaSelection = fb.group({
      a: false,
      ka: false,
      sa: false,
      ta: false,
      na: false,
      ha: false,
      ma: false,
      ya: false,
      ra: false,
      wa: false,
      ga: false,
      za: false,
      da: false,
      ba: false,
      pa: false,
      kya: false,
      sha: false,
      cha: false,
      nya: false,
      hya: false,
      mya: false,
      rya: false,
      gya: false,
      ja: false,
      dja: false,
      bya: false,
      pya: false,
    });
  }

  ngOnInit(): void {
  }

  onSubmit(type: string): void {
    if (this.kanaSelection.value.a)
        this.kanaSetList.add(1).add(2).add(3).add(4).add(5)

    if (this.kanaSelection.value.ka)
      this.kanaSetList.add(6).add(7).add(8).add(9).add(10)

    if (this.kanaSelection.value.sa)
      this.kanaSetList.add(11).add(12).add(13).add(14).add(15)

    if (this.kanaSelection.value.ta)
      this.kanaSetList.add(16).add(17).add(18).add(19).add(20)

    if (this.kanaSelection.value.na)
      this.kanaSetList.add(21).add(22).add(23).add(24).add(25)

    if (this.kanaSelection.value.ha)
      this.kanaSetList.add(26).add(27).add(28).add(29).add(30)

    if (this.kanaSelection.value.ma)
      this.kanaSetList.add(31).add(32).add(33).add(34).add(35)

    if (this.kanaSelection.value.ya)
      this.kanaSetList.add(36).add(37).add(38)

    if (this.kanaSelection.value.ra)
      this.kanaSetList.add(39).add(40).add(41).add(42).add(43)

    if (this.kanaSelection.value.wa)
      this.kanaSetList.add(44).add(45).add(46)

    if (this.kanaSelection.value.ga)
      this.kanaSetList.add(47).add(48).add(49).add(50).add(51)

    if (this.kanaSelection.value.za)
      this.kanaSetList.add(52).add(53).add(54).add(55).add(56)

    if (this.kanaSelection.value.da)
      this.kanaSetList.add(57).add(58).add(59).add(60).add(61)

    if (this.kanaSelection.value.ba)
      this.kanaSetList.add(62).add(63).add(64).add(65).add(66)

    if (this.kanaSelection.value.pa)
      this.kanaSetList.add(67).add(68).add(69).add(70).add(71)

    if (this.kanaSelection.value.kya)
      this.kanaSetList.add(72).add(73).add(74)

    if (this.kanaSelection.value.sha)
      this.kanaSetList.add(75).add(76).add(77)

    if (this.kanaSelection.value.cha)
      this.kanaSetList.add(78).add(79).add(80)

    if (this.kanaSelection.value.nya)
      this.kanaSetList.add(81).add(82).add(83)

    if (this.kanaSelection.value.hya)
      this.kanaSetList.add(84).add(85).add(86)

    if (this.kanaSelection.value.mya)
      this.kanaSetList.add(87).add(88).add(89)

    if (this.kanaSelection.value.rya)
      this.kanaSetList.add(90).add(91).add(92)

    if (this.kanaSelection.value.gya)
      this.kanaSetList.add(93).add(94).add(95)

    if (this.kanaSelection.value.ja)
      this.kanaSetList.add(96).add(97).add(98)

    if (this.kanaSelection.value.dja)
      this.kanaSetList.add(99).add(100).add(101)

    if (this.kanaSelection.value.bya)
      this.kanaSetList.add(102).add(103).add(104)

    if (this.kanaSelection.value.pya)
      this.kanaSetList.add(105).add(106).add(107)

    console.log(this.kanaSetList);
    this.kanaService.setLearningId(this.kanaSetList);

    if (type == "hiragana")
      this.router.navigate(['/learning/hiragana']);
    else
      this.router.navigate(['/learning/katakana']);
  }

}
