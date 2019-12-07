import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService, NzModalRef } from "ng-zorro-antd";
import { AuthService } from "../../shared/services/auth.service";
import { UserService } from "../../shared/services/user.service";
import { INTERNALERROR } from "../../utils/http-utils";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  isConnecting: boolean;
  loginForm: FormGroup;
  error: boolean;
  errorText: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modal: NzModalRef,
    private message: NzMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.error = false;
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  handleConnect(): void {
    this.error = false;
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      this.isConnecting = true;
      this.authService
        .login(this.loginForm.value)
        .then(() => {
          this.message.create(
            "success",
            `Bienvenue, ${this.userService.getUserFromStorage().username}`,
            {
              nzDuration: 2000
            }
          );
          this.authService.getRole();
          this.destroyModal();
        })
        .catch(errCode => {
          if (errCode === INTERNALERROR) {
            this.message.create(
              "error",
              "Une erreur vient de se produire, veuillez réessayer"
            );
          } else {
            this.error = true;
          }
        })
        .finally(() => (this.isConnecting = false));
    }
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
