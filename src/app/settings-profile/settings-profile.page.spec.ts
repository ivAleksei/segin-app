import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsProfilePage } from './settings-profile.page';

describe('SettingsProfilePage', () => {
  let component: SettingsProfilePage;
  let fixture: ComponentFixture<SettingsProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SettingsProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
