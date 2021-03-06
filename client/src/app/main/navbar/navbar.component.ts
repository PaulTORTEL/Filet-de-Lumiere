import { Component, OnInit } from "@angular/core";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { AuthService } from "../../shared/services/auth.service";
import { UserRole } from "../../utils/enums/user-role";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  burger = false;
  role: UserRole;

  public roleType = UserRole;

  constructor(
    private modalService: NzModalService,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
    this.authService.getRole().catch(() => {});
  }

  showModalLogin(): void {
    this.modalService
      .create({
        nzTitle: "Connexion",
        nzContent: LoginComponent,
        nzFooter: null
      })
      .afterClose.subscribe(() => {
        this.burger = false;
      });
  }

  //TODO: settings for all users ? (and non auth ones ?) to change language, theme..
  //TODO: generate component for auth user

  onBurgerClick() {
    this.burger = !this.burger;
  }

  onDisconnect() {
    this.authService
      .disconnect()
      .then(() => {
        this.burger = false;
        this.authService.setRole(undefined);
        this.message.create("success", "Vous vous êtes déconnecté");
      })
      .catch(() => {
        this.message.create("error", "Une erreur est survenue...");
      });
  }
}
