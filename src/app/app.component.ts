import { Component, Inject, OnInit } from "@angular/core";
import { LoaderService } from "./core/services/loader.service";
import { FCMService } from "./core/services/fcm.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "argon-dashboard-angular";

  constructor(public loaderService: LoaderService, private fcmService: FCMService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.fcmService.requestPermission();
    // this.fcmService.listen();
    this.loaderService.loading$.subscribe({
      next: ((res: boolean) => {
        if (res) {
          // document.getElementsByTagName('body')[0].addC
          this.document.body.classList.add('body__events__none');
        } else {
          this.document.body.classList.remove('body__events__none');
        }
      }).bind(this)
    })
  }
}
