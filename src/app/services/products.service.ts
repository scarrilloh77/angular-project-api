import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from './../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = !environment.production
    ? `${environment.API_URL}/api/products`
    : `${environment.API_URL}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, sort?: string) {
    let params = new HttpParams();
    if (limit) {
      params = params.set('limit', limit);
    }
    if (sort) {
      params = params.set('sort', sort);
    }
    console.log('params', params);

    return this.http.get<Product[]>(this.apiUrl, { params }).pipe(retry(3));
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError('Algo esta fallando en el servidor');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        return throwError('Ups algo salió mal');
      })
    );
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
