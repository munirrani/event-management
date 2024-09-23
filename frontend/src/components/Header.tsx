import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface HeaderProps {
  email: string | null;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void;
  location: string;
}

const Header: React.FC<HeaderProps> = ({ email, isAuthenticated, onLoginClick, onRegisterClick, onLogoutClick, location }) => {

  return (
    <AppBar position="static" elevation={0} color="inherit">
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1, textAlign: 'start', fontSize: 'medium', textTransform: 'uppercase', mx: 2, }}>
          {email ? `Welcome, ${email}!` : ''}
        </Typography>
        
        {isAuthenticated ? (
          <>
            { location === '/create' ?
            <Button component={Link} color="inherit" to="/">Home</Button>
            :
            <Button component={Link} color="inherit" to="/create">Create Event</Button>
            }
            <Button color="inherit" onClick={onLogoutClick}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={onLoginClick}>Login</Button>
            <Button color="inherit" onClick={onRegisterClick}>Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;