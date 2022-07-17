import { Link } from "react-router-dom";
import Logo from "../assets/png/Logo_Main.png";
// prettier-ignore
import {
  Box,
  Switch 
} from "@mui/material";
import Cookies from "js-cookie";
import PropTypes from 'prop-types';

/**
 * @author Bryan Caldeira <bryancaldeira22@gmail.com>
 * @component
 * @summary
 * The Header component
 * @returns {React.ReactElement}
*/

const Header = (props) => {
  const { isLightTheme, setIsLightTheme } = props;

  const handleChange = ({ target }) => {
    Cookies.set("theme_mode", target.checked ? "dark" : "light");
    setIsLightTheme(!target.checked);
  };

  return (
    <Box
      bgcolor="primary.main"
      display="flex"
      flexGrow="1"
      position="relative"
      height="80px"
      zIndex="999"
      justifyContent="center"
      alignItems="center">
      <Link to="/">
        <img src={Logo} alt="logo" width="150px" />
      </Link>
      <Switch
        sx={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)"
        }}
        checked={!isLightTheme}
        onChange={handleChange}
        defaultChecked
        color="secondary" />
    </Box>
  );
};

Header.propTypes = {
  /**
    * If this is set to true theme is 'light' else it is 'dark'
  */
  isLightTheme: PropTypes.bool.isRequired,
  /**
    * This is used to update the isLightTheme variable value
  */
  setIsLightTheme: PropTypes.func.isRequired,
}

Header.defaultProps = {
  isLightTheme: false
}

export default Header;