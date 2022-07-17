import { Fragment } from "react";
import { CircularProgress, Box } from "@mui/material";
import themeConstants from "./theme";

/**
  * @author Bryan Caldeira <bryancaldeira22@gmail.com>
  * @component
  * @summary
  * The ProgressLoader component
  * @returns {React.ReactElement}
*/

const ProgressLoader = (props) => {
  return (
    <Box
      backgroundColor="background.default"
      display="grid"
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center">
      <CircularProgress
        size={themeConstants.PRIMARY_FSZ} 
        color="primary" />
    </Box>
  );
};

Header.propTypes = {}

Header.defaultProps = {}

export default ProgressLoader;
