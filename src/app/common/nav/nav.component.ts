import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutResponseModel } from 'src/app/model/logout-response-model.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  logoutRequest: LogoutResponseModel = new LogoutResponseModel();

  menus = [
    {
      name: 'Home',
      link: '/home',
    },
    // {
    // name: 'Logout',
    // link:'/login'
    // }
    // {
    //   name:'Login',
    //   link:'/login'
    // },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    console.log('Logout method called');
    const logoutEndpoint = '/users/logout';
    this.logoutRequest.username = localStorage.getItem('username') as string;
    console.log('get email from localstorage ', this.logoutRequest.username);
    this.authService.logout(this.logoutRequest).subscribe(
      (response: any) => {
        console.log('logout success');
        this.router.navigate(['/auth/login']);
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
      },
      (error: any) => {
        console.log('Error on sending the data');
        console.error(error);
      }
    );
  }

}
