import { Component, OnInit } from "@angular/core";
import { NzModalService } from "ng-zorro-antd";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  burger = false;
  constructor(private modalService: NzModalService) {}

  ngOnInit() {}

  showModalLogin(): void {
    this.modalService.create({
      nzTitle: "Connexion",
      nzContent: LoginComponent,
      nzFooter: null
    });
  }

  onBurgerClick() {
    this.burger = !this.burger;
  }
}
