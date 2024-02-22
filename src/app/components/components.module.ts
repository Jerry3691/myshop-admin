import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { SidebarItemComponent } from './sidebar/sidebar-item.component';
import { RequestDetailDialogComponent } from './request-detail-dialog/request-detail-dialog.component';
import { SharedModule } from '../core/shared.module';
import { ReadNotesComponent } from './read-notes/read-notes.components';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageBodyComponent } from './page-body/page-body.component';
import { EmailComponent } from './email/email.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ViewLinksComponent } from './view-links/view-links.components';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemComponent,
    LoaderComponent,
    PaginationComponent,
    DeleteConfirmationComponent,
    NotificationMessageComponent,
    RequestDetailDialogComponent,
    ReadNotesComponent,
    PageHeaderComponent,
    PageBodyComponent,
    EmailComponent,
    NotificationListComponent,
    ViewLinksComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoaderComponent,
    PaginationComponent,
    RequestDetailDialogComponent,
    PageHeaderComponent,
    PageBodyComponent,
    EmailComponent,
    ViewLinksComponent
  ]
})
export class ComponentsModule { }
