import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map,  throwError } from "rxjs";
import { Coordinates } from './coordinates';
import { ServerRespose } from './server-response';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  startGame(id: string) {
    return this.http.get('http://localhost:8080/start-game?id='+id, 
                          {responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }


  constructor (private http: HttpClient) {}

  getId(name: string): Observable<string> {
    return this.http.get('http://localhost:8080/new-player?name='+name, 
                          {responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  addShip(coordinates: Coordinates): Observable<ServerRespose> {
    return this.http.post<ServerRespose>('http://localhost:8080/addShip', coordinates).pipe(
      catchError(this.handleError)
    );
  }

  deleteShip(coordinates: Coordinates): Observable<ServerRespose> {
    return this.http.post<ServerRespose>('http://localhost:8080/deleteShip', coordinates).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returened code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
  }
}