import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from 'src/app/service/user.service';
import {DoctorService} from "../../service/doctor.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAuthenticate: boolean = false;
  loginForms: FormGroup = new FormGroup({});
  fieldTextType: boolean | undefined;

  submitted: boolean = false;
  isSubmitting: boolean | undefined;
  key: any;
  userId: any;
  username: any;
  inValidMsg: string = '';
  id: any;
  name: any;
  doctorList: any;

  constructor(
    private form: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
    private doctorService: DoctorService
  ) {
  }

  ngOnInit(): void {
    // this.loginFormByAuth();
    // this.listUserById(this.id);
    this.loginForms = this.form.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }

  get forms(): { [key: string]: AbstractControl } {
    return this.loginForms.controls;
  }

  // listUserById(id: any) {
  //   this.userService.getUserById(id).subscribe(
  //     (response: any) => {
  //       // this.userId = response;
  //       this.id = localStorage.getItem(response.id);
  //     },
  //     (error: any) => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

  loginUser(login: any) {
    // this.router.navigate(['auth/register'])
    this.submitted = true;
    if (this.loginForms.valid) {
      this.userService.login(login).subscribe(
        (response: any) => {
          this.isSubmitting = false;
          this.toastrService.success('Logged in Succesfully!!!', 'Success');
          this.router.navigate(['/user-detail']);
          localStorage.setItem('userId', response.userId);
          this.doctorService.setAfterLogin(true);
        },
        (error: any) => {
          this.isSubmitting = false;
          this.inValidMsg = 'Either Password or username is not valid';
          this.toastrService.error('Either Password or username is not valid!!!', 'Invalid');
        }
      );
    } else {
      console.log('Error');
    }
    localStorage.setItem(this.key, login.userId);
    localStorage.setItem(this.key, login.username);
    localStorage.setItem(this.key, login.fullName);
    this.name = localStorage.getItem(this.key);
    this.userId = localStorage.getItem(this.key);
    this.username = localStorage.getItem(this.key);
  }

  forgotPassword() {
    // this.router.navigate(['auth/forgot-password']);
  }

  signUp() {
    this.router.navigate(['auth/register']);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
