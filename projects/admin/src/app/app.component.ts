import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, TranslateModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'admin';
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
