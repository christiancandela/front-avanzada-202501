import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:8080/users";
  constructor(private http: HttpClient) {}
}
