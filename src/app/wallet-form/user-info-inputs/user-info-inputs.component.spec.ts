import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoInputsComponent } from './user-info-inputs.component';

describe('UserInfoInputsComponent', () => {
  let component: UserInfoInputsComponent;
  let fixture: ComponentFixture<UserInfoInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
