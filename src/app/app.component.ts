import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
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
    this.authService.profile().subscribe((res) => {
      console.log('resLogin', res);
    });
  }

  downloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe((res) => {
        this.imgRta = res.location;
      });
    }
  }
}
