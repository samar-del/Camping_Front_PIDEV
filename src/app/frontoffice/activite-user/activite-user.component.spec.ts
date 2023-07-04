import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteUserComponent } from './activite-user.component';

describe('ActiviteUserComponent', () => {
  let component: ActiviteUserComponent;
  let fixture: ComponentFixture<ActiviteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
