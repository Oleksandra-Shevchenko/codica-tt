import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/system';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { CityCard } from '../CityCard';
import { MuiDialog } from '../ModalWindow';
import { City } from '../../types/city';

export const MainScreen: React.FC = () => {
  const [cityList, setCityList] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const citiesKey = 'citiesKey';
  function getCitiesFromLocalStorage(): City[] {
    const oldData = localStorage.getItem(citiesKey);

    if (oldData == null) {
      return [];
    }

    return JSON.parse(oldData);
  }

  useEffect(() => {
    const cities = getCitiesFromLocalStorage();

    setCityList(cities);
  }, []);

  const OnSubmitCity = (city: City) => {
    const cities = getCitiesFromLocalStorage();
    if (cities.every((el) => el.name !== city.name)) {
      cities.push(city);

      localStorage.setItem(citiesKey, JSON.stringify(cities));
      setOpen(false);

      setCityList(cities);
    } else {
      setError('This city is already exist');
    }
  };

  const handleRemover = (cityName: string) => {
    const cities = getCitiesFromLocalStorage();
    const filteredCityList = cities.filter((city) => city.name !== cityName);

    localStorage.setItem(citiesKey, JSON.stringify(filteredCityList));

    setCityList(filteredCityList);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            color: '#FC6C85',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          <AddCircleOutlineIcon
            sx={{
              fontSize: 80,
              color: '#FC6C85',
            }}
          />
          Add a new city
        </Button>
        <MuiDialog
          onSubmitCity={OnSubmitCity}
          setOpen={setOpen}
          open={open}
          setError={setError}
          error={error}
        />
      </Box>
      <Box
        sx={{
          height: '100%',
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          mt: 3,
          mb: 5,
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
          flexWrap: 'wrap',
        }}
      >
        {cityList.map((city) => (
          <CityCard
            key={city.name}
            city={city}
            handleRemover={handleRemover}
            setError={setError}
          />
        ))}
      </Box>
    </Container>
  );
};
