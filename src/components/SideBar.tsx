import { IconButton, Drawer } from "@mui/material";
import BurgerIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "@mui/material/Tooltip";

interface SideBarProps {
    toggleDrawer: () => void;
    handleDrawer: boolean;
    conversationArray: { id: number; name: string }[];
    loadConversation: (id: number) => void;
    addConversation: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ toggleDrawer, handleDrawer, conversationArray, loadConversation, addConversation, }) => {
    return (
        <Drawer
            anchor="left"
            open={handleDrawer}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: "250px",
                backgroundColor: "linear-gradient(to bottom, #fafcfd, #e0edf3)",
                borderRight: "none",
                alignItems: "center",
              },
            }} 
          >
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "4.5rem", backgroundColor: "#e0edf3", width: "100%", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0)", borderBottom: "2px solid #d4e3ea"}}>
                <ToolTip title="Close Sidebar" placement="bottom" arrow>
                  <IconButton
                      onClick={toggleDrawer}
                      sx={{
                        backgroundColor: "#fafcfd",
                        border: "2px solid #d4e3ea",
                        position: "absolute",
                        left: "1rem",
                        width: "2.5vw",
                        height: "2.5vw",
                        maxHeight: "2.5rem",
                        maxWidth: "2.5rem",
                        transition: "background-color 0.3s ease",
                        "&:hover": { backgroundColor: "#d4e3ea" },
                      }}
                    >
                      <BurgerIcon sx={{ color: "#a5b2b8" }} />
                  </IconButton>
                </ToolTip>
                <ToolTip title="Add new conversation" placement="bottom" arrow>
                  <IconButton
                    onClick={() => {addConversation(); toggleDrawer();}}
                    sx={{
                      backgroundColor: "#fafcfd",
                      border: "2px solid #d4e3ea",
                      position: "absolute",
                      right: "1rem",
                      height: "2.5vw",
                      width: "2.5vw",
                      maxHeight: "2.5rem",
                      maxWidth: "2.5rem",
                      transition: "background-color 0.3s ease",
                      "&:hover": { backgroundColor: "#d4e3ea" },
                    }}
                  >
                    <AddIcon sx={{ color: "#a5b2b8" }} />
                  </IconButton>
                </ToolTip>
            </div>

            <ul>
            {conversationArray.map((conversation) => (
              <li key={conversation.id}>
                <div>
                  <button
                    onClick={() => loadConversation(conversation.id)} // Use conversation.id directly
                    style={{
                      marginTop: "1rem",
                      width: "220px",
                      height: "3rem",
                      backgroundColor: "#fafcfd",
                      borderRadius: 10,
                      transition: "background-color 0.3s ease",
                      cursor: "pointer",
                      border: "2px solid #d4e3ea",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1d1d1")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fafcfd")}
                  >
                    <text
                      style={{
                        fontSize: "1rem",
                        color: "#397c9b",
                        fontWeight: 600,
                        position: "relative",
                        left: "-1.8rem",
                      }}
                    >
                      {conversation.name}
                    </text>
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </Drawer>
    );
}
export default SideBar;