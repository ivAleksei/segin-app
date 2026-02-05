import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalTabsPage } from './internal-tabs.page';

describe('InternalTabsPage', () => {
  let component: InternalTabsPage;
  let fixture: ComponentFixture<InternalTabsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InternalTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
