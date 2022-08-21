import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaAdjectiveLearningComponent } from './na-adjective-learning.component';

describe('NaAdjectiveLearningComponent', () => {
  let component: NaAdjectiveLearningComponent;
  let fixture: ComponentFixture<NaAdjectiveLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaAdjectiveLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaAdjectiveLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
