import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatakanaQuizComponent } from './katakana-quiz.component';

describe('KatakanaListComponent', () => {
  let component: KatakanaQuizComponent;
  let fixture: ComponentFixture<KatakanaQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatakanaQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatakanaQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
