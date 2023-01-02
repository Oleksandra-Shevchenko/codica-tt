export interface TempDescription {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export class Weather {
  weatherDescriptions: WeatherDescription[];

  tempDescription: TempDescription;

  constructor(
    weatherDescriptions: WeatherDescription[],
    tempDescription: TempDescription,
  ) {
    this.weatherDescriptions = weatherDescriptions;
    this.tempDescription = tempDescription;
  }

  get weatherDescription(): WeatherDescription | null {
    if (this.weatherDescriptions.length === 0) {
      return null;
    }

    return this.weatherDescriptions[0];
  }

  static fromJson(json: any): Weather {
    const { weather } = json;
    const { main } = json;

    return new Weather(weather, main);
  }
}
