import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { SharedModule } from "../shared/shared.module";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
