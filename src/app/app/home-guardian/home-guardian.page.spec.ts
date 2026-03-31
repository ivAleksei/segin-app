import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeGuardianPage } from './home-guardian.page';

describe('HomeGuardianPage', () => {
  let component: HomeGuardianPage;
  let fixture: ComponentFixture<HomeGuardianPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeGuardianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
