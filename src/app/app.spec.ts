import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';

describe('App', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne(
      'https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast',
    ).flush([]);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the weather component', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne(
      'https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast',
    ).flush([]);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-weather')).toBeTruthy();
  });
});
