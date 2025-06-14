import { Drawer, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ToolTip from "@mui/material/Tooltip";
import { Burger } from "./Burger";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface SideBarProps {
  toggleDrawer: () => void;
  handleDrawer: boolean;
  conversationArray: { id: number; name: string }[];
  loadConversation: (id: number) => void;
  addConversation: () => void;
  deleteConversation: (id: number) => void;
}

const styles = {
  primary: {
    color: "#232629",
    fontFamily: "Poppins, sans-serif",
  },
  secondary: {
    color: "#5e646e",
    fontFamily: "Poppins, sans-serif",
  },
}

const SideBar: React.FC<SideBarProps> = ({
  toggleDrawer,
  handleDrawer,
  conversationArray,
  loadConversation,
  addConversation,
  deleteConversation,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    conversationId: number
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedConversationId(conversationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConversationId(null);
  };

  const handleDelete = () => {
    if (selectedConversationId !== null) {
      deleteConversation(selectedConversationId);
    }
    handleMenuClose();
  };

  return (
    <Drawer
      anchor="left"
      open={handleDrawer}
      onClose={toggleDrawer}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          width: "14vw",
          backgroundColor: "fff",
          borderRight: "none",
          alignItems: "center",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "4.5rem",
          backgroundColor: "transparent",
          width: "100%",
          borderTopRightRadius: "30px",
        }}
      >
        <ToolTip title="Close Sidebar" placement="bottom" arrow>
          <Burger toggleDrawer={toggleDrawer} />
        </ToolTip>
        <ToolTip title="Add new conversation" placement="bottom" arrow>
          <button
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              backgroundColor: "#fff",
              color: "#232629",
              position: "absolute",
              width: "3vw",
              height: "3vw",
              borderRadius: "50%",
              padding: "0.75rem",
              top: "2vh",
              right: "2vh",
              transition: "background-color 0.3s ease",
              zIndex: "1000",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "lightgray")
            }
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
            onClick={addConversation}
          >
            <AddIcon sx={{ color: "#232629" }} />
          </button>
        </ToolTip>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: "0.75rem",
            fontWeight: "bold",
            color: "#5e646e",
            fontFamily: "Poppins, sans-serif",
            marginLeft: "10%",
          }}
        >
          Conversations
        </Typography>
      </div>

      <ul>
        {conversationArray.map((conversation) => (
          <li key={conversation.id}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => loadConversation(conversation.id)}
                style={{
                  marginTop: "1rem",
                  width: "13vw",
                  height: "3rem",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 0.5rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d1d1d1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#848b95",
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
                    flex: 1,
                    textAlign: "left",
                    paddingLeft: "0.5rem",
                  }}
                >
                  {conversation.name}
                </Typography>

                <button
                  onClick={(e) => handleMenuClick(e, conversation.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <MoreVertIcon
                    sx={{
                      color: "#848b95",
                      fontSize: "1.2rem",
                    }}
                  />
                </button>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {conversationArray.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "10rem",
            color: "#999",
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
            }}
          >
            No conversations yet.
            <br />
            Start a new one!
          </Typography>
        </div>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleDelete}
          sx={{
            color: "#d32f2f",
            fontFamily: "Poppins, sans-serif",
            "&:hover": {
              backgroundColor: "#ffebee",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#d32f2f",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
            }}
          >
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </Drawer>
  );
};
export default SideBar;
