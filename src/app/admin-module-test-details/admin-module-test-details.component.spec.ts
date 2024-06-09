import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModuleTestDetailsComponent } from './admin-module-test-details.component';

describe('AdminModuleTestDetailsComponent', () => {
  let component: AdminModuleTestDetailsComponent;
  let fixture: ComponentFixture<AdminModuleTestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminModuleTestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminModuleTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
