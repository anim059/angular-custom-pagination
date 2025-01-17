import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorV5Component } from './paginator-v5.component';

describe('PaginatorV5Component', () => {
  let component: PaginatorV5Component;
  let fixture: ComponentFixture<PaginatorV5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorV5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorV5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
