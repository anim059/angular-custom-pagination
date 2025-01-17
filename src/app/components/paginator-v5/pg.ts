// import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

// import { CommonModule } from '@angular/common';

// interface IPage {
//   label: number;
//   value: number;
// }

// @Component({
//   selector: 'paginator-v5',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './paginator-v5.component.html',
//   styleUrl: './paginator-v5.component.scss'
// })
// export class PaginatorV5Component implements OnInit, OnChanges {

//   @Input() currentPage: number = 1;

//   @Input() totalItems: number = 220;

//   @Input() itemsPerPage: number = 11;

//   @Input() limit: number = 7;

//   @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

//   pageNumbers: IPage[] = [];

//   currActivePageIndex: number = 0;

//   ngOnInit(): void {
//     this.pageNumbers = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit, 'forward');
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     this.pageNumbers = this.createPageRange(this.currentPage, this.itemsPerPage, this.totalItems, this.limit, 'forward');
//   }

//   isFirstPage(): boolean {
//     return this.currentPage == 1;
//   }

//   isLastPage(): boolean {
//     return this.currentPage == this.getLastPage();
//   }

//   getCurrentPage(): number {
//     return this.currentPage;
//   }

//   getLastPage(): number {
//     if (this.totalItems < 1) {
//       return 1;
//     }
//     return Math.ceil(this.totalItems / this.itemsPerPage);
//   }

//   nextPage() {
//     if (!this.isLastPage()) {
//       this.updatePage(this.getCurrentPage() + 1, 'forward');
//     }
//   }
  
//   previousPage() {
//     if (!this.isFirstPage()) {
//       this.updatePage(this.getCurrentPage() - 1, 'backward');
//     }
//   }
  
//   updatePage(page: number, direction: 'forward' | 'backward') {
//     this.setCurrentPage(page);
//     const pageRangeFunction = direction === 'forward' ? this.createPageRange : this.createPageRange;
//     this.pageNumbers = pageRangeFunction.call(this, this.currentPage, this.itemsPerPage, this.totalItems, this.limit, direction);
//   }
  
//   setCurrentPage(page: number) {
//     this.currentPage = page;
//     this.currActivePageIndex = this.pageNumbers.findIndex(page => page.value === this.currentPage);
//     this.pageChange.emit(page);
//   }
  
//   createPageRange(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number, direction: 'forward' | 'backward'): IPage[] {
//     const pages: IPage[] = [];
//     const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
//     const halfWay = Math.ceil(paginationRange / 2);
  
//     for (let i = 1; i <= paginationRange && i <= totalPages; i++) {
//       const pageNumber = this.getPageNumber(i, currentPage, halfWay, totalPages, paginationRange, direction);
//       pages.push({ label: pageNumber, value: pageNumber });
//     }
  
//     if (direction === 'backward') {
//       return pages.reverse();
//     }
//     return pages;
//   }
  
//   getPageNumber(i: number, currentPage: number, halfWay: number, totalPages: number, paginationRange: number, direction: 'forward' | 'backward'): number {
//     if (direction === 'forward') {
//       if (currentPage >= paginationRange) {
//         const remainingPage = totalPages - currentPage;
//         return remainingPage < paginationRange
//           ? Math.max(currentPage + i - (paginationRange - remainingPage), 1)
//           : Math.max(currentPage + i - 1, 1);
//       }
//       return Math.max(i, 1);
//     } else {
//       const remainingPage = currentPage - 1;
//       return remainingPage < paginationRange
//         ? Math.max(currentPage + (paginationRange - remainingPage) - i, 1)
//         : Math.max(currentPage + 1 - i, 1);
//     }
//   }
// }
