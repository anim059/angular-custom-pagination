import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorV2Component } from './paginator-v2.component';

describe('PaginatorV2Component', () => {
  let component: PaginatorV2Component;
  let fixture: ComponentFixture<PaginatorV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
