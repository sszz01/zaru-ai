interface BurgerProps {
  toggleDrawer: () => void;
  BurgerIcon: string;
  style?: React.CSSProperties;
}
export function Burger({ toggleDrawer, BurgerIcon, style }: BurgerProps) {
  return (
    <button
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
        padding: "0.75rem",
        top: "2vh",
        left: "2vh",
        transition: "background-color 0.3s ease",
        zIndex: "1000",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "lightgray")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
    >
      <img
        src={BurgerIcon}
        alt="Menu"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </button>
  );
}
