import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraganaQuizComponent } from './hiragana-quiz.component';

describe('HiraganaListComponent', () => {
  let component: HiraganaQuizComponent;
  let fixture: ComponentFixture<HiraganaQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiraganaQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiraganaQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
