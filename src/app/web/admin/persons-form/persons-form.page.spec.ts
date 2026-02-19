import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonsFormPage } from './persons-form.page';

describe('PersonsFormPage', () => {
  let component: PersonsFormPage;
  let fixture: ComponentFixture<PersonsFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
