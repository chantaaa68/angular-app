import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistUserComponent } from './regist-user.component';

describe('UserComponent', () => {
  let component: RegistUserComponent;
  let fixture: ComponentFixture<RegistUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
