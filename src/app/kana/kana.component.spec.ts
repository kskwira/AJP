import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanaComponent } from './kana.component';

describe('KanaComponent', () => {
  let component: KanaComponent;
  let fixture: ComponentFixture<KanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
