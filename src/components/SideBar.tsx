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

const SideBar: React.FC<SideBarProps> = ({ toggleDrawer, handleDrawer, conversationArray, loadConversation, addConversation }) => {
    return (
        <Drawer
            anchor="left"
            open={handleDrawer}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: "250px",
                backgroundColor: "#f8fafc",
                borderRight: "none",
                alignItems: "center",
              },
            }} 
          >
            <div style={{ display: "flex", flexDirection: "row"}}>
              <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    margin:  "1rem",
                    backgroundColor: "#d9d9d9",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#b3b3b3" },
                  }}
                >
                  <BurgerIcon />
              </IconButton>

              <ToolTip title="Add new conversation" placement="bottom" arrow>
                <IconButton
                  onClick={() => {addConversation(); toggleDrawer();}}
                  sx={{
                    margin:  "1rem",
                    backgroundColor: "#d9d9d9",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#b3b3b3" },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ToolTip>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "85%", height:"3px", borderRadius: 50, backgroundColor: "lightgrey" }} />
            <ul>
                {conversationArray.map((conversation) => (
                <li key={conversation.id}>
                    <div>
                        <button onClick={() => loadConversation(conversationArray[0]?.id)} style={{ 
                            marginTop: "1rem", 
                            width: "200px",
                            height: "45px", 
                            backgroundColor:"#f8fafc", 
                            borderRadius: 5, 
                            transition: "background-color 0.3s ease" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1d1d1")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}>
                            
                            <text style={{ fontSize: "1rem", color: "#4b5563", fontWeight: 600, position : "relative", left: "-2rem" }}>
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