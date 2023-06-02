import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSecComponent } from './banner-sec.component';

describe('BannerSecComponent', () => {
  let component: BannerSecComponent;
  let fixture: ComponentFixture<BannerSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
