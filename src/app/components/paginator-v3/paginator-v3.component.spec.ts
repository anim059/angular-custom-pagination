import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorV3Component } from './paginator-v3.component';

describe('PaginatorV3Component', () => {
  let component: PaginatorV3Component;
  let fixture: ComponentFixture<PaginatorV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorV3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
