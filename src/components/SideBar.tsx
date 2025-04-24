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
                backgroundColor: "#e0edf3",
                borderRight: "none",
                alignItems: "center",
              },
            }} 
          >
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "4.5rem", backgroundColor: "#fafcfd", width: "100%"}}>
              <div style={{ display: "flex", justifyContent: "flex-start", padding : "0.5rem", gap: "0rem", position: "absolute", left:0, borderTopRightRadius:50, borderBottomRightRadius:50, backgroundColor: '#e0edf3', border :"2px solid #d4e3ea"}}>
                <ToolTip title="Close Sidebar" placement="bottom" arrow>
                  <IconButton
                      onClick={toggleDrawer}
                      sx={{
                        backgroundColor: "#397c9b",
                        width: "2.5vw",
                        height: "2.5vw",
                        maxHeight: "2.5rem",
                        maxWidth: "2.5rem",
                        transition: "background-color 0.3s ease",
                        "&:hover": { backgroundColor: "#4a98bd" },
                      }}
                    >
                      <BurgerIcon sx={{ color: "#e0edf3" }} />
                  </IconButton>
                </ToolTip>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end", padding : "0.5rem", gap: "1rem", position: "absolute", right:0, borderTopLeftRadius:50, borderBottomLeftRadius:50, backgroundColor: '#e0edf3', border :"2px solid #d4e3ea"}}>
                <ToolTip title="Add new conversation" placement="bottom" arrow>
                  <IconButton
                    onClick={() => {addConversation(); toggleDrawer();}}
                    sx={{
                      backgroundColor: "#397c9b",
                      height: "2.5vw",
                      width: "2.5vw",
                      maxHeight: "2.5rem",
                      maxWidth: "2.5rem",
                      transition: "background-color 0.3s ease",
                      "&:hover": { backgroundColor: "#4a98bd" },
                    }}
                  >
                    <AddIcon sx={{ color: "#e0edf3" }} />
                  </IconButton>
                </ToolTip>
              </div>
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