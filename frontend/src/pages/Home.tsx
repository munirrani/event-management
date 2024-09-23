import React, {useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CircularProgress, Typography, Container, Box } from '@mui/material';
import EventCard from '../components/EventCard';
import Event from '../types/Event';
import ToggleButton from '../components/ToggleButton';
import { useTheme } from '@mui/material/styles';

type FilterOption = 'all' | 'ongoing' | 'completed';

const Home: React.FC = () => {
    const theme = useTheme();
    const [selected, setSelected] = useState<'ongoing' | 'completed' | 'all'>('all');

    const { data: events, isLoading, error } = useQuery({
        queryKey: ['events'], 
        queryFn: () => fetch('http://localhost:5000/api/events').then(res => res.json())
    });

  if (isLoading) return <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',}}><CircularProgress /></Container>;
  if (error) return <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',}}><Typography variant="h4" fontWeight="bold" color="#DEDEDE" >Error fetching events</Typography></Container>;

  function filterEvents(events: Event[], selected: FilterOption) {
        if (selected === 'all') {
            return events;
        }
        return events.filter(event => {
            if (selected === 'ongoing') {
                return event.status === 'Ongoing';
            }
            return event.status === 'Completed';
        });
    }

    const filteredEvents = events ? filterEvents(events, selected) : [];

    return (
        <Box sx={{
            mx: 5,
            my: 5,
            }}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', py: 5}}>
                <Typography variant="h4" fontWeight="bold" >Events</Typography>
                <ToggleButton selected={selected} setSelected={setSelected} />
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
                {filteredEvents?.map((event: Event) => (
                    <Box key={event._id} gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
                    <EventCard event={event} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Home;