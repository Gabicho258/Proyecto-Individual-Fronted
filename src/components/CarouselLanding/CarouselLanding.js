import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Grid from "@mui/material/Grid";
import "./_CarouselLanding.scss";
import { useState } from "react";

import {
  buscando,
  analizando,
  agendando,
  listo,
  calificar,
} from "../../images/images";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "Encuentra el hotel de tu preferencia",
    imgPath: buscando,
  },
  {
    label: "Analiza sus datos y calificaciones",
    imgPath: analizando,
  },
  {
    label: "Selecciona un horario y reserva una habitación",
    imgPath: agendando,
  },
  {
    label: "¡Listo! Asiste al hotel y disfruta de tu estadía",
    imgPath: listo,
  },
  {
    label: "Tu opinion es Importante, no olvides calificar al hotel",
    imgPath: calificar,
  },
];

function CarouselLanding() {
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="container-c">
      <div className="item-c">
        <Paper
          style={{ padding: "0px 30px", backgroundColor: "rgba(0, 0, 0, 0.0)" }}
          square
          elevation={0}
          className="typoContainer"
        >
          <Typography className="textHeader">
            {tutorialSteps[activeStep].label}
          </Typography>
        </Paper>
      </div>
      <div className="item-c">
        <div className="root">
          <AutoPlaySwipeableViews
            interval={5000}
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {tutorialSteps.map((step, index) => (
              <div key={step.label} className="imgContainer">
                {Math.abs(activeStep - index) <= 2 ? (
                  <img
                    className="imgCarrousel"
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.0)",
            }}
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselLanding;
