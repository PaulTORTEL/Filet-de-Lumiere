import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";

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
    private message: NzMessageService
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
          this.createMessage("success");
          this.destroyModal();
        })
        .catch(errCode => {
          this.error = true;
        })
        .finally(() => (this.isConnecting = false));
    }
  }

  createMessage(type: string): void {
    this.message.create(type, `Bienvenue, Admin !`);
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
