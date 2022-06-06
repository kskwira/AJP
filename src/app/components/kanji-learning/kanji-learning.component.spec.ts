import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiLearningComponent } from './kanji-learning.component';

describe('KanjiLearningComponent', () => {
  let component: KanjiLearningComponent;
  let fixture: ComponentFixture<KanjiLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
