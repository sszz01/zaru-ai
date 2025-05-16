import BackgroundImage from "../../../assets/newbg1.svg";

const Styles = {
    container:{
        backgroundColor: '#fafcfd',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    profileContainer:{
        width: '15%',
        height: '50%',
        borderRadius: 50,
        backgroundColor: '#efeff1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuButton:{
        backgroundColor: '#fff',
        color: '#42738a',
        border: '2px solid #d4e3ea',
        fontSize: 18,
        width: "75%",
        height: '3rem',
        margin: '0.25rem',
        borderRadius: "10px",
        cursor: 'pointer',
        transition: "none",
        fontFamily: 'Montserrat, sans-serif',
    },

    menuButtonText:{
        color: '#5e646e',
        fontWeight: 600,
        fontSize: 18,
        fontFamily: 'Montserrat, sans-serif',
    },

    userInfo:{
        padding: '0.5rem', 
        backgroundColor: '#fff', 
        color: '#848b95', 
        borderRadius: '10px', 
        border: '1px solid #dddfe2', 
        fontWeight: 600,
    },

    label:{
        color: '#5e646e', 
        fontWeight: 600, 
        fontSize: 14, 
        fontFamily: 'Montserrat, sans-serif'
    },

    title:{
        color: '#232629', 
        marginBottom: '1rem', 
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 26,
        fontWeight: 700,
    },
}

export default Styles;