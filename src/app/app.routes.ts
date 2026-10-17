import { Routes } from '@angular/router';
import { LigneComponent } from './components/pages/ligne-component/ligne-component';
import { SidebarLayout } from './components/layouts/sidebar-layout/sidebar-layout';
import { LouagisteComponent } from './components/pages/louagiste-component/louagiste-component';
import { PlanningComponent } from './components/pages/planning-component/planning-component';

export const routes: Routes = [
      {
    path: '',
    component: SidebarLayout,
    children: [
      { path: '', redirectTo: 'lignes', pathMatch: 'full' },
      { path: 'lignes', component: LigneComponent },
      { path: 'louagistes', component: LouagisteComponent },
      { path: 'plannings', component: PlanningComponent }
    ]
  },
  { path: '**', redirectTo: 'lignes' }
];
