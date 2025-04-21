import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user';
  lang: string;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.lang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);

    if (this.lang == 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }
}
