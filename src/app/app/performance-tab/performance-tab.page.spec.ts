import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerformanceTabPage } from './performance-tab.page';

describe('PerformanceTabPage', () => {
  let component: PerformanceTabPage;
  let fixture: ComponentFixture<PerformanceTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerformanceTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
