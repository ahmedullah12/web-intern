import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../components/Navbar/Navbar";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Link, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";

const drawerWidth = 240;

const LinkStyle = {
  textDecoration: "none",
  color: "inherit",
}

function DashboardLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AddBoxIcon/>
              </ListItemIcon>
              <Link style={LinkStyle} to="/dashboard/add-course">Add Course</Link>
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ProductionQuantityLimitsIcon/>
              </ListItemIcon>
              <Link style={LinkStyle} to="/dashboard/all-course">All Course</Link>
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AddBoxIcon/>
              </ListItemIcon>
              <Link style={LinkStyle} to="/dashboard/sales">Sales</Link>
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AddBoxIcon/>
              </ListItemIcon>
              <Link style={LinkStyle} to="/dashboard/orders">Orders</Link>
            </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
       
        

        
        <IconButton sx={{ display: {sm: "block", md: "none", position: "absolute", top: "8px", right: "-5px"}}}
        onClick={handleDrawerToggle} aria-label="open drawer"
        edge="start"
        color="inherit"><MenuIcon /></IconButton>
        <Navbar />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
