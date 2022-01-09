import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKanaComponent } from './add-kana.component';

describe('AddKanaComponent', () => {
  let component: AddKanaComponent;
  let fixture: ComponentFixture<AddKanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
