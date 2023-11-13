import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should authenticate successfully', () => {
    component.usuario = component.usuarioDefault;
    component.contrasena = component.contrasenaDefault;

    component.onSubmit();

    expect(component.failed).toBeFalsy();
    expect(component.authenticated).toEqual(1);
    expect(component.userName).toEqual('usuario');
  });

  it('should fail authentication with incorrect credentials', () => {
    component.usuario = 'usuario';
    component.contrasena = 'contrasenaIncorrecta';

    component.onSubmit();

    expect(component.failed).toBeTruthy();
    expect(component.authenticated).toEqual(0);
    expect(component.userName).toEqual('');
  });
});
