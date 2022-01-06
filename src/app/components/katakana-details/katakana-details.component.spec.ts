import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatakanaDetailsComponent } from './katakana-details.component';

describe('KatakanaDetailsComponent', () => {
  let component: KatakanaDetailsComponent;
  let fixture: ComponentFixture<KatakanaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatakanaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatakanaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
