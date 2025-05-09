import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, TranslateModule,  MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isExpanded = false;
  userName = 'أحمد';
  lang: string ;

  navLinks = [
    { icon: 'analytics', label: 'navbar.dashboard', route: '/dashboard' },
    { icon: 'assignment', label: 'navbar.all-tasks', route: '/list-tasks' },
    { icon: 'group', label: 'navbar.users', route: '/users' },
  ];


  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
  
  onNavLinkClick() {
    if (this.isExpanded == true) {
      this.isExpanded = false;
    }
  }


  constructor(private translate: TranslateService, private router: Router) {
    this.lang = translate.currentLang;
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
