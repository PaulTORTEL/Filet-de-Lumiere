import { HttpHeaders } from "@angular/common/http";

export const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true
};

export const OK = 200;
export const UNAUTHORIZED = 401;
export const NOTFOUND = 404;
export const INTERNALERROR = 500;
