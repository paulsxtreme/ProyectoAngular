

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root', 
})
export class Api {
private apiUrl = 'http://localhost:3000/products';
constructor(private http: HttpClient) {}
getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
}
getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
}
create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);   
}
update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
    // Envía los nuevos datos del producto al servidor mediante PUT a la URL con el ID del producto
}
  // Método para eliminar un producto por su ID (DELETE /products/:id)
delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}