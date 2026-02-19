import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionsPage } from './institutions.page';

describe('InstitutionsPage', () => {
  let component: InstitutionsPage;
  let fixture: ComponentFixture<InstitutionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstitutionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
