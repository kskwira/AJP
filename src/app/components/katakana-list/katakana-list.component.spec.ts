import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatakanaListComponent } from './katakana-list.component';

describe('KatakanaListComponent', () => {
  let component: KatakanaListComponent;
  let fixture: ComponentFixture<KatakanaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatakanaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatakanaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
