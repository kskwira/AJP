import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverbQuizComponent } from './adverb-quiz.component';

describe('AdverbQuizComponent', () => {
  let component: AdverbQuizComponent;
  let fixture: ComponentFixture<AdverbQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdverbQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverbQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
