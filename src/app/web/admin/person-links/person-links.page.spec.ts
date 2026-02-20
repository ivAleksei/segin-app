import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonLinksPage } from './person-links.page';

describe('PersonLinksPage', () => {
  let component: PersonLinksPage;
  let fixture: ComponentFixture<PersonLinksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonLinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
