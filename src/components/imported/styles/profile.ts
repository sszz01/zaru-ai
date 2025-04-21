import BackgroundImage from '../../../assets/background2.svg';

const Styles = {
    container:{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileContainer:{
        width: '15%',
        height: '50%',
        borderRadius: 50,
        backgroundColor: '#eaf2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuButton:{
        backgroundColor: 'fafcfd',
        color: '#42738a',
        border: '2px solid #d4e3ea',
        fontWeight: 500,
        fontSize: 18,
        width: "65%",
        height: '3rem',
        margin: '0.25rem',
        borderRadius: "10px",
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: '#d1d1d1',
        },
        fontFamily: 'Montserrat, sans-serif',
    }
}

export default Styles;