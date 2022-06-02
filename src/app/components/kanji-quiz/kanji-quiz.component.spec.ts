import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiQuizComponent } from './kanji-quiz.component';

describe('KanjiQuizComponent', () => {
  let component: KanjiQuizComponent;
  let fixture: ComponentFixture<KanjiQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
