import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasseDetailPage } from './classe-detail.page';

describe('ClasseDetailPage', () => {
  let component: ClasseDetailPage;
  let fixture: ComponentFixture<ClasseDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClasseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
