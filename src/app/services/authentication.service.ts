import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'

import { User } from '../shared/User.model'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private apiUrl = "http://localhost:9000/api/v1/auth"

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)


  constructor(private http: HttpClient) {

    const token = localStorage.getItem('token')
    this.tokenSubject.next(token)
  }

  get token(): string | null {
    return this.tokenSubject.value
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
    this.tokenSubject.next(null)
  }

  // store token

  storeToken(token: string) {
    localStorage.setItem('token', token)
    this.tokenSubject.next(token)
  }

}


