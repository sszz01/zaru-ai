import BurgerIcon from "@mui/icons-material/Menu";
interface BurgerProps {
    toggleDrawer: () => void;
    style?: React.CSSProperties
}
export function Burger({
    toggleDrawer,
    style
}: BurgerProps) {
return <span
    onClick={toggleDrawer}
    style={{
        ...style,
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
        maxWidth: "50px",
        maxHeight: "50px",
        borderRadius: "50%",
        padding: '0.75rem',
        top: "2vh",
        left: "2vh",
        transition: "background-color 0.3s ease",
        zIndex: "1000",
        outline: "none"
    }}
    tabIndex={0}
    role="button"
    onMouseOver={e => (e.currentTarget as HTMLElement).style.backgroundColor = "lightgray"}
    onMouseOut={e => (e.currentTarget as HTMLElement).style.backgroundColor = "#fff"}
    onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
            toggleDrawer();
        }
    }}
>
    <BurgerIcon />
</span>;
}
  