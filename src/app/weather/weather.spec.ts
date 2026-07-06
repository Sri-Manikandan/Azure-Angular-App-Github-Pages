import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { Weather } from './weather';

const API_URL =
  'https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast';

describe('Weather', () => {
  let component: Weather;
  let fixture: ComponentFixture<Weather>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Weather],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Weather);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    httpMock.expectOne(API_URL).flush([]);
    expect(component).toBeTruthy();
  });

  it('should show loading then render forecast rows', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status')?.textContent).toContain('Loading');

    httpMock
      .expectOne(API_URL)
      .flush([
        { date: '2026-07-07', temperatureC: 20, temperatureF: 68, summary: 'Mild' },
        { date: '2026-07-08', temperatureC: 35, temperatureF: 95, summary: 'Hot' },
      ]);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('tbody tr').length).toBe(2);
    expect(compiled.querySelector('.count')?.textContent).toContain('Total Forecast Records: 2');
  });

  it('should highlight rows above 30 degrees celsius', () => {
    fixture.detectChanges();
    httpMock
      .expectOne(API_URL)
      .flush([{ date: '2026-07-07', temperatureC: 35, temperatureF: 95, summary: 'Hot' }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tbody tr')?.classList.contains('hot')).toBe(true);
  });

  it('should show an error message when the API call fails', () => {
    fixture.detectChanges();
    httpMock.expectOne(API_URL).flush('error', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status.error')?.textContent).toContain('Unable to load');
  });

  it('should reload data when refresh is clicked', () => {
    fixture.detectChanges();
    httpMock.expectOne(API_URL).flush([]);
    fixture.detectChanges();

    (fixture.nativeElement as HTMLElement).querySelector('button')?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    httpMock
      .expectOne(API_URL)
      .flush([{ date: '2026-07-09', temperatureC: 10, temperatureF: 50, summary: 'Cool' }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(1);
  });
});
