import React from "react";
import { Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import "@fontsource/poppins/400.css";

interface DropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleMenuClose: () => void;
  handleTransition: (action: () => void) => void;
  navigate: (path: string) => void;
  userRole: string;
  handleLogout: () => void;
  styles: React.CSSProperties & { poppins?: React.CSSProperties };
}

export function Dropdown({
  anchorEl,
  open,
  handleMenuClose,
  handleTransition,
  navigate,
  userRole,
  handleLogout,
  styles,
}: DropdownProps) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#ffffff",
          color: "#5e646e",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
        "& .MuiMenuItem-root": {
          "&:hover": {
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          },
        },
      }}
    >
      <MenuItem
        id="profile"
        sx={{
          ...styles.poppins,
          fontSize: 15,
          borderRadius: 2,
          color: "#5e646e",
          fontFamily: "Poppins",
          gap: 0.8,
        }}
        onClick={() => {
          handleMenuClose();
          handleTransition(() => navigate("/profile"));
        }}
      >
        <PersonIcon fontSize="large" />
        Profile
      </MenuItem>

      <MenuItem
        id="settings"
        sx={{
          ...styles.poppins,
          fontSize: 15,
          borderRadius: 2,
          color: "#5e646e",
          fontFamily: "Poppins",
          gap: 0.8,
        }}
        onClick={() => {
          handleMenuClose();
          handleTransition(() => console.log("Settings clicked"));
        }}
      >
        <SettingsIcon fontSize="large" />
        Settings
      </MenuItem>

      {userRole === "admin" && (
        <MenuItem
          sx={{
            ...styles.poppins,
            fontSize: 15,
            borderRadius: 2,
            color: "#5e646e",
            fontFamily: "Poppins",
            gap: 0.8,
          }}
          onClick={() => {
            handleMenuClose();
            handleTransition(() => navigate("/dashboard"));
          }}
        >
          <DashboardIcon fontSize="large" />
          Admin Dashboard
        </MenuItem>
      )}

      <Divider
        sx={{
          my: 1,
          bgcolor: "lightgray",
        }}
      />

      <MenuItem
        id="logout"
        sx={{
          ...styles.poppins,
          fontSize: 15,
          borderRadius: 2,
          color: "#ff0000",
          fontFamily: "Poppins",
          gap: 0.8,
        }}
        onClick={() => {
          handleLogout();
          handleTransition(() => navigate("/"));
        }}
      >
        <LogoutIcon fontSize="large" />
        Log Out
      </MenuItem>
    </Menu>
  );
}
