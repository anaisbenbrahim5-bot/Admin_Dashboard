import { Service, signal } from '@angular/core';
import { Ligne } from '../models/ligne';

@Service()
export class LigneService {
    private _lignes = signal<Ligne[]>([
    { id: 1, depart: 'Tunis', destination: 'Sousse' },
    { id: 2, depart: 'Tunis', destination: 'Sfax' },
  ]);
  lignes = this._lignes.asReadonly();

  exists(depart: string, destination: string): boolean {
    return this._lignes().some(
      l => l.depart.toLowerCase() === depart.toLowerCase() &&
           l.destination.toLowerCase() === destination.toLowerCase()
    );
  }

  add(depart: string, destination: string) {
    const id = Date.now();
    this._lignes.update(list => [...list, { id, depart, destination }]);
  }

}
