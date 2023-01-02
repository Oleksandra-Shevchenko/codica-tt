import { TempDescription, WeatherDescription } from './weather';

export interface ForecastResponse {
  list: Forecast[];
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface Forecast {
  main: TempDescription;
  weather: WeatherDescription[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  dt_txt: string;
}
