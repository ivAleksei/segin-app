import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeDetailPage } from './notice-detail.page';

describe('NoticeDetailPage', () => {
  let component: NoticeDetailPage;
  let fixture: ComponentFixture<NoticeDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
