import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User, AuthStatus, SignInResponse } from '../interfaces';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.API_URL;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  currentUser = computed(this._currentUser);
  authStatus = computed(this._authStatus);

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/sign-in`;
    const body = { email, password };
    return this.http.post<SignInResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('auth-token', token);
        console.log({ user, token });
      }),
      map(() => true),
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }
}
