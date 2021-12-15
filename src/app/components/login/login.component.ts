import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginCreds = this.loginForm.value;
      this.authService.login(loginCreds).subscribe({
        next: (resp) => {
          if (resp.success) {
            this.authService.setAccessToken(resp.data.token);
            this.toastrService.success(resp.message, "Success");
          } else {
            this.toastrService.error(resp.message, "Error");
          }
        },
        error: (errorResp) => {
          if (errorResp.error.validationFailures) {
            for (const failure of errorResp.error.validationFailures) {
              this.toastrService.error(failure.errorMessage, "Form Error");
            }
          } else {
            this.toastrService.error(errorResp.error.message, "Error");
          }
        },
      });
    } else {
      this.toastrService.error("Please fix the errors in the form.", "Form Error");
    }
  }
}
