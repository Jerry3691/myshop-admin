import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { AuthService } from "src-may-12/app/core/services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificationService } from "src-may-12/app/core/services/notification.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  pageTitle: string = "";
  isNewNotification = false;

  constructor(
    location: Location,
    public authService: AuthService,
    private modalService: NgbModal,
    private NotificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.location = location;
    this.getNotification()
  }

  getNotification(): void {
    this.NotificationService.getList().subscribe();
  }
  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.NotificationService.notification.subscribe(res => { this.isNewNotification = res; this.cdr.detectChanges() })
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    let arrTitle = titlee.split("/");

    if (arrTitle.length > 3) {
      arrTitle.pop();
      titlee = arrTitle.join("/");
    } else if (arrTitle.length > 2 && arrTitle[1] == "requests") {
      arrTitle[2] = "details";
      titlee = arrTitle.join("/");
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    if (titlee.charAt(0) === "/") {
      titlee = titlee.slice(1);
    }
    let titleeArr = titlee.split("?");
    titlee = titleeArr[0];
    return titlee.replace("-", " ");
    // return 'Dashboard'
  }

  onOpenConfirmation(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (_result) => {
          this.authService.logout()
        },
        (_reason) => {
        }
      );
  }
}
