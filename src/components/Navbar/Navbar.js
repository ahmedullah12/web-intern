import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { Avatar, Button } from "@mui/material";
import axios from "axios";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [savedUser, setSavedUser] = useState(null);
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://web-intern-server-production.up.railway.app/app/user?email=${user?.email}`
      )
      .then((res) => {
        setSavedUser(res.data.user);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            CourseLounge
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/"
                >
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/courses"
                >
                  Courses
                </Link>
              </MenuItem>
              {savedUser?.isAdmin && (
                <MenuItem>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/dashboard/add-course"
                  >
                    Dashboard
                  </Link>
                </MenuItem>
              )}
              {user?.email
                ? [
                    <MenuItem key={"displayName"} onClick={handleCloseNavMenu}>
                      <Link
                        to="/profile"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Avatar alt="Remy Sharp" src={user?.photoURL} />
                        {user?.displayName}
                      </Link>
                    </MenuItem>,
                    <MenuItem key={"logoutButton"} onClick={handleCloseNavMenu}>
                      <Button
                        onClick={handleLogOut}
                        color="secondary"
                        variant="contained"
                      >
                        Logout
                      </Button>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key={"signIn"} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to="/login"
                      >
                        Sign In
                      </Link>
                    </MenuItem>,
                    <MenuItem key={"signUp"} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" } }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CourseLounge
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem>
              <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/courses"
              >
                Courses
              </Link>
            </MenuItem>
            {savedUser?.isAdmin && (
              <MenuItem>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/dashboard/add-course"
                >
                  Dashboard
                </Link>
              </MenuItem>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: "60px" }}>
            {user?.email
              ? [
                  <MenuItem key={"displayNameLarge"}>
                    <Link
                      to="/profile"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar alt="Remy Sharp" src={user?.photoURL} />
                      {user?.displayName}
                    </Link>
                  </MenuItem>,
                  <MenuItem key={"logoutLarge"}>
                    <Button
                      onClick={handleLogOut}
                      color="secondary"
                      variant="contained"
                    >
                      Logout
                    </Button>
                  </MenuItem>,
                ]
              : [
                  <MenuItem key={"signInLarge"}>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/login"
                    >
                      Sign In
                    </Link>
                  </MenuItem>,
                  <MenuItem key={"signUpLarge"}>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </MenuItem>,
                ]}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
