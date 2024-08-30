import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouteInfo } from "./sidebar.component";

@Component({
  selector: "app-sidebar-item",
  template: `<li *ngIf="menuItem.display" class="{{ menuItem.class }} nav-item">
    <a
      *ngIf="menuItem.path"
      routerLinkActive="active"
      [routerLink]="[menuItem.path]"
      class="nav-link"
    >
      <i class="ni {{ menuItem.icon }}"></i>
      {{ menuItem.title }}
    </a>
    <a
      *ngIf="!menuItem.path"
      class="nav-link"
      data-toggle="collapse"
      routerlinkactive="active"
      [attr.aria-expanded]="isExpanded"
      aria-controls="examples"
      (click)="isExpanded = !isExpanded"
      style="cursor:pointer"
    >
      <i class="ni {{ menuItem.icon }}"></i>
      {{ menuItem.title }}
    </a>
    <div
      *ngIf="menuItem.children && menuItem.children?.length"
      class="collapse"
      id="examples"
      [attr.aria-expanded]="isExpanded"
      [attr.aria-hidden]="!isExpanded"
      [ngStyle]="{ display: isExpanded ? 'block' : 'none' }"
    >
      <ul class="nav nav-sm flex-column">
        <li *ngFor="let child of menuItem.children" class="nav-item">
          <a
            class="nav-link child-nav-before"
            [ngClass]="{ active: url === child.path }"
            routerlinkactive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            [routerLink]="[child.path]"
          >
            {{ child.title }}
          </a>
        </li>
      </ul>
    </div>
  </li>`,
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarItemComponent implements OnInit {
  @Input() menuItem: RouteInfo;
  isExpanded: boolean = false;
  url: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (!this.menuItem.path && event.url) {
        this.url = event.url;
        this.isExpanded = this.menuItem.children[0].path.includes(
          this.url.substring(1).split("/")[0]
        );
      }
    });
    if (!this.menuItem.path && this.router.url) {
      this.url = this.router.url;
      this.isExpanded = this.menuItem.children[0].path.includes(
        this.url.substring(1).split("/")[0]
      );
    }
  }
}
