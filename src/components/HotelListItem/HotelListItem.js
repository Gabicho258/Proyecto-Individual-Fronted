import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteHotelAsync,
  getHotelByIdAsync,
  getHotelsByOwnerAsync,
} from "../../slices/hotelSlice";

import "./_HotelListItem.scss";

export const HotelListItem = ({ hotel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { address, email, name, phone, whatsapp_link, _id, owner_id } = hotel;

  const handleDelete = async () => {
    await dispatch(deleteHotelAsync(_id));
    await dispatch(getHotelsByOwnerAsync(owner_id));
  };
  const handleEdit = async () => {
    await dispatch(getHotelByIdAsync(_id));
    navigate(`/edit/${_id}`);
  };

  return (
    <div className="hotel-item">
      <h2>{name}</h2>
      <p>Dirección: {address}</p>
      <p>Email: {email}</p>
      <p>Número: {phone}</p>
      <p>
        Link WhatsApp:{" "}
        <a href={whatsapp_link} target="_blank" rel="noreferrer">
          {whatsapp_link}
        </a>
      </p>

      <div className="action-buttons">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate(`/hotel/${_id}`);
          }}
        >
          Ver Hotel
        </Button>
        <Button
          variant="contained"
          className="edit-hotel"
          onClick={() => {
            handleEdit();
          }}
        >
          Editar Hotel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDelete();
          }}
        >
          Eliminar Hotel
        </Button>
      </div>
    </div>
  );
};
