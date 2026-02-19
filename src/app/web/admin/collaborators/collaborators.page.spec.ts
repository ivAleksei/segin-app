import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorsPage } from './collaborators.page';

describe('CollaboratorsPage', () => {
  let component: CollaboratorsPage;
  let fixture: ComponentFixture<CollaboratorsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CollaboratorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
