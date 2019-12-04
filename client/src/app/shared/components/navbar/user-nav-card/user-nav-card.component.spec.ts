import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavCardComponent } from './user-nav-card.component';

describe('UserNavCardComponent', () => {
  let component: UserNavCardComponent;
  let fixture: ComponentFixture<UserNavCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
