import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station';
import { Localisation } from '../models/localisation';

@Service()
export class StationService {
     private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api';

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(
      `${this.apiUrl}/stations`
    );
  }

  getLocalisations(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(
      `${this.apiUrl}/localisations`
    );
  }

  ajouterStation(station: {
    nom: string;
    ville: string;
    delegation: string;
  }): Observable<Station> {
    return this.http.post<Station>(
      `${this.apiUrl}/stations`,
      station
    );
  }
}
