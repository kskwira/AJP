import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Kana } from "../kana/kana";

@Component({
  selector: 'app-kana-dialog',
  templateUrl: './kana-dialog.component.html',
  styleUrls: ['./kana-dialog.component.css']
})
export class KanaDialogComponent implements OnInit {

  private backupKana: Partial<Kana> = {...this.data.kana};

  constructor(
    public dialogRef: MatDialogRef<KanaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KanaDialogData
  ) { }

  cancel(): void {
    this.data.kana.sign = this.backupKana.sign;
    this.data.kana.reading = this.backupKana.reading;
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }
}
export interface KanaDialogData {
  kana: Partial<Kana>;
  enableDelete: boolean;
}
export interface KanaDialogResult {
  kana: Kana;
  delete?: boolean;
}

