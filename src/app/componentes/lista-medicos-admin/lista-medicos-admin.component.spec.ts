import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMedicosAdminComponent } from './lista-medicos-admin.component';

describe('ListaMedicosAdminComponent', () => {
  let component: ListaMedicosAdminComponent;
  let fixture: ComponentFixture<ListaMedicosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMedicosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMedicosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
