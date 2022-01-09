import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuizLevelComponent } from './select-quiz-level.component';

describe('SelectQuizLevelComponent', () => {
  let component: SelectQuizLevelComponent;
  let fixture: ComponentFixture<SelectQuizLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectQuizLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuizLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
