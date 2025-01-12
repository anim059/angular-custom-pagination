import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

interface IPage {
  label: string;
  value: any;
}

@Component({
  selector: 'paginator-v1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})

export class PaginatorComponent implements OnInit, OnChanges {

  @Input() currentPage: number = 1;

  // @Input() totalPage: number = 20; if need for any use case 

  @Input() totalItems: number = 220;

  @Input() itemsPerPage: number = 15;

  @Input() limit: number = 7;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  limitOptions: IPage[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.limitOptions = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
  }

  ngOnInit(): void {
    this.limitOptions = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
  }

  previousPage() {
    if (this.isFirstPage()) {
      return;
    }
    this.setCurrentPage(this.getCurrentPage() - 1);
  }

  nextPage() {
    if (this.isLastPage()) {
      return;
    }
    this.setCurrentPage(this.getCurrentPage() + 1);
  }

  isFirstPage(): boolean {
    return this.getCurrentPage() === 1;
  }

  isLastPage(): boolean {
    return this.getLastPage() === this.getCurrentPage();
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.limitOptions = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit);
    this.pageChange.emit(Number(page));
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

  createPageRange(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number): IPage[] {
    let pages: IPage[] = [];
    let totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
    let halfway = Math.ceil(paginationRange / 2);

    let isStart = currentPage <= halfway;
    let isEnd = totalPages - halfway < currentPage;
    let isMId = !isStart && !isEnd;

    let ellipsesNeeded = totalPages > paginationRange;

    let i = 1;
    while (i <= paginationRange && i <= totalPages) {
      let label = "";
      let pageNumber = this.createPageNumber(i, currentPage, totalPages, paginationRange);
      let openingEllipsesNeeded = ((i == 2) && (isEnd || isMId));
      let closingEllipsesNeeded = ((i == paginationRange - 1) && (isStart || isMId));
      if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
        label = '...';
      } else {
        label = pageNumber.toString();
      }
      pages.push({
        label: label,
        value: pageNumber
      });
      i++;
    }
    return pages;
  }

  createPageNumber(i: number, currentPage: number, totalPages: number, paginationRange: number): number {
    let halfway = Math.ceil(paginationRange / 2);
    if (i === paginationRange) {
      return totalPages;
    } else if (i === 1) {
      return i;
    } else if (paginationRange < totalPages) {
      if (totalPages - halfway < currentPage) {
        return totalPages - paginationRange + i;
      } else if (halfway < currentPage) {
        return currentPage - halfway + i;
      } else {
        return i;
      }
    }
    return i;
  }

  getPageLabelClass(page: IPage): string {
    if (page.label === '...') {
      return '';
    } else if (page.value == this.getCurrentPage()) {
      return 'border-b md:border border-b-black md:border-[#ffffff] bg-[#ffffff] md:bg-black text-black md:text-[#ffffff] cursor-pointer p-[1px]';
    }
    return 'text-[#757575] md:bg-[#F4F4F4]  cursor-pointer hover:bg-[#2e2e2e] hover:text-white p-[1px]';
  }
  
}
