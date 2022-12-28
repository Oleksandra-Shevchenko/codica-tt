import React from 'react';
import { Container, Box } from '@mui/system';
import { CityCard } from '../CityCard';

export const MainScreen: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          bgcolor: '#cfe8fc',
          height: '100%',
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          mt: 5,
          mb: 5,
          justifyContent: 'center',
          p: 1,
          flexWrap: 'wrap',
        }}
      >
        <CityCard />
        <CityCard />
        <CityCard /> <CityCard />
        <CityCard /> <CityCard />
        <CityCard /> <CityCard />
        <CityCard /> <CityCard />
        <CityCard /> <CityCard />
        <CityCard /> <CityCard />
      </Box>
    </Container>
  );
};
