import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LigneComponent } from './components/ligne-component/ligne-component';

@Component({
  imports: [RouterOutlet, LigneComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Admin_FrontEnd');
}
