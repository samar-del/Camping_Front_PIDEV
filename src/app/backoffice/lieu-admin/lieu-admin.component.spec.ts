import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuAdminComponent } from './lieu-admin.component';

describe('LieuAdminComponent', () => {
  let component: LieuAdminComponent;
  let fixture: ComponentFixture<LieuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieuAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
