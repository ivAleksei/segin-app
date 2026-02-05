import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRecoverPage } from './login-recover.page';

describe('LoginRecoverPage', () => {
  let component: LoginRecoverPage;
  let fixture: ComponentFixture<LoginRecoverPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginRecoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
