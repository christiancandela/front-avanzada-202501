import { Injectable } from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginRequest} from '../dto/login-request';
import {TokenResponse} from '../dto/token-response';
import {ErrorResponse} from '../dto/error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080/login";
  constructor(private http: HttpClient) {}

  /**
   * Envía las credenciales al backend y almacena el token.
   * @param username Nombre de usuario o correo
   * @param password Contraseña
   * @returns Observable con la respuesta del servidor
   */
  login(username: string, password: string): Observable<TokenResponse> {
    const request: LoginRequest = { username, password };
    return this.http.post<TokenResponse>(this.url, request).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('tokenType', response.type);
        localStorage.setItem('expireAt', response.expireAt);
        localStorage.setItem('roles', JSON.stringify(response.roles));
      }),
      catchError(error => {
        let errorMsg = 'Error al iniciar sesión';
        if (error.status === 400 || error.status === 401) {
          const errorResponse: ErrorResponse = error.error;
          errorMsg = errorResponse.message || 'Credenciales inválidas';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  /**
   * Verifica si el usuario está autenticado y el token no ha expirado
   */
  isAuthenticated(): boolean {
    const expireAt = localStorage.getItem('expireAt');
    if (!expireAt) {
      return false;
    }
    const expireDate = new Date(expireAt);
    return !!localStorage.getItem('authToken') && expireDate > new Date();
  }

  /**
   * Cierra la sesión
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expireAt');
    localStorage.removeItem('roles');
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRol() {
    return ''+localStorage.getItem('roles');
  }
}
