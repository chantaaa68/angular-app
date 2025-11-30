import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KakeiboComponent } from './kakeibo.component';

describe('KakeiboComponent', () => {
  let component: KakeiboComponent;
  let fixture: ComponentFixture<KakeiboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KakeiboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KakeiboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
