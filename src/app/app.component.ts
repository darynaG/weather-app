import {Component, OnInit} from '@angular/core';
import * as go from 'gojs';
import {WeatherService} from './weather.service';
import {Units} from './Coordinates';
import {FormControl} from '@angular/forms';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';

  public temperatures;
  public dates;
  public cities = [
    {
      name: 'Lviv',
      coordinates: {
        lat: 49.84,
        lon: 24.02
      }
    },
    {
      name: 'Kiyv',
      coordinates: {
        lat: 50,
        lon: 30
      }
    }
  ];

  public model: go.GraphLinksModel = $(go.GraphLinksModel,
    {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: []
    });

  selectedTempUnit: Units;
  eUnits = Units;

  cityControl = new FormControl({
    lat: 49.84,
    lon: 24.02
  });

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.selectedTempUnit = Units.Celsius;
    this.getWeather(this.selectedTempUnit);
  }

  getWeather(units: Units) {
    this.temperatures = [];
    this.dates = [];
    const coord = this.cityControl.value;

    this.weatherService.getForecast(coord, units).subscribe(value => {
      value.daily.map(val => {
        this.temperatures.push(val.temp.eve);
      });

      value.daily.map(val => this.dates.push(
        {
          date: val.dt,
          temp: val.temp.eve
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
    this.getWeather(this.selectedTempUnit);
  }
}
