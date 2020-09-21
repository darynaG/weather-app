import {Component, OnInit} from '@angular/core';
import * as go from 'gojs';
import {WeatherService} from './services/weather.service';
import {LocationCoordinates} from './helpers/LocationCoordinates';
import {DailyForecast} from './helpers/DailyForecast';
import {Units} from './helpers/Units';


const $ = go.GraphObject.make;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';

  public temperatures;
  public forecast: Array<DailyForecast>;

  public model: go.GraphLinksModel = $(go.GraphLinksModel,
    {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: []
    });

  selectedTempUnit: Units;
  eUnits = Units;

  cityCoordinates: LocationCoordinates = {
    name: 'Lviv',
    lat: 49.84,
    lon: 24.02
  };

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.selectedTempUnit = Units.Celsius;
    this.getTemperaturesForChart(this.cityCoordinates, this.selectedTempUnit);
  }

  getTemperaturesForChart(location: LocationCoordinates, units: Units) {
    this.temperatures = [];
    this.forecast = [];

    this.weatherService.getForecast(location, units).subscribe(value => {
      value.daily.map(val => {
        this.temperatures.push(val.temp.eve);
      });

      value.daily.map(val => this.forecast.push(
        {
          date: val.dt,
          temperature: val.temp.eve
        }));

      this.model.nodeDataArray = [{
        key: 'Temperature', items: [
          {color: 'blue', values: this.temperatures},
          {color: 'gray', values: [0]}
        ]
      }];
    });
  }

  onChange(value: any) {
    this.selectedTempUnit = value;
    this.getTemperaturesForChart(this.cityCoordinates, this.selectedTempUnit);
  }
}
