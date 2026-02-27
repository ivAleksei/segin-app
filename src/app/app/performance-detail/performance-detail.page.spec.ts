import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerformanceDetailPage } from './performance-detail.page';

describe('PerformanceDetailPage', () => {
  let component: PerformanceDetailPage;
  let fixture: ComponentFixture<PerformanceDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerformanceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
