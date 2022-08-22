import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NounQuizComponent } from './noun-quiz.component';

describe('NounQuizComponent', () => {
  let component: NounQuizComponent;
  let fixture: ComponentFixture<NounQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NounQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NounQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
