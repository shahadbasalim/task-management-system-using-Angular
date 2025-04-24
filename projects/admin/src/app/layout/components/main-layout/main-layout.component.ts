import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet],
  template: `<app-navbar></app-navbar>
    <router-outlet></router-outlet> `,
})
export class MainLayoutComponent {}
