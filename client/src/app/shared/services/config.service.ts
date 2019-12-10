import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { Mode } from "../../utils/enums/mode";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  readonly threshold = 810;

  private modeSource = new BehaviorSubject<Mode>(this.getCurrentMode());
  mode$ = this.modeSource.asObservable();

  constructor() {}

  setMode(mode: Mode): void {
    this.modeSource.next(mode);
  }

  refreshMode() {
    const currentMode = this.getCurrentMode();

    if (currentMode !== this.modeSource.getValue()) {
      this.setMode(currentMode);
    }
  }

  getCurrentMode(): Mode {
    if (window.innerWidth < this.threshold) {
      return Mode.MOBILE;
    } else {
      return Mode.DESKTOP;
    }
  }
}
