import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isLoading: boolean = false
  constructor(private authService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {

  }


  readonly signinForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  onLogin() {
    const { email, password } = this.signinForm.value as { email: string, password: string }
    this.isLoading = true
    this.authService.signIn(email, password).subscribe((data) => {
      localStorage.setItem('token', data.token,)
      localStorage.setItem('role', data.role,)
      if (data.token) {
        this.isLoading = false
        if (data.role == "admin") {
          this.router.navigate(['/admin/products'])
        } else {
          this.router.navigate(['/'])
        }

      }
    })
  }

}
