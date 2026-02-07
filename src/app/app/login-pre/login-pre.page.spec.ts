import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPrePage } from './login-pre.page';

describe('LoginPrePage', () => {
  let component: LoginPrePage;
  let fixture: ComponentFixture<LoginPrePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginPrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
