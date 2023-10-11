import { Box, styled } from '@mui/material';
import { Header, Sidebar } from 'components/common';
import Dashboard from 'features/dashboard';
import Students from 'features/students';
import { Redirect, Route, Switch } from 'react-router-dom';

export interface AdminLayoutProps {}

const AdminWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '240px 1fr',
  gridTemplateAreas: `
    "header header"
    "sidebar main"
  `,
  minHeight: '100vh',

  '& .header': {
    gridArea: 'header',
  },

  '& .sidebar': {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
  },

  '& .main': {
    gridArea: 'main',
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AdminLayout(props: AdminLayoutProps) {
  return (
    <AdminWrapper>
      <Box className="header">
        <Header />
      </Box>
      <Box className="sidebar">
        <Sidebar />
      </Box>
      <Box className="main">
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>

          <Route path="/admin/students">
            <Students />
          </Route>

          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
      </Box>
    </AdminWrapper>
  );
}
