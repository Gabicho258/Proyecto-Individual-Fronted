import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import {
  updateUserAsync,
  userLoggued,
  userToEdit,
} from "../../slices/userSlice";
import { cloudinary_constant } from "../../utils/cloudinaryFunctions";
import "./_UserProfile.scss";

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userLoggued);

  const [readOnly, setReadOnly] = useState(true);
  const [editading, setEditading] = useState(false);
  // cloudinary part
  const [photoUserUrl, setPhotoUserUrl] = useState("");
  const [photoName, setPhotoName] = useState("Choose file...");

  const showWidgetPhotoUser = () => {
    window.cloudinary.openUploadWidget(
      cloudinary_constant("user_photos"),
      (err, result) => {
        if (!err && result?.event === "success") {
          const { secure_url, original_filename, format } = result.info;
          console.log(result.info);
          setPhotoUserUrl(secure_url);
          setPhotoName(`${original_filename}.${format}`);
        }
      }
    );
  };
  ////////
  const handleCancel = () => {
    setEditading(!editading);
    setReadOnly(!readOnly);
    window.location.reload();
  };
  const handleSubmit = async ({ target }) => {
    setReadOnly(!readOnly);
    setEditading(!editading);
    const userToEdit = {
      first_name: target[0].value,
      last_name: target[2].value,
      phone: target[4].value,
      dni: target[6].value,
      photo_url: photoUserUrl,
    };
    await dispatch(updateUserAsync({ id: user._id, ...userToEdit }));
    window.location.reload();
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <NavBar />
      <Container className="user-profile">
        <div className="user-profile__left">
          <h1>User Profile</h1>
          <Avatar sx={{ width: 256, height: 256 }} src={user?.photo_url} />
          <h3>
            {user?.first_name} {user?.last_name}
          </h3>
        </div>
        {user && (
          <div className="user-profile__right">
            <h2>Información del cliente</h2>
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
                      style={{ width: "43.5%" }}
                      required
                      disabled={readOnly}
                      InputProps={{ readOnly }}
                      id="name"
                      type="text"
                      label="Nombres"
                      defaultValue={user?.first_name}
                    />
                    <TextField
                      style={{ width: "43.5%" }}
                      required
                      disabled={readOnly}
                      InputProps={{ readOnly }}
                      id="lastName"
                      type="text"
                      label="Apellidos"
                      defaultValue={user?.last_name}
                    />

                    <TextField
                      type="number"
                      required
                      disabled={readOnly}
                      InputProps={{ readOnly }}
                      id="phone"
                      label="Número de teléfono"
                      defaultValue={user?.phone}
                    />
                    <TextField
                      type="number"
                      required
                      disabled={readOnly}
                      InputProps={{ readOnly }}
                      id="dni"
                      label="Número de DNI"
                      defaultValue={user?.dni}
                    />
                  </Box>

                  {!editading ? (
                    <Button
                      type="button"
                      variant="contained"
                      className="button_edit"
                      onClick={() => {
                        setReadOnly(!readOnly);
                        setEditading(!editading);
                      }}
                    >
                      Editar perfil
                    </Button>
                  ) : (
                    <>
                      <div className="input-file">
                        <span className="input-file-text">{photoName}</span>
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#FFFF",
                              color: "#000",
                              width: "10srem",
                              marginRight: "10px",
                              borderRadius: "10px",
                              fontSize: "14px",
                              fontFamily: "Roboto-bold",
                            }}
                            component="span"
                            onClick={showWidgetPhotoUser}
                            data-test-id="choose-file"
                          >
                            Choose File
                          </Button>
                        </label>
                      </div>
                      <Button
                        type="submit"
                        variant="contained"
                        className="button_save"
                      >
                        Guardar cambios
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        className="button_cancel"
                        onClick={() => {
                          handleCancel();
                        }}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </form>
              </FormControl>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
