import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShowcaseComponent } from "./components/showcase/showcase.component";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [ShowcaseComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [ShowcaseComponent]
})
export class SharedModule {}
