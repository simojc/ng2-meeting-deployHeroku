import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRpnComponent } from './change-pwd.component';

describe('EditComponent', () => {
  let component: EditRpnComponent;
  let fixture: ComponentFixture<EditRpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
