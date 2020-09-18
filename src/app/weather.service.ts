import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getLastDaysTemperature(daysNumber?, location?): Observable<any> {
    const url = ConfigService.getWeatherApiUrl() +
      `?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=metric&appid=${ConfigService.getApiId()}`;
    return this.http.get(url);
  }

}
