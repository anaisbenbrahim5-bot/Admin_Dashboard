import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Station } from '../../../models/station';
import { Localisation } from '../../../models/localisation';
import { StationService } from '../../../services/station-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule,CommonModule],
  selector: 'app-station-component',
  styleUrl: './station-component.css',
  templateUrl: './station-component.html',
})
export class StationComponent implements OnInit {
  stations: Station[] = [];
  localisations: Localisation[] = [];

  nom = '';
  ville = '';
  delegation = '';

  chargement = false;
  enregistrement = false;
  messageSucces = '';
  messageErreur = '';

  constructor(
    private stationService: StationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerLocalisations();
    this.chargerStations();
  }

  get delegationsDisponibles(): string[] {
    return this.localisations.find(
      loc => loc.ville === this.ville
    )?.delegation ?? [];
  }

  chargerLocalisations(): void {
    this.stationService.getLocalisations().subscribe({
      next: data => {
        this.localisations = data;
      },
      error: error => {
        console.error('Erreur localisations:', error);
        this.messageErreur =
          'Impossible de charger les villes et délégations.';
      }
    });
  }

  chargerStations(): void {
    this.chargement = true;

    this.stationService.getStations().subscribe({
      next: data => {
        this.stations = data;
        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Erreur stations:', error);
        this.chargement = false;
        this.messageErreur =
          'Impossible de charger les stations.';
        this.cdr.detectChanges();
      }
    });
  }

  changerVille(): void {
    this.delegation = '';
  }

  ajouterStation(): void {
    this.messageErreur = '';
    this.messageSucces = '';

    const nom = this.nom.trim();

    if (!nom || !this.ville || !this.delegation) {
      this.messageErreur =
        'Veuillez remplir tous les champs.';
      return;
    }

    this.enregistrement = true;

    this.stationService.ajouterStation({
      nom,
      ville: this.ville,
      delegation: this.delegation
    }).subscribe({
      next: station => {
        this.stations = [...this.stations, station];

        this.nom = '';
        this.ville = '';
        this.delegation = '';

        this.enregistrement = false;
        this.messageSucces =
          'Station ajoutée avec succès.';

        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Erreur ajout station:', error);

        this.enregistrement = false;
        this.messageErreur =
          error?.error?.message ??
          'Impossible d’ajouter la station.';

        this.cdr.detectChanges();
      }
    });
  }
}
