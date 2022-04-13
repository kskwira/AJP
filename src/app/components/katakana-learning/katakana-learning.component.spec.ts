import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatakanaLearningComponent } from './katakana-learning.component';

describe('KatakanaLearningComponent', () => {
  let component: KatakanaLearningComponent;
  let fixture: ComponentFixture<KatakanaLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatakanaLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatakanaLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
