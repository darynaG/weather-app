import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public static getWeatherApiUrl() {
    return 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/';
  }

  public static getApiId() {
    return '67740c8444a6d64ef661edf43abb2b37';
  }

}
