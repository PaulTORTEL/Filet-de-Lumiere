import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { Mode } from "../../utils/enums/mode";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  readonly threshold = 810;

  private modeSource = new BehaviorSubject<Mode>(this.getCurrentMode());
  modeSource$ = this.modeSource.asObservable();

  constructor() {}

  setMode(mode: Mode): void {
    this.modeSource.next(mode);
  }

  refreshMode() {
    this.setMode(this.getCurrentMode());
  }

  getCurrentMode(): Mode {
    if (window.innerWidth < this.threshold) {
      return Mode.MOBILE;
    } else {
      return Mode.DESKTOP;
    }
  }
}
