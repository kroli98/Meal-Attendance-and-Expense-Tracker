import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofnamesComponent } from './listofnames.component';

describe('ListofnamesComponent', () => {
  let component: ListofnamesComponent;
  let fixture: ComponentFixture<ListofnamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofnamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofnamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
