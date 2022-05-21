import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import PoolIcon from "@mui/icons-material/Pool";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TvIcon from "@mui/icons-material/Tv";

import NavBar from "../../components/NavBar/NavBar";
import { playa } from "../../images/images";
import "./_Hotel.scss";
import { RatingComponent } from "../../components/Rating/RatingComponent";
import { Comment } from "../../components/Comment/Comment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotelByIdAsync,
  hotelSelected,
  updateHotelAsync,
} from "../../slices/hotelSlice";
import { Button, FormControl, Rating, TextField } from "@mui/material";
import { userLoggued } from "../../slices/userSlice";
import {
  createCommentAsync,
  getCommentsByHotelAsync,
  hotelComments,
} from "../../slices/commentSlice";

export const Hotel = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [rate, setRate] = useState(0);
  const { id } = useParams();

  const dispatch = useDispatch();
  const hotel = useSelector(hotelSelected);
  const user = useSelector(userLoggued);
  const comments = useSelector(hotelComments);

  const [addingComment, setAddingComment] = useState(false);
  const handleClick = () => {
    setAddingComment(true);
  };
  const handleSubmit = async ({ target }) => {
    const commentToCreate = {
      author_name: `${user?.first_name} ${user?.last_name}`,
      hotel_id: id,
      author_id: user?._id,
      rating: rate,
      comment: target[6].value,
    };
    const hotelToUpdateRate = {
      stars: hotel?.stars === 0 ? rate : (hotel?.stars + rate) / 2,
    };
    console.log(hotelToUpdateRate);
    await dispatch(updateHotelAsync({ ...hotelToUpdateRate, id }));
    await dispatch(createCommentAsync({ comment: commentToCreate, id }));
    await dispatch(getHotelByIdAsync(id));
    await dispatch(getCommentsByHotelAsync(id));
    setAddingComment(false);
  };
  useEffect(() => {
    dispatch(getHotelByIdAsync(id));
    dispatch(getCommentsByHotelAsync(id));
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <div className="hotel-container">
        <div className="hotel-container__left">
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
        <div className="hotel-container__right">
          <div className="hotel-info">
            <h1>{hotel?.name}</h1>
            {hotel?.stars >= 0 && <Rating readOnly value={hotel?.stars} />}
            <p style={{ fontFamily: "Roboto-Regular" }}>{hotel?.description}</p>
            <div className="icons">
              {hotel?.wifi && (
                <div className="icon">
                  <SignalWifiStatusbar4BarIcon sx={{ fontSize: 50 }} />
                  <br />
                  Wi-Fi
                </div>
              )}
              {hotel?.pool && (
                <div className="icon">
                  <PoolIcon sx={{ fontSize: 50 }} />
                  <br />
                  Piscina
                </div>
              )}
              {hotel?.restaurant && (
                <div className="icon">
                  <RestaurantIcon sx={{ fontSize: 50 }} />
                  <br />
                  Restaurante
                </div>
              )}
              {hotel?.gym && (
                <div className="icon">
                  <FitnessCenterIcon sx={{ fontSize: 50 }} />
                  <br />
                  GYM
                </div>
              )}
              {hotel?.parking && (
                <div className="icon">
                  <LocalParkingIcon sx={{ fontSize: 50 }} />
                  <br />
                  Parking
                </div>
              )}
              {hotel?.tv && (
                <div className="icon">
                  <TvIcon sx={{ fontSize: 50 }} />
                  <br />
                  TV
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="comments">
        <h1>Comentarios</h1>
        {user?.role === "user" && (
          <>
            <Button
              variant="contained"
              className="addComment"
              onClick={handleClick}
            >
              Añadir nuevo comentario
            </Button>
            {addingComment && (
              <FormControl className="comment-container">
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
                    <h3 className="rate">
                      Puntualos:{" "}
                      <Rating
                        name="simple-controlled"
                        value={rate}
                        onChange={(event, newValue) => {
                          setRate(newValue);
                        }}
                      />{" "}
                    </h3>
                    <TextField
                      required
                      multiline
                      rows={4}
                      id="outlined-multiline-static"
                      type="text"
                      label="Añade el comentario aquí"
                    />
                    <Button
                      type="submit"
                      color="success"
                      variant="contained"
                      className="button-save__comment"
                    >
                      Guardar cambios
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      className="button-cancel__comment"
                      onClick={() => {
                        setAddingComment(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </form>
              </FormControl>
            )}
          </>
        )}
        {comments?.map(({ author_name, rating, comment }, i) => (
          <Comment
            key={i}
            author={author_name}
            rate={rating}
            comment={comment}
          />
        ))}
      </div>
    </>
  );
};
