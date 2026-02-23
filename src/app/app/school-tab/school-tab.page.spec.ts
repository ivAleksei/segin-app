import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolTabPage } from './school-tab.page';

describe('SchoolTabPage', () => {
  let component: SchoolTabPage;
  let fixture: ComponentFixture<SchoolTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SchoolTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
