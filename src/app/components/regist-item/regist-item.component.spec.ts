import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistItemComponent } from './regist-item.component';

describe('RegistItemComponent', () => {
  let component: RegistItemComponent;
  let fixture: ComponentFixture<RegistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
