import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeFormPage } from './notice-form.page';

describe('NoticeFormPage', () => {
  let component: NoticeFormPage;
  let fixture: ComponentFixture<NoticeFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
