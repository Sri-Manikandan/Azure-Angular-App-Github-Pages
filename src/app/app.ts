import { Component, OnInit, signal } from '@angular/core';
import { WeatherForecast, WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Weather Forecast');
  protected readonly forecasts = signal<WeatherForecast[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getForecast().subscribe({
      next: (data) => {
        this.forecasts.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load the weather forecast. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}
