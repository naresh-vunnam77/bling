import { User } from './../../shared/User.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private user: object = {}
  isLoading: boolean = false
  userToken: string = ""
  constructor(private authService: AuthenticationService, private router: Router) {

  }

  readonly signupForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(6)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  ngOnInit(): void {

  }

  onRegister() {
    const { firstName, lastName, email, password } = this.signupForm.value as { firstName: string, lastName: string, email: string, password: string }

    const userData: User = {
      fullName: firstName + ' ' + lastName,
      email,
      password
    }
    this.isLoading = true
    this.authService.signUp(userData).subscribe((data) => {
      this.user = data
      this.authService.storeToken(data.token)
    })


  }

}
