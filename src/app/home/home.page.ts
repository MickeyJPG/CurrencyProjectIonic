import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe, NgIf, NgFor } from '@angular/common';
import { IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    FormsModule,
    CommonModule,
    NgIf,
    NgFor,
    DecimalPipe,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'BRL';
  result: number | null = null;
  currencies: string[] = ['USD', 'BRL', 'EUR', 'GBP', 'JPY'];

  constructor(private http: HttpClient) {}

  convertCurrency() {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`;

    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        const rate = data.rates[this.toCurrency];
        this.result = this.amount * rate;
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }
}
