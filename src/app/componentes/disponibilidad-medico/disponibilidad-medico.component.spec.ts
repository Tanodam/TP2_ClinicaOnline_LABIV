import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadMedicoComponent } from './disponibilidad-medico.component';

describe('DisponibilidadMedicoComponent', () => {
  let component: DisponibilidadMedicoComponent;
  let fixture: ComponentFixture<DisponibilidadMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilidadMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
