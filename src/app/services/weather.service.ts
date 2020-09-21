import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {LocationCoordinates, Units} from '../helpers/LocationCoordinates';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecast(location: LocationCoordinates, units: Units): Observable<any> {
    const url = ConfigService.getWeatherApiUrl() +
      `onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,minutely&units=${units}&appid=${ConfigService.getApiId()}`;
    return this.http.get(url);
  }

}


