import {
  Component,
  OnInit,
  ViewChild,
  SimpleChange,
  SimpleChanges,
  HostListener,
  ElementRef
} from "@angular/core";
import { NzCarouselComponent } from "ng-zorro-antd";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.scss"]
})
export class ShowcaseComponent implements OnInit {
  indexForward = 0;
  indexBackward = 0;
  forward = true;

  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;

  array = [];

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

  constructor() {}

  ngOnInit() {
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
