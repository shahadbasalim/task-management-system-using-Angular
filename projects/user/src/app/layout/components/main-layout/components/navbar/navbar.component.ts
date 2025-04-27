import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, TranslateModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isExpanded = false;
  lang: string;
  userData: any;
  constructor(private translate: TranslateService, private router: Router) {
    this.lang = translate.currentLang;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  changeLanguage() {
    if (this.lang == 'en') {
      localStorage.setItem('lang', 'ar');
    } else {
      localStorage.setItem('lang', 'en');
    }
    window.location.reload();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
