import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicContentComponent } from './graphic-content.component';

describe('GraphicContentComponent', () => {
  let component: GraphicContentComponent;
  let fixture: ComponentFixture<GraphicContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
