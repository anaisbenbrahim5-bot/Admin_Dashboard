import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-sidebar-layout',
  styleUrl: './sidebar-layout.css',
  templateUrl: './sidebar-layout.html',
})
export class SidebarLayout {}
