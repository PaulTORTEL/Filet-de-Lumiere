import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { LoginComponent } from "./components/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserNavCardComponent } from './components/navbar/user-nav-card/user-nav-card.component';
import { NotificationComponent } from './components/navbar/notification/notification.component';

@NgModule({
  declarations: [NavbarComponent, LoginComponent, UserNavCardComponent, NotificationComponent],
  imports: [CommonModule, NgZorroAntdModule, ReactiveFormsModule],
  exports: [NavbarComponent, NgZorroAntdModule],
  entryComponents: [LoginComponent]
})
export class SharedModule {}
