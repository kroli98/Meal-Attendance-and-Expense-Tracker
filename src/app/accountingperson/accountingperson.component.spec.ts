import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingpersonComponent } from './accountingperson.component';

describe('AccountingpersonComponent', () => {
  let component: AccountingpersonComponent;
  let fixture: ComponentFixture<AccountingpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingpersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
