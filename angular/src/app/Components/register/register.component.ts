import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerForm: any;
  submitted = false;

  constructor(private apiService: ApiService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      usertype: 'customer'
    },
    {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm.controls)
      return
    }
    console.log(this.registerForm.value)

    this.apiService.register(this.registerForm.value).
      subscribe(res => {
        if (res) {
          this.router.navigate(['/login']);
        } else {
          console.log("Please try again");
        }
      },
      err => {
        console.log(err);
        alert("An error has occured, Please try again !!!");
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}

