import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { httpOptions } from "../../utils/http-utils";
import { User } from "../models/user";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public login(form: any): Promise<boolean | number> {
    const url = environment.baseUrl + environment.API_ENDPOINTS.LOGIN;

    return new Promise<boolean>((resolve, reject) => {
      this.http.post<User>(url, form, httpOptions).subscribe(
        user => {
          this.userService.saveUserInStorage(user);
          resolve(true);
        },
        err => {
          reject(err.status);
        }
      );
    });
  }
}
