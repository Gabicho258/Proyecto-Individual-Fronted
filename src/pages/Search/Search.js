import { Container } from "@mui/material";
import React, { useEffect } from "react";

import NavBar from "../../components/NavBar/NavBar";
import { HotelCard } from "../../components/HotelCard/HotelCard";
import "./_Search.scss";
import { useDispatch, useSelector } from "react-redux";
import { allHotels, getAllHotelsAsync } from "../../slices/hotelSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const hotels = useSelector(allHotels);
  useEffect(() => {
    dispatch(getAllHotelsAsync());
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ padding: "15px 0 70px" }}>
        <h1>Encuentra el hotel a tu medida</h1>
        <div className="cards-container">
          {hotels?.map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} />
          ))}
        </div>
      </Container>
    </>
  );
};
