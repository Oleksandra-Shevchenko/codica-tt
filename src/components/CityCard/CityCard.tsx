import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { City } from '../../types/city';
import { getWeatherByCityCoordinate } from '../../api/weather';
import { Weather } from '../../types/weather';
import { AdditionalWeather } from '../additionalWeather';

type Props = {
  city: City;
  handleRemover: (value: string) => void;
  setError: (value: string) => void;
};
export const CityCard: React.FC<Props> = ({
  city,
  handleRemover,
  setError,
}) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeather = async () => {
    try {
      setWeather(null);
      const cityWeather = await getWeatherByCityCoordinate(city.lat, city.lon);
      setWeather(cityWeather);
    } catch (e) {
      setError('Something wrong with weather request');
    }
  };
  const handleRefresh = (event: React.MouseEvent<HTMLElement>) => {
    getWeather();
    event.stopPropagation();
    event.preventDefault();
  };
  const handleRemover1 = (event: React.MouseEvent<HTMLElement>) => {
    handleRemover(city.name);
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleRedirect = () => {
    <AdditionalWeather />;
  };

  return (
    <Card
      sx={{
        width: 275,
        height: 380,
        mb: 2,
        ml: 2,
        borderRadius: '16px',
        border: 0.5,
        borderColor: 'grey.500',
        boxShadow: 0,
      }}
    >
      <Link
        to={`/allWeather?lat=${city.lat}&lon=${city.lon}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={handleRedirect}
      >
        <CardContent
          sx={{
            p: 1,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              p: 1,
              display: 'flex',
              height: 122.0,
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
              component="div"
              align="center"
              sx={{
                mb: 1,
                overflow: 'hidden',
                wordBreak: 'break-word',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxPack: 'center',
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'pre-line',
              }}
            >
              {city.name}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              display: 'flex',
              height: 130.0,
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {weather == null && <CircularProgress />}
            {weather != null && (
              <>
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
                  <Typography
                    sx={{
                      fontSize: 23,
                      fontWeight: 'fontWeightBold',
                    }}
                  >
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
                    mb: 2,
                  }}
                >
                  <Typography>Now</Typography>
                  <Typography>
                    {weather?.weatherDescription?.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 200,
                  }}
                >
                  <Box>
                    Min / Max
                    <br />
                    {`${Math.round(
                      weather?.tempDescription.temp_min,
                    )}\u00b0 / ${Math.round(
                      weather?.tempDescription.temp_max,
                    )}\u00b0`}
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
                </Box>
              </>
            )}
          </Box>
        </CardContent>
        <CardActions
          sx={{
            width: 170,
            display: 'flex',
            justifyContent: 'space-between',
            m: 'auto',
          }}
        >
          <Button size="small" onClick={handleRefresh}>
            Refresh
          </Button>
          <Button
            onClick={handleRemover1}
            sx={{
              color: '#FC6C85',
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
      </Link>
    </Card>
  );
};
