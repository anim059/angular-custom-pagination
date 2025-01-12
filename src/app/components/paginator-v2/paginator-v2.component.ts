import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

interface IPage {
  label: string;
  value: any;
}

@Component({
  selector: 'paginator-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator-v2.component.html',
  styleUrl: './paginator-v2.component.scss'
})
export class PaginatorV2Component implements OnInit, OnChanges {

  @Input() currentPage: number = 1;

  // @Input() totalPage: number = 20; if need for any use case 

  @Input() totalItems: number = 220;

  @Input() itemsPerPage: number = 11;

  @Input() limit: number = 7;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  limitOptions: IPage[] = [];

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  isFirstPage(): boolean {
    return this.currentPage == 1;
  }

  isLastPage(): boolean {
    return this.currentPage == this.getLastPage();
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getLastPage(): number {
    if (this.totalItems < 1) {
      return 1;
    }
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage() {
    if (this.isLastPage()) {
      return;
    }
    this.setCurrentPage(this.getCurrentPage() + 1);
  }

  previousPage() {
    if (this.isFirstPage()) {
      return;
    }
    this.setCurrentPage(this.getCurrentPage() - 1);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

}
