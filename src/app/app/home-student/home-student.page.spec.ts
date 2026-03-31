import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeStudentPage } from './home-student.page';

describe('HomeStudentPage', () => {
  let component: HomeStudentPage;
  let fixture: ComponentFixture<HomeStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
