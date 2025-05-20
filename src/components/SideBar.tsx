import { Drawer } from "@mui/material";
import BurgerIcon from "../assets/burgericon.svg";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "@mui/material/Tooltip";
import { Burger } from "./Burger";
import '@fontsource/poppins/400.css';

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
            variant="persistent"
            sx={{
              "& .MuiDrawer-paper": {
                width: "15vw",
                backgroundColor: "fff",
                borderRight: "none",
                alignItems: "center",
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
                border: "2px solid #dddfe2",
              },
            }} 
          >
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "4.5rem", backgroundColor: "transparent", width: "100%", borderTopRightRadius: "30px",}}>
                <ToolTip title="Close Sidebar" placement="bottom" arrow>
                  <Burger toggleDrawer={toggleDrawer} BurgerIcon={BurgerIcon} />
                </ToolTip>
                <ToolTip title="Add new conversation" placement="bottom" arrow>
                  <button style={{cursor: "pointer",
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
                      padding: '0.75rem',
                      top: "2vh",
                      right: "2vh",
                      transition: "background-color 0.3s ease",
                      zIndex: "1000"
                    }} onMouseOver={e => e.currentTarget.style.backgroundColor = "lightgray"} onMouseOut={e => e.currentTarget.style.backgroundColor = "#fff"} onClick={addConversation}>
                    
                    <AddIcon sx={{color: "#232629"}} />
                  </button>
                </ToolTip>
            </div>

            <label style={{ marginTop: "10%", fontSize: "1rem", position: 'relative', left: '-10%', fontWeight: "bold", color: '#5e646e', fontFamily: '"Poppins", sans-serif', }}>Conversations</label>

            <ul>
            {conversationArray.map((conversation) => (
              <li key={conversation.id}>
                <div>
                  <button
                    onClick={() => loadConversation(conversation.id)} // Use conversation.id directly
                    style={{
                      marginTop: "1rem",
                      width: '13vw',
                      height: "3rem",
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      transition: "background-color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1d1d1")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                  >
                    <text
                      style={{
                        fontSize: "1rem",
                        color: "#848b95",
                        fontWeight: 600,
                        position: "relative",
                        left: "-1.5rem",
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