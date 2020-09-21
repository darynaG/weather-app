export class LocationCoordinates {
  name: string;
  lat: number;
  lon: number;
}

export class DailyForecast {
  date: string;
  temperature: number;
}

export enum Units {
  Celsius = 'metric',
  Fahrenheit = 'imperial'
}
