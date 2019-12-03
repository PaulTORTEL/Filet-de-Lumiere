import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor() {}

  public saveUserInStorage(user: User): void {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }

  public getUserFromStorage(): User {
    return JSON.parse(window.sessionStorage.getItem("user")) as User;
  }
}
