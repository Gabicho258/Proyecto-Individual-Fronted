import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { createUserAsync } from "../../slices/userSlice";
import "./_Register.scss";

export const Register = () => {
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async ({ target }) => {
    const userToRegister = {
      first_name: target[0].value,
      last_name: target[2].value,
      email: target[4].value,
      password: target[6].value,
      phone: target[8].value,
      dni: target[10].value,
      role,
    };
    const response = await dispatch(createUserAsync(userToRegister));
    response.type === "user/create/fulfilled" && navigate("/login");
  };
  return (
    <div className="register-container">
      <div className="register-container__left">
        <div className="register-container__left__content">
          <h1 className="title">
            Es un gusto acojerte en HotelApp. ¡Bienvenido!
          </h1>
          <p className="description">
            En HotelApp te damos la bienvenida a una nueva experiencia de
            busqueda de hoteles a tú medida
            <br />
          </p>
          <span>
            ¿Ya tienes cuenta en HotelApp? Inicia sesión{" "}
            <Link to="/login"> aquí</Link>
          </span>
        </div>
      </div>
      <div className="register-container__right">
        <h1>Registrate</h1>
        <div className="form-container">
          <FormControl className="formContainer">
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ color: "#000" }}
              className="radio-label"
            >
              Registrate como:
            </FormLabel>
            <RadioGroup
              row
              style={{
                width: "100%",
                marginBottom: "1rem",
                justifyContent: "space-around",
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="owner"
              name="radio-buttons-group"
            >
              <FormControlLabel
                className="radio_button"
                value="owner"
                control={<Radio />}
                label="Dueño"
                checked={role === "owner"}
                onClick={() => setRole("owner")}
              />
              <FormControlLabel
                className="radio_button"
                value="user"
                control={<Radio />}
                label="Usuario"
                checked={role === "user"}
                onClick={() => setRole("user")}
              />
            </RadioGroup>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister(e);
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
                  style={{ width: "44%" }}
                  required
                  id="name"
                  type="text"
                  label="Nombres"
                />
                <TextField
                  style={{ width: "44%" }}
                  required
                  id="lastName"
                  type="text"
                  label="Apellidos"
                />
                <TextField
                  required
                  id="email"
                  type="email"
                  label="Correo electrónico"
                />
                <TextField
                  type="password"
                  required
                  id="password"
                  label="Contraseña"
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
                  id="dni"
                  label="Número de DNI"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                className="button_login"
              >
                Registrarse
              </Button>
            </form>
          </FormControl>
        </div>
      </div>
    </div>
  );
};
