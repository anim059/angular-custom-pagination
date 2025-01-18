import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

interface IPage {
  label: number;
  value: number;
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

  pageNumbers: IPage[] = [];

  ngOnInit(): void {
    this.pageNumbers = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageNumbers = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
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
    this.pageNumbers = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
    this.pageChange.emit(Number(page));
  }

  createPageRange(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number): IPage[] {
    let pages: IPage[] = [];
    let totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
    let halfWay = Math.ceil(paginationRange / 2)

    let i = 1;
    while (i <= paginationRange && i <= totalPages) {
      let pageNumber = this.getPageNumber(i, currentPage, halfWay, totalPages, paginationRange);
      pages.push({
        label: pageNumber,
        value: pageNumber
      });
      i++;
    }
    return pages;
  }

  getPageNumber(i: number, currentPage: number, halfWay: number, totalPages: number, paginationRange: number): number {
    if (halfWay < currentPage) {
      let remainingPage = totalPages - currentPage;
      if (remainingPage < paginationRange) {
        return Math.max((currentPage + i) - (paginationRange - remainingPage), 1);
      } else {
        return Math.max((currentPage + i) - 1, 1);
      }
    }
    return Math.max(i, 1);
  }

}
