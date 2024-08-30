import { environment } from "../../../../environments/environment";
import { Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-products",
  templateUrl: "./order_details.component.html",
  styleUrls: ["./orders_details.component.css"],
})
export class OrderDetailsComponent implements OnInit {

  submitted = false;
  order: any;
  serverUrl: string = environment.serverUrl;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.order = res[0].order;
      console.log(this.order)
    });
  }

  navigateBack() {
    window.history.back();
  }

  parseJSON(data: string) {
    return JSON.parse(data);
  }

}
