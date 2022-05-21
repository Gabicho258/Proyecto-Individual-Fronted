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

import { loginUserAsync } from "../../slices/userSlice";
import "./_Login.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const handleLogin = async ({ target }) => {
    const userToLogin = {
      email: target[0].value,
      password: target[2].value,
      role,
    };
    const response = await dispatch(loginUserAsync(userToLogin));
    response.type === "loginUser/fulfilled" &&
      (role === "user" ? navigate("/search") : navigate("/myhotels"));
  };

  return (
    <div className="login-container">
      <div className="login-container__left">
        <div className="login-container__left__content">
          <h1 className="title">Es bueno tenerte de nuevo en HotelApp</h1>
          <p className="description">
            En HotelApp valoramos a nuestros usuarios por lo que día a día
            intentamos mejorar nuestra aplicación
            <br />
          </p>
          <span>
            ¿Eres nuevo en HotelApp? Crea una cuenta{" "}
            <Link to="/register"> aquí</Link>
          </span>
        </div>
      </div>
      <div className="login-container__right">
        <h1>Iniciar sesión</h1>
        <div className="form-container">
          <FormControl className="formContainer">
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ color: "#000" }}
              className="radio-label"
            >
              Iniciar sesión como:
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
                handleLogin(e);
              }}
            >
              <Box
                component="div"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
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
              </Box>
              <Button
                type="submit"
                variant="contained"
                className="button_login"
              >
                Iniciar sesión
              </Button>
            </form>
          </FormControl>
        </div>
      </div>
    </div>
  );
};
