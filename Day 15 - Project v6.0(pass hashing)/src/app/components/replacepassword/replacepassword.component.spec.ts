import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacepasswordComponent } from './replacepassword.component';

describe('ReplacepasswordComponent', () => {
  let component: ReplacepasswordComponent;
  let fixture: ComponentFixture<ReplacepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplacepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplacepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
