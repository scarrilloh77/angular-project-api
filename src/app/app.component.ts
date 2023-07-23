import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'Sebastian Carrillo',
        email: 'scarrillo@gmail.com',
        password: '12345667',
      })
      .subscribe((res) => {
        console.log('resCreateUser', res);
      });
  }

  login() {
    this.authService
      .login('scarrillo@gmail.com', '12345667')
      .subscribe((res) => {
        console.log('resLogin', res);
        this.token = res.access_token;
      });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe((res) => {
      console.log('resLogin', res);
    });
  }
}
