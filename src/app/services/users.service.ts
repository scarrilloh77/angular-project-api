import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `https://young-sands-07814.herokuapp.com/api/users`;
  constructor(private http: HttpClient) {}

  create(data: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, data);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
