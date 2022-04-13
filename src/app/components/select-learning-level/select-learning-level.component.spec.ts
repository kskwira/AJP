import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLearningLevelComponent } from './select-learning-level.component';

describe('SelectLearningLevelComponent', () => {
  let component: SelectLearningLevelComponent;
  let fixture: ComponentFixture<SelectLearningLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLearningLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLearningLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
