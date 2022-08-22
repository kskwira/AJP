import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbQuizComponent } from './verb-quiz.component';

describe('VerbQuizComponent', () => {
  let component: VerbQuizComponent;
  let fixture: ComponentFixture<VerbQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
