import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://powerful-coast-48240.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) { }

  // API CALLS:

  // REGISTER new user
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  // LOGIN registered users
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET all movies
  getAllMovies(): Observable<any> {
    // Get authorization token from local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // GET single movie
  getSingleMovie(title: any): Observable<any> {
    // Get authorization from local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/$(title)`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // GET movie Director
  getDirector(name: any): Observable<any> {
    // Get authorization token from local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/directors/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // GET movie Genre
  getGenre(name: any): Observable<any> {
    // Get authorization token from local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/genres/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // GET User info
  getUser(): Observable<any> {
    // Get authorization token from local storage
    const token = localStorage.getItem('token');
    // Get username from local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // GET user's Favorite Movies
  getFavoriteMovies(): Observable<any> {
    // Get authorization token from local storage
    const token = localStorage.getItem('token');
    // Get username from local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // PUT - Add movie to favorites
  addFavoriteMovie(movieID: string): Observable<any> {
    // Get authorization token from local storage
    const token = localStorage.getItem('token');
    // Get username from local storage
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // DELETE - Remove movie from favorites
  removeFavoriteMovie(movieID: any): Observable<any> {
    // Get authorization token from local storage
    const token = localStorage.getItem('token');
    // Get username from local storage
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // PUT - Update user profile
  updateUser(updateDetails: any): Observable<any> {
   // Get authorization token from local storage
   const token = localStorage.getItem('token');
   // Get username from local storage
   const username = localStorage.getItem('user');
   return this.http
     .put(apiUrl + `users/${username}`, updateDetails, {
       headers: new HttpHeaders({
         Authorization: 'Bearer ' + token,
       })
     })
     .pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
  }

  // DELETE - Delete user profile
  removeUser(): Observable<any> {
    // Get authorization token from local storage
   const token = localStorage.getItem('token');
   // Get username from local storage
   const username = localStorage.getItem('user');
   return this.http
     .delete(apiUrl + `users/${username}`, {
       headers: new HttpHeaders({
         Authorization: 'Bearer ' + token,
       })
     })
     .pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error Body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

}










