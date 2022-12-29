import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getCityByName } from '../../api/weather';
import { City } from '../../types/city';
import {
  addCity,
  validateIfWeCanAddCity,
} from '../../repository/city_repository';

type Props = {
  onCitiesChanged: (cities: City[]) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};
export const MuiDialog: React.FC<Props> = ({
  onCitiesChanged,
  open,
  setOpen,
}) => {
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      console.log(loading);
      setError('');
      setLoading(true);

      const response = await getCityByName(cityName);

      if (response.length === 0) {
        setError(`There is no such city to load: ${cityName}`);
        return;
      }

      const firstCity = response[0];

      const isValid = validateIfWeCanAddCity(firstCity);

      if (isValid) {
        const cityList = addCity(firstCity);

        onCitiesChanged(cityList);
      } else {
        setError(`The city is already exist`);
      }
    } catch (e) {
      setError(`There is no such city to load: ${cityName}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">Write the name of the city</DialogTitle>
      <DialogContent sx={{ m: 'auto' }}>
        <TextField
          id="standard-basic"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClick} sx={{ m: 'auto' }}>
          Add
        </Button>
      </DialogActions>
      {error.length > 0 && (
        <Typography sx={{ m: 'auto', pb: 2, color: 'red' }}>{error}</Typography>
      )}
    </Dialog>
  );
};
