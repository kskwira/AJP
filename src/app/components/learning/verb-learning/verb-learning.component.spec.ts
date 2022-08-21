import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbLearningComponent } from './verb-learning.component';

describe('VerbLearningComponent', () => {
  let component: VerbLearningComponent;
  let fixture: ComponentFixture<VerbLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
