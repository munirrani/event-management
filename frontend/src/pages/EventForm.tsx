import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

interface EventData {
  _id?: string;
  name: string;
  thumbnailUrl: File | null;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  status: 'Ongoing' | 'Completed';
}

const EventForm: React.FC = () => {
  
  const [token, setToken] = useState<string | null>(null);
  const [event, setEvent] = useState<EventData>({
    name: '',
    thumbnailUrl: null,
    location: '',
    startDate: null,
    endDate: null,
    description: '',
    status: 'Ongoing',
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    // Check if in edit mode
    if (location.pathname.includes('/edit')) {
      console.log('Edit mode');
      setIsEditMode(true);
      const eventId = location.pathname.split('/').pop();
      axios.get(`http://localhost:5000/api/events?_id=${eventId}`)
        .then((response) => {
          const { data } = response;
          setEvent({
            _id: data._id,
            name: data.name,
            thumbnailUrl: null,
            location: data.location,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            description: data.description,
            status: data.status,
          });
          setThumbnailPreview(data.thumbnailUrl);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    setEvent((prev) => ({ ...prev, [field]: date }));
  };

  const handleStatusChange = (e: SelectChangeEvent<'Ongoing' | 'Completed'>) => {
    setEvent((prev) => ({ ...prev, status: e.target.value as 'Ongoing' | 'Completed' }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEvent((prev) => ({ ...prev, thumbnailUrl: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(event).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    });

    try {
      const header: Object = token ? { headers : { Authorization: `Bearer ${token}` } } : {};
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/events/${event._id}`, formData, header);
      } else {
        await axios.post('http://localhost:5000/api/events', formData, header);
      }
      setShowAlert(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx ={{ mx: 5}}>
        <Box sx={{ py: 5}}>
              <Typography variant="h4" fontWeight="bold" sx={{textAlign: 'start', mx: 13}}>Create Event</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid sx = {{flex: 4}}>
            <Paper elevation={0} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="Event thumbnail" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              ) : (
                <Typography>No thumbnail uploaded</Typography>
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}
              >
                Upload Thumbnail
                <input
                  type="file"
                  hidden
                  accept=".png,.jpg,.jpeg"
                  onChange={handleThumbnailChange}
                />
              </Button>
            </Paper>
          </Grid>
          <Grid sx={{ flex: 6}}>
            <Paper elevation={0} sx={{ px:2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={event.name}
                onChange={handleInputChange}
                margin="normal"
                required
                disabled={isEditMode}
              />
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={event.location}
                onChange={handleInputChange}
                margin="normal"
                required
                disabled={isEditMode}
              />
              <DatePicker
                label="Start Date"
                value={event.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
                disabled={isEditMode}
                format="DD/MM/YYYY"
              />
              <DatePicker
                label="End Date"
                value={event.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
                disabled={isEditMode}
                format="DD/MM/YYYY"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={event.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={10}
                required
                disabled={isEditMode}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={event.status}
                  onChange={handleStatusChange}
                  disabled={!isEditMode}
                >
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Paper>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '95%' }}>
                {isEditMode ? 'Update Event' : 'Create Event'}
            </Button>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={showAlert} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Event {isEditMode ? 'updated' : 'created'} successfully!
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};
export default EventForm;