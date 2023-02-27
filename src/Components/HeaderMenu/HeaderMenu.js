import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_PAGE } from "../../routes/consts";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/User/actions";
import logo from "../../images/logo.svg";
import * as Styled from "./HeaderMenu_style.js";
import CloseIcon from "@mui/icons-material/Close";
import { Slide } from "@mui/material";

function ResponsiveAppBar({ routes }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const menuReF = React.useRef(null);
  const openIconRef = React.useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setIsMenuOpen(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setIsMenuOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate(AUTH_PAGE);
  };

  return (
    <AppBar
      style={{ backgroundColor: "#bc9049", padding: "20px 0" }}
      position="static"
      id="back-to-top-anchor">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img style={{ width: "300px" }} src={logo} alt="logo" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              ref={openIconRef}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>

            {/* <Menu
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
              }}>
              {routes.map((page, index) => {
                if (!page.title) return false;
                return (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={page.path}
                      textAlign="center">
                      {page.title}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu> */}

            <Slide
              direction="right"
              in={isMenuOpen}
              enter="ease"
              exit="ease"
              mountOnEnter>
              <Styled.Menu
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
                ref={menuReF}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Box>
                    <>
                      <CloseIcon
                        style={{
                          position: "absolute",
                          top: "2rem",
                          right: "2rem",
                        }}
                        onClick={handleCloseNavMenu}
                      />
                      {routes.map((page, index) => {
                        if (!page.title) return false;
                        return (
                          <MenuItem key={index} onClick={handleCloseNavMenu}>
                            <Styled.Link
                              component={Link}
                              to={page.path}
                              textAlign="center">
                              {page.title}
                            </Styled.Link>
                          </MenuItem>
                        );
                      })}
                    </>
                  </Box>
                </Box>
              </Styled.Menu>
            </Slide>
          </Box>
          <Typography
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "clamp(1rem, -0.875rem + 8.333vw, 1.5rem);",
            }}>
            FUNDACJA SANTAHERBA
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "100px",
            }}>
            {routes.map((page, index) => {
              if (!page.title) return false;
              return (
                <Button
                  key={index}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "bold",
                    fontSize: "18",
                  }}>
                  {page.title}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <Button onClick={logout}>Log out</Button>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
