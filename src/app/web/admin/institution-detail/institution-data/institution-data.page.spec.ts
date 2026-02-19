import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvenioDataPage } from './convenio-data.page';

describe('ConvenioDataPage', () => {
  let component: ConvenioDataPage;
  let fixture: ComponentFixture<ConvenioDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenioDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
