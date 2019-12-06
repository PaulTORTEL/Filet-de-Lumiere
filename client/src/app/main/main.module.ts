import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { SharedModule } from "../shared/shared.module";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { UserNavCardComponent } from "./navbar/user-nav-card/user-nav-card.component";
import { NotificationComponent } from "./navbar/notification/notification.component";

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    LoginComponent,
    UserNavCardComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  entryComponents: [LoginComponent]
})
export class MainModule {}
