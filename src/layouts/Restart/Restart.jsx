import React from "react";

// tippy
import Tippy from "@tippyjs/react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import Button from "../../components/MUI/Button";

// @mui icons
import { RotateLeft } from "@mui/icons-material/";

//context
import { useLanguage } from "../../context/Language";

const Restart = (props) => {
  const { languageState } = useLanguage();

  return (
    <Tippy content={languageState.texts.Tooltips.Restart}>
      <Button
        sx={{
          position: "fixed",
          zIndex: 99,
          top: "10px",
          left: "10px",
          padding: "10px",
          transition: "all 400ms ease",
          opacity: 0.2,
          minWidth: "30px",
          background: "#222",
          "&:hover": {
            opacity: 1,
          },
        }}
        variant="contained"
        onClick={() => window.location.reload()}
      >
        <RotateLeft />
      </Button>
    </Tippy>
  );
};

Restart.defaultProps = {
  points: 0,
};

Restart.propTypes = {
  points: PropTypes.number,
};

export default Restart;
