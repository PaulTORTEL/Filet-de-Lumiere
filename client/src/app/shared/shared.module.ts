import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [NavbarComponent, NgZorroAntdModule]
})
export class SharedModule {}
