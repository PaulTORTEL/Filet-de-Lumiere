import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  Input
} from "@angular/core";
import { NzCarouselComponent } from "ng-zorro-antd";
import { ConfigService } from "../../services/config.service";
import { Mode } from "../../../utils/enums/mode";
import { ShowcaseOverlay } from "../../../utils/enums/showcase-overlay";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.scss"]
})
export class ShowcaseComponent implements OnInit {
  indexForward = 0;
  indexBackward = 0;
  forward = true;
  mode: Mode;

  @Input()
  overlay: ShowcaseOverlay; // TODO: use overlay to display description of photos when hover (desktop)/click (mobile)

  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;

  array = [
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-64679.jpg",
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-214916.jpg",
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-7599.jpg",
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-201903.jpg",
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-193719.jpg",
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-213201.jpg",
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-214313.jpg",
    "http://filetdelumiere.free.fr/v2/assets/imgs/wallhaven-214316.jpg",
    "http://filetdelumiere.free.fr/photos/DSC_3121c_1000x667.jpg"
  ];

  arr = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
  ];

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.mode$.subscribe(mode => (this.mode = mode));

    this.indexBackward = this.arr.length - 1;
    this.arr[this.indexForward].alt = "" + this.indexForward;
    this.arr[this.indexForward].src = this.array[this.indexForward++];
  }

  @HostListener("mousewheel", ["$event"]) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener("DOMMouseScroll", ["$event"]) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener("onmousewheel", ["$event"]) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener("click", ["$event.target"])
  onClick() {
    if (this.mode === Mode.DESKTOP) {
      this.myCarousel.next();
    } else {
      //nothing
    }
  }

  mouseWheelFunc(event: any) {
    var event = window.event || event; // old IE support
    var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    if (delta > 0) {
      this.forward = false;
      this.myCarousel.pre();
    } else if (delta < 0) {
      this.myCarousel.next();
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }

  onItemChange() {
    if (this.indexForward < this.indexBackward + 1) {
      const index = this.forward ? this.indexForward : this.indexBackward;
      this.arr[index].alt = "" + index;
      this.arr[index].src = this.array[index];

      if (this.forward) {
        this.indexForward++;
      } else {
        this.indexBackward--;
      }

      this.forward = true;
    }
  }
}
