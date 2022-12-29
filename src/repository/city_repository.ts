import { City } from '../types/city';

const citiesKey = 'citiesKey';

export function getCitiesFromLocalStorage(): City[] {
  const oldData = localStorage.getItem(citiesKey);

  if (oldData == null) {
    return [];
  }

  return JSON.parse(oldData);
}

export function addCity(city: City): City[] {
  const cities = getCitiesFromLocalStorage();
  cities.push(city);

  localStorage.setItem(citiesKey, JSON.stringify(cities));

  return cities;
}

export function validateIfWeCanAddCity(city: City): boolean {
  const cities = getCitiesFromLocalStorage();

  return cities.every((el) => el.name !== city.name);
}

export function removeCity(city: City): City[] {
  const cities = getCitiesFromLocalStorage();
  const filteredCityList = cities.filter((el) => el.name !== city.name);

  localStorage.setItem(citiesKey, JSON.stringify(filteredCityList));

  return filteredCityList;
}
