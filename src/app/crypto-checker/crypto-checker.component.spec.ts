import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCheckerComponent } from './crypto-checker.component';

describe('CryptoCheckerComponent', () => {
  let component: CryptoCheckerComponent;
  let fixture: ComponentFixture<CryptoCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CryptoCheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptoCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
