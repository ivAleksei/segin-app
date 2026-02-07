import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsAccountPage } from './settings-account.page';

describe('SettingsAccountPage', () => {
  let component: SettingsAccountPage;
  let fixture: ComponentFixture<SettingsAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SettingsAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
