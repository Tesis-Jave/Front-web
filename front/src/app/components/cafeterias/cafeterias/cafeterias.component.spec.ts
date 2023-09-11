import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeteriasComponent } from './cafeterias.component';

describe('CafeteriasComponent', () => {
  let component: CafeteriasComponent;
  let fixture: ComponentFixture<CafeteriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CafeteriasComponent]
    });
    fixture = TestBed.createComponent(CafeteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
