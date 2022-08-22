import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaAdjectiveQuizComponent } from './na-adjective-quiz.component';

describe('NaAdjectiveQuizComponent', () => {
  let component: NaAdjectiveQuizComponent;
  let fixture: ComponentFixture<NaAdjectiveQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaAdjectiveQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaAdjectiveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
