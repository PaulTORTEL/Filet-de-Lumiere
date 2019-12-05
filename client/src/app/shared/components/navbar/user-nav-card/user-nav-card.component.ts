import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { AuthService } from "../../../services/auth.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-user-nav-card",
  templateUrl: "./user-nav-card.component.html",
  styleUrls: ["./user-nav-card.component.scss"]
})
export class UserNavCardComponent implements OnInit {
  username: string;

  @Input()
  mode: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.username = this.userService.getUserFromStorage().username;
    console.log(this.mode);
  }

  onDisconnect() {
    this.authService
      .disconnect()
      .then(() => {
        this.authService.setRole(undefined);
        this.message.create("success", "Vous vous êtes déconnecté");
      })
      .catch(() => {
        this.message.create("error", "Une erreur est survenue...");
      });
  }
}
