import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NounLearningComponent } from './noun-learning.component';

describe('NounLearningComponent', () => {
  let component: NounLearningComponent;
  let fixture: ComponentFixture<NounLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NounLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NounLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
