import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { Ligne } from '../../../models/ligne';
import { Station } from '../../../models/station';
import { LigneRequest } from '../../../models/ligne-request';
import { LigneService } from '../../../services/ligne-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-ligne-component',
  styleUrl: './ligne-component.css',
  templateUrl: './ligne-component.html',
})
export class LigneComponent implements OnInit {
  lignes: Ligne[] = [];
  stations: Station[] = [];

  recherche = '';
  afficherFormulaire = false;
  chargement = false;
  enregistrement = false;

  messageSucces = '';
  messageErreur = '';

  nouvelleLigne: LigneRequest = this.formulaireVide();

  constructor(
    private ligneService: LigneService,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerLignes();
    this.chargerStations();
  }

  formulaireVide(): LigneRequest {
    return {
      stationDepartId: 0,
      stationArriveeId: 0,
      villeDestination: '',
      delegationDestination: '',
      prix: 0,
      minimumLouagistes: 1
    };
  }

 
chargerLignes(): void {
  console.log('1. chargerLignes() called');

  this.chargement = true;

  this.ligneService.getLignes().subscribe({
    next: (data) => {
    

      this.lignes = data;
      this.chargement = false;
      this.cdf.detectChanges();
    },
    error: (error) => {
      console.error('API error:', error);
      this.chargement = false;
      this.cdf.detectChanges();
      this.messageErreur = 'Impossible de charger les lignes.';
    },
    
  });
}
  chargerStations(): void {
    this.ligneService.getStations().subscribe({
      next: (stations) => {
        this.stations = stations;
      },
      error: (erreur) => {
        console.error('Erreur de chargement des stations', erreur);
        this.messageErreur =
          'Impossible de charger les stations.';
      }
    });
  }

  get lignesFiltrees(): Ligne[] {
    const terme = this.recherche.trim().toLowerCase();

    if (!terme) {
      return this.lignes;
    }

    return this.lignes.filter((ligne) => {
      const depart = ligne.stationDepart?.nom ?? '';
      const arrivee = ligne.stationArrivee?.nom ?? '';
      const ville = ligne.villeDestination ?? '';
      const delegation = ligne.delegationDestination ?? '';

      return [
        depart,
        arrivee,
        ville,
        delegation,
        String(ligne.prix),
        String(ligne.minimumLouagistes)
      ].some((valeur) =>
        valeur.toLowerCase().includes(terme)
      );
    });
  }

  get nombreLignes(): number {
    return this.lignes.length;
  }

  get prixMoyen(): number {
    if (this.lignes.length === 0) {
      return 0;
    }

    const total = this.lignes.reduce(
      (somme, ligne) => somme + Number(ligne.prix || 0),
      0
    );

    return total / this.lignes.length;
  }

  // besoin de  planning/passenger data.
  
  get lignesSousMinimum(): number {
    return 0;
  }

  ouvrirFormulaire(): void {
    this.nouvelleLigne = this.formulaireVide();
    this.messageErreur = '';
    this.messageSucces = '';
    this.afficherFormulaire = true;
  }

  fermerFormulaire(): void {
    if (this.enregistrement) {
      return;
    }

    this.afficherFormulaire = false;
    this.messageErreur = '';
  }

  get stationDepartSelectionnee(): Station | undefined {
    return this.stations.find(
      station => station.id === Number(this.nouvelleLigne.stationDepartId)
    );
  }

  get stationArriveeSelectionnee(): Station | undefined {
    return this.stations.find(
      station => station.id === Number(this.nouvelleLigne.stationArriveeId)
    );
  }

  selectionnerDestination(): void {
    const station = this.stationArriveeSelectionnee;

    if (station) {
      this.nouvelleLigne.villeDestination = station.ville;
      this.nouvelleLigne.delegationDestination = station.delegation;
    }
  }

ajouterLigne(): void {
  this.messageErreur = '';
  this.messageSucces = '';

  this.enregistrement = true;

  this.ligneService.ajouterLigne(this.nouvelleLigne).subscribe({
    next: (ligneAjoutee) => {
      this.lignes = [...this.lignes, ligneAjoutee];
      this.nouvelleLigne = this.formulaireVide();


      this.enregistrement = false;

      this.messageSucces = 'Ligne ajoutée avec succès.';

      this.afficherFormulaire = false;
      this.cdf.detectChanges();
    },

    error: (error) => {
      console.error('Erreur lors de l’ajout de la ligne :', error);

      this.enregistrement = false;
      this.messageErreur =
        error?.error?.message ?? 'Impossible d’ajouter la ligne.';
      this.cdf.detectChanges();
    },

    complete: () => {
      console.log('Requête d’ajout terminée.');
    }
  });
}
}
