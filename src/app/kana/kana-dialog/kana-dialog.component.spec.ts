import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanaDialogComponent } from './kana-dialog.component';

describe('KanaDialogComponent', () => {
  let component: KanaDialogComponent;
  let fixture: ComponentFixture<KanaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
