import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAdjectiveLearningComponent } from './i-adjective-learning.component';

describe('IAdjectiveLearningComponent', () => {
  let component: IAdjectiveLearningComponent;
  let fixture: ComponentFixture<IAdjectiveLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IAdjectiveLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IAdjectiveLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
