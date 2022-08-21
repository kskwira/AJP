import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverbLearningComponent } from './adverb-learning.component';

describe('AdverbLearningComponent', () => {
  let component: AdverbLearningComponent;
  let fixture: ComponentFixture<AdverbLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdverbLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverbLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
