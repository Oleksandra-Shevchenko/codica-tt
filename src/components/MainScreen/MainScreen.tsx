import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/system';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { CityCard } from '../CityCard';
import { MuiDialog } from '../ModalWindow';
import { City } from '../../types/city';
import { getCitiesFromLocalStorage } from '../../repository/city_repository';

export const MainScreen: React.FC = () => {
  const [cityList, setCityList] = useState<City[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cities = getCitiesFromLocalStorage();

    setCityList(cities);
  }, []);

  const OnCitesChanged = (cities: City[]) => {
    setCityList(cities);
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
          onCitiesChanged={OnCitesChanged}
          setOpen={setOpen}
          open={open}
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
            onCitiesChanged={OnCitesChanged}
          />
        ))}
      </Box>
    </Container>
  );
};
