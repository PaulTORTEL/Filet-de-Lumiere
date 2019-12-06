import { Component, OnInit, Input } from "@angular/core";
import { NzDrawerRef } from "ng-zorro-antd";

@Component({
  selector: "app-newsfeed",
  templateUrl: "./newsfeed.component.html",
  styleUrls: ["./newsfeed.component.scss"]
})
export class NewsfeedComponent implements OnInit {
  constructor(private drawerRef: NzDrawerRef<string>) {}

  ngOnInit() {}

  close(): void {
    this.drawerRef.close();
  }
}
