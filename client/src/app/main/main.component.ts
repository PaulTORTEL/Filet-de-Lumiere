import { Component, OnInit } from "@angular/core";
import {
  NzDrawerService,
  NzNotificationService,
  NzConfigService
} from "ng-zorro-antd";
import { NewsfeedComponent } from "./newsfeed/newsfeed.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private readonly nzConfigService: NzConfigService
  ) {}

  ngOnInit() {
    this.nzConfigService.set("notification", { nzTop: "100px" });
    this.createBasicNotification();
  }

  onNewsfeedClick(): void {
    const drawerRef = this.drawerService.create<NewsfeedComponent>({
      nzTitle: "Newsfeed",
      nzContent: NewsfeedComponent,
      nzKeyboard: true,
      nzMaskStyle: { background: "unset" },
      nzMask: true
    });
  }

  createBasicNotification(): void {
    this.notification.info(
      "Message du moment",
      "Je suis de retour à Toulouse. Je recherche un modèle pour un shooting.",
      {
        nzDuration: 10000
      }
    );
  }
}
