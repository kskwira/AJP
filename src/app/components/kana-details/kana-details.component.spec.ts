import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanaDetailsComponent } from './kana-details.component';

describe('KanaDetailsComponent', () => {
  let component: KanaDetailsComponent;
  let fixture: ComponentFixture<KanaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
