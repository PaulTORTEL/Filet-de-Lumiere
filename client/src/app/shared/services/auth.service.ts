import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { httpOptions } from "../../utils/http-utils";
import { User } from "../models/user";
import { UserService } from "./user.service";
import { Observable, Subject } from "rxjs";
import { UserRole } from "../../utils/role-utils";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private roleSource = new Subject<UserRole>();

  role$ = this.roleSource.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {}

  //TODO: implement interceptor for refresh token

  login(form: any): Promise<boolean> {
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

  setRole(role: UserRole): void {
    this.roleSource.next(role);
  }

  getRole(): Promise<boolean> {
    const url = environment.baseUrl + environment.API_ENDPOINTS.ROLE;

    return new Promise<boolean>((resolve, reject) => {
      this.http.get<UserRole>(url, httpOptions).subscribe(
        role => {
          this.setRole(role);
          resolve(true);
        },
        err => {
          reject(err.status);
        }
      );
    });
  }
}
