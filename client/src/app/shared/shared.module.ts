import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { LoginComponent } from "./components/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [NavbarComponent, LoginComponent],
  imports: [CommonModule, NgZorroAntdModule, ReactiveFormsModule],
  exports: [NavbarComponent, NgZorroAntdModule],
  entryComponents: [LoginComponent]
})
export class SharedModule {}
