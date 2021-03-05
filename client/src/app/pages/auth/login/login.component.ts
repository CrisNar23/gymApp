import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private isValidId = /^\d+$/;

  private subscription: Subscription = new Subscription();

  loginForm = this.fb.group({
    user_id: ['', [Validators.required, Validators.pattern(this.isValidId)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private authSrv: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authSrv.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  getErrorMessage(field: string): string {
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = 'You must enter a value';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'Only numbers are allowed ';
    } else if (this.loginForm.get(field).hasError('minlength')) {
      const minLength = this.loginForm.get(field).errors?.minlength
        .requiredLength;
      message = `This field must be longer than ${minLength} characters`;
    }

    return message;
  }

  isValidField(field: string): boolean {
    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) &&
      !this.loginForm.get(field).valid
    );
  }
}
