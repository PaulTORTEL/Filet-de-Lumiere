import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { environment } from "../../../environments/environment";
import { httpOptions } from "../httpOptions";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(form: any): Promise<boolean | number> {
    const url = environment.baseUrl + environment.API_ENDPOINTS.LOGIN;

    return new Promise<boolean>((resolve, reject) => {
      this.http.post<User>(url, form, httpOptions).subscribe(
        user => {
          console.log(user);
          resolve(true);
        },
        err => {
          reject(err.status);
        }
      );
    });
  }
}
