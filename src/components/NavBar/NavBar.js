import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./_NavBar.scss";
import { menu } from "../../images/images";
import { getOneUserAsync, userLoggued } from "../../slices/userSlice";
import { getAllHotelsAsync } from "../../slices/hotelSlice";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector(userLoggued);
  const ID = JSON.parse(localStorage.getItem("infoUser"))._id;

  const endSession = async () => {
    await localStorage.removeItem("infoUser");
    navigate("/");
  };

  useEffect(() => {
    dispatch(getOneUserAsync(ID));
  }, []);
  return (
    <div className="navbar">
      <Button
        className="logo"
        data-test-id="button-logo"
        variant="text"
        onClick={() => navigate("/search")}
      >
        Hotel App
      </Button>
      <div className="userInfo">
        <p>
          {user?.first_name} {user?.last_name}
        </p>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          data-test-id="open-menu"
        >
          <Avatar src={`${user?.photo_url}`} />
          <img src={menu} alt=" "></img>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          data-test-id="list-menu"
        >
          <MenuItem
            style={{ width: "100%", padding: "0" }}
            onClick={handleClose}
          >
            <Button
              onClick={() => {
                navigate("/userprofile");
              }}
              style={{
                color: "black",
                fontFamily: "Roboto-Regular",
                width: "100%",
                padding: "10px 15px",
              }}
            >
              Ver Perfil
            </Button>
          </MenuItem>
          <Divider />
          {user?.role === "user" ? (
            <div>
              <MenuItem
                style={{ width: "100%", padding: "0" }}
                onClick={handleClose}
              >
                <Button
                  onClick={async () => {
                    await dispatch(getAllHotelsAsync());
                    navigate("/search");
                  }}
                  style={{
                    color: "black",
                    fontFamily: "Roboto-Regular",
                    width: "100%",
                    padding: "10px 15px",
                  }}
                >
                  Buscar Hotel
                </Button>
              </MenuItem>
              <Divider />
            </div>
          ) : (
            <div>
              <MenuItem
                style={{ width: "100%", padding: "0" }}
                onClick={handleClose}
              >
                <Button
                  onClick={() => navigate("/myhotels")}
                  style={{
                    color: "black",
                    fontFamily: "Roboto-Regular",
                    width: "100%",
                    padding: "10px 15px",
                  }}
                >
                  Ver mis hoteles
                </Button>
              </MenuItem>
              <Divider />
            </div>
          )}
          <MenuItem
            style={{ width: "100%", padding: "0" }}
            onClick={endSession}
          >
            <Button
              style={{
                color: "black",
                fontFamily: "Roboto-Regular",
                width: "100%",
                padding: "10px 15px",
              }}
            >
              Cerrar Sesión
            </Button>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
