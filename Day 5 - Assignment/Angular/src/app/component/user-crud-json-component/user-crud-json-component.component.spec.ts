import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCrudJsonComponentComponent } from './user-crud-json-component.component';

describe('UserCrudJsonComponentComponent', () => {
  let component: UserCrudJsonComponentComponent;
  let fixture: ComponentFixture<UserCrudJsonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCrudJsonComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrudJsonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
