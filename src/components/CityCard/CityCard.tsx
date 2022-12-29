import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress } from '@mui/material';
import { City } from '../../types/city';
import { getWeatherByCityCoordinate } from '../../api/weather';
import { Weather } from '../../types/weather';
import { removeCity } from '../../repository/city_repository';

type Props = {
  city: City;
  onCitiesChanged: (cities: City[]) => void;
};
export const CityCard: React.FC<Props> = ({ city, onCitiesChanged }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getWeather = async () => {
    setLoading(true);
    const cityWeather = await getWeatherByCityCoordinate(city.lat, city.lon);
    setLoading(false);

    setWeather(cityWeather);
  };

  function handleRemove(cityToRemove: City) {
    const cities = removeCity(cityToRemove);

    onCitiesChanged(cities);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      {loading && <CircularProgress />}

      {!loading && (
        <Card
          sx={{
            minWidth: 275,
            maxHeight: 300,
            display: 'flex',
            mb: 2,
            ml: 1,
            alignItems: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '16px',
            border: 0.5,
            borderColor: 'grey.500',
            boxShadow: 0,
          }}
        >
          <CardContent>
            <Typography variant="h3" component="div" sx={{ mb: 1 }}>
              {city.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 200,
                mb: 1,
              }}
            >
              Day Weather{' '}
              <Typography sx={{ fontSize: 23, fontWeight: 'fontWeightBold' }}>
                {weather?.weatherDescription?.main}
              </Typography>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 200,
                mb: 1,
              }}
            >
              <Typography>Now</Typography>
              <Typography>
                {weather?.weatherDescription?.description}
              </Typography>
            </Box>
            <Box
              component="img"
              sx={{
                height: 70,
                width: 70,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                borderRadius: '16px',
                border: 0.5,
                borderColor: 'grey.500',
              }}
              alt="The house from the offer."
              src={`http://openweathermap.org/img/wn/${weather?.weatherDescription?.icon}@2x.png `}
            />
          </CardContent>
          <CardActions
            sx={{
              width: 170,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button size="small">Refresh</Button>
            <Button
              onClick={() => handleRemove(city)}
              sx={{
                color: '#FC6C85',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              <CancelIcon
                sx={{
                  fontSize: 30,
                  p: 1,
                }}
              />
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};
