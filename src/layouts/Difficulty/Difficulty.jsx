import React, { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

// @mui components
import { useTheme } from "@mui/material/styles";
import Radio from "../../components/MUI/Radio";
import IconButton from "../../components/MUI/IconButton";
import RadioGroup from "../../components/MUI/RadioGroup";
import FormLabel from "../../components/MUI/FormLabel";
import FormControl from "../../components/MUI/FormControl";
import FormControlLabel from "../../components/MUI/FormControlLabel";

// prop-types
import PropTypes from "prop-types";

// own components
import Container from "../../components/Container/Container";

// @mui icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material/";

// context
import { useLanguage } from "../../context/Language";
import { useGame } from "../../context/Game";
import { useAudioController } from "../../context/AudioController";
import { useAudioConfig } from "../../context/AudioConfig";

const Difficulty = (props) => {
  const { languageState } = useLanguage();
  const { audioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();
  const { gameState, setGameState } = useGame();
  const theme = useTheme();

  useEffect(() => {
    const difficulty = localStorage.getItem("memory-difficulty");
    console.log(difficulty);
    if (difficulty === null) {
      setGameState({ type: "difficulty", to: "easy" });
    } else setGameState({ type: "difficulty", to: difficulty });
    setOpenMenu(true);
  }, []);

  const playSound = (sound) => {
    if (audioConfigState.sfx) setAudioControllerState({ type: sound });
  };

  const { sx } = props;

  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
  });

  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (e) => {
    setGameState({ type: "difficulty", to: e.target.value });
  };

  const toggleMenu = () => {
    playSound("pop-up");
    setOpenMenu(!openMenu);
    const difficulty = localStorage.getItem("memory-difficulty");
    if (difficulty !== gameState.difficulty) {
      localStorage.setItem("memory-difficulty", gameState.difficulty);
      window.location.reload();
    }
  };

  return (
    <Container
      sx={{
        left: 0,
        position: "fixed",
        background: "#222",
        padding: "10px",
        transition: "all 400ms ease",
        zIndex: 99,
        transform: openMenu ? "translateX(0px)" : "translateX(-125px)",
        opacity: openMenu ? 1 : 0.2,
        "&:hover": {
          opacity: 1,
        },
        display: "flex",
        alignItems: "center",
        paddingBottom: 0,
        ...sx,
      }}
      ref={ref}
    >
      <FormControl>
        <FormLabel sx={{ color: theme.palette.primary.contrastText }}>
          {languageState.texts.Labels.Difficulty}
        </FormLabel>
        <RadioGroup
          value={gameState.difficulty}
          onChange={handleChange}
          aria-labelledby="difficulty"
        >
          <FormControlLabel
            value="easy"
            sx={{ color: theme.palette.primary.contrastText }}
            control={<Radio sx={{ marginBottom: "3px" }} />}
            label={languageState.texts.Difficulty.Easy}
          />
          <FormControlLabel
            value="medium"
            sx={{ color: theme.palette.primary.contrastText }}
            control={<Radio sx={{ marginBottom: "3px" }} />}
            label={languageState.texts.Difficulty.Medium}
          />
          <FormControlLabel
            value="hard"
            sx={{ color: theme.palette.primary.contrastText }}
            control={<Radio sx={{ marginBottom: "3px" }} />}
            label={languageState.texts.Difficulty.Hard}
          />
        </RadioGroup>
      </FormControl>
      <Container justifyContent="center">
        <IconButton onClick={toggleMenu} color="primary" aria-label="delete">
          {openMenu ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Container>
    </Container>
  );
};

Difficulty.defaultProps = {
  sx: {},
};

Difficulty.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
};

export default Difficulty;
