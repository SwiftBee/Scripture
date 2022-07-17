import Popup from "reactjs-popup";
import themeConstants from "./theme";
import { 
  Box,
  Button 
} from "@mui/material";
import PropTypes from 'prop-types';

/**
  * @author Bryan Caldeira <bryancaldeira22@gmail.com>
  * @component
  * @summary
  * The Modal component
  * @returns {React.ReactElement}
*/

const Modal = (props) => {
  const {isOpen, setClose, content} = props;
  
  return (
    <Popup 
      open={isOpen} 
      position="center center" 
      closeOnDocumentClick 
      modal={true} 
      lockScroll={true}>
      <Box
        backgroundColor={themeConstants.BG_MODAL_CLR}
        position="fixed"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="100vh"
        top="0"
        left="0">
        <Box
          maxWidth="768px"
          maxHeight="500px"
          width="90%"
          height="400px"
          borderRadius="20px"
          padding={themeConstants.PRIMARY_PDD}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          position="relative"
          backgroundColor="background.default">
          <Button
            onClick={setClose}
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "1.3rem",
            }}
            color="danger">X</Button>
          {content}
        </Box>
      </Box>
    </Popup>
  )
};

Modal.propTypes = {
  /**
   * If this is set to true Modal is open else Modal is closed
  */
  isOpen: PropTypes.bool.isRequired,
  /**
    * This is used to close the Modal
  */
  setClose: PropTypes.func.isRequired,
  /**
    * This is the content to be displayed in the modal
  */
  content: PropTypes.array.isRequired,
}

Modal.defaultProps = {
  isOpen: false
}

export default Modal;
