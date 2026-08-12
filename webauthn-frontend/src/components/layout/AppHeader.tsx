import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function AppHeader() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          WebAuthn Demo
        </Typography>
        <Button color="inherit" component={RouterLink} to="/register">
          Registrar
        </Button>
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={RouterLink} to="/protected">
          Protegido
        </Button>
      </Toolbar>
    </AppBar>
  );
}