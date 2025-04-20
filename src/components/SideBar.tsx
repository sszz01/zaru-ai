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
                backgroundColor: "#397c9b",
                borderRight: "none",
                alignItems: "center",
              },
            }} 
          >
            <div style={{ display: "flex", flexDirection: "row" , borderRadius:50, backgroundColor: '#d4e3ea', width: "90%", height: "4rem", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
              <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    margin:  "1rem",
                    backgroundColor: "#397c9b",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#4a98bd" },
                  }}
                >
                  <BurgerIcon sx={{ color: "#e0edf3" }} />
              </IconButton>

              <ToolTip title="Add new conversation" placement="bottom" arrow>
                <IconButton
                  onClick={() => {addConversation(); toggleDrawer();}}
                  sx={{
                    margin:  "1rem",
                    backgroundColor: "#397c9b",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#4a98bd" },
                  }}
                >
                  <AddIcon sx={{ color: "#e0edf3" }} />
                </IconButton>
              </ToolTip>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "75%", height:"4px", borderRadius: 50, backgroundColor: "#397c9b" }} />
            <ul>
            {conversationArray.map((conversation) => (
              <li key={conversation.id}>
                <div>
                  <button
                    onClick={() => loadConversation(conversation.id)} // Use conversation.id directly
                    style={{
                      marginTop: "1rem",
                      width: "200px",
                      height: "3rem",
                      backgroundColor: "#d4e3ea",
                      borderRadius: 10,
                      transition: "background-color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1d1d1")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d4e3ea")}
                  >
                    <text
                      style={{
                        fontSize: "1rem",
                        color: "#397c9b",
                        fontWeight: 600,
                        position: "relative",
                        left: "-2rem",
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