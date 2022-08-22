import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAdjectiveQuizComponent } from './i-adjective-quiz.component';

describe('IAdjectiveQuizComponent', () => {
  let component: IAdjectiveQuizComponent;
  let fixture: ComponentFixture<IAdjectiveQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IAdjectiveQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IAdjectiveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
