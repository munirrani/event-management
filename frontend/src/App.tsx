import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import EventForm from './pages/EventForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FAFAFA',
      contrastText: '#444444',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

const AppContent = () => {
  const { logout, user, token } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Header 
        email={user?.email || null}
        isAuthenticated={!!token && !!user}
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
        onLogoutClick={() => logout()}
        location= {location.pathname}
      />
      <Routes>
        {(token && user) && (
          <>
            <Route path="/create" element={<EventForm />} />
            <Route path="/edit/:id" element={<EventForm />} />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Register open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </>
  );
};

export default App;