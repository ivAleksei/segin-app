import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeResponsavelPage } from './home-responsavel.page';

describe('HomeResponsavelPage', () => {
  let component: HomeResponsavelPage;
  let fixture: ComponentFixture<HomeResponsavelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeResponsavelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
