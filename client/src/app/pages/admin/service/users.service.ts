import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.API_URL}/get-users`)
      .pipe(catchError(this.handleError));
  }

  getUsersByHeadquarter(
    city_id: number,
    headquarter_name: string
  ): Observable<User> {
    return this.http
      .get<User>(`${environment.API_URL}/${city_id}/${headquarter_name}`)
      .pipe(catchError(this.handleError));
  }

  newUser(user: User): Observable<User> {
    return this.http
      .post<User>(environment.API_URL, user)
      .pipe(catchError(this.handleError));
  }

  handleError(err: any): Observable<never> {
    let errorMessage = 'Unknown error';
    if (err) {
      errorMessage = `Error: ${err.error.error} ---> ${err.message}`;
    }
    window.alert(errorMessage);    
    return throwError(errorMessage);
  }
}
