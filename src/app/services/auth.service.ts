import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5203/api/auth'; // Adjust this to match your backend's auth endpoint

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { headers });
  }

  register(name: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.apiUrl}/register`,
      { name, email, password },
      { headers }
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token); // Save token to localStorage
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if a token exists
  }

  logout() {
    localStorage.removeItem('token'); // Remove the token
  }
}
