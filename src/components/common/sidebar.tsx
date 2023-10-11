import { Box, List, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const SidebarWrapper = styled(Box)(() => ({
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },

  '& a.active > li': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));

export function Sidebar() {
  return (
    <SidebarWrapper sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <NavLink to="/admin/dashboard">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink to="/admin/students">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Students" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </nav>
    </SidebarWrapper>
  );
}
