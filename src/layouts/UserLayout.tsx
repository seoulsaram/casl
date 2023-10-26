import { ReactNode, useContext } from 'react';
import { NavGroup, VerticalNavItemsType } from './types';
import CanViewNavGroup from '../components/acl/CanViewNavGroup';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { AbilityContext } from '@/components/acl/Can';

interface Props {
  children: ReactNode;
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const navigation: VerticalNavItemsType = [
  {
    title: 'Admin menu',
    action: 'read',
    subject: 'admin',
    path: `/test`,
  },
  {
    title: 'Admin menu2',
    action: 'read',
    subject: 'admin',
    path: `/test`,
  },
  {
    title: 'Admin menu3',
    action: 'read',
    subject: 'admin',
    path: `/test`,
  },
  {
    title: 'Guest menu1',
    action: 'read',
    subject: 'guest',
    path: `/test`,
  },
  {
    title: 'Guest menu2',
    action: 'read',
    subject: 'guest',
    path: `/test`,
  },
];

const UserLayout = ({ children, window }: Props) => {
  const ability = useContext(AbilityContext);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        CASL DEMO
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' color='success'>
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {ability.can('read', 'admin') ? 'Admin Menu' : 'Guest Menu'}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <nav style={{ display: 'flex', gap: '24px', fontWeight: 600 }}>
              {navigation.map((i, idx) => (
                <CanViewNavGroup navGroup={i} key={idx}>
                  <Link href={i.path ?? ''}>{i.title}</Link>
                </CanViewNavGroup>
              ))}
            </nav>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default UserLayout;
