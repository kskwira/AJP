import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKatakanaComponent } from './add-katakana.component';

describe('AddKatakanaComponent', () => {
  let component: AddKatakanaComponent;
  let fixture: ComponentFixture<AddKatakanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKatakanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKatakanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
