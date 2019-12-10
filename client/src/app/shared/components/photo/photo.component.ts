import { Component, OnInit, Input, HostListener } from "@angular/core";
import { Mode } from "../../../utils/enums/mode";
import { ShowcaseOverlay } from "../../../utils/enums/showcase-overlay";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.scss"]
})
export class PhotoComponent implements OnInit {
  displayDetails = false;

  @Input()
  src: string;

  @Input()
  overlay: ShowcaseOverlay;

  @Input()
  mode: Mode;

  public showcaseOverlayTypes = ShowcaseOverlay;

  @HostListener("mouseover") onMouseOver() {
    if (this.mode === Mode.DESKTOP) {
      this.displayDetails = true;
    }
  }

  @HostListener("mouseleave") onMouseLeave() {
    if (this.mode === Mode.DESKTOP) {
      this.displayDetails = false;
    }
  }

  @HostListener("click", ["$event.target"])
  onClick() {
    if (this.mode === Mode.MOBILE) {
      this.displayDetails = !this.displayDetails;
    } else {
      //nothing
    }
  }

  constructor() {}

  ngOnInit() {
    if (this.overlay === ShowcaseOverlay.DETAILED) {
      this.displayDetails = true;
    }
  }
}
