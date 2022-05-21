import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

import CarouselLanding from "../../components/CarouselLanding/CarouselLanding";
import "./_LandingPage.scss";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="section-one">
        <div className="buttons">
          <Button
            className="buttons__button"
            variant="outlined"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="buttons__button"
            variant="outlined"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
        <h1 className="section-one__title">
          Encuentra la mejor calidad en tus viajes
        </h1>
      </div>
      <div className="section-two">
        <h1 className="section-two__title">¿Como trabajamos en HotelApp?</h1>
        <CarouselLanding />
      </div>
      <div className="footer">Footer</div>
    </>
  );
};
