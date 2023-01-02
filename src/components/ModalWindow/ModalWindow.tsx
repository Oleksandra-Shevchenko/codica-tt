import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { getCityByName } from '../../api/weather';
import { City } from '../../types/city';

type Props = {
  onSubmitCity: (city: City) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  setError: (value: string) => void;
  error: string;
};
export const MuiDialog: React.FC<Props> = ({
  onSubmitCity,
  open,
  setOpen,
  setError,
  error,
}) => {
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue: string) => {
    if (inputValue === '') {
      return {
        options: [],
      };
    }
    return getCityByName(inputValue)
      .then((cities) => {
        return {
          options: cities.map((city) => {
            return {
              value: `${city.lat} ${city.lon}`,
              label: `${city.name}`,
            };
          }),
        };
      })
      .catch((e) => {
        console.log(e);

        return {
          options: [],
        };
      });
  };

  const handleOnChange = (searchData: any) => {
    setCityName(searchData.label);
    setSearch(searchData);
  };
  const onClick = async () => {
    try {
      setError('');
      setLoading(true);

      const response = await getCityByName(cityName);

      if (response.length === 0) {
        setError(`There is no such city to load: ${cityName}`);
        return;
      }
      const firstCity = response[0];

      onSubmitCity(firstCity);
      setCityName('');
      setSearch(null);
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
      fullWidth
      maxWidth="sm"
      sx={{ overflow: 'scroll' }}
    >
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <DialogTitle id="dialog-title" sx={{ m: 'auto' }}>
            Write the name of the city
          </DialogTitle>
          <DialogContent
            sx={{
              '&.MuiDialogContent-root': {
                minHeight: 210,
                scrollBehavior: 'auto',
              },
            }}
          >
            <AsyncPaginate
              placeholder="Search for city"
              debounceTimeout={600}
              value={search}
              onChange={handleOnChange}
              loadOptions={loadOptions}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClick} sx={{ m: 'auto' }}>
              Add
            </Button>
          </DialogActions>
          {error.length > 0 && (
            <Typography sx={{ m: 'auto', pb: 2, color: 'red' }}>
              {error}
            </Typography>
          )}
        </>
      )}
    </Dialog>
  );
};
