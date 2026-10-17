import { Component, OnInit } from '@angular/core';
import {  FormsModule,  ReactiveFormsModule, Validators } from '@angular/forms';
import { LigneService } from '../../services/ligne-service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-ligne-component',
  styleUrl: './ligne-component.css',
  templateUrl: './ligne-component.html',
})
export class LigneComponent  implements OnInit {

  lignes: any[] = [];

  recherche = '';

  afficherFormulaire = false;

  nouvelleLigne = {
    depart: '',
    destination: '',
    minimum: 4
  };

  constructor(
    private ligneService: LigneService
  ) {}

  ngOnInit(): void {
    this.chargerLignes();
  }

  chargerLignes(): void {
    this.lignes = this.ligneService.getLignes();
  }

  get lignesActives(): number {
    return this.lignes.length;
  }

  get lignesSousMinimum(): number {
    return this.lignes.filter(
      ligne => ligne.planifies < ligne.minimum
    ).length;
  }

  get lignesFiltrees(): any[] {
    const terme = this.recherche.trim().toLowerCase();

    return this.lignes.filter(ligne =>
      ligne.depart.toLowerCase().includes(terme) ||
      ligne.destination.toLowerCase().includes(terme)
    );
  }

  ouvrirFormulaire(): void {
    this.afficherFormulaire = true;
  }

  fermerFormulaire(): void {
    this.afficherFormulaire = false;
  }

  ajouterLigne(): void {
    const depart = this.nouvelleLigne.depart.trim();
    const destination = this.nouvelleLigne.destination.trim();
    const minimum = Number(this.nouvelleLigne.minimum);


    if (
      !depart ||
      !destination ||
      depart.toLowerCase() === destination.toLowerCase() ||
      !Number.isInteger(minimum) ||
      minimum < 1
    ) {
      return;
    }

    this.ligneService.ajouterLigne({
      depart,
      destination,
      minimum
    });

    this.chargerLignes();

    this.fermerFormulaire();

    this.nouvelleLigne = {
      depart: '',
      destination: '',
      minimum: 4
    };
  }
}