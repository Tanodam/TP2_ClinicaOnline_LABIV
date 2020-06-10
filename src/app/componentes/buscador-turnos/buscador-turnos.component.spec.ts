import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTurnosComponent } from './buscador-turnos.component';

describe('BuscadorTurnosComponent', () => {
  let component: BuscadorTurnosComponent;
  let fixture: ComponentFixture<BuscadorTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
