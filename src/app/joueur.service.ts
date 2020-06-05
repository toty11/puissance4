import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Joueur } from './joueur';
 
@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  private urlApi = "https://trankillprojets.fr/P4/?";
  
  constructor(private http: HttpClient,private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getStatut(){
    /*
    this.http.get(this.urlApi+"statut&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d")
    .subscribe((res: Response) => {
      console.log(res.pseudo)
    });*/
    return this.http.get(this.urlApi+"statut&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d")
    .pipe(
      catchError(this.handleError<any>('getStatut'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
