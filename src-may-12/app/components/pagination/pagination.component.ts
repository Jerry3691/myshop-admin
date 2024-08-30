import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() currentPage = 1;
  @Input() totalPage = 1;

  visiblePageCount = 5;

  constructor() {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPage || page === this.currentPage) {
      return;
    }
    this.pageChange.emit(page);
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    let startPage: number;
    let endPage: number;

    if (this.totalPage <= this.visiblePageCount) {
      startPage = 1;
      endPage = this.totalPage;
    } else {
      const maxPagesBeforeCurrent = Math.floor(this.visiblePageCount / 2);
      const maxPagesAfterCurrent = Math.ceil(this.visiblePageCount / 2) - 1;

      if (this.currentPage <= maxPagesBeforeCurrent + 1) {
        startPage = 1;
        endPage = this.visiblePageCount - 1;
      } else if (this.currentPage >= this.totalPage - maxPagesAfterCurrent) {
        startPage = this.totalPage - this.visiblePageCount + 2;
        endPage = this.totalPage;
      } else {
        startPage = this.currentPage - maxPagesBeforeCurrent;
        endPage = this.currentPage + maxPagesAfterCurrent;
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      visiblePages.push(page);
    }

    return visiblePages;
  }

  shouldShowFirstEllipsis(): boolean {
    return this.currentPage > Math.ceil(this.visiblePageCount / 2);
  }

  shouldShowLastEllipsis(): boolean {
    return this.currentPage < this.totalPage - Math.floor(this.visiblePageCount / 2);
  }
}
