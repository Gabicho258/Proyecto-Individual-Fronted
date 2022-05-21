import API_SERVER from "./api.server.js";

const ENDPOINTS = {
  GET_ALL_HOTELS: "/api/hotels",
  GET_HOTEL_BY_ID: "/api/hotels",
  GET_HOTEL_BY_OWNER: "/api/hotels/owner",
  CREATE: "/api/hotels/create",
  UPDATE: "/api/hotels/update",
  DELETE: "/api/hotels/delete",
};

export const getHotelsByOwner = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_HOTEL_BY_OWNER}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};
export const getAllHotels = () => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_ALL_HOTELS}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};
export const getHotelById = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_HOTEL_BY_ID}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const createHotel = (hotel, ownerId) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.CREATE}/${ownerId}`;
  console.log(path);
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      body: JSON.stringify(hotel),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const deleteHotel = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.DELETE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const updateHotel = ({ id, ...hotel }) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.UPDATE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      body: JSON.stringify(hotel),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};
