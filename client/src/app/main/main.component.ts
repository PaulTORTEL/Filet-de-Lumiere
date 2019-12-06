import { Component, OnInit } from "@angular/core";
import { NzDrawerService } from "ng-zorro-antd";
import { NewsfeedComponent } from "./newsfeed/newsfeed.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(private drawerService: NzDrawerService) {}

  ngOnInit() {}

  onNewsfeedClick(): void {
    const drawerRef = this.drawerService.create<NewsfeedComponent>({
      nzTitle: "Newsfeed",
      nzContent: NewsfeedComponent
    });
  }
}
