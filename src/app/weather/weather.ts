import { Component, OnInit, signal } from '@angular/core';
import { WeatherForecast, WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {
  protected readonly forecasts = signal<WeatherForecast[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadForecast();
  }

  protected refresh(): void {
    this.loadForecast();
  }

  private loadForecast(): void {
    this.loading.set(true);
    this.error.set(null);
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
