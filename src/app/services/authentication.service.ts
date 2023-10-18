import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from '../shared/User.model'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private apiUrl = "http://localhost:9000/api/v1/auth"

  constructor(private http: HttpClient) {

    this.http.get(`${this.apiUrl}/test`).subscribe(data => {
      console.log(data)
    })

  }

  signUp(userData: User): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'content-type': 'application/json' })
    return this.http.post(`${this.apiUrl}/register`, userData, { headers })

  }

  signIn(email: string, password: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'content-type': 'application/json' })
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { headers })
  }

  // Sign out
  signOut() {

  }

  getCurrentUser() {

  }

  // Get the current user's ID
  getCurrentUserId() {

  }
}


