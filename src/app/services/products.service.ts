import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from '../shared/Product.model'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:9000/products'

  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'content-type': 'application/json' })
    return this.http.post(this.apiUrl, product, { headers })
  }
  getProducts(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl)
  }
  getProduct(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`)
  }
  updateProduct(id: string, product: Product): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'content-type': 'application/json' })
    return this.http.put(`${this.apiUrl}/${id}`, product, { headers })
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

}
