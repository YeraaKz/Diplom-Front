import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModuleDetailsComponent } from './admin-module-details.component';

describe('AdminModuleDetailsComponent', () => {
  let component: AdminModuleDetailsComponent;
  let fixture: ComponentFixture<AdminModuleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminModuleDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminModuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
