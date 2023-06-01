import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

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

  constructor(
    private form: FormBuilder,
    private userService: UserService,
    private router: Router,
    // private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    // this.loginFormByAuth();
    this.listUserById(this.id);
    this.loginForms = this.form.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }

  get forms(): { [key: string]: AbstractControl } {
    return this.loginForms.controls;
  }

  listUserById(id: any) {
    this.userService.getUserById(id).subscribe(
      (response: any) => {
        // this.userId = response;
        console.log('resp: ', response);
        this.id = localStorage.getItem(response.id);
      },
      (error: any) => {
        console.error('Error: ', error);
      }
    );
  }

  loginUser(login: any) {
    // this.router.navigate(['auth/register'])
    this.submitted = true;
    console.log(login);
    if (this.loginForms.valid) {
      this.userService.login(login).subscribe(
        (response: any) => {
          this.isSubmitting = false;
          // this.toastrService.success('Logged in Succesfully!!!', 'Success');
          console.log('Login Sucessfully');
          this.router.navigate(['/user-detail']);
          localStorage.setItem('userId', response.userId);
        },
        (error: any) => {
          this.isSubmitting = false;
          this.inValidMsg = 'Either Password or username is not valid';
          // this.toastrService.error('Either Password or username is not valid!!!', 'Invalid');
          // window.location.reload();
        }
      );
    } else {
      console.log('Error');
    }
    localStorage.setItem(this.key, login.userId);
    localStorage.setItem(this.key, login.username);
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
