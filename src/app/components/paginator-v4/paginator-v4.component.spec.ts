import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorV4Component } from './paginator-v4.component';

describe('PaginatorV4Component', () => {
  let component: PaginatorV4Component;
  let fixture: ComponentFixture<PaginatorV4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorV4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
