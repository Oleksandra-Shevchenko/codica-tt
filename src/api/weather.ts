import { Weather } from '../types/weather';
import { City } from '../types/city';
import { ForecastResponse } from '../types/forecast_response';

const BASE_URL = 'https://api.openweathermap.org';
const APIkey = '9fb1281a90783019faf1809da0d6b7f8';

export const getCityByName = async (cityName: string): Promise<City[]> => {
  const response = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`,
  );

  return response.json();
};

export const getWeatherByCityCoordinate = async (
  lat: number,
  lon: number,
): Promise<Weather> => {
  const response = await fetch(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`,
  );

  const json = await response.json();

  return Weather.fromJson(json);
};

export const getForecastWeatherByCityCoordinate = async (
  lat: number,
  lon: number,
): Promise<ForecastResponse> => {
  const response = await fetch(
    `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`,
  );

  return response.json();
};
