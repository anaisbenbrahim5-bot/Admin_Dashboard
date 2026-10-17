import { Routes } from '@angular/router';
import { LigneComponent } from './components/ligne-component/ligne-component';

export const routes: Routes = [
    { path: 'admin/ligne', component: LigneComponent },
    { path: '', redirectTo: 'admin/ligne', pathMatch: 'full' }
];
