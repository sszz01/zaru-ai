import { IconButton, Drawer } from "@mui/material";
import BurgerIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "@mui/material/Tooltip";

interface SideBarProps {
    toggleDrawer: () => void;
    handleDrawer: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggleDrawer, handleDrawer }) => {
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
        </Drawer>
    );
}
export default SideBar;