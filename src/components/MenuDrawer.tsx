import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function MenuDrawer({ onContact = () => { } }: { onContact?: () => void }) {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const DrawerList = (
    <Box
      role="presentation"
      onClick={() => toggleDrawer(false)}
      sx={{
        width: 265,
        pt: 1.5,
        // match the desktop header: Figtree, medium weight, duke blue
        "& .MuiListItemText-primary": {
          fontFamily: '"Figtree", sans-serif',
          fontWeight: 500,
          fontSize: "17.5px",
          color: "var(--duke-blue)",
        },
        // product subpages read as children, like the header's slide-out
        "& .MenuDrawer-sub .MuiListItemText-primary": {
          fontSize: "14px",
          color: "rgba(5, 5, 153, 0.55)",
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/products">
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        {/* Product subpages, indented under Products */}
        <ListItem disablePadding>
          <ListItemButton className="MenuDrawer-sub" component={Link} to="/products/scriptura" sx={{ pl: 4, py: 0.5 }}>
            <ListItemText primary="Scriptura" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="MenuDrawer-sub" component={Link} to="/products/mensura" sx={{ pl: 4, py: 0.5 }}>
            <ListItemText primary="Mensura" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="MenuDrawer-sub" component={Link} to="/products/textura" sx={{ pl: 4, py: 0.5 }}>
            <ListItemText primary="Textura" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="MenuDrawer-sub" component={Link} to="/products/norma" sx={{ pl: 4, py: 0.5 }}>
            <ListItemText primary="Norma" />
          </ListItemButton>
        </ListItem>
        {/* Temporarily hidden until content is curated:
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/research">
            <ListItemText primary="Research" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/team">
            <ListItemText primary="Team" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/news">
            <ListItemText primary="News" />
          </ListItemButton>
        </ListItem> */}
      </List>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onContact}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
        {/* Solid pill CTA, mirroring the header's "Sign up for beta" button */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/beta-signup"
            sx={{
              mx: 2,
              mt: 1,
              borderRadius: "999px",
              justifyContent: "center",
              backgroundColor: "var(--duke-blue)",
              "&:hover": { backgroundColor: "#0c45cc" },
              "& .MuiListItemText-primary": { color: "white", textAlign: "center" },
            }}
          >
            <ListItemText primary="Sign up for beta" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div onClick={() => toggleDrawer(true)} aria-label="Open menu">
        <MenuIcon/>
      </div>

      <Drawer sx={{zIndex: 10000}} anchor="right" open={isDrawerOpen} onClose={() => toggleDrawer(false)} onClick={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
