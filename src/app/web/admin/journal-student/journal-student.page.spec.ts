import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalStudentPage } from './journal-student.page';

describe('JournalStudentPage', () => {
  let component: JournalStudentPage;
  let fixture: ComponentFixture<JournalStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JournalStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
