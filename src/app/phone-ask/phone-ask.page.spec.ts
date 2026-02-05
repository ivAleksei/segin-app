import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneAskPage } from './phone-ask.page';

describe('PhoneAskPage', () => {
  let component: PhoneAskPage;
  let fixture: ComponentFixture<PhoneAskPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PhoneAskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
