import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailAskPage } from './email-ask.page';

describe('EmailAskPage', () => {
  let component: EmailAskPage;
  let fixture: ComponentFixture<EmailAskPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailAskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
