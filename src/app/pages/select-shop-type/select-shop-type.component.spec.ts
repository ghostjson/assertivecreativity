import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShopTypeComponent } from './select-shop-type.component';

describe('SelectShopTypeComponent', () => {
  let component: SelectShopTypeComponent;
  let fixture: ComponentFixture<SelectShopTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectShopTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShopTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
