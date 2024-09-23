import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Event from '../types/Event';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={event.thumbnailUrl || 'https://via.placeholder.com/300x140'}
        alt={event.name}
        sx={{
          height: 'auto',
          width: '100%',
          aspectRatio: '1 / 1', 
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold',textAlign: 'start'}}>
          {event.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary" sx={{textAlign: 'start'}}>
        {
        new Date(event.startDate).toLocaleDateString() === new Date(event.endDate).toLocaleDateString()
          ? new Date(event.startDate).toLocaleDateString() 
          : `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'start'}}>{event.location}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;