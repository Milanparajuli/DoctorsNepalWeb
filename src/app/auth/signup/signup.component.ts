import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForms: FormGroup = new FormGroup({});
  submitted: boolean | undefined;
  isSubmitting: boolean | undefined;
  fieldTextType: boolean | undefined;

  constructor(
    private form: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForms = this.form.group({
      fullName: [undefined, Validators.required],
      username: [undefined, Validators.required],
      email: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }

  get forms(): { [key: string]: AbstractControl } {
    return this.signupForms.controls;
  }
  onSendData(signup: any) {
    this.router.navigate(['auth/login'])
    this.submitted = true;
    console.log(signup);
    if (this.signupForms.valid) {
      this.userService.addUser(signup).subscribe(
        (response: any) => {
          this.isSubmitting = false;
          this.router.navigate(['/auth/login']);
          console.log('user addded successfully');
        },
        (error: any) => {
          this.isSubmitting = false;
        }
      );
    } else {
      console.log('Error on adding the data');
    }
  }
  signIn() {
    this.router.navigate(['auth/login']);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
