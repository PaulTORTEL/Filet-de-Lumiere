import { Component, OnInit } from "@angular/core";
import { ShowcaseOverlay } from "../../utils/enums/showcase-overlay";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public overlayTypes = ShowcaseOverlay;

  constructor() {}

  ngOnInit() {}
}
