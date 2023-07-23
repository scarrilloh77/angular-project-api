import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `https://young-sands-07814.herokuapp.com/api/auth`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap((res) => this.tokenService.saveToken(res.access_token)));
  }

  // profile(token: string) {
  //   const headers = new HttpHeaders();
  //   headers.set('Authorization', `Bearer ${token}`);
  //   return this.http.get<User>(`${this.apiUrl}/profile`, {
  //     headers,
  //   });
  // }

  // profile(token: string) {
  //   return this.http.get<User>(`${this.apiUrl}/profile`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       // 'Content-type': `application/json`,
  //     },
  //   });
  // }

  profile() {
    return this.http.get<User>(`${this.apiUrl}/profile`); // Interceptor will apply header token.
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap((res) => this.profile()));
  }
}
