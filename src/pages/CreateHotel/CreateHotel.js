import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { createHotelAsync } from "../../slices/hotelSlice";
import { userLoggued } from "../../slices/userSlice";

import "./_CreateHotel.scss";

export const CreateHotel = () => {
  const user = useSelector(userLoggued);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ target }) => {
    const hotelToCreate = {
      name: target[0].value,
      phone: target[2].value,
      whatsapp: target[4].value,
      whatsapp_link: `https://wa.me/51${target[4].value}`,
      address: target[6].value,
      email: target[8].value,
      description: target[10].value,
      wifi: target[13].checked,
      pool: target[14].checked,
      restaurant: target[15].checked,
      gym: target[16].checked,
      parking: target[17].checked,
      tv: target[18].checked,
      owner_id: user._id,
    };
    const response = await dispatch(
      createHotelAsync({ hotel: hotelToCreate, id: user._id })
    );
    response.type === "hotel/create/fulfilled" && navigate("/myhotels");
    console.log(response);
  };

  return (
    <>
      <NavBar />
      <div className="create-container">
        <div className="create-container__left">
          <div className="create-container__left__content">
            <h1 className="title">Crea un nuevo hotel en HotelApp.</h1>
            <p className="description">
              Crea un nuevo hotel para permitirles a los usuarios conocer de tu
              negocio y poder ser parte de el.
              <br />
            </p>
          </div>
        </div>
        <div className="create-container__right">
          <h1>Ingresa los datos</h1>
          <div className="form-container">
            <FormControl className="formContainer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <Box
                  component="div"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "90%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="name"
                    type="text"
                    label="Nombre del hotel"
                  />
                  <TextField
                    type="number"
                    required
                    id="phone"
                    label="Número de teléfono"
                  />
                  <TextField
                    type="number"
                    required
                    id="whatsapp"
                    label="Número de WhatsApp"
                  />
                  <TextField
                    required
                    id="address"
                    type="text"
                    label="Dirección del hotel"
                  />
                  <TextField
                    id="email"
                    type="email"
                    label="Correo electrónico del hotel"
                  />
                  <TextField
                    required
                    multiline
                    id="description"
                    type="text"
                    rows={3}
                    label="Descripción del hotel"
                  />
                  <h3>Servicios: </h3>
                  <FormGroup
                    style={{
                      textAlign: "left",
                      marginLeft: "30px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <br />
                    <FormControlLabel
                      key={1}
                      control={
                        <Checkbox
                          color="success"
                          //   onChange={(e) => {
                          //     handleSelectDogs(pet, e);
                          //   }}

                          name={"wifi"}
                        />
                      }
                      label="Wi-Fi"
                    />
                    <FormControlLabel
                      key={2}
                      control={
                        <Checkbox
                          color="success"
                          //   onChange={(e) => {
                          //     handleSelectDogs(pet, e);
                          //   }}
                          name={"pool"}
                        />
                      }
                      label="Piscina"
                    />
                    <FormControlLabel
                      key={3}
                      control={
                        <Checkbox
                          color="success"
                          //   onChange={(e) => {
                          //     handleSelectDogs(pet, e);
                          //   }}
                          name={"restaurant"}
                        />
                      }
                      label="Restaurante"
                    />
                    <FormControlLabel
                      key={4}
                      control={
                        <Checkbox
                          color="success"
                          //   onChange={(e) => {
                          //     handleSelectDogs(pet, e);
                          //   }}
                          name={"gym"}
                        />
                      }
                      label="GYM"
                    />
                    <FormControlLabel
                      key={5}
                      control={
                        <Checkbox
                          color="success"
                          //   onChange={(e) => {
                          //     handleSelectDogs(pet, e);
                          //   }}
                          name={"parking"}
                        />
                      }
                      label="Parking"
                    />
                    <FormControlLabel
                      key={6}
                      control={
                        <Checkbox
                          color="success"
                          //   onChange={(e) => {
                          //     handleSelectDogs(pet, e);
                          //   }}
                          name={"tv"}
                        />
                      }
                      label="TV"
                    />
                  </FormGroup>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  className="button_login"
                >
                  Crear hotel
                </Button>
              </form>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};
