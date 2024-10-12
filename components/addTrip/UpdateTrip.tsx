import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Button,
  FormControl,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface UpdateTripForm {
  transporter: string;
  time: Date | null;
}

interface Trip {
  tripId: string;
  transporter: string;
  tripStartTime: string;
}

interface UpdateTripDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formState: UpdateTripForm[], tripIds: string[]) => void;
  trips: Trip[]; // Accept trips as an array
}

const UpdateTripDialog: React.FC<UpdateTripDialogProps> = ({
  open,
  onClose,
  onSubmit,
  trips,
}) => {
  const [formState, setFormState] = useState<UpdateTripForm[]>(() =>
    trips.map((trip) => ({
      transporter: trip.transporter || '',
      time: trip.tripStartTime ? new Date(trip.tripStartTime) : null,
    }))
  );

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    if (trips) {
      setFormState(() =>
        trips.map((trip) => ({
          transporter: trip.transporter || '',
          time: trip.tripStartTime ? new Date(trip.tripStartTime) : null,
        }))
      );
    }
  }, [trips]);

  useEffect(() => {
    const isValid = formState.every(
      (state) => !!state.transporter && !!state.time
    );
    setIsFormValid(isValid);
  }, [formState]);

  const handleTextFieldChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormState((prevState) => {
      const newState = [...prevState];
      newState[index].transporter = value;
      return newState;
    });
  };

  const handleDateChange = (index: number, newDate: Date | null) => {
    setFormState((prevState) => {
      const newState = [...prevState];
      newState[index].time = newDate;
      return newState;
    });
  };

  const handleSubmit = () => {
    const tripIds = trips.map((trip) => trip.tripId);
    onSubmit(formState, tripIds); // Pass the updated state and trip IDs
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          width: '400px',
          borderRadius: '8px',
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: '24px 32px 16px',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '32px',
          color: '#1A1A1A',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Update Status
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: '0px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {trips.map((trip, index) => (
          <div key={trip.tripId}>
            <FormControl fullWidth margin="dense">
              <Typography
                component="label"
                sx={{
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#1A1A1A',
                  marginBottom: '2px',
                }}
              >
                Transporter for {trip.tripId}
              </Typography>
              <input
                name={`transporter_${index}`}
                value={formState[index].transporter}
                onChange={(e) => handleTextFieldChange(index, e)}
                placeholder="Enter Transporter"
                style={{
                  width: '100%',
                  height: '32px',
                  fontFamily: 'Source Sans Pro, sans-serif',
                  fontSize: '12px',
                  padding: '8px 12px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: '4px',
                }}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <Typography
                component="label"
                sx={{
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#1A1A1A',
                  marginBottom: '2px',
                }}
              >
                Time for {trip.tripId}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={formState[index].time}
                  onChange={(newDate) => handleDateChange(index, newDate)}
                  slots={{
                    textField: TextField,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        height: '32px',
                        borderRadius: '4px',
                        border: '1px solid #E0E0E0',
                        '& .MuiInputBase-input': {
                          fontFamily: 'Source Sans Pro, sans-serif',
                          fontSize: '12px',
                          padding: '8px 12px',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
        ))}
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: '1px solid #F2F2F2',
          padding: '16px 32px',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            width: '98px',
            height: '32px',
            background: '#FFFFFF',
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid}
          sx={{
            width: '130px',
            height: '32px',
            background: isFormValid ? '#0057D1' : '#C7C7C7',
            borderRadius: '4px',
            color: '#FFFFFF',
            textTransform: 'none',
          }}
        >
          Update status
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTripDialog;
