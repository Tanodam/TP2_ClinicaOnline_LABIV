import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPacientesAdminComponent } from './lista-pacientes-admin.component';

describe('ListaPacientesAdminComponent', () => {
  let component: ListaPacientesAdminComponent;
  let fixture: ComponentFixture<ListaPacientesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPacientesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPacientesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
