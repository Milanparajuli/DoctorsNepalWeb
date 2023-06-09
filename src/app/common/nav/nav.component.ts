import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutResponseModel} from 'src/app/model/logout-response-model.model';
import {AuthService} from 'src/app/service/auth.service';
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {HomeComponent} from "../../userInfo/home/home.component";
import {DoctorService} from "../../service/doctor.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  searchGroup: FormGroup = new FormGroup({});
  isLoggedIn: any = null;
  logoutRequest: LogoutResponseModel = new LogoutResponseModel();
  doctorName: any;

  menus = [
    {
      name: 'Home',
      link: '/user-detail',
    },
    {
      name: 'Find Doctors',
      link: 'doctor-list'
    }
    // {
    // name: 'Logout',
    // link:'/login'
    // }
    // {
    //   name:'Login',
    //   link:'/login'
    // },
  ];

  constructor(private authService: AuthService,
              private router: Router,
              private toastService: ToastrService,
              private form: FormBuilder,
              private doctorService: DoctorService,
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('userId');
    console.log('isLoggedIn', this.isLoggedIn);
    this.searchGroup = this.form.group({
      search: undefined,
    });
    this.doctorService.getAfterLogin().subscribe({
      next: (res: any) => {
        if (res) {
          this.isLoggedIn = localStorage.getItem('userId');
          this.doctorService.setAfterLogin(null);
        }
      }
    })
  }

  get forms(): { [key: string]: AbstractControl } {
    return this.searchGroup.controls;
  }

  search(obj: any) {
    this.router.navigate(["/doctor-list"], {
      queryParams: {
        name: obj?.search
      }
    });
    this.doctorService.setDoctorSearch(true);
  }

  logout() {
    console.log('Logout method called');
    const logoutEndpoint = '/users/logout';
    this.logoutRequest.username = localStorage.getItem('username') as string;
    console.log('get email from localstorage ', this.logoutRequest.username);
    this.authService.logout(this.logoutRequest).subscribe(
      (response: any) => {
        this.toastService.success('Successfully logged out', 'success')
        this.router.navigate(['/auth/login']);
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.ngOnInit();
      },
      (error: any) => {
        this.toastService.error('Error while logout', 'error')
        console.error(error);
      }
    );
  }

  login() {
    this.router.navigate(['auth/login']);
  }

  register() {
    this.router.navigate(['auth/register']);
  }

}
