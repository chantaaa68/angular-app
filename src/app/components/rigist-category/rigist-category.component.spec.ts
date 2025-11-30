import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigistCategoryComponent } from './rigist-category.component';

describe('RigistCategoryComponent', () => {
  let component: RigistCategoryComponent;
  let fixture: ComponentFixture<RigistCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigistCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigistCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
