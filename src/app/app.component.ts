import {Component, OnInit} from '@angular/core';
import * as go from 'gojs';
import {WeatherService} from './weather.service';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public temperatures = [];
  dates = [];

  public model: go.GraphLinksModel = $(go.GraphLinksModel,
    {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: []
    });

  title = 'weather-app';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getLastDaysTemperature().subscribe(value => {
      value.daily.map(val => {
        this.temperatures.push(val.temp.eve);
      });

      value.daily.map(val => this.dates.push(val.dt));

      this.model.addNodeData({
        key: 'Alpha', items: [
          { color: 'blue', values: this.temperatures },
          { color: 'gray', values: [0] }
        ]
      });
    });
  }
}
