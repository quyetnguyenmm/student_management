import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

export function Header() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
