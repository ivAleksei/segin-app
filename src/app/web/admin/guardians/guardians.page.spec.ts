import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuardiansPage } from './guardians.page';

describe('GuardiansPage', () => {
  let component: GuardiansPage;
  let fixture: ComponentFixture<GuardiansPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuardiansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
