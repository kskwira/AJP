import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraganaLearningComponent } from './hiragana-learning.component';

describe('HiraganaLearningComponent', () => {
  let component: HiraganaLearningComponent;
  let fixture: ComponentFixture<HiraganaLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiraganaLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiraganaLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
