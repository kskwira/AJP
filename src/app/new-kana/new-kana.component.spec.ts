import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKanaComponent } from './new-kana.component';

describe('NewKanaComponent', () => {
  let component: NewKanaComponent;
  let fixture: ComponentFixture<NewKanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewKanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
