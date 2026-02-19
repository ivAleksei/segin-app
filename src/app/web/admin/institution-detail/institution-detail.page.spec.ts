import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionDetailPage } from './institution-detail.page';

describe('InstitutionDetailPage', () => {
  let component: InstitutionDetailPage;
  let fixture: ComponentFixture<InstitutionDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstitutionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
