import { Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';

const LoginWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexFlow: 'row nowrap',
  minHeight: '100vh',

  '& .MuiPaper-root': {
    padding: theme.spacing(3),
  },
}));

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      }),
    );
  };

  return (
    <LoginWrapper>
      <Paper elevation={1}>
        <Typography component="h1" variant="h5">
          Student Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '32px' }}
          fullWidth
          onClick={handleLogin}>
          Fake Login
        </Button>
      </Paper>
    </LoginWrapper>
  );
}
