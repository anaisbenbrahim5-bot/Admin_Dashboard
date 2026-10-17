import { Service,  } from '@angular/core';
import { Ligne } from '../models/ligne';

@Service()
export class LigneService {
      private lignes: Ligne[] = [
    {
      id: 1,
      depart: 'Tunis',
      destination: 'Sousse',
      minimum: 6,
      planifies: 8
    },
    {
      id: 2,
      depart: 'Tunis',
      destination: 'Sfax',
      minimum: 4,
      planifies: 5
    },
    {
      id: 3,
      depart: 'Tunis',
      destination: 'Nabeul',
      minimum: 4,
      planifies: 6
    },
    {
      id: 4,
      depart: 'Tunis',
      destination: 'Bizerte',
      minimum: 5,
      planifies: 3
    },
    {
      id: 5,
      depart: 'Sousse',
      destination: 'Sfax',
      minimum: 4,
      planifies: 2
    }
  ];
  getLignes(): Ligne[] {
    return [...this.lignes];
  }

  rechercherLignes(recherche: string): Ligne[] {
    const terme = recherche.trim().toLowerCase();

    return this.lignes.filter(ligne =>
      ligne.depart.toLowerCase().includes(terme) ||
      ligne.destination.toLowerCase().includes(terme)
    );
  }
  ajouterLigne(
    nouvelleLigne: Omit<Ligne, 'id' | 'planifies'>
  ): Ligne {
    const ligne: Ligne = {
      id: Math.max(0, ...this.lignes.map(l => l.id)) + 1,
      depart: nouvelleLigne.depart.trim(),
      destination: nouvelleLigne.destination.trim(),
      minimum: nouvelleLigne.minimum,
      planifies: 0
    };

    this.lignes.push(ligne);

    return { ...ligne };
  }

}
