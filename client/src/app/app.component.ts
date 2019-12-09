import { Component, OnInit, HostListener } from "@angular/core";
import { ConfigService } from "./shared/services/config.service";
import { Mode } from "./utils/enums/mode";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Filet de Lumière";

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.refreshMode();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.configService.refreshMode();
  }
}
