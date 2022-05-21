import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { playa } from "../../images/images";
import { RatingComponent } from "../Rating/RatingComponent";
import { getHotelByIdAsync } from "../../slices/hotelSlice";
import { getCommentsByHotelAsync } from "../../slices/commentSlice";

export const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, stars, address, _id, images } = hotel;

  return (
    <Card sx={{ width: 305 }}>
      <CardActionArea
        onClick={async () => {
          await dispatch(getHotelByIdAsync(_id));
          await dispatch(getCommentsByHotelAsync(_id));
          navigate(`/hotel/${_id}`);
        }}
      >
        <CardMedia
          component="img"
          // height="170"
          style={{ maxHeight: "170px" }}
          image={images.length === 0 ? playa : images[0]}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <RatingComponent readOnly={true} rate={stars} />
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
