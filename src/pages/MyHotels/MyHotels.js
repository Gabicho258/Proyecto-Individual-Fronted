import { Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { HotelListItem } from "../../components/HotelListItem/HotelListItem";
import NavBar from "../../components/NavBar/NavBar";
import { getHotelsByOwnerAsync, myHotelsOwner } from "../../slices/hotelSlice";

import "./_MyHotels.scss";

export const MyHotels = () => {
  const navigate = useNavigate();
  const ownerId = JSON.parse(localStorage.getItem("infoUser"))._id;
  const dispatch = useDispatch();

  const hotels = useSelector(myHotelsOwner);
  useEffect(() => {
    dispatch(getHotelsByOwnerAsync(ownerId));
  }, []);
  return (
    <>
      <NavBar />
      <Container className="myhotels-container">
        <h1>Mis hoteles</h1>
        <Button variant="contained" onClick={() => navigate("/create")}>
          Añadir un nuevo hotel
        </Button>
        {hotels?.map((hotel, i) => (
          <HotelListItem key={i} hotel={hotel} />
        ))}
      </Container>
    </>
  );
};
