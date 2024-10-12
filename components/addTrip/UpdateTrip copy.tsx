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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// InputBox component for reusability
interface InputBoxProps {
  label: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  name,
  placeholder,
  onChange,
  width = '100%',
}) => (
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
      {label}
    </Typography>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: width,
        height: '32px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '12px',
        lineHeight: '16px',
        color: '#666666',
        padding: '8px 12px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
      }}
    />
  </FormControl>
);

interface Trip {
  transporter: string;
  tripStartTime: string;
}

interface UpdateTripForm {
  transporter: string;
  time: Date | null;
}

interface UpdateTripDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formState: UpdateTripForm) => void;
  trip: Trip | null; // Accept trip as a prop
}

const UpdateTripDialog: React.FC<UpdateTripDialogProps> = ({ open, onClose, onSubmit, trip }) => {
  const [formState, setFormState] = useState<UpdateTripForm>({
    transporter: trip?.transporter || '',  // Pre-fill transporter with trip data
    time: trip?.tripStartTime ? new Date(trip.tripStartTime) : null,  // Pre-fill time with tripStartTime
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Update form state when trip changes
  useEffect(() => {
    if (trip) {
      setFormState({
        transporter: trip.transporter || '',
        time: trip.tripStartTime ? new Date(trip.tripStartTime) : null,
      });
    }
  }, [trip]);

  useEffect(() => {
    const { transporter, time } = formState;
    setIsFormValid(!!transporter && !!time);
  }, [formState]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (newDate: Date | null) => {
    setFormState((prevState) => ({ ...prevState, time: newDate }));
  };

  const handleSubmit = () => {
    onSubmit(formState);
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
        Update status
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
            Transporter
          </Typography>
          <Select
            name="transporter"
            value={formState.transporter}
            onChange={handleSelectChange}
            fullWidth
            sx={{
              fontFamily: 'Source Sans Pro, sans-serif',
              fontSize: '12px',
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
              height: '32px',
            }}
          >
            <MenuItem value="">
              <em>Select Option</em>
            </MenuItem>
            <MenuItem value="Blue dart">Blue dart</MenuItem>
            <MenuItem value="DHL">DHL</MenuItem>
            <MenuItem value="Delhivery">Delhivery</MenuItem>
            <MenuItem value="DTDC">DTDC</MenuItem>
            <MenuItem value="GATI">GATI</MenuItem>
            <MenuItem value="Safexpress">Safexpress</MenuItem>
          </Select>
        </FormControl>

        {/* Date/Time Picker */}
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
            Time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateField
              value={formState.time}
              onChange={handleDateChange}
              fullWidth
              label="Select Time"
            />
          </LocalizationProvider>
        </FormControl>
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
            width: '120px',
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
