import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Tab,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import { playa } from "../../images/images";
import {
  getHotelByIdAsync,
  hotelSelected,
  updateHotelAsync,
} from "../../slices/hotelSlice";
import { cloudinary_constant } from "../../utils/cloudinaryFunctions";
import "./_EditHotel.scss";

export const EditHotel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hotel = useSelector(hotelSelected);

  // cloudinary part

  const [photosHotelUrl, setPhotosHotelUrl] = useState([]);
  const [photoName, setPhotoName] = useState("");

  const showWidgetPhotoHotel = () => {
    window.cloudinary.openUploadWidget(
      cloudinary_constant("hotel_photos"),
      (err, result) => {
        if (!err && result?.event === "success") {
          const { secure_url, original_filename, format } = result.info;
          console.log(result.info);
          setPhotosHotelUrl([...photosHotelUrl, secure_url]);
          setPhotoName(`${photoName} ${original_filename}.${format}, `);
        }
      }
    );
  };
  ////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = async ({ target }) => {
    const hotelToUpdate = {
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
      id,
      images: [...hotel?.images, ...photosHotelUrl],
    };
    await dispatch(updateHotelAsync(hotelToUpdate));
    await dispatch(getHotelByIdAsync(id));
    navigate("/myhotels");
  };

  useEffect(() => {
    dispatch(getHotelByIdAsync(id));
  }, []);

  return (
    <>
      <NavBar />
      <Container className="hotel-profile">
        <div className="hotel-profile__left">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              {hotel?.images.map((image, index) => (
                <TabPanel key={index} value={`${index + 1}`}>
                  <img src={image} alt="" className="main-slide" />
                </TabPanel>
              ))}

              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {hotel?.images.map((image, index) => (
                    <Tab
                      key={index}
                      icon={<img src={image} alt="" className="slide" />}
                      value={`${index + 1}`}
                    />
                  ))}
                </TabList>
              </Box>
            </TabContext>
          </Box>
        </div>
        {hotel && (
          <div className="hotel-profile__right">
            <h2>Información del hotel</h2>
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
                      defaultValue={hotel?.name}
                    />
                    <TextField
                      type="number"
                      required
                      id="phone"
                      label="Número de teléfono"
                      defaultValue={hotel?.phone}
                    />
                    <TextField
                      type="number"
                      required
                      id="whatsapp"
                      label="Número de WhatsApp"
                      defaultValue={hotel?.whatsapp}
                    />
                    <TextField
                      required
                      id="address"
                      type="text"
                      label="Dirección del hotel"
                      defaultValue={hotel?.address}
                    />
                    <TextField
                      id="email"
                      type="email"
                      label="Correo electrónico del hotel"
                      defaultValue={hotel?.email}
                    />
                    <TextField
                      required
                      multiline
                      id="description"
                      type="text"
                      rows={10}
                      label="Descripción del hotel"
                      defaultValue={hotel?.description}
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
                            defaultChecked={hotel?.wifi}
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
                            defaultChecked={hotel?.pool}
                          />
                        }
                        label="Piscina"
                      />
                      <FormControlLabel
                        key={3}
                        control={
                          <Checkbox
                            color="success"
                            name={"restaurant"}
                            defaultChecked={hotel?.restaurant}
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
                            defaultChecked={hotel?.gym}
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
                            defaultChecked={hotel?.parking}
                          />
                        }
                        label="Parking"
                      />
                      <FormControlLabel
                        key={6}
                        control={
                          <Checkbox
                            color="success"
                            name={"tv"}
                            defaultChecked={hotel?.tv}
                          />
                        }
                        label="TV"
                      />
                    </FormGroup>
                  </Box>

                  <>
                    <div className="input-file">
                      <p
                        style={{ margin: "20px 0 ", fontFamily: "Roboto-bold" }}
                      >
                        Añade nuevas imagenes
                      </p>
                      <span className="input-file-text">{photoName}</span>
                      <br />
                      <label htmlFor="contained-button-file">
                        <br />
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
                          onClick={showWidgetPhotoHotel}
                          data-test-id="choose-file"
                        >
                          Subir imágenes
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
                        navigate("/myhotels");
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                </form>
              </FormControl>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
