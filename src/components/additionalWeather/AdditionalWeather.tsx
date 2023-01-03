import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import OpacityIcon from '@mui/icons-material/Opacity';
import WindPowerIcon from '@mui/icons-material/WindPower';
import Divider from '@mui/material/Divider';
import {
  getForecastWeatherByCityCoordinate,
  getWeatherByCityCoordinate,
} from '../../api/weather';
import { Forecast, ForecastResponse } from '../../types/forecast_response';
import { ForecastCard } from '../ForecastCard';
import { Weather } from '../../types/weather';

export const AdditionalWeather: React.FC = () => {
  const [todayForecast, setTodayForecast] = useState<Forecast[]>([]);
  const [cityForecast, setCityForecast] = useState<ForecastResponse>({
    city: {
      country: '',
      name: '',
      sunrise: 0,
      sunset: 0,
    },
    list: [],
  });
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();

  function isToday(date: Date) {
    const today = new Date();

    // 👇️ Today's date
    if (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    ) {
      return true;
    }

    return false;
  }

  const params = new URLSearchParams(search);
  const lat = params.get('lat');
  const lon = params.get('lon');

  const getCityCoordinates = async () => {
    if (lat && lon) {
      try {
        setError('');
        setLoading(true);

        const cityWeather = await getForecastWeatherByCityCoordinate(
          +lat,
          +lon,
        );
        setCityForecast(cityWeather);
        const todayTime = cityWeather?.list.filter((day) =>
          isToday(new Date(day.dt_txt)),
        );

        if (todayTime) {
          setTodayForecast(todayTime);
        }
      } catch (e) {
        setError('There is no such city to load');
      } finally {
        setLoading(false);
      }
    }
  };

  const getWeather = async () => {
    if (lat && lon) {
      try {
        setWeather(null);
        const cityWeather = await getWeatherByCityCoordinate(+lat, +lon);
        setWeather(cityWeather);
      } catch (e) {
        setError('Something wrong with weather request');
      }
    }
  };

  useEffect(() => {
    getCityCoordinates();
    getWeather();
  }, []);

  const convertTimestampToString = (timestamp: number) => {
    const apiHotFix = `${timestamp}000`;

    const dateFormatSunrise = new Date(+apiHotFix);
    return dateFormatSunrise.toTimeString().slice(0, 5);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 7,
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ArrowBackIosIcon />
          <Typography>Back</Typography>
        </Box>
      </Link>
      <Card
        sx={{
          m: 'auto',
          borderRadius: '16px',
          border: 0.5,
          borderColor: 'grey.500',
          boxShadow: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        {loading && <CircularProgress />}

        {!loading && todayForecast.length !== 0 && weather !== null && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h3" sx={{ mb: 3 }}>
                {cityForecast.city.name}, {cityForecast.city.country}
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                {weather?.weatherDescription?.description}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 500,
                justifyContent: 'space-between',
                mb: 5,
              }}
            >
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
                src={`https://openweathermap.org/img/wn/${weather?.weatherDescription?.icon}@2x.png `}
              />
              <Typography variant="h4">{`${Math.round(
                weather?.tempDescription.temp ?? 0.0,
              )}\u00b0 `}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', m: 0.5 }}>
                  <ThermostatAutoIcon />
                  <Typography> &nbsp;Real felt &nbsp;</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {`${Math.round(
                      weather?.tempDescription.feels_like ?? 0.0,
                    )}\u00b0`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', m: 0.5 }}>
                  <OpacityIcon />
                  <Typography> &nbsp;Humidity &nbsp;</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {weather?.tempDescription.humidity}%
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', m: 0.5 }}>
                  <WindPowerIcon />
                  <Typography> &nbsp;Wind&nbsp;</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {weather?.wind.speed} km/h
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider variant="middle" sx={{ width: 600, mb: 3 }} />

            <Box
              sx={{
                display: 'flex',
                width: 650,
                justifyContent: 'space-around',
                mb: 8,
              }}
            >
              <Box>
                <WbSunnyIcon />
                <Typography>Rise</Typography>
                {convertTimestampToString(cityForecast.city.sunrise)}
              </Box>

              <Box>
                <WbTwilightIcon />
                <Typography>Set</Typography>
                {convertTimestampToString(cityForecast.city.sunset)}
              </Box>

              <Box>
                <DeviceThermostatIcon />
                <Typography>Low</Typography>
                {`${Math.round(weather?.tempDescription.temp_min)}\u00b0`}
              </Box>

              <Box>
                <DeviceThermostatIcon />
                <Typography>High</Typography>
                {`${Math.round(weather?.tempDescription.temp_max)}\u00b0`}
              </Box>
            </Box>

            <Box>
              <Divider sx={{ width: 600, mb: 3 }}>
                <Typography variant="h5">Hourly forecast</Typography>
              </Divider>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {todayForecast.map((forecast) => (
                <ForecastCard key={forecast.dt_txt} forecast={forecast} />
              ))}
            </Box>
          </>
        )}

        {error.length > 0 && <Typography>{error}</Typography>}
      </Card>
    </Container>
  );
};
