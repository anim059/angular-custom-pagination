import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

interface IPage {
  label: number;
  value: number;
}

@Component({
  selector: 'paginator-v5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator-v5.component.html',
  styleUrl: './paginator-v5.component.scss'
})
export class PaginatorV5Component implements OnInit, OnChanges {

  @Input() currentPage: number = 1;

  // @Input() totalPage: number = 20; if need for any use case 

  @Input() totalItems: number = 220;

  @Input() itemsPerPage: number = 11;

  @Input() limit: number = 7;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pageNumbers: IPage[] = [];

  currActivePageIndex: number = 0;

  ngOnInit(): void {
    this.pageNumbers = this.createForwardPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageNumbers = this.createForwardPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
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
    if (this.currActivePageIndex === -1) {
      this.currActivePageIndex = this.currActivePageIndex === -1 ? 0 : this.currActivePageIndex + 1
      this.pageNumbers = this.createForwardPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
    }
  }

  previousPage() {
    if (this.isFirstPage()) {
      return;
    }
    this.setCurrentPage(this.getCurrentPage() - 1);
    if (this.currActivePageIndex === -1) {
      this.currActivePageIndex =  this.currActivePageIndex === -1
        ? this.pageNumbers.length - 1 : this.currActivePageIndex - 1;
      this.pageNumbers = this.createBackwardPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
    }
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.currActivePageIndex = this.pageNumbers.findIndex(page => page.value == this.currentPage);
    this.pageChange.emit(Number(page));
  }

  createForwardPageRange(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number, type?: string): IPage[] {
    let pages: IPage[] = [];
    let totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
    let halfWay = Math.ceil(paginationRange / 2)

    let i = 1;
    while (i <= paginationRange && i <= totalPages) {
      let pageNumber = this.getForwardPageNumber(i, currentPage, halfWay, totalPages, paginationRange);
      pages.push({
        label: pageNumber,
        value: pageNumber
      });
      i++;
    }
    this.currActivePageIndex = pages.findIndex(page => page.value == this.currentPage);
    return pages;
  }

  getForwardPageNumber(i: number, currentPage: number, halfWay: number, totalPages: number, paginationRange: number): number {
    if (currentPage >= paginationRange) {
      let remainingPage = totalPages - currentPage;
      if (remainingPage < paginationRange) {
        return Math.max((currentPage + i) - (paginationRange - remainingPage), 1);
      } else {
        return Math.max((currentPage + i) - 1, 1);
      }
    }
    return Math.max(i, 1);
  }

  createBackwardPageRange(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number, type?: string): IPage[] {
    let pages: IPage[] = [];
    let totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
    let halfWay = Math.ceil(paginationRange / 2)

    let i = 1;
    while (i <= paginationRange && i <= totalPages) {
      let pageNumber = this.getBackwardPageNumber(i, currentPage, halfWay, totalPages, paginationRange);
      pages.push({
        label: pageNumber,
        value: pageNumber
      });
      i++;
    }
    const revPages = [...pages].reverse();
    return revPages;
  }

  getBackwardPageNumber(i: number, currentPage: number, halfWay: number, totalPages: number, paginationRange: number): number {
    let remainingPage = currentPage - 1;
    if (remainingPage < paginationRange) {
      return Math.max((currentPage + (paginationRange - remainingPage)) - i, 1);
    }
    return Math.max((currentPage + 1) - i, 1);
  }

}
