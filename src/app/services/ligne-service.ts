import { inject, Service, signal } from '@angular/core';
import { Ligne } from '../models/ligne';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../models/station';
import { LigneRequest } from '../models/ligne-request';

@Service()
export class LigneService {
   private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api';

  getLignes(): Observable<Ligne[]> {
    return this.http.get<Ligne[]>(`${this.apiUrl}/lignes`);
  }

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.apiUrl}/stations`);
  }

  ajouterLigne(request: LigneRequest): Observable<Ligne> {
    return this.http.post<Ligne>(
      `${this.apiUrl}/lignes`,
      request
    );
  }
}
