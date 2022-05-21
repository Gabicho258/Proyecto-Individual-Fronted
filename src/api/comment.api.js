import API_SERVER from "./api.server.js";

const ENDPOINTS = {
  GET_COMMENTS_BY_HOTEL: "/api/comments",
  CREATE: "/api/comments/create",
};

export const getCommentsByHotel = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_COMMENTS_BY_HOTEL}/${id}`;
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

export const createComment = (comment, hotelId) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.CREATE}/${hotelId}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      body: JSON.stringify(comment),
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
