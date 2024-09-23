
import React from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type FilterOption = 'all' | 'ongoing' | 'completed';

interface ToggleButtonProps {
  selected: FilterOption;
  setSelected: React.Dispatch<React.SetStateAction<FilterOption>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ selected, setSelected }) => {
    const theme = useTheme();
  const handleClick = (value: FilterOption) => {
    setSelected(value);
  };

  return (
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DADCE0', borderRadius: 2}}>
          <Button
            variant={selected === 'all' ? 'contained' : 'outlined'}
            onClick={() => handleClick('all')}
            sx={{
                borderLeft: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                bgcolor: selected === 'all' ? '#FFFFFF' : 'transparent',
                color: theme.palette.primary.contrastText,
                border: '0px',
            }}
          >
            All
          </Button>
          <Button
            variant={selected === 'ongoing' ? 'contained' : 'outlined'}
            onClick={() => handleClick('ongoing')}
            sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                bgcolor: selected === 'ongoing' ? '#FFFFFF' : 'transparent',
                color: theme.palette.primary.contrastText,
                border: '0px',
            }}
          >
            Ongoing
          </Button>
          <Button
            variant={selected === 'completed' ? 'contained' : 'outlined'}
            onClick={() => handleClick('completed')}
            sx={{
                borderRight: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                bgcolor: selected === 'completed' ? '#FFFFFF' : 'transparent',
                color: theme.palette.primary.contrastText,
                border: '0px',
            }}
          >
            Completed
          </Button>
        </Box>
      </Box>
  );
}

export default ToggleButton;