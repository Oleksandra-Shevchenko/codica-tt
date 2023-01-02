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
import { getForecastWeatherByCityCoordinate } from '../../api/weather';
import { Forecast, ForecastResponse } from '../../types/forecast_response';
import { ForecastCard } from '../ForecastCard';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();

  const getCityCoordinates = async () => {
    const params = new URLSearchParams(search);
    const lat = params.get('lat');
    const lon = params.get('lon');

    if (lat && lon) {
      try {
        setError('');
        setLoading(true);

        const cityWeather = await getForecastWeatherByCityCoordinate(
          +lat,
          +lon,
        );
        setCityForecast(cityWeather);
        const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        const r = cityWeather?.list.filter(
          (day) => day.dt_txt.split(' ')[0] === utc,
        );

        if (r) {
          setTodayForecast(r);
        }
      } catch (e) {
        setError('There is no such city to load');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCityCoordinates();
  }, []);

  const convertTimestampToString = (timestamp: number) => {
    const dateFormatSunrise = new Date(timestamp);
    return dateFormatSunrise.toTimeString().slice(0, 5);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 7,
      }}
    >
      <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIosIcon />
          <Typography>Back</Typography>
        </Box>
      </Link>
      <Card
        sx={{
          width: 800,
          height: 700,
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

        {!loading && todayForecast.length !== 0 && (
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
                {todayForecast[0].weather[0].description}
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
                src={`http://openweathermap.org/img/wn/${todayForecast[0].weather[0].icon}@2x.png `}
              />
              <Typography variant="h4">{`${Math.round(
                todayForecast[0].main.temp,
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
                      cityForecast.list[0].main.feels_like,
                    )}\u00b0`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', m: 0.5 }}>
                  <OpacityIcon />
                  <Typography> &nbsp;Humidity &nbsp;</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {cityForecast.list[0].main.humidity}%
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', m: 0.5 }}>
                  <WindPowerIcon />
                  <Typography> &nbsp;Wind&nbsp;</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {cityForecast.list[0].wind.speed} km/h
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
                <Typography>High</Typography>
                {`${Math.round(cityForecast.list[0].main.temp_max)}\u00b0`}
              </Box>

              <Box>
                <DeviceThermostatIcon />
                <Typography>Low</Typography>
                {`${Math.round(cityForecast.list[0].main.temp_min)}\u00b0`}
              </Box>
            </Box>

            <Box>
              <Divider sx={{ width: 600, mb: 3 }}>
                <Typography variant="h5">Hourly forecast</Typography>
              </Divider>
            </Box>

            <Box sx={{ display: 'flex' }}>
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
