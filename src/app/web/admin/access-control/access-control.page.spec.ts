import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessControlPage } from './access-control.page';

describe('AccessControlPage', () => {
  let component: AccessControlPage;
  let fixture: ComponentFixture<AccessControlPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccessControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
