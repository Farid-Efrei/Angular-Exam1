import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    console.log('CategoryService créé !');
  }

  getCategories(): Observable<Category[]> {
    console.log('GET', `${this.apiUrl}/categories`);
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: number): Observable<Category> {
    console.log('GET', `${this.apiUrl}/categories/${id}`);
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }
}
