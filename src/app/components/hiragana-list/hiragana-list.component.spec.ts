import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraganaListComponent } from './hiragana-list.component';

describe('HiraganaListComponent', () => {
  let component: HiraganaListComponent;
  let fixture: ComponentFixture<HiraganaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiraganaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiraganaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
