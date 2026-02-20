import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentClassLinksPage } from './student-class-links.page';

describe('StudentClassLinksPage', () => {
  let component: StudentClassLinksPage;
  let fixture: ComponentFixture<StudentClassLinksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StudentClassLinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
