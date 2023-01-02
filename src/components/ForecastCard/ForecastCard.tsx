import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { Forecast } from '../../types/forecast_response';

type Props = {
  forecast: Forecast;
};
export const ForecastCard: React.FC<Props> = ({ forecast }) => {
  return (
    <Card
      sx={{
        width: 130,
        height: 150,
        mb: 2,
        ml: 2,
        p: 1,
        boxShadow: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {' '}
        Time: {forecast.dt_txt.split(' ')[1].slice(0, 5)}
      </Typography>
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
          mb: 2,
        }}
        alt="The house from the offer."
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png `}
      />
      <Typography variant="h5">{`${Math.round(
        forecast.main.temp,
      )}\u00b0 `}</Typography>
    </Card>
  );
};
