import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTestResultComponent } from './module-test-result.component';

describe('ModuleTestResultComponent', () => {
  let component: ModuleTestResultComponent;
  let fixture: ComponentFixture<ModuleTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleTestResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
